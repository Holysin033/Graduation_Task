<template>
	<view class="container">
		<!-- 歌单头部信息 -->
		<view class="playlist-header" @tap="showFullDescription">
			<image :src="playlistInfo.cover || '/static/default-playlist.png'" mode="aspectFill" class="cover"></image>
			<view class="info">
				<scroll-view 
					class="name-scroll" 
					scroll-x="true" 
					:show-scrollbar="false"
					:scroll-left="scrollLeft"
					@scroll="onScroll"
				>
					<text class="name">{{ playlistInfo.name }}</text>
				</scroll-view>
				<text class="creator">创建者：{{ playlistInfo.creator }}</text>
				<text class="description">{{ playlistInfo.description || '暂无描述' }}</text>
				<text class="more" v-if="playlistInfo.description">点击查看完整介绍</text>
			</view>
		</view>
		
		<!-- 歌曲数量信息 -->
		<view class="song-count-info">
			<text>共{{ totalSongs }}首歌曲，已加载{{ songs.length }}首</text>
			
			<!-- 添加歌曲按钮 (仅用户歌单显示) -->
			<view v-if="isUserPlaylist" class="add-song-btn" @tap="addSong">
				<text class="iconfont icon-add"></text>
				<text>添加歌曲</text>
			</view>
		</view>
		
		<!-- 歌曲列表 -->
		<scroll-view 
			class="song-list-scroll"
			scroll-y="true"
			@scrolltolower="loadMoreSongs"
			lower-threshold="50"
			refresher-enabled
			:refresher-triggered="isRefreshing"
			@refresherrefresh="onRefresh"
			enable-back-to-top
			scroll-anchoring
		>
		<view class="song-list">
			<!-- 初始加载中显示骨架屏 -->
			<view v-if="isInitialLoading" class="loading-skeleton">
				<view class="skeleton-item" v-for="i in 8" :key="i">
					<view class="skeleton-index"></view>
					<view class="skeleton-content">
						<view class="skeleton-name"></view>
						<view class="skeleton-artist"></view>
					</view>
					<view class="skeleton-actions"></view>
				</view>
			</view>
			
			<view 
				class="song-item" 
				v-for="(song, index) in songs" 
				:key="song.id + '-' + index"
				@tap="playSong(song)"
				v-if="!isInitialLoading"
			>
				<view class="index">{{ index + 1 }}</view>
				<view class="song-info">
					<text class="name">{{ song.name }}</text>
					<text class="artist">{{ song.artist }}</text>
				</view>
				
				<view class="song-actions">
					<!-- 删除按钮 (仅用户歌单显示) -->
					<text 
						v-if="isUserPlaylist" 
						class="delete-btn iconfont icon-delete" 
						@tap.stop="removeSong(song, index)"
					></text>
					<text class="duration">{{ formatDuration(song.duration) }}</text>
				</view>
			</view>
				
			<!-- 加载状态提示 -->
			<view class="loading-status" v-if="songs.length > 0">
				<view v-if="isLoading" class="loading-more">
					<view class="loading-spinner"></view>
					<text>正在加载更多歌曲...</text>
				</view>
				<text v-else-if="hasMore">向下滑动加载更多</text>
				<text v-else>已加载全部歌曲({{ songs.length }}/{{ totalSongs }})</text>
			</view>
				
			<!-- 底部占位，确保最后一项可以完全滚动到顶部 -->
			<view class="bottom-placeholder"></view>
		</view>
		</scroll-view>
		
		<!-- 完整介绍弹窗 -->
		<view class="description-popup" v-if="showDescription" @tap="hideFullDescription" >
			<view class="popup-content" @tap.stop>
				<view class="popup-header">
					<text class="title">歌单介绍</text>
					<text class="close" @tap="hideFullDescription">×</text>
				</view>
				<scroll-view class="popup-body" scroll-y="true">
					<text class="full-description">{{ playlistInfo.description }}</text>
				</scroll-view>
			</view>
		</view>
		
		<!-- 新增：更多操作菜单弹窗 -->
		<uni-popup ref="moreOptionsPopup" type="bottom">
			<view class="options-menu">
				<view class="option-item" @click="toggleFavorite">
					<text class="option-icon iconfont" :class="isFavorited ? 'icon-favorite-filled' : 'icon-favorite'"></text>
					<text class="option-text">{{ isFavorited ? '取消收藏' : '收藏' }}</text>
				</view>
				<view class="option-item" @click="sharePlaylist">
					<text class="option-icon iconfont icon-share"></text>
					<text class="option-text">分享</text>
				</view>
				<view class="option-item delete-option" v-if="isUserCreated" @click="showDeleteConfirm">
					<text class="option-icon iconfont icon-delete"></text>
					<text class="option-text">删除歌单</text>
				</view>
				<view class="option-item" @click="closeMoreOptions">
					<text class="option-text">取消</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 删除确认弹窗 -->
		<uni-popup ref="deleteConfirmPopup" type="center">
			<view class="popup-content">
				<view class="popup-title">删除歌单</view>
				<view class="popup-message">确定要删除"{{playlistInfo.name}}"吗？此操作不可撤销。</view>
				<view class="popup-buttons">
					<button @click="cancelDelete" class="cancel-btn">取消</button>
					<button @click="confirmDelete" class="confirm-btn delete-confirm-btn">删除</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import apiConfig from '@/utils/apiConfig.js'
import request from '@/utils/request.js'
import { getPlaylistDetail, addToPlayHistory } from '@/utils/musicData.js'
import { getPlaylistById } from '@/utils/playlistCache.js'

export default {
	data() {
		return {
			isUserPlaylist: false,
			playlistId: '',
			playlistName: '',
			playlistType: '',
			playlistInfo: {
				id: '',
				name: '',
				description: '',
				cover: '',
				creator: ''
			},
			songs: [],
			totalSongs: 0,
			isLoading: false,
			isRefreshing: false,
			currentPage: 1,
			pageSize: 20,
			hasMore: true,
			scrollLeft: 0,
			showDescription: false,
			scrollTimer: null,  // 添加滚动计时器
			isInitialLoading: true,
			loading: false,
			isFavorited: false,
			isUserCreated: false
		}
	},
	onLoad(options) {
		// 获取路由参数
		this.playlistId = options.id || ''
		this.playlistName = options.name ? decodeURIComponent(options.name) : ''
		this.playlistType = options.type || 'netease'
		
		// 判断是否为用户创建的播放列表
		this.isUserPlaylist = this.playlistType === 'user'
		
		// 设置标题
		uni.setNavigationBarTitle({
			title: this.playlistName || '歌单详情'
		})
		
		// 初始化播放列表信息
		this.playlistInfo.id = this.playlistId
		this.playlistInfo.name = this.playlistName
		
		// 监听播放列表数据更新事件
		uni.$on('playlists_updated', this.handlePlaylistsUpdated)
		uni.$on('playlists_fixed', this.handlePlaylistsUpdated)
		
		// 获取播放列表详情
		this.getPlaylistDetail()
	},
	onUnload() {
		// 清除滚动计时器
		if (this.scrollTimer) {
			clearInterval(this.scrollTimer)
		}
		
		// 移除事件监听
		uni.$off('playlists_updated', this.handlePlaylistsUpdated)
		uni.$off('playlists_fixed', this.handlePlaylistsUpdated)
	},
	methods: {
		// 获取播放列表详情
		async getPlaylistDetail() {
			try {
				this.isLoading = true;
				this.isInitialLoading = true;
				
				// 导入播放列表缓存工具
				const { getPlaylistById } = require('@/utils/playlistCache.js');
				const userId = uni.getStorageSync('userId') || '';
				
				console.log('正在获取播放列表详情，ID:', this.playlistId);
				
				// 先从本地缓存获取
				const playlist = getPlaylistById(this.playlistId, userId);
				
				if (playlist) {
					console.log('从本地缓存中成功获取播放列表:', playlist.name);
					
					// 更新播放列表信息
					this.playlistInfo = {
						id: playlist.id,
						name: playlist.name || '未命名歌单',
						description: playlist.description || '暂无描述',
						cover: playlist.cover || '/static/music-cover.png',
						creator: playlist.creator || '我'
					};
					
					// 更新歌曲列表
					if (playlist.songs && Array.isArray(playlist.songs)) {
						// 记录歌曲数据结构，方便调试
						if (playlist.songs.length > 0) {
							console.log('歌曲数据样例:', JSON.stringify(playlist.songs[0]));
						}
						
						// 确保所有歌曲都有必要的字段
						this.songs = playlist.songs.map(song => {
							// 直接支持多个字段名，而不是使用临时变量
							const songObj = {
								id: song.id || song.song_id || song.songId || song.netease_id || `local_${Date.now()}_${Math.random().toString(36).substring(2)}`,
								song_id: song.song_id || song.id, // 保留song_id字段
								name: (song.name && song.name !== '未知歌曲') ? song.name : (song.song_name || song.songName || song.title || '未知歌曲'),
								artist: song.artist || song.singer || song.artistName || song.artists || '未知歌手',
								album: song.album || song.albumName || '未知专辑',
								duration: song.duration || 0,
								cover: song.cover || song.coverUrl || song.cover_url || '/static/music-cover.png'
							};
							
							// 如果仍然无法获取名称，记录原始对象
							if (songObj.name === '未知歌曲') {
								console.warn('歌曲名称缺失:', JSON.stringify(song));
							}
							
							// 确保歌曲有URL
							songObj.url = song.url || song.mp3Url || song.mp3_url || `https://music.163.com/song/media/outer/url?id=${songObj.id}.mp3`;
							
							return songObj;
						});
					} else {
						this.songs = [];
					}
					
					this.totalSongs = this.songs.length;
					this.hasMore = false; // 本地播放列表一次性加载所有歌曲
					
					// 启动自动滚动效果（如果标题过长）
					this.$nextTick(() => {
						this.startTitleScrollAnimation();
					});
					
					this.isLoading = false;
					this.isInitialLoading = false;
					this.isRefreshing = false;
					return;
				}
				
				// 如果本地缓存没有，则从服务器获取
				console.log('本地缓存中未找到播放列表，尝试从服务器获取');
				
				// 判断是用户自建的播放列表还是其他类型
				if (this.isUserPlaylist) {
					// 获取用户创建的播放列表
					await this.getUserPlaylistDetail();
				} else {
					// 获取网易云音乐歌单
					await this.getNetEasePlaylistDetail();
				}
			} catch (error) {
				console.error('获取播放列表详情失败:', error);
				uni.showToast({
					title: '获取播放列表失败',
					icon: 'none'
				});
				
				// 设置默认数据
				this.playlistInfo = {
					id: this.playlistId,
					name: this.playlistName || '未找到歌单',
					description: '暂无描述',
					cover: '/static/default-playlist.png',
					creator: '未知'
				};
				this.songs = [];
				this.totalSongs = 0;
				this.hasMore = false;
			} finally {
				this.isLoading = false;
				this.isRefreshing = false;
				this.isInitialLoading = false;
			}
		},
		
		// 获取用户创建的播放列表详情
		async getUserPlaylistDetail() {
			try {
				console.log('开始获取用户播放列表详情，播放列表ID:', this.playlistId);
				
				// 导入播放列表缓存工具
				const { getPlaylistById } = require('@/utils/playlistCache.js');
				
				// 获取用户ID
				const userId = uni.getStorageSync('userId') || '';
				
				// 优先从缓存工具获取播放列表
				const cachedPlaylist = getPlaylistById(this.playlistId, userId);
				
				if (cachedPlaylist) {
					console.log('使用playlistCache工具成功获取播放列表:', cachedPlaylist.name);
					
					// 直接使用缓存的数据
					this.playlistInfo = {
						id: cachedPlaylist.id,
						name: cachedPlaylist.name || '未命名歌单',
						description: cachedPlaylist.description || '暂无描述',
						cover: cachedPlaylist.cover || '/static/default-playlist.png',
						creator: cachedPlaylist.creator || '我'
					};
					
					// 确保所有歌曲都有必要的字段
					if (cachedPlaylist.songs && Array.isArray(cachedPlaylist.songs)) {
						// 记录歌曲数据结构，方便调试
						if (cachedPlaylist.songs.length > 0) {
							console.log('用户歌单歌曲数据样例:', JSON.stringify(cachedPlaylist.songs[0]));
						}
						
						this.songs = cachedPlaylist.songs.map(song => {
							// 直接支持多个字段名，而不是使用临时变量
							const songObj = {
								id: song.id || song.song_id || song.songId || song.netease_id || `local_${Date.now()}_${Math.random().toString(36).substring(2)}`,
								song_id: song.song_id || song.id, // 保留song_id字段
								name: (song.name && song.name !== '未知歌曲') ? song.name : (song.song_name || song.songName || song.title || '未知歌曲'),
								artist: song.artist || song.singer || song.artistName || song.artists || '未知歌手',
								album: song.album || song.albumName || '未知专辑',
								duration: song.duration || 0,
								cover: song.cover || song.coverUrl || song.cover_url || '/static/music-cover.png'
							};
							
							// 如果仍然无法获取名称，记录原始对象
							if (songObj.name === '未知歌曲') {
								console.warn('用户歌单歌曲名称缺失:', JSON.stringify(song));
							}
							
							// 确保歌曲有URL
							songObj.url = song.url || song.mp3Url || song.mp3_url || `https://music.163.com/song/media/outer/url?id=${songObj.id}.mp3`;
							
							return songObj;
						});
					} else {
						this.songs = [];
					}
					
					this.totalSongs = this.songs.length;
					this.hasMore = false;
					
					// 启动自动滚动效果（如果标题过长）
					this.$nextTick(() => {
						this.startTitleScrollAnimation();
					});
					
					return;
				}
				
				// 如果缓存工具没有找到，则尝试老的方法
				console.log('缓存工具中未找到播放列表，尝试从本地存储同步数据获取');
				
				// 尝试从本地存储的同步数据中获取播放列表
				const storageKey = `user_${userId}_playlists`;
				
				console.log('尝试从本地存储获取:', storageKey);
				let userPlaylistsData = uni.getStorageSync(storageKey);
				console.log('获取到的原始播放列表数据类型:', typeof userPlaylistsData);
				
				// 如果在user_1_playlists中没找到，尝试从playlists中获取
				if (!userPlaylistsData || userPlaylistsData === '') {
					console.log('从user_ID_playlists中未找到数据，尝试从playlists获取');
					userPlaylistsData = uni.getStorageSync('playlists');
					console.log('从playlists获取的数据类型:', typeof userPlaylistsData);
				}
				
				// 安全解析播放列表数据
				let userPlaylists = [];
				try {
					// 检查数据是否有效
					if (!userPlaylistsData) {
						console.log('本地存储中没有找到播放列表数据');
						userPlaylists = [];
					} 
					// 如果是字符串，尝试解析
					else if (typeof userPlaylistsData === 'string') {
						// 检查字符串是否为空或者不是有效的JSON格式
						if (userPlaylistsData.trim() === '') {
							console.log('播放列表数据为空字符串');
							userPlaylists = [];
						} else {
							try {
								// 确保字符串是合法的JSON
								if (!userPlaylistsData.startsWith('[') && !userPlaylistsData.startsWith('{')) {
									console.error('播放列表数据不是有效的JSON格式:', userPlaylistsData.substring(0, 20) + '...');
									userPlaylists = [];
								} else {
									userPlaylists = JSON.parse(userPlaylistsData);
									console.log('成功解析播放列表JSON数据');
								}
							} catch (parseError) {
								console.error('解析播放列表数据失败:', parseError);
								// 初始化为空数组
								userPlaylists = [];
							}
						}
					} 
					// 如果已经是数组，直接使用
					else if (Array.isArray(userPlaylistsData)) {
						console.log('播放列表数据已经是数组');
						userPlaylists = userPlaylistsData;
					} 
					// 如果是对象但不是数组，可能是单个播放列表
					else if (typeof userPlaylistsData === 'object') {
						console.log('播放列表数据是对象但不是数组');
						userPlaylists = [userPlaylistsData];
					} 
					// 其他情况使用空数组
					else {
						console.error('播放列表数据类型无法处理:', typeof userPlaylistsData);
						userPlaylists = [];
					}
				} catch (e) {
					console.error('处理播放列表数据时出错:', e);
					userPlaylists = [];
				}
				
				// 确保userPlaylists是数组
				if (!Array.isArray(userPlaylists)) {
					console.log('处理后的播放列表数据不是数组，重置为空数组');
					userPlaylists = [];
				}
				
				console.log('处理后的播放列表数据:', userPlaylists);
				
				// 查找当前播放列表
				const currentPlaylist = userPlaylists.find(list => list && list.id == this.playlistId);
				console.log('找到的播放列表:', currentPlaylist);
				
				if (currentPlaylist) {
					// 从本地存储中找到了播放列表，使用该数据
					console.log('从本地存储中成功找到播放列表');
					
					// 更新播放列表信息
					this.playlistInfo = {
						id: currentPlaylist.id,
						name: currentPlaylist.name || '未命名歌单',
						description: currentPlaylist.description || '暂无描述',
						cover: currentPlaylist.cover || '/static/music-cover.png',
						creator: currentPlaylist.creator || '我'
					};
					
					// 更新歌曲列表
					if (currentPlaylist.songs && Array.isArray(currentPlaylist.songs)) {
						this.songs = currentPlaylist.songs.map(song => {
							// 确保歌曲有正确的属性
							const songObj = {
								id: song.song_id ||song.id ||  song.songId || song.netease_id || song.neteaseId || `local_${Date.now()}_${Math.random().toString(36).substring(2)}`,
								// 确保有歌曲名称（支持多种字段名）
								name: (song.name && song.name !== '未知歌曲') ? song.name : (song.song_name || song.songName || song.title || '未知歌曲'),
								artist: song.artist || song.singer || song.artistName || song.artists || '未知歌手',
								album: song.album || song.albumName || '未知专辑',
								duration: song.duration || 0,
								cover: song.cover || song.coverUrl || song.cover_url || song.pic || song.picUrl || '/static/default-song.png'
							};
							
							// 确保歌曲有URL
							if (!song.url) {
								songObj.url = song.mp3Url || song.mp3_url || 
									`https://music.163.com/song/media/outer/url?id=${songObj.id}.mp3`;
							} else {
								songObj.url = song.url;
							}
							
							return songObj;
						});
					} else {
						this.songs = [];
					}
					
					this.totalSongs = this.songs.length;
					this.hasMore = false; // 用户播放列表一次性加载所有歌曲
					
					// 启动自动滚动效果（如果标题过长）
					this.$nextTick(() => {
						this.startTitleScrollAnimation();
					});
					
					return;
				}
				
				// 如果本地存储中没有找到，从服务器获取
				console.log('本地存储中未找到播放列表，尝试从服务器获取');
				const url = `${apiConfig.playlist.baseUrl}${apiConfig.playlist.detail(this.playlistId)}`;
				const response = await request(url, 'GET');
				
				if (response.code === 200 && response.data) {
					const playlist = response.data;
					
					// 更新播放列表信息
					this.playlistInfo = {
						id: playlist.id,
						name: playlist.name,
						description: playlist.description || '暂无描述',
						cover: playlist.cover || '/static/default-playlist.png',
						creator: playlist.creator || '我'
					};
					
					// 更新歌曲列表，确保每首歌都有URL
					if (playlist.songs && Array.isArray(playlist.songs)) {
						this.songs = playlist.songs.map(song => {
							// 确保歌曲有正确的属性
							const songObj = {
								id: song.id || song.netease_id || song.neteaseId || song.songId || `local_${Date.now()}_${Math.random().toString(36).substring(2)}`,
								// 确保有歌曲名称（优先级：name > song_name > title > songName）
								name: (song.name && song.name !== '未知歌曲') ? song.name : (song.song_name || song.songName || song.title || '未知歌曲'),
								artist: song.artist || song.artistName || song.singer || '未知歌手',
								album: song.album || song.albumName || '未知专辑',
								duration: song.duration || 0,
								cover: song.cover || song.coverUrl || song.cover_url || '/static/default-song.png'
							};
							
							// 确保歌曲有URL
							if (!song.url) {
								songObj.url = `https://music.163.com/song/media/outer/url?id=${songObj.id}.mp3`;
							} else {
								songObj.url = song.url;
							}
							
							return songObj;
						});
					} else {
						this.songs = [];
					}
					
					this.totalSongs = this.songs.length;
					this.hasMore = false; // 用户播放列表一次性加载所有歌曲
					
					// 启动自动滚动效果（如果标题过长）
					this.$nextTick(() => {
						this.startTitleScrollAnimation();
					});
				} else {
					throw new Error(response.message || '获取播放列表详情失败');
				}
			} catch (error) {
				console.error('获取用户播放列表详情失败：', error);
				// 显示友好的错误提示
				uni.showToast({
					title: '获取播放列表失败，请重试',
					icon: 'none',
					duration: 2000
				});
				
				// 初始化为空数据
				this.playlistInfo = {
					id: this.playlistId,
					name: this.playlistName || '未找到歌单',
					description: '暂无描述',
					cover: '/static/default-playlist.png',
					creator: '未知'
				};
				this.songs = [];
				this.totalSongs = 0;
				this.hasMore = false;
				
				throw error;
			}
		},
		
		// 获取网易云音乐歌单详情
		async getNetEasePlaylistDetail() {
			try {
				// 使用分页加载
				const result = await getPlaylistDetail(this.playlistId)
				
				// 更新播放列表信息
				this.playlistInfo = {
					id: result.playlist_id,
					name: result.name,
					description: result.description || '暂无描述',
					cover: result.cover,
					creator: result.creator || '网易云音乐'
				}
				
				// 根据是否是首次加载或刷新，处理歌曲列表
				if (this.isRefreshing || this.currentPage === 1) {
					// 初次加载或刷新，替换现有列表
					this.songs = result.tracks.slice(0, this.pageSize).map(song => {
						// 确保歌曲有URL
						if (!song.url) {
							song.url = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
						}
						return song
					})
				} else {
					// 加载更多，追加到列表
					const newSongs = result.tracks.slice(
						(this.currentPage - 1) * this.pageSize, 
						this.currentPage * this.pageSize
					).map(song => {
						// 确保歌曲有URL
						if (!song.url) {
							song.url = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
						}
						return song
					})
					this.songs = [...this.songs, ...newSongs]
				}
				
				// 更新总数和是否有更多
				this.totalSongs = result.totalCount || result.tracks.length
				this.hasMore = this.songs.length < this.totalSongs
				
				// 启动自动滚动效果（如果标题过长）
				this.$nextTick(() => {
					this.startTitleScrollAnimation()
				})
			} catch (error) {
				console.error('获取网易云音乐歌单详情失败：', error)
				throw error
			}
		},
		
		// 加载更多歌曲
		loadMoreSongs() {
			if (this.isLoading || !this.hasMore || this.isUserPlaylist) return
			
			this.currentPage++
			this.getNetEasePlaylistDetail()
		},
		
		// 刷新
		async onRefresh() {
			this.isRefreshing = true
			this.currentPage = 1
			await this.getPlaylistDetail()
		},
		
		// 播放歌曲
		playSong(song) {
			try {
				// 防止未定义的song对象
				if (!song || typeof song !== 'object') {
					console.error('错误：尝试播放无效的歌曲对象');
					uni.showToast({
						title: '无法播放：无效的歌曲',
						icon: 'none'
					});
					return;
				}
				
				// 先深拷贝song对象，避免直接修改原始数据
				const songToPlay = JSON.parse(JSON.stringify(song));
				
				// 标准化ID，确保song_id字段存在
				if (!songToPlay.song_id) {
					songToPlay.song_id = songToPlay.id || songToPlay.songId || songToPlay.netease_id || songToPlay.neteaseId || `local_${Date.now()}`;
					console.log('设置song_id:', songToPlay.song_id);
				}
				
				// 确保本地id存在
				if (!songToPlay.id) {
					songToPlay.id = songToPlay.song_id || `local_${Date.now()}`;
					console.log('设置本地id:', songToPlay.id);
				}
				
				// 标准化歌曲名称
				if (!songToPlay.name) {
					songToPlay.name = songToPlay.song_name || songToPlay.songName || songToPlay.title || '未知歌曲';
					console.log('使用替代名称:', songToPlay.name);
				}
				
				// 标准化歌手名称
				if (!songToPlay.artist) {
					songToPlay.artist = songToPlay.singer || songToPlay.artistName || songToPlay.artists || '未知歌手';
					console.log('使用替代歌手名称:', songToPlay.artist);
				}
				
				// 确保有专辑名
				if (!songToPlay.album) {
					songToPlay.album = songToPlay.albumName || '未知专辑';
				}
				
				// 添加到播放历史
				addToPlayHistory(songToPlay);
				
				// 确保歌曲有song_id和id属性
				if (!songToPlay.song_id && !songToPlay.id) {
					console.error('错误：歌曲缺少ID，无法播放');
					uni.showToast({
						title: '无法播放：歌曲ID缺失',
						icon: 'none'
					});
					return;
				}
				
				// 确保歌曲有url属性，优先使用song_id生成URL
				if (!songToPlay.url) {
					console.log('歌曲URL为空，使用ID生成URL');
					songToPlay.url = songToPlay.mp3Url || songToPlay.mp3_url || 
						`https://music.163.com/song/media/outer/url?id=${songToPlay.song_id || songToPlay.id}.mp3`;
				}
				
				// 设置自动播放标记，确保加载后立即播放
				uni.setStorageSync('autoPlay', 'true');
				
				// 保存当前要播放的歌曲
				uni.setStorageSync('currentSong', JSON.stringify(songToPlay));
				
				// 保存完整播放列表到本地存储
				const playList = this.songs.map(s => {
					// 确保每首歌曲都有必要的字段
					const song = JSON.parse(JSON.stringify(s));
					
					// 确保song_id字段存在
					if (!song.song_id) {
						song.song_id = song.id || song.songId || song.netease_id || song.neteaseId || '';
					}
					
					// 确保URL字段存在，优先使用song_id
					if (!song.url) {
						song.url = song.mp3Url || song.mp3_url || 
							`https://music.163.com/song/media/outer/url?id=${song.song_id || song.id}.mp3`;
					}
					return song;
				});
				
				// 找到当前歌曲在列表中的索引，优先使用song_id匹配
				const songIndex = playList.findIndex(s => 
					(songToPlay.song_id && s.song_id === songToPlay.song_id) || 
					(songToPlay.id && s.id === songToPlay.id)
				);
				
				// 保存播放列表和索引
				uni.setStorageSync('playList', JSON.stringify(playList));
				uni.setStorageSync('currentIndex', songIndex >= 0 ? songIndex : 0);
				
				// 在控制台打印调试信息
				console.log('准备播放歌曲:', songToPlay);
				console.log('保存播放列表，长度:', playList.length, '当前索引:', songIndex);
				
				// 先切换到播放器页面，然后通过事件触发播放
				const pages = getCurrentPages();
				const currentPage = pages[pages.length - 1].route;
				
				// 判断当前是否在播放器页面
				if (currentPage === 'pages/player/player') {
					// 如果已经在播放器页面，直接发送播放事件
					// 传递歌曲、播放列表和索引
					uni.$emit('playSong', { 
						song: songToPlay,
						playList: playList,
						index: songIndex >= 0 ? songIndex : 0
					});
				} else {
					// 如果不在播放器页面，先跳转再播放
					uni.switchTab({
						url: '/pages/player/player',
						success: () => {
							// 等待页面跳转完成后发送播放事件
							setTimeout(() => {
								// 传递歌曲、播放列表和索引
								uni.$emit('playSong', { 
									song: songToPlay,
									playList: playList,
									index: songIndex >= 0 ? songIndex : 0
								});
							}, 200);
						}
					});
				}
			} catch (error) {
				console.error('播放歌曲失败:', error);
				uni.showToast({
					title: '播放失败，请重试',
					icon: 'none'
				});
			}
		},
		
		// 显示完整歌单介绍
		showFullDescription() {
			if (!this.playlistInfo.description || this.playlistInfo.description === '暂无描述') {
				return
			}
			
			// 显示弹窗而不是modal
			this.showDescription = true
		},
		
		// 隐藏完整歌单介绍
		hideFullDescription() {
			this.showDescription = false
		},
		
		// 格式化时长
		formatDuration(duration) {
			if (!duration) return '00:00'
			
			const totalSeconds = Math.floor(duration / 1000)
			const minutes = Math.floor(totalSeconds / 60)
			const seconds = totalSeconds % 60
			
			return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
		},
		
		// 处理滚动
		onScroll(e) {
			this.scrollLeft = e.detail.scrollLeft
		},
		
		// 启动标题自动滚动动画
		startTitleScrollAnimation() {
			// 清除之前的定时器
			if (this.scrollTimer) {
				clearInterval(this.scrollTimer)
			}
			
			// 获取名称滚动区域宽度
			const query = uni.createSelectorQuery().in(this)
			query.select('.name-scroll').boundingClientRect()
			query.select('.name').boundingClientRect()
			query.exec(res => {
				if (res[0] && res[1] && res[1].width > res[0].width) {
					// 如果名称宽度超过容器宽度，启动滚动
					const containerWidth = res[0].width
					const textWidth = res[1].width
					const scrollDistance = textWidth - containerWidth + 50 // 额外的50是padding-right
					
					// 先重置位置
					this.scrollLeft = 0
					
					// 立即开始第一次滚动
					this.startScrollAnimation(scrollDistance)
					
					// 设置滚动循环定时器
					this.scrollTimer = setInterval(() => {
						this.startScrollAnimation(scrollDistance)
					}, 10000) // 完整的滚动周期（8秒滚动+1秒停留+1秒重置）
				}
			})
		},
		
		// 执行单次滚动动画
		startScrollAnimation(scrollDistance) {
			// 渐进滚动到末尾
			const duration = 8000 // 滚动持续时间8秒
			const startTime = Date.now()
			const startScrollLeft = 0 // 总是从0开始
			
			// 先重置位置
			this.scrollLeft = 0
			
			const scroll = () => {
				const elapsedTime = Date.now() - startTime
				if (elapsedTime < duration) {
					// 计算当前滚动位置
					const progress = elapsedTime / duration
					this.scrollLeft = startScrollLeft + scrollDistance * progress
					requestAnimationFrame(scroll)
				} else {
					// 滚动结束，重置并准备下一轮
					setTimeout(() => {
						this.scrollLeft = 0
					}, 800) // 在末尾停留0.8秒
				}
			}
			
			// 立即开始滚动，不延迟
			requestAnimationFrame(scroll)
		},
		
		// 添加歌曲到播放列表
		addSong() {
			if (!this.isUserPlaylist) {
				uni.showToast({
					title: '仅可编辑自己创建的播放列表',
					icon: 'none'
				})
				return
			}
			
			console.log("准备跳转到搜索页面添加歌曲，歌单ID:", this.playlistId);
			
			// 检查歌单ID是否有效
			if (!this.playlistId) {
				console.error("歌单ID无效，无法添加歌曲");
				uni.showToast({
					title: '歌单ID无效',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			
			// 显示加载提示
			uni.showLoading({
				title: '准备中...'
			});
			
			try {
				// 构造URL，确保参数正确编码
				const url = `/pages/search/search?from=playlist&playlistId=${encodeURIComponent(this.playlistId)}`;
				console.log("完整跳转URL:", url);
				
				// 添加一个本地标记，用于验证回调是否正常
				try {
					uni.setStorageSync('lastPlaylistAction', JSON.stringify({
						action: 'addSong',
						playlistId: this.playlistId,
						timestamp: Date.now()
					}));
				} catch (e) {
					console.error("设置本地标记失败:", e);
				}
				
				// 跳转到搜索页面
				uni.navigateTo({
					url: url,
					success: () => {
						console.log("成功跳转到搜索页面");
						uni.hideLoading();
					},
					fail: (err) => {
						console.error("跳转到搜索页面失败:", err);
						uni.hideLoading();
						uni.showToast({
							title: '跳转失败，请重试',
							icon: 'none'
						});
					}
				});
			} catch (error) {
				console.error("跳转过程出错:", error);
				uni.hideLoading();
				uni.showToast({
					title: '操作失败，请重试',
					icon: 'none'
				});
			}
		},
		
		// 从播放列表中移除歌曲
		async removeSong(song, index) {
			if (!this.isUserPlaylist) {
				uni.showToast({
					title: '仅可编辑自己创建的播放列表',
					icon: 'none'
				})
				return
			}
			
			// 确认删除
			uni.showModal({
				title: '删除歌曲',
				content: `确定要从播放列表中移除《${song.name}》吗？`,
				success: async (res) => {
					if (res.confirm) {
						try {
							const url = `${apiConfig.playlist.baseUrl}${apiConfig.playlist.removeSong(this.playlistId, song.id)}`
							const response = await request(url, 'DELETE')
							
							if (response.code === 200) {
								// 从本地数组移除
								this.songs.splice(index, 1)
								this.totalSongs--
								
								uni.showToast({
									title: '已移除',
									icon: 'success'
								})
							} else {
								throw new Error(response.message || '移除失败')
							}
						} catch (error) {
							console.error('移除歌曲失败：', error)
							uni.showToast({
								title: error.message || '移除歌曲失败',
								icon: 'none'
							})
						}
					}
				}
			})
		},
		
		// 处理播放列表数据更新事件
		handlePlaylistsUpdated(event) {
			console.log('收到播放列表更新事件:', event);
			// 重新加载播放列表详情
			this.getPlaylistDetail();
		},
		
		// 显示更多操作菜单
		showMore() {
			// 检查是否是用户创建的歌单
			this.checkIfUserCreated();
			this.$refs.moreOptionsPopup.open();
		},
		
		// 关闭更多操作菜单
		closeMoreOptions() {
			this.$refs.moreOptionsPopup.close();
		},
		
		// 检查是否为用户创建的歌单
		checkIfUserCreated() {
			// 用户创建的歌单通常有特定的ID前缀或标记
			// 或者可以通过检查歌单与用户的关联关系来判断
			const userInfo = uni.getStorageSync('userInfo');
			// 本地创建的歌单ID通常以local_开头
			this.isUserCreated = this.playlistInfo && this.playlistInfo.id && 
				(String(this.playlistInfo.id).startsWith('local_') || 
				(userInfo && userInfo.id && this.playlistInfo.creator === userInfo.nickname));
			
			console.log('是否为用户创建的歌单:', this.isUserCreated);
		},
		
		// 显示删除确认弹窗
		showDeleteConfirm() {
			this.closeMoreOptions();
			setTimeout(() => {
				this.$refs.deleteConfirmPopup.open();
			}, 300);
		},
		
		// 取消删除
		cancelDelete() {
			this.$refs.deleteConfirmPopup.close();
		},
		
		// 确认删除歌单
		async confirmDelete() {
			try {
				// 显示加载中
				uni.showLoading({
					title: '删除中...',
					mask: true
				});
				
				console.log(`正在删除歌单：ID=${this.playlistInfo.id}, 名称=${this.playlistInfo.name}`);
				
				// 从playlistCache.js导入永久删除函数
				const { permanentlyDeletePlaylist } = require('@/utils/playlistCache.js');
				
				// 获取用户信息
				const userInfo = uni.getStorageSync('userInfo');
				const userId = userInfo && userInfo.id ? userInfo.id : '';
				
				if (!userId) {
					uni.hideLoading();
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					this.$refs.deleteConfirmPopup.close();
					return;
				}
				
				// 调用永久删除函数
				const result = await permanentlyDeletePlaylist(this.playlistInfo.id, userId);
				
				uni.hideLoading();
				
				if (result.success) {
					// 显示适当的成功消息
					uni.showToast({
						title: result.message || '删除成功',
						icon: 'success'
					});
					
					// 关闭确认弹窗
					this.$refs.deleteConfirmPopup.close();
					
					// 返回上一页
					setTimeout(() => {
						uni.navigateBack();
					}, 1500);
				} else {
					// 删除失败
					uni.showToast({
						title: result.message || '删除失败，请重试',
						icon: 'none'
					});
					this.$refs.deleteConfirmPopup.close();
				}
			} catch (error) {
				uni.hideLoading();
				console.error('删除歌单失败：', error);
				uni.showToast({
					title: '删除失败，请重试',
					icon: 'none'
				});
				this.$refs.deleteConfirmPopup.close();
			}
		},
		
		// 切换收藏状态
		async toggleFavorite() {
			// 已有的收藏/取消收藏歌单逻辑
			// ... existing code ...
			this.closeMoreOptions();
		},
		
		// 分享歌单
		sharePlaylist() {
			uni.showToast({
				title: '分享功能开发中',
				icon: 'none'
			});
			this.closeMoreOptions();
		},
	}
}
</script>

<style lang="scss">
	// 首先导入基础样式
	@import '@/scss/playlist.scss';
	
	// 重写container样式，使用flex布局
	.container {
		display: flex !important;
		flex-direction: column !important;
		height: 100vh !important; 
		min-height: 100vh !important;
		overflow: hidden !important;
	}
	
	/* 歌单头部信息固定高度 */
	.playlist-header {
		flex-shrink: 0 !important;
	}
	
	/* 歌曲数量信息 */
	.song-count-info {
		padding: 20rpx 30rpx;
		font-size: 26rpx;
		color: #666;
		background: #f5f5f5;
		border-radius: 10rpx;
		margin: 0 20rpx 20rpx;
		flex-shrink: 0 !important;
		
		.add-song-btn {
			display: flex;
			width:100rpx;
			align-items: center;
			font-size: 24rpx;
			color: #007AFF;
			
			.icon-add {
				margin-right: 4rpx;
			}
		}
	}
	
	/* 歌曲列表容器 */
	.song-list-scroll {
		flex: 1 !important;
		height: 0 !important; /* 关键: 结合flex:1使其能正确扩展 */
		overflow-y: auto !important;
	}
	
	/* 歌曲列表样式覆盖 */
	.song-list {
		margin-top: 0 !important; /* 覆盖原来的margin-top */
		
		.song-item {
			.song-info {
				.name {
					color: #333 !important;
					font-size: 30rpx !important;
					margin-bottom: 10rpx !important;
					display: block !important;
					width: 100% !important;
					white-space: nowrap !important;
					overflow: hidden !important;
					text-overflow: ellipsis !important;
				}
				
				.artist {
					color: #999 !important;
					font-size: 24rpx !important;
					display: block !important;
					width: 100% !important;
					white-space: nowrap !important;
					overflow: hidden !important;
					text-overflow: ellipsis !important;
				}
			}
		}
	}
	
	/* 加载状态提示样式 */
	.loading-status {
		padding: 20rpx 0;
		text-align: center;
		color: #888;
		font-size: 26rpx;
	}
	
	/* 完整介绍弹窗样式调整 */
	.description-popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}
	
	/* 骨架屏样式 */
	.loading-skeleton {
		padding: 0 30rpx;
	}
	
	.skeleton-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.skeleton-index {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
		background-color: #f0f0f0;
		border-radius: 50%;
	}
	
	.skeleton-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	
	.skeleton-name {
		width: 70%;
		height: 40rpx;
		background-color: #f0f0f0;
		border-radius: 4rpx;
		margin-bottom: 10rpx;
	}
	
	.skeleton-artist {
		width: 50%;
		height: 30rpx;
		background-color: #f0f0f0;
		border-radius: 4rpx;
	}
	
	.skeleton-actions {
		width: 60rpx;
		height: 30rpx;
		background-color: #f0f0f0;
		border-radius: 4rpx;
	}
	
	.loading-more {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.loading-spinner {
		width: 30rpx;
		height: 30rpx;
		border: 3rpx solid #f3f3f3;
		border-top: 3rpx solid #3498db;
		border-radius: 50%;
		margin-right: 10rpx;
		animation: spin 1s linear infinite;
	}
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	@keyframes pulse {
		0% { opacity: 0.6; }
		50% { opacity: 1; }
		100% { opacity: 0.6; }
	}
	
	.skeleton-name, .skeleton-artist, .skeleton-index, .skeleton-actions {
		animation: pulse 1.5s infinite ease-in-out;
	}
	
	/* 底部占位，确保最后一项可以完全滚动到顶部 */
	.bottom-placeholder {
		height: 100rpx;
	}
	
	/* 新增：更多操作菜单样式 */
	.options-menu {
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		padding: 30rpx 0;
	}
	
	.option-item {
		display: flex;
		align-items: center;
		height: 100rpx;
		padding: 0 40rpx;
	}
	
	.option-icon {
		font-size: 44rpx;
		color: #333;
		margin-right: 30rpx;
	}
	
	.option-text {
		font-size: 32rpx;
		color: #333;
	}
	
	.delete-option {
		border-top: 1px solid #eee;
		margin-top: 20rpx;
		padding-top: 20rpx;
	}
	
	.delete-option .option-icon, 
	.delete-option .option-text {
		color: #ff3b30;
	}
	
	/* 删除确认弹窗样式 */
	.popup-content {
		width: 600rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 40rpx;
	}
	
	.popup-title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 30rpx;
	}
	
	.popup-message {
		font-size: 30rpx;
		color: #333;
		text-align: center;
		margin-bottom: 40rpx;
	}
	
	.popup-buttons {
		display: flex;
		justify-content: space-between;
	}
	
	.popup-buttons button {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		margin: 0 10rpx;
	}
	
	.cancel-btn {
		background-color: #f5f5f5;
		color: #333;
	}
	
	.confirm-btn {
		background-color: #007AFF;
		color: #fff;
	}
	
	.delete-confirm-btn {
		background-color: #ff3b30;
	}
</style> 
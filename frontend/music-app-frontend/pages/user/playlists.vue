<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<text class="iconfont icon-back" @click="goBack"></text>
			<text class="title">我的播放列表</text>
		</view>
		
		<!-- 个性歌单入口 -->
		<view class="personalized-entry" @click="goToPersonalPlaylist">
			<image class="entry-img" src="/static/personalized-playlist.png" mode="aspectFill"></image>
			<view class="entry-content">
				<text class="entry-title">个性歌单</text>
				<text class="entry-desc">根据您的音乐喜好，定制专属歌单</text>
			</view>
			<text class="iconfont icon-right"></text>
		</view>
		
		<!-- 播放列表 -->
		<view class="playlist-list" v-if="playlists.length > 0">
			<view class="playlist-item" v-for="(item, index) in playlists" :key="item.id">
				<image class="playlist-cover" :src="item.cover || '/static/music-cover.png'" mode="aspectFill" @click="updatePlaylistCover(item)"></image>
				<view class="playlist-info" @click="viewPlaylist(item)">
					<text class="playlist-name">{{item.name+'  '}} </text>
					<text class="playlist-count"> 共{{item.songCount || (item.songs ? item.songs.length : 0)}}首歌曲</text>
				</view>
				<view class="playlist-actions">
					<text class="iconfont icon-add action-btn" @click.stop="openAddSongPopup(item)">加</text>
					<text class="iconfont icon-delete action-btn" @click.stop="deletePlaylist(item)">删</text>
					<text class="iconfont icon-right action-btn" @click.stop="viewPlaylist(item)"></text>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-else>
			<image src="/static/empty.png" mode="aspectFit"></image>
			<text>暂无播放列表</text>
		</view>
		
		<!-- 创建播放列表按钮 -->
		<view class="create-btn" @click="createPlaylist">
			<text class="iconfont icon-add"></text>
			<text>创建新播放列表</text>
		</view>
		
		<!-- 创建播放列表弹窗 -->
		<uni-popup ref="createPlaylistPopup" type="center">
			<view class="popup-content">
				<view class="popup-title">创建播放列表</view>
				<input 
					class="playlist-name-input" 
					placeholder="请输入播放列表名称" 
					v-model="newPlaylistName"
					maxlength="20"
				/>
				<textarea 
					class="playlist-desc-input" 
					placeholder="添加描述（选填）" 
					v-model="newPlaylistDesc"
					maxlength="200"
				/>
				<view class="popup-buttons">
					<button @click="cancelCreate" class="cancel-btn">取消</button>
					<button @click="confirmCreate" class="confirm-btn" :disabled="!newPlaylistName">确定</button>
				</view>
			</view>
		</uni-popup>
		
		<!-- 删除播放列表确认弹窗 -->
		<uni-popup ref="deleteConfirmPopup" type="center">
			<view class="popup-content">
				<view class="popup-title">删除播放列表</view>
				<view class="popup-message">确定要删除"{{playlistToDelete.name}}"吗？此操作不可撤销。</view>
				<view class="popup-buttons">
					<button @click="cancelDelete" class="cancel-btn">取消</button>
					<button @click="confirmDelete" class="confirm-btn delete-confirm-btn">删除</button>
				</view>
			</view>
		</uni-popup>
		
		<!-- 新增：添加歌曲弹窗 -->
		<uni-popup ref="addSongPopup" type="center">
			<view class="popup-content song-popup">
				<view class="popup-header">
					<text class="popup-title">添加歌曲到歌单</text>
					<text class="popup-subtitle">{{selectedPlaylist.name}}</text>
				</view>
				<view class="search-box">
					<input 
						class="search-input" 
						placeholder="输入歌曲名或歌手名" 
						v-model="searchText"
						:focus="true"
						confirm-type="search"
						@confirm="searchSongs"
					/>
					<view class="search-btn-container">
						<button @click="searchSongs" class="search-btn" :disabled="isSearching">
							<text v-if="isSearching" class="loading-text">搜索中...</text>
							<text v-else>搜索</text>
						</button>
					</view>
				</view>
				
				<!-- 搜索结果 -->
				<view v-if="searchResults.length > 0">
					<view class="search-tip">
						<text class="iconfont icon-info"></text>
						<text>点击右侧<text style="color:#007AFF;font-weight:bold;">加号按钮</text>可将歌曲添加到歌单</text>
					</view>
					<scroll-view 
						class="search-results" 
						scroll-y="true"
					>
						<view 
							class="result-item" 
							v-for="(song, index) in searchResults" 
							:key="song.id"
							:class="{'adding': song.isAdding}"
						>
							<view class="song-info">
								<text class="song-name">{{song.name}}</text>
								<text class="song-artist">{{song.artist}}</text>
							</view>
							<view class="song-action">
								<text v-if="song.isAdding" class="adding-text">添加中</text>
								<text v-else class="iconfont icon-add" @click="addSongToPlaylist(song)">+</text>
							</view>
						</view>
					</scroll-view>
				</view>
				
				<!-- 搜索为空状态 -->
				<view class="empty-search" v-else-if="hasSearched && !isSearching">
					<text>未找到相关歌曲</text>
				</view>
				
				<!-- 底部按钮 -->
				<view class="popup-buttons">
					<button @click="closeAddSongPopup" class="cancel-btn">关闭</button>
					<button @click="viewSelectedPlaylist" class="confirm-btn">查看歌单</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { checkLoginStatus } from '@/utils/auth.js'
import apiConfig from '@/utils/apiConfig.js'
import request from '@/utils/request.js'

export default {
	data() {
		return {
			playlists: [],
			loading: false,
			newPlaylistName: '',
			newPlaylistDesc: '',
			playlistToDelete: {},
			newPlaylistId: null,
			showAddSongPopup: false,
			searchText: '',
			searchResults: [],
			isSearching: false,
			hasSearched: false,
			selectedPlaylist: {},
			addingToPlaylist: false
		}
	},
	onShow() {
		// 检查登录状态
		if (!checkLoginStatus()) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
			return
		}
		
		// 获取用户播放列表
		this.getUserPlaylists()
	},
	methods: {
		// 获取用户播放列表
		async getUserPlaylists() {
			try {
				this.loading = true
				const userInfo = uni.getStorageSync('userInfo')
				
				// 先尝试从本地存储获取歌单列表
				let localPlaylists = [];
				try {
					const storedPlaylists = uni.getStorageSync('playlists');
					if (storedPlaylists && Array.isArray(storedPlaylists)) {
						localPlaylists = storedPlaylists;
						console.log('从本地存储加载了歌单:', localPlaylists.length);
					}
				} catch (e) {
					console.warn('读取本地歌单失败:', e);
				}
				
				// 如果没有用户信息，则只使用本地数据
				if (!userInfo || !userInfo.id) {
					console.warn('用户未登录，仅使用本地数据');
					this.playlists = localPlaylists;
					return;
				}
				
				// 尝试从后端获取数据
				try {
					const userId = userInfo.id
					const url = `${apiConfig.playlist.baseUrl}${apiConfig.playlist.list(userId)}`
					
					// 请求用户播放列表
					const response = await request(url, 'GET')
					
					if (response.code === 200) {
						this.playlists = response.data || []
						console.log('从后端获取歌单成功:', this.playlists.length);
						
						// 更新本地存储
						this.syncLocalPlaylists()
					} else {
						console.warn('后端返回的歌单数据异常:', response);
						this.playlists = localPlaylists;
					}
				} catch (apiError) {
					console.warn('从后端获取歌单失败，使用本地数据:', apiError.message);
					this.playlists = localPlaylists;
					
					// 显示友好提示
					uni.showToast({
						title: '无法连接到服务器，使用本地数据',
						icon: 'none',
						duration: 2000
					});
				}
			} catch (error) {
				console.error('获取用户播放列表完全失败：', error)
				uni.showToast({
					title: '加载歌单失败',
					icon: 'none'
				})
				
				// 确保playlists不是undefined
				this.playlists = this.playlists || [];
			} finally {
				this.loading = false
			}
		},
		
		// 查看播放列表详情
		viewPlaylist(playlist) {
			// 优先使用playlist_id字段，如果不存在则使用id
			const playlistId = playlist.playlist_id || playlist.id;
			uni.navigateTo({
				url: `/pages/playlist/playlist?id=${playlistId}&name=${encodeURIComponent(playlist.name)}&type=user`
			})
		},
		
		// 打开创建播放列表弹窗
		createPlaylist() {
			this.newPlaylistName = ''
			this.newPlaylistDesc = ''
			this.$refs.createPlaylistPopup.open()
		},
		
		// 取消创建
		cancelCreate() {
			this.$refs.createPlaylistPopup.close()
		},
		
		// 确认创建播放列表
		async confirmCreate() {
			if (!this.newPlaylistName.trim()) {
				uni.showToast({
					title: '请输入播放列表名称',
					icon: 'none'
				})
				return
			}
			
			// 显示加载状态
			uni.showLoading({
				title: '创建中...'
			});
			
			try {
				const userInfo = uni.getStorageSync('userInfo')
				
				// 创建播放列表数据
				const playlistData = {
					name: this.newPlaylistName.trim(),
					description: this.newPlaylistDesc.trim(),
					cover: '/static/music-cover.png',
					songs: []
				}
				
				// 生成本地临时ID (当前时间戳)
				let newPlaylistId = `local_${Date.now()}`;
				
				// 尝试通过API创建
				if (userInfo && userInfo.id) {
					try {
						const userId = userInfo.id
						const url = `${apiConfig.playlist.baseUrl}${apiConfig.playlist.create(userId)}`
						
						// 请求创建播放列表
						const response = await request(url, 'POST', playlistData)
						
						if (response.code === 200) {
							// 使用返回的ID替换临时ID
							newPlaylistId = response.data.id || response.data;
							console.log('后端成功创建歌单:', newPlaylistId);
						} else {
							console.warn('后端创建歌单返回异常状态:', response);
						}
					} catch (apiError) {
						console.warn('通过API创建歌单失败，将使用本地ID:', apiError.message);
					}
				} else {
					console.warn('用户未登录，使用本地ID创建歌单');
				}
				
				// 记录新创建的歌单ID
				this.newPlaylistId = newPlaylistId;
				
				// 添加到本地数组
				const newPlaylist = {
					id: newPlaylistId,
					name: playlistData.name,
					description: playlistData.description,
					cover: playlistData.cover,
					songs: [],
					songCount: 0,
					createdAt: new Date().toISOString()
				}
				
				this.playlists.unshift(newPlaylist)
				
				// 更新本地存储
				this.syncLocalPlaylists()
				
				uni.hideLoading();
				uni.showToast({
					title: '创建成功',
					icon: 'success'
				})
				
				// 关闭创建弹窗
				this.$refs.createPlaylistPopup.close()
				
				// 提示用户可以添加歌曲
				setTimeout(() => {
					uni.showToast({
						title: '点击"+"添加歌曲',
						icon: 'none',
						duration: 2000
					})
				}, 1500)
			} catch (error) {
				uni.hideLoading();
				console.error('创建播放列表完全失败：', error)
				uni.showToast({
					title: '创建失败，请重试',
					icon: 'none'
				})
			}
		},
		
		// 打开删除确认弹窗
		deletePlaylist(playlist) {
			this.playlistToDelete = playlist
			this.$refs.deleteConfirmPopup.open()
		},
		
		// 取消删除
		cancelDelete() {
			this.$refs.deleteConfirmPopup.close()
			this.playlistToDelete = {}
		},
		
		// 确认删除播放列表
		async confirmDelete() {
			try {
				// 显示加载中
				uni.showLoading({
					title: '删除中...',
					mask: true
				});
				
				console.log(`正在删除歌单：ID=${this.playlistToDelete.id}, 名称=${this.playlistToDelete.name}`);
				
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
					return;
				}
				
				// 调用永久删除函数
				const result = await permanentlyDeletePlaylist(this.playlistToDelete.id, userId);
				
				uni.hideLoading();
				
				if (result.success) {
					// 如果删除成功，无论是完全成功还是部分成功，从本地数组中移除
					this.playlists = this.playlists.filter(item => item.id !== this.playlistToDelete.id);
					
					// 显示适当的成功消息
					uni.showToast({
						title: result.message || '删除成功',
						icon: 'success'
					});
				} else {
					// 删除失败
					uni.showToast({
						title: result.message || '删除失败，请重试',
						icon: 'none'
					});
				}
			} catch (error) {
				uni.hideLoading();
				console.error('删除播放列表完全失败：', error);
				uni.showToast({
					title: '删除失败，请重试',
					icon: 'none'
				});
			} finally {
				// 关闭弹窗
				this.$refs.deleteConfirmPopup.close();
				this.playlistToDelete = {};
			}
		},
		
		// 前往个性歌单页面
		goToPersonalPlaylist() {
			uni.navigateTo({
				url: '/pages/user/personal_playlist'
			})
		},
		
		// 返回上一页
		goBack() {
			uni.navigateBack()
		},
		
		// 打开添加歌曲弹窗
		openAddSongPopup(playlist) {
			this.selectedPlaylist = playlist;
			this.searchText = '';
			this.searchResults = [];
			this.hasSearched = false;
			this.$refs.addSongPopup.open();
		},
		
		// 新增：搜索歌曲
		async searchSongs() {
			if (!this.searchText.trim()) {
				uni.showToast({
					title: '请输入搜索关键词',
					icon: 'none'
				})
				return
			}
			
			this.isSearching = true;
			this.hasSearched = true;
			
			try {
				// 使用已有的搜索API
				const { searchMusic } = require('@/utils/musicData.js')
				const results = await searchMusic(this.searchText.trim(), {
					type: 1, // 搜索单曲
					limit: 20,
					offset: 0
				})
				
				// 处理结果
				if (results && results.songs && Array.isArray(results.songs)) {
					this.searchResults = results.songs
				} else if (results && results.result && results.result.songs) {
					// 兼容旧版API返回格式
					this.searchResults = results.result.songs.map(song => ({
						id: song.id,
						name: song.name,
						artist: song.artists ? song.artists.map(a => a.name).join('/') : '未知歌手',
						album: song.album ? song.album.name : '未知专辑',
						cover: song.album && song.album.picUrl ? song.album.picUrl : '/static/music-cover.png',
						duration: song.duration || 0
					}))
				} else {
					this.searchResults = []
				}
				
				console.log('搜索结果:', this.searchResults)
				
				if (this.searchResults.length === 0) {
					uni.showToast({
						title: '未找到相关歌曲',
						icon: 'none'
					})
				}
			} catch (error) {
				console.error('搜索歌曲失败：', error)
				uni.showToast({
					title: '搜索失败，请重试',
					icon: 'none'
				})
			} finally {
				this.isSearching = false
			}
		},
		
		// 新增：添加歌曲到歌单
		async addSongToPlaylist(song) {
			if (!this.selectedPlaylist.id) {
				uni.showToast({
					title: '歌单ID无效',
					icon: 'none'
				})
				return
			}
			
			if (this.addingToPlaylist) return;
			
			// 设置歌曲的添加中状态
			this.$set(song, 'isAdding', true);
			this.addingToPlaylist = true;
			
			try {
				// 导入播放列表缓存工具
				const { addSongsToPlaylist } = require('@/utils/playlistCache.js');
				const userInfo = uni.getStorageSync('userInfo');
				const userId = userInfo && userInfo.id ? userInfo.id : '';
				
				// 确保所有必要的字段都存在 - 增强版本，支持多种字段命名方式
				const songData = {
					// 支持多种ID字段名
					id: song.id || song.song_id || song.songId || song.netease_id || song.neteaseId || `local_${Date.now()}`,
					// 支持多种名称字段名
					name: song.name || song.song_name || song.songName || song.title || '未知歌曲',
					// 支持多种艺术家字段名
					artist: song.artist || song.singer || song.artistName || song.artists || '未知歌手',
					// 支持多种专辑字段名
					album: song.album || song.albumName || '未知专辑',
					duration: song.duration || 0,
					// 支持多种封面图字段名
					cover: song.cover || song.coverUrl || song.cover_url || song.pic || song.picUrl || '/static/music-cover.png',
					// 确保设置URL
					url: song.url || song.mp3Url || song.mp3_url || `https://music.163.com/song/media/outer/url?id=${song.id || song.song_id || song.songId || song.netease_id || song.neteaseId}.mp3`
				};
				
				console.log('处理后的歌曲数据:', songData);
				
				// 先更新本地缓存
				const localSuccess = addSongsToPlaylist(this.selectedPlaylist.id, songData, userId);
				
				if (localSuccess) {
					console.log('本地缓存更新成功，现在同步到服务器');
					
					// 更新当前视图中的数据
					const playlist = this.playlists.find(p => p.id === this.selectedPlaylist.id);
					if (playlist) {
						if (!playlist.songs) playlist.songs = [];
						// 避免重复添加
						if (!playlist.songs.some(s => s.id === songData.id)) {
							playlist.songs.push(songData);
						}
						playlist.songCount = playlist.songs.length;
					}
				}
				
				// 构建请求URL和数据
				const baseUrl = apiConfig.playlist.baseUrl;
				const endpoint = apiConfig.playlist.addSong(this.selectedPlaylist.id);
				const url = `${baseUrl}${endpoint}`;
				
				// 包装成后端期望的格式
				const requestData = {
					songs: [songData]
				};
				
				console.log('添加歌曲数据:', JSON.stringify(requestData));
				
				// 请求添加歌曲
				const response = await request(url, 'POST', requestData);
				
				if (response.code === 200) {
					// 如果本地缓存更新失败但服务器成功，再次更新本地缓存
					if (!localSuccess) {
						// 再次尝试更新本地缓存
						addSongsToPlaylist(this.selectedPlaylist.id, songData, userId);
						
						// 更新当前视图中的数据
						const playlist = this.playlists.find(p => p.id === this.selectedPlaylist.id);
						if (playlist) {
							if (!playlist.songs) playlist.songs = [];
							// 避免重复添加
							if (!playlist.songs.some(s => s.id === songData.id)) {
								playlist.songs.push(songData);
							}
							playlist.songCount = playlist.songs.length;
						}
					}
					
					uni.showToast({
						title: '添加成功',
						icon: 'success'
					});
					
					// 清除搜索结果中的已添加歌曲
					this.searchResults = this.searchResults.filter(s => s.id !== song.id);
				} else if (localSuccess) {
					// 即使服务器端失败，只要本地缓存更新成功，也显示成功
					uni.showToast({
						title: '已添加到本地歌单',
						icon: 'success'
					});
					
					// 清除搜索结果中的已添加歌曲
					this.searchResults = this.searchResults.filter(s => s.id !== song.id);
				} else {
					throw new Error(response.message || '添加歌曲失败');
				}
			} catch (error) {
				console.error('添加歌曲失败：', error);
				uni.showToast({
					title: error.message || '添加歌曲失败',
					icon: 'none'
				});
			} finally {
				this.addingToPlaylist = false;
				// 如果还在结果列表中，取消添加中状态
				const songInList = this.searchResults.find(s => s.id === song.id);
				if (songInList) {
					this.$set(songInList, 'isAdding', false);
				}
			}
		},
		
		// 关闭添加歌曲弹窗
		closeAddSongPopup() {
			this.$refs.addSongPopup.close()
			setTimeout(() => {
				this.searchText = ''
				this.searchResults = []
				this.hasSearched = false
				this.selectedPlaylist = {}
			}, 300)
		},
		
		// 查看选中的歌单
		viewSelectedPlaylist() {
			if (this.selectedPlaylist.id) {
				this.viewPlaylist(this.selectedPlaylist)
			}
			this.closeAddSongPopup()
		},
		
		// 同步本地播放列表数据
		syncLocalPlaylists() {
			try {
				// 导入播放列表缓存工具
				const { savePlaylists } = require('@/utils/playlistCache.js');
				
				// 获取用户ID
				const userInfo = uni.getStorageSync('userInfo');
				const userId = userInfo && userInfo.id ? userInfo.id : '';
				
				// 使用缓存工具保存播放列表，确保所有歌曲都有URL
				const success = savePlaylists(this.playlists, userId);
				
				if (success) {
					console.log('使用playlistCache工具成功同步本地歌单数据:', this.playlists.length);
				} else {
					console.warn('使用playlistCache工具同步失败，尝试直接保存');
					
					// 直接保存到本地存储（旧方法）
					uni.setStorageSync('playlists', this.playlists);
					console.log('已同步本地歌单数据:', this.playlists.length);
				}
			} catch (error) {
				console.error('同步本地歌单数据失败:', error);
				
				// 错误后的恢复措施，直接保存
				try {
					uni.setStorageSync('playlists', this.playlists);
				} catch (e) {
					console.error('恢复措施也失败:', e);
				}
			}
		},
		
		// 更新歌单封面
		async updatePlaylistCover(playlist) {
			try {
				// 选择图片
				const result = await uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera']
				});
				
				if (!result.tempFilePaths || result.tempFilePaths.length === 0) {
					throw new Error('未选择图片');
				}
				
				// 显示加载提示
				uni.showLoading({
					title: '处理中...',
					mask: true
				});
				
				// 将图片转换为base64
				const base64 = await this.imageToBase64(result.tempFilePaths[0]);
				
				// 更新本地数据
				const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
				if (playlistIndex !== -1) {
					this.playlists[playlistIndex].cover = base64;
				}
				
				// 获取用户信息
				const userInfo = uni.getStorageSync('userInfo');
				const userId = userInfo && userInfo.id ? userInfo.id : '';
				
				if (userId) {
					// 调用后端API更新封面
					const url = `${apiConfig.playlist.baseUrl}${apiConfig.playlist.update(playlist.id)}`;
					const response = await request(url, 'PUT', {
						...playlist,
						cover: base64
					});
					
					if (response.code !== 200) {
						throw new Error(response.message || '更新封面失败');
					}
				}
				
				// 更新本地存储
				this.syncLocalPlaylists();
				
				uni.hideLoading();
				uni.showToast({
					title: '更新成功',
					icon: 'success'
				});
			} catch (error) {
				uni.hideLoading();
				console.error('更新歌单封面失败：', error);
				uni.showToast({
					title: error.message || '更新失败',
					icon: 'none'
				});
			}
		},
		
		// 图片转base64
		imageToBase64(filePath) {
			return new Promise((resolve, reject) => {
				// #ifdef H5
				// H5环境下使用canvas转换
				const img = new Image();
				img.crossOrigin = 'anonymous';
				img.onload = () => {
					const canvas = document.createElement('canvas');
					canvas.width = img.width;
					canvas.height = img.height;
					const ctx = canvas.getContext('2d');
					ctx.drawImage(img, 0, 0);
					try {
						const base64 = canvas.toDataURL('image/jpeg', 0.8);
						resolve(base64);
					} catch (e) {
						reject(new Error('图片转换失败'));
					}
				};
				img.onerror = () => {
					reject(new Error('图片加载失败'));
				};
				img.src = filePath;
				// #endif

				// #ifdef APP-PLUS
				// App环境下使用plus API
				plus.io.resolveLocalFileSystemURL(filePath, (entry) => {
					entry.file((file) => {
						const reader = new plus.io.FileReader();
						reader.onloadend = (e) => {
							const base64 = e.target.result;
							resolve(base64);
						};
						reader.onerror = (e) => {
							reject(new Error('图片读取失败'));
						};
						reader.readAsDataURL(file);
					}, (error) => {
						reject(new Error('文件读取失败'));
					});
				}, (error) => {
					reject(new Error('文件路径解析失败'));
				});
				// #endif

				// #ifdef MP
				// 小程序环境下使用uni.getFileSystemManager
				const fs = uni.getFileSystemManager();
				fs.readFile({
					filePath: filePath,
					encoding: 'base64',
					success: res => {
						const ext = filePath.split('.').pop().toLowerCase();
						const base64 = `data:image/${ext};base64,${res.data}`;
						resolve(base64);
					},
					fail: err => {
						reject(new Error('图片转换失败'));
					}
				});
				// #endif
			});
		}
	}
}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.nav-bar {
	display: flex;
	align-items: center;
	height: 88rpx;
	padding: 0 30rpx;
	background-color: #fff;
	position: sticky;
	top: 0;
	z-index: 100;
	
	.icon-back {
		font-size: 36rpx;
		color: #333;
	}
	
	.title {
		flex: 1;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}
}

.personalized-entry {
	display: flex;
	align-items: center;
	background-color: #fff;
	padding: 30rpx;
	margin: 20rpx 0;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.entry-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 12rpx;
		margin-right: 20rpx;
		background: linear-gradient(135deg, #8e71c7, #61a0e4);
	}
	
	.entry-content {
		flex: 1;
		
		.entry-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 10rpx;
			display: block;
		}
		
		.entry-desc {
			font-size: 26rpx;
			color: #999;
			display: block;
		}
	}
	
	.icon-right {
		font-size: 32rpx;
		color: #999;
	}
}

.playlist-list {
	background-color: #fff;
	
	.playlist-item {
		display: flex;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #f5f5f5;
		
		&:last-child {
			border-bottom: none;
		}
		
		.playlist-cover {
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
			position: relative;
			
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, 0.3);
				border-radius: 10rpx;
				opacity: 0;
				transition: opacity 0.3s;
			}
			
			&:active::after {
				opacity: 1;
			}
		}
		
		.playlist-info {
			flex: 1;
			
			.playlist-name {
				font-size: 30rpx;
				color: #333;
				margin-bottom: 10rpx;
			}
			
			.playlist-count {
				font-size: 24rpx;
				color: #999;
			}
		}
		
		.playlist-actions {
			display: flex;
			align-items: center;
			
			.action-btn {
				margin: 0 12rpx;
				font-size: 36rpx;
			}
			
			.icon-add {
				display: inline-flex;
				justify-content: center;
				align-items: center;
				width: 64rpx;
				height: 64rpx;
				font-size: 38rpx;
				color: #ffffff;
				background-color: #007AFF;
				border-radius: 50%;
				box-shadow: 0 4rpx 10rpx rgba(0, 122, 255, 0.3);
				margin-right: 16rpx;
			}
			
			.icon-delete {
				color: #ff3b30;
			}
			
			.icon-right {
				color: #999;
			}
		}
	}
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 100rpx 0;
	
	image {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 30rpx;
	}
	
	text {
		font-size: 28rpx;
		color: #999;
	}
}

.create-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 40rpx 30rpx;
	height: 88rpx;
	background-color: #fff;
	border-radius: 44rpx;
	
	.icon-add {
		font-size: 32rpx;
		color: #007AFF;
		margin-right: 10rpx;
	}
	
	text {
		font-size: 28rpx;
		color: #007AFF;
	}
}

.popup-content {
	width: 600rpx;
	background-color: #fff;
	border-radius: 16rpx;
	padding: 40rpx;
	
	&.song-popup {
		width: 700rpx;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
	}
	
	.popup-header {
		margin-bottom: 30rpx;
		
		.popup-title {
			font-size: 34rpx;
			font-weight: bold;
			text-align: center;
			display: block;
		}
		
		.popup-subtitle {
			font-size: 26rpx;
			color: #666;
			text-align: center;
			display: block;
			margin-top: 10rpx;
		}
	}
	
	.search-box {
		display: flex;
		margin-bottom: 20rpx;
		
		.search-input {
			flex: 1;
			height: 80rpx;
			border: 1px solid #ddd;
			border-radius: 8rpx;
			padding: 0 20rpx;
			font-size: 28rpx;
			margin-right: 10rpx;
		}
		
		.search-btn-container {
			width: 160rpx;
			
			.search-btn {
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				padding: 0;
				margin: 0;
				background-color: #007AFF;
				color: #fff;
				
				.loading-text {
					display: inline-block;
					position: relative;
				}
				
				.loading-text:after {
					content: '';
					animation: dots 1.5s infinite;
				}
				
				@keyframes dots {
					0% { content: ''; }
					25% { content: '.'; }
					50% { content: '..'; }
					75% { content: '...'; }
					100% { content: ''; }
				}
				
				&:disabled {
					background-color: #999;
				}
			}
		}
	}
	
	.search-results {
		flex: 1;
		max-height: 400rpx;
		overflow-y: auto;
		margin-bottom: 20rpx;
		
		.result-item {
			display: flex;
			align-items: center;
			padding: 24rpx 30rpx;
			border-bottom: 1rpx solid #f5f5f5;
			position: relative;
			
			&:last-child {
				border-bottom: none;
			}
			
			&.adding {
				background-color: rgba(0, 122, 255, 0.05);
			}
			
			.song-info {
				flex: 1;
				margin-right: 20rpx;
				
				.song-name {
					font-size: 30rpx;
					color: #333;
					margin-bottom: 8rpx;
					display: block;
					font-weight: 500;
				}
				
				.song-artist {
					font-size: 26rpx;
					color: #999;
					display: block;
				}
			}
			
			.song-action {
				width: 80rpx;
				text-align: center;
				
				.icon-add {
					display: inline-flex;
					justify-content: center;
					align-items: center;
					width: 70rpx;
					height: 70rpx;
					font-size: 40rpx;
					color: #ffffff;
					background-color: #007AFF;
					border-radius: 50%;
					box-shadow: 0 4rpx 10rpx rgba(0, 122, 255, 0.3);
					transition: all 0.2s;
					
					&:active {
						background-color: #0062cc;
						transform: scale(0.95);
					}
				}
				
				.adding-text {
					font-size: 26rpx;
					color: #007AFF;
					position: relative;
					font-weight: bold;
				}
				
				.adding-text:after {
					content: '';
					animation: dots 1.5s infinite;
				}
			}
		}
	}
	
	.empty-search {
		padding: 40rpx 0;
		text-align: center;
		color: #999;
		font-size: 28rpx;
	}
	
	.popup-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		
		button {
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			margin: 0 10rpx;
			
			&.cancel-btn {
				background-color: #f5f5f5;
				color: #333;
			}
			
			&.confirm-btn {
				background-color: #007AFF;
				color: #fff;
				
				&:disabled {
					background-color: #cccccc;
					color: #ffffff;
				}
			}
			
			&.delete-confirm-btn {
				background-color: #ff3b30;
			}
		}
	}
}

.search-tip {
	display: flex;
	align-items: center;
	background-color: #f0f7ff;
	padding: 18rpx 24rpx;
	border-radius: 8rpx;
	margin-bottom: 16rpx;
	border-left: 6rpx solid #007AFF;
	
	.icon-info {
		font-size: 32rpx;
		color: #007AFF;
		margin-right: 12rpx;
	}
	
	text {
		font-size: 26rpx;
		color: #333;
	}
}
</style> 
<template>
	<view class="search-container">
		<!-- 搜索框 -->
		<view class="search-bar">
			<view class="search-box">
				<u-icon name="search" size="36" color="#999"></u-icon>
				<input class="search-input" type="text" v-model="searchText" placeholder="搜索歌曲、歌手、专辑、歌词" 
					confirm-type="search" @confirm="handleSearch" @input="handleInput"/>
				<u-icon v-if="searchText" name="close" size="36" color="#999" @click="clearSearch"></u-icon>
			</view>
			<text class="cancel-btn" @click="goBack">取消</text>
		</view>
		
		<!-- 搜索历史 -->
		<view class="search-history" v-if="!searchText && searchHistory.length > 0">
			<view class="history-header">
				<text class="title">搜索历史</text>
				<u-icon name="trash" size="32" color="#999" @click="clearHistory"></u-icon>
			</view>
			<view class="history-list">
				<view class="history-item" v-for="(item, index) in searchHistory" :key="index" @click="useHistoryItem(item)">
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		
		<!-- 热门搜索词 -->
		<view class="hot-search" v-if="!searchText && hotSearch.length > 0">
			<view class="hot-header">
				<text class="title">热门搜索</text>
			</view>
			<view class="hot-list">
				<view class="hot-item" v-for="(item, index) in hotSearch" :key="index" @click="useHistoryItem(item)">
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		
		<!-- 搜索结果 -->
		<view class="search-results" v-if="searchText && hasSearched">
			<!-- 没有搜索结果 -->
			<view class="no-result" v-if="noResults">
				<text>暂无搜索结果</text>
			</view>
			
			<!-- 结果标签页 -->
			<view class="result-tabs" v-else>
				<view class="tab-header">
					<view class="tab-item" 
						v-for="(tab, index) in tabs" 
						:key="index" 
						:class="{'active': currentTab === index}"
						@click="switchTab(index)">
						<text>{{tab.name}}({{tab.count || 0}})</text>
					</view>
				</view>
				
				<!-- 歌曲列表 -->
				<scroll-view
					v-if="currentTab === 0"
					class="tab-content-scroll"
					scroll-y="true"
					@scrolltolower="loadMoreSongs"
					lower-threshold="50"
					enable-back-to-top
					scroll-anchoring
				>
					<view class="tab-content">
						<view class="song-item" v-for="(song, index) in searchResults.songs" :key="song.id+index">
							<view class="song-info" @tap.stop="handleSongTap(song)">
								<text class="song-name">{{song.name}}</text>
								<text class="song-artist">{{song.artist}}</text>
							</view>
							<view class="song-actions">
								<text v-if="fromPlaylist" class="add-icon" @tap.stop="addSongToPlaylist(song)">
									<text v-if="song.isAdding" class="loading-dots">添加中</text>
									<text v-else class="iconfont icon-add"></text>
								</text>
								<view @tap.stop="playSong(song)">
									<u-icon name="play-right" size="36" color="#999"></u-icon>
								</view>
							</view>
						</view>
						
						<!-- 加载状态提示 -->
						<view class="loading-status" v-if="searchResults.songs.length > 0">
							<view v-if="isLoadingMore.songs" class="loading-more">
								<view class="loading-spinner"></view>
								<text>正在加载更多歌曲...</text>
							</view>
							<text v-else-if="hasMore.songs">向下滑动加载更多</text>
							<text v-else>已加载全部歌曲</text>
						</view>
					</view>
				</scroll-view>
				
				<!-- 歌手列表 -->
				<scroll-view
					v-if="currentTab === 1"
					class="tab-content-scroll"
					scroll-y="true"
					@scrolltolower="loadMoreArtists"
					lower-threshold="50"
					enable-back-to-top
					scroll-anchoring
				>
					<view class="tab-content">
						<view class="artist-item" v-for="(artist, index) in searchResults.artists" :key="artist.id+index" @click="viewArtist(artist)">
						<image class="artist-avatar" :src="artist.avatar || '/static/music-cover.png'" mode="aspectFill"></image>
						<text class="artist-name">{{artist.name}}</text>
					</view>
						
						<!-- 加载状态提示 -->
						<view class="loading-status" v-if="searchResults.artists.length > 0">
							<text v-if="isLoadingMore.artists">正在加载更多歌手...</text>
							<text v-else-if="hasMore.artists">向下滑动加载更多</text>
							<text v-else>已加载全部歌手</text>
					</view>
				</view>
				</scroll-view>
				
				<!-- 专辑列表 -->
				<scroll-view
					v-if="currentTab === 2"
					class="tab-content-scroll"
					scroll-y="true"
					@scrolltolower="loadMoreAlbums"
					lower-threshold="50"
					enable-back-to-top
					scroll-anchoring
				>
					<view class="tab-content">
						<view class="album-item" v-for="(album, index) in searchResults.albums" :key="album.id+index" @click="viewAlbum(album)">
						<image class="album-cover" :src="album.cover || '/static/music-cover.png'" mode="aspectFill"></image>
						<view class="album-info">
							<text class="album-name">{{album.name}}</text>
							<text class="album-artist">{{album.artist}}</text>
						</view>
					</view>
						
						<!-- 加载状态提示 -->
						<view class="loading-status" v-if="searchResults.albums.length > 0">
							<text v-if="isLoadingMore.albums">正在加载更多专辑...</text>
							<text v-else-if="hasMore.albums">向下滑动加载更多</text>
							<text v-else>已加载全部专辑</text>
						</view>
					</view>
				</scroll-view>
				
				<!-- 歌词列表 -->
				<scroll-view
					v-if="currentTab === 3"
					class="tab-content-scroll"
					scroll-y="true"
					@scrolltolower="loadMoreLyrics"
					lower-threshold="50"
					enable-back-to-top
					scroll-anchoring
				>
					<view class="tab-content">
						<view class="lyrics-item" v-for="(item, index) in searchResults.lyrics" :key="item.id+index" @click="playSong(item)">
							<view class="lyrics-info">
								<text class="lyrics-content">{{item.lyrics || '暂无歌词'}}</text>
								<view class="lyrics-song-info">
									<text class="lyrics-song-name">{{item.name}}</text>
									<text class="lyrics-song-artist">- {{item.artist}}</text>
								</view>
							</view>
							<view>
								<u-icon name="play-right" size="36" color="#999"></u-icon>
							</view>
						</view>
						
						<!-- 加载状态提示 -->
						<view class="loading-status" v-if="searchResults.lyrics.length > 0">
							<text v-if="isLoadingMore.lyrics">正在加载更多歌词...</text>
							<text v-else-if="hasMore.lyrics">向下滑动加载更多</text>
							<text v-else>已加载全部歌词</text>
					</view>
				</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getMusicUrl, getMusicById, searchMusic, isInGuestMode, showGuestModeLimit } from '@/utils/musicData.js'
	import apiConfig from '@/utils/apiConfig.js'
	import request from '@/utils/request.js'
	
	export default {
		data() {
			return {
				searchText: '',
				searchHistory: [],
				hotSearch: ['周杰伦', '林俊杰', '薛之谦', '陈奕迅', '起风了', '热爱105°C的你'],
				hasSearched: false,
				isSearching: false,
				searchResults: {
					songs: [],
					artists: [],
					albums: [],
					lyrics: []
				},
				currentTab: 0,
				tabs: [
					{ name: '单曲', count: 0 },
					{ name: '歌手', count: 0 },
					{ name: '专辑', count: 0 },
					{ name: '歌词', count: 0 }
				],
				// 分页加载相关
				pageSize: 20, // 每页数量
				pageOffset: {
					songs: 0,
					artists: 0,
					albums: 0,
					lyrics: 0
				},
				hasMore: {
					songs: false,
					artists: false,
					albums: false,
					lyrics: false
				},
				isLoadingMore: {
					songs: false,
					artists: false,
					albums: false,
					lyrics: false
				},
				totalCount: {
					songs: 0,
					artists: 0,
					albums: 0,
					lyrics: 0
				},
				fromPlaylist: false,
				playlistId: '',
				addingToPlaylist: false
			}
		},
		computed: {
			noResults() {
				return this.hasSearched && 
					this.searchResults.songs.length === 0 && 
					this.searchResults.artists.length === 0 && 
					this.searchResults.albums.length === 0 &&
					this.searchResults.lyrics.length === 0
			}
		},
		onLoad(options) {
			// 检查是否为游客模式
			if (isInGuestMode()) {
				// 显示提示
				showGuestModeLimit('搜索音乐');
				// 返回上一页
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
				return;
			}
			
			// 加载搜索历史
			this.loadSearchHistory()
			
			// 检查是否从播放列表页面跳转过来
			if (options.from === 'playlist' && options.playlistId) {
				this.fromPlaylist = true
				this.playlistId = options.playlistId
				console.log('从播放列表页面跳转过来，播放列表ID：', this.playlistId)
			} else {
				this.fromPlaylist = false
				this.playlistId = ''
			}
			
			// 设置焦点
			this.$nextTick(() => {
				// 自动聚焦搜索框，延迟执行确保组件已加载
				setTimeout(() => {
					const inputEl = uni.createSelectorQuery().in(this).select('#searchInput')
					if (inputEl) {
						inputEl.boundingClientRect(data => {
							if (data) {
								uni.showKeyboard()
							}
						}).exec()
					}
				}, 300)
			})
		},
		methods: {
			// 加载搜索历史
			loadSearchHistory() {
				try {
					const history = uni.getStorageSync('searchHistory')
					if (history) {
						this.searchHistory = JSON.parse(history)
					}
				} catch (error) {
					console.error('加载搜索历史失败：', error)
				}
			},
			
			// 保存搜索历史
			saveSearchHistory(keyword) {
				try {
					// 如果已存在，先移除
					const index = this.searchHistory.indexOf(keyword)
					if (index > -1) {
						this.searchHistory.splice(index, 1)
					}
					
					// 添加到开头
					this.searchHistory.unshift(keyword)
					
					// 只保留10条历史记录
					if (this.searchHistory.length > 10) {
						this.searchHistory = this.searchHistory.slice(0, 10)
					}
					
					// 保存到本地存储
					uni.setStorageSync('searchHistory', JSON.stringify(this.searchHistory))
				} catch (error) {
					console.error('保存搜索历史失败：', error)
				}
			},
			
			// 清空搜索历史
			clearHistory() {
				uni.showModal({
					title: '提示',
					content: '确定要清空搜索历史吗？',
					success: (res) => {
						if (res.confirm) {
							this.searchHistory = []
							uni.setStorageSync('searchHistory', JSON.stringify([]))
						}
					}
				})
			},
			
			// 使用历史记录项
			useHistoryItem(keyword) {
				this.searchText = keyword
				this.handleSearch()
			},
			
			// 清空搜索框
			clearSearch() {
				this.searchText = ''
				this.hasSearched = false
			},
			
			// 处理输入事件
			handleInput(e) {
				// 可以在这里实现输入建议
				console.log('输入：', this.searchText)
			},
			
			// 处理搜索事件
			async handleSearch() {
				if (!this.searchText.trim()) return;
				
				// 检查是否为游客模式
				if (isInGuestMode()) {
					showGuestModeLimit('搜索音乐');
					return;
				}
				
				// 显示加载提示
				uni.showLoading({
					title: '搜索中...'
				});
				
				this.isSearching = true;
				this.hasSearched = true;
				
				// 重置分页和结果
				this.resetSearchState();
				
				try {
					// 将搜索关键词保存到历史记录
					this.saveSearchHistory(this.searchText.trim());
					
					console.log('开始搜索：', this.searchText.trim());
					
					// 并行加载各类型结果的第一页
					await Promise.all([
						this.searchByType(1), // 单曲
						this.searchByType(100), // 歌手
						this.searchByType(10), // 专辑
						this.searchByType(1006) // 歌词
					]);
					
					// 自动切换到有结果的标签页
					this.autoSwitchToTabWithResults();
					
				} catch (error) {
					console.error('搜索失败：', error);
					uni.showToast({
						title: '搜索失败，请重试',
						icon: 'none'
					});
				} finally {
					// 隐藏加载提示
					uni.hideLoading();
					this.isSearching = false;
				}
			},
			
			// 重置搜索状态
			resetSearchState() {
				this.searchResults = {
					songs: [],
					artists: [],
					albums: [],
					lyrics: []
				};
				
				this.pageOffset = {
					songs: 0,
					artists: 0,
					albums: 0,
					lyrics: 0
				};
				
				this.hasMore = {
					songs: false,
					artists: false,
					albums: false,
					lyrics: false
				};
				
				this.isLoadingMore = {
					songs: false,
					artists: false,
					albums: false,
					lyrics: false
				};
				
				this.totalCount = {
					songs: 0,
					artists: 0,
					albums: 0,
					lyrics: 0
				};
				
				// 重置标签数量
				this.tabs.forEach(tab => tab.count = 0);
			},
			
			// 根据类型搜索
			async searchByType(type) {
				try {
					// 确定搜索类型对应的结果类别
					const resultKey = this.getResultKeyByType(type);
					if (!resultKey) return;
					
					// 获取当前类型的偏移量
					const offset = this.pageOffset[resultKey];
					
					// 执行搜索
					const results = await searchMusic(this.searchText.trim(), {
						type: type,
						limit: this.pageSize,
						offset: offset
					});
					
					if (!results) {
						console.error(`搜索类型${type}返回结果为空`);
						return;
					}
					
					console.log(`搜索类型${type}返回结果:`, results);
					
					// 针对不同类型的结果进行处理
					let items = [];
					let total = 0;
					
					// 检查是否返回的是新API格式的结果
					if (results[resultKey] && Array.isArray(results[resultKey])) {
						// 新API格式，直接使用返回的结果
						items = results[resultKey];
						total = results.totalCount ? results.totalCount[resultKey] || 0 : 0;
					} else {
						// 旧API格式，根据不同类型获取结果和总数
						switch(type) {
							case 1: // 歌曲
								if (results.result && results.result.songs) {
									items = results.result.songs.map(song => ({
										id: song.id,
										name: song.name,
										artist: song.artists ? song.artists.map(a => a.name).join('/') : '未知歌手',
										album: song.album ? song.album.name : '未知专辑',
										cover: song.album && song.album.picUrl ? song.album.picUrl : '/static/music-cover.png',
										duration: song.duration || 0
									}));
									total = results.result.songCount || 0;
								}
								break;
							case 100: // 歌手
								if (results.result && results.result.artists) {
									items = results.result.artists.map(artist => ({
										id: artist.id,
										name: artist.name,
										avatar: artist.picUrl || '/static/music-cover.png'
									}));
									total = results.result.artistCount || 0;
								}
								break;
							case 10: // 专辑
								if (results.result && results.result.albums) {
									items = results.result.albums.map(album => ({
										id: album.id,
										name: album.name,
										artist: album.artist ? album.artist.name : '未知歌手',
										cover: album.picUrl || '/static/music-cover.png'
									}));
									total = results.result.albumCount || 0;
								}
								break;
							case 1006: // 歌词
								if (results.result && results.result.songs) {
									items = results.result.songs.map(song => ({
										id: song.id,
										name: song.name,
										artist: song.artists ? song.artists.map(a => a.name).join('/') : '未知歌手',
										lyrics: song.lyrics || song.snippet || '暂无歌词',
										album: song.album ? song.album.name : '未知专辑',
										cover: song.album && song.album.picUrl ? song.album.picUrl : '/static/music-cover.png'
									}));
									total = results.result.songCount || 0;
								}
								break;
						}
					}
					
					// 更新对应类型的结果
					if (offset === 0) {
						// 第一页，直接替换
						this.searchResults[resultKey] = items;
					} else {
						// 后续页，追加结果
						this.searchResults[resultKey] = [...this.searchResults[resultKey], ...items];
					}
					
					// 更新计数和分页状态
					this.totalCount[resultKey] = total;
					
					// 更新标签页显示的计数
					const tabIndex = this.getTabIndexByResultKey(resultKey);
					if (tabIndex >= 0) {
						this.tabs[tabIndex].count = this.totalCount[resultKey];
					}
					
					// 判断是否还有更多结果
					this.hasMore[resultKey] = this.searchResults[resultKey].length < this.totalCount[resultKey];
					
					// 更新偏移量
					this.pageOffset[resultKey] = this.searchResults[resultKey].length;
					
					console.log(`[${resultKey}] 已加载: ${this.searchResults[resultKey].length}, 总数: ${this.totalCount[resultKey]}, 还有更多: ${this.hasMore[resultKey]}`);
					
				} catch (error) {
					console.error(`搜索${type}类型失败:`, error);
				}
			},
			
			// 根据搜索类型获取结果键名
			getResultKeyByType(type) {
				switch (type) {
					case 1: return 'songs';
					case 100: return 'artists';
					case 10: return 'albums';
					case 1006: return 'lyrics';
					default: return null;
				}
			},
			
			// 根据结果键名获取标签页索引
			getTabIndexByResultKey(resultKey) {
				switch (resultKey) {
					case 'songs': return 0;
					case 'artists': return 1;
					case 'albums': return 2;
					case 'lyrics': return 3;
					default: return -1;
				}
			},
			
			// 自动切换到有结果的标签页
			autoSwitchToTabWithResults() {
				// 优先保持当前标签页，如果当前标签页有结果
				const currentKey = ['songs', 'artists', 'albums', 'lyrics'][this.currentTab];
				if (this.searchResults[currentKey] && this.searchResults[currentKey].length > 0) {
					return;
				}
				
				// 否则切换到第一个有结果的标签页
				if (this.searchResults.songs.length > 0) {
					this.currentTab = 0;
				} else if (this.searchResults.artists.length > 0) {
					this.currentTab = 1;
				} else if (this.searchResults.albums.length > 0) {
					this.currentTab = 2;
				} else if (this.searchResults.lyrics.length > 0) {
					this.currentTab = 3;
				}
			},
			
			// 加载更多歌曲
			async loadMoreSongs() {
				// 检查是否为游客模式
				if (isInGuestMode()) {
					showGuestModeLimit('搜索更多内容');
					return;
				}
				
				if (!this.hasMore.songs || this.isLoadingMore.songs) return;
				
				console.log('加载更多歌曲');
				this.isLoadingMore.songs = true;
				
				try {
					await this.searchByType(1);
				} finally {
					this.isLoadingMore.songs = false;
				}
			},
			
			// 加载更多歌手
			async loadMoreArtists() {
				// 检查是否为游客模式
				if (isInGuestMode()) {
					showGuestModeLimit('搜索更多内容');
					return;
				}
				
				if (!this.hasMore.artists || this.isLoadingMore.artists) return;
				
				console.log('加载更多歌手');
				this.isLoadingMore.artists = true;
				
				try {
					await this.searchByType(100);
				} finally {
					this.isLoadingMore.artists = false;
				}
			},
			
			// 加载更多专辑
			async loadMoreAlbums() {
				// 检查是否为游客模式
				if (isInGuestMode()) {
					showGuestModeLimit('搜索更多内容');
					return;
				}
				
				if (!this.hasMore.albums || this.isLoadingMore.albums) return;
				
				console.log('加载更多专辑');
				this.isLoadingMore.albums = true;
				
				try {
					await this.searchByType(10);
				} finally {
					this.isLoadingMore.albums = false;
				}
			},
			
			// 加载更多歌词
			async loadMoreLyrics() {
				// 检查是否为游客模式
				if (isInGuestMode()) {
					showGuestModeLimit('搜索更多内容');
					return;
				}
				
				if (!this.hasMore.lyrics || this.isLoadingMore.lyrics) return;
				
				console.log('加载更多歌词');
				this.isLoadingMore.lyrics = true;
				
				try {
					await this.searchByType(1006);
				} finally {
					this.isLoadingMore.lyrics = false;
				}
			},
			
			// 切换标签页
			switchTab(index) {
				this.currentTab = index
			},
			
			// 返回
			goBack() {
				uni.navigateBack()
			},
			
			// 播放歌曲
			async playSong(song) {
				// 检查是否为游客模式
				if (isInGuestMode()) {
					showGuestModeLimit('播放歌曲');
					return;
				}
				
				try {
					// 显示加载提示
					uni.showLoading({
						title: '加载中...'
					})
					
					// 构建完整的歌曲信息
					let fullSongInfo = song;
					
					// 如果是从歌词搜索结果播放的，可能需要补充一些字段
					if (this.currentTab === 3 && !song.duration) {
						try {
							// 尝试获取完整的歌曲信息
							const songDetail = await getMusicById(song.id);
							if (songDetail) {
								fullSongInfo = {
									...song,
									duration: songDetail.duration || 0,
									// 补充其他可能缺失的字段
									artist: songDetail.artist || song.artist,
									album: songDetail.album || song.album,
									cover: songDetail.cover || song.cover || '/static/music-cover.png'
								};
							}
						} catch (err) {
							console.warn('获取完整歌曲信息失败，使用现有信息', err);
						}
					}
					
					// 获取歌曲URL
					const url = await getMusicUrl(fullSongInfo.id);
					if (!url) {
						throw new Error('获取歌曲URL失败');
					}
					
					// 更新歌曲对象
					const playSong = {
						...fullSongInfo,
						url: url
					};
					
					// 获取当前播放列表
					let playList = [];
					try {
						const playListStr = uni.getStorageSync('playList');
						if (playListStr) {
							playList = JSON.parse(playListStr);
							if (!Array.isArray(playList)) {
								console.warn('播放列表不是数组，重置为空数组');
								playList = [];
							}
						}
					} catch (e) {
						console.error('解析播放列表失败：', e);
						playList = [];
					}
					
					// 检查歌曲是否已在播放列表中
					const index = playList.findIndex(item => item.id === fullSongInfo.id);
					let currentIndex = index;
					
					if (index === -1) {
						// 如果不在列表中，添加到列表
						playList.push(playSong);
						currentIndex = playList.length - 1;
					} else {
						// 如果在列表中，更新信息
						playList[index] = {
							...playList[index],
							...playSong
						};
					}
					
					// 存储当前播放歌曲信息
					uni.setStorageSync('currentSong', JSON.stringify(playSong));
					// 存储播放列表
					uni.setStorageSync('playList', JSON.stringify(playList));
					// 存储当前播放索引
					uni.setStorageSync('currentIndex', currentIndex);
					// 存储自动播放标志
					uni.setStorageSync('autoPlay', 'true');
					
					// 跳转到播放器页面
					uni.switchTab({
						url: '/pages/player/player'
					});
				} catch (error) {
					console.error('播放失败：', error);
					uni.showToast({
						title: error.message || '播放失败，请重试',
						icon: 'none'
					});
				} finally {
					uni.hideLoading();
				}
			},
			
			// 查看歌手详情
			viewArtist(artist) {
				uni.navigateTo({
					url: `/pages/artist/artist?id=${artist.id}&name=${encodeURIComponent(artist.name)}`
				})
			},
			
			// 查看专辑详情
			viewAlbum(album) {
				uni.navigateTo({
					url: `/pages/album/album?id=${album.id}&name=${encodeURIComponent(album.name)}`
				})
			},
			
			// 处理歌曲点击
			handleSongTap(song) {
				if (this.fromPlaylist) {
					this.addSongToPlaylist(song);
				} else {
					this.playSong(song);
				}
			},
			
			// 测试添加歌曲到播放列表
			testAddSong(song, event) {
				console.log("测试添加歌曲到播放列表，歌曲信息:", song);
				console.log("测试添加歌曲到播放列表，事件对象:", event);
				console.log("fromPlaylist状态:", this.fromPlaylist);
				console.log("playlistId:", this.playlistId);
				uni.showToast({
					title: '测试点击添加歌曲',
					icon: 'none'
				});
			},
			
			// 添加歌曲到播放列表
			async addSongToPlaylist(song) {
				if (this.addingToPlaylist) return
				
				console.log("准备添加歌曲到歌单，歌曲信息:", song);
				console.log("当前歌单ID:", this.playlistId);
				
				if (!this.playlistId) {
					uni.showToast({
						title: '歌单ID无效',
						icon: 'none'
					});
					return;
				}
				
				// 设置当前歌曲的添加中状态
				this.$set(song, 'isAdding', true);
				
				// 显示加载提示
				uni.showLoading({
					title: '添加中...'
				})
				
				this.addingToPlaylist = true
				
				try {
					// 导入播放列表缓存工具
					const { addSongsToPlaylist } = require('@/utils/playlistCache.js');
					const userId = uni.getStorageSync('userId') || '';
					
					// 确保所有必要的字段都存在
					const songData = {
						id: song.id,
						name: song.name || '未知歌曲',
						artist: song.artist || '未知歌手',
						album: song.album || '未知专辑',
						duration: song.duration || 0,
						cover: song.cover || '/static/music-cover.png',
						// 确保设置URL
						url: song.url || `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
					};
					
					console.log('处理后的歌曲数据:', songData);
					
					// 构建请求URL和数据
					const baseUrl = apiConfig.playlist.baseUrl;
					const endpoint = apiConfig.playlist.addSong(this.playlistId);
					const url = `${baseUrl}${endpoint}`;
					
					// 包装成后端期望的格式
					const requestData = {
						songs: [songData]
					};
					
					// 先更新本地缓存
					const localSuccess = addSongsToPlaylist(this.playlistId, songData, userId);
					if (localSuccess) {
						console.log('成功更新本地播放列表缓存');
					}
					
					// 然后同步到服务器
					console.log("添加歌曲数据:", JSON.stringify(requestData));
					const response = await request(url, 'POST', requestData);
					
					console.log("添加歌曲响应:", response);
					
					if (response.code === 200) {
						uni.hideLoading();
						uni.showToast({
							title: '已添加到歌单',
							icon: 'success'
						});
						
						// 从搜索结果中移除已添加的歌曲
						this.searchResults.songs = this.searchResults.songs.filter(s => s.id !== song.id);
						
						// 延迟后返回播放列表页
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					} else {
						// 即使服务器端失败，由于已经更新了本地缓存，仍然可以显示成功
						if (localSuccess) {
							uni.hideLoading();
							uni.showToast({
								title: '已添加到本地歌单',
								icon: 'success'
							});
							
							// 从搜索结果中移除已添加的歌曲
							this.searchResults.songs = this.searchResults.songs.filter(s => s.id !== song.id);
							
							// 延迟后返回播放列表页
							setTimeout(() => {
								uni.navigateBack();
							}, 1500);
						} else {
							throw new Error(response.message || '添加歌曲失败');
						}
					}
				} catch (error) {
					console.error('添加歌曲失败:', error);
					uni.hideLoading();
					uni.showToast({
						title: error.message || '添加歌曲失败',
						icon: 'none'
					});
				} finally {
					this.addingToPlaylist = false;
					// 如果还在结果列表中，取消添加中状态
					const songInList = this.searchResults.songs.find(s => s.id === song.id);
					if (songInList) {
						this.$set(songInList, 'isAdding', false);
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '@/scss/search.scss';

	/* 添加以下自定义样式 */

	/* 添加按钮加载状态 */
	.add-icon {
		display: inline-block;
		margin-right: 20rpx;
	}

	.loading-dots {
		font-size: 24rpx;
		color: #007AFF;
		position: relative;
	}

	.loading-dots:after {
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

	/* 加载动画 */
	.loading-more {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 15rpx 0;
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
</style>
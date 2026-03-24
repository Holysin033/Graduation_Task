<template>
	<view class="container">
		<!-- 背景 -->
		<view class="bg-image" :style="{ backgroundImage: `url(${currentSong.cover || defaultCover})` }"></view>
		<view class="bg-mask"></view>

		<!-- 顶部导航 -->
		<!-- 		<view class="nav-bar">
			<text class="iconfont icon-back" @tap="goBack"></text>
			<text class="title" style="text-align: center;width: 92%;font-weight: bolder;">正在播放</text>
		</view> -->

		<!-- 封面区域 -->
		<view class="cover-section">
			<image class="cover" :src="currentSong.cover || defaultCover" mode="aspectFill"
				:class="{ 'rotating': isPlaying }" />
		</view>

		<!-- 歌曲信息 -->
		<view class="song-info">
			<text class="name">{{ currentSong.name || currentSong.title || currentSong.songName || '暂无播放' }}</text>
			<text class="artist">{{ currentSong.artist || currentSong.singer || currentSong.artistName || '未知歌手' }}</text>
		</view>

		<!-- 歌词区域 -->
		<view class="lyrics-section">
			<view v-for="(line, index) in displayLyrics" :key="index" class="lyric-line"
				:class="{ 'active': index === 2 }">
				<view class="lyric-text">
					{{ line.text }}
				</view>
			</view>
		</view>

		<!-- 进度条 -->
		<view class="progress-bar">
			<text class="time">{{ formatTime(currentTime) }}</text>
			<slider class="slider" :value="progress" block-size="12" activeColor="#fff"
				backgroundColor="rgba(255, 255, 255, 0.3)" @change="onSliderChange" @changing="onSliderChanging" />
			<text class="time">{{ formatTime(duration) }}</text>
		</view>

		<!-- 控制按钮 -->
		<view class="controls">
			<u-icon :name="playModeIcon" size="33" color="#fff" @click="togglePlayMode"></u-icon>
			<u-icon name="rewind-left" size="35" color="#fff" @click="playPrev"></u-icon>
			<u-icon :name="isPlaying ? 'pause' : 'play-right'" size="35" color="#fff"
				@click="togglePlay"></u-icon>
			<u-icon name="rewind-right-fill" size="35" color="#fff" @click="playNext"></u-icon>
			<u-icon name="list" size="33" color="#fff" @click="popupList"></u-icon>
		</view>

		<!-- 播放列表弹窗 -->
		<u-popup :show="showPlayList" mode="bottom" :round="10" @close="closePlayList">
			<view class="play-list-popup">
				<view class="popup-header">
					<text>当前播放列表</text>
					<view class="header-right">
						<text class="clear-btn" @click="clearPlayList">清空</text>
						<text class="close-btn" @click="closePlayList">关闭</text>
					</view>
				</view>
				<scroll-view class="play-list-content" scroll-y>
					<view v-for="(song, index) in playList" :key="index + '-' + (song.id || index)" 
						class="play-list-item" 
						:class="{ 'active': currentIndex === index }"
						@click="playSongByIndex(index)">
						<view class="item-content">
							<text class="song-name">{{ song.name || song.title || song.songName || '未知歌曲' }}</text>
							<text class="artist-name">{{ song.artist || song.singer || song.artistName || '未知歌手' }}</text>
						</view>
						<view class="delete-btn" @click.stop="handleDeleteClick(index)">
							<u-icon name="trash" size="30" color="#999"></u-icon>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getMusicById,
		getLyric,
		parseLyrics,
		getMusicList,
		getMusicDetail,
		addToPlayHistory,
		getPlayHistory
	} from '@/utils/musicData.js'

	export default {
		data() {
			return {
				currentSong: {},
				isPlaying: false,
				currentTime: 0,
				duration: 0,
				progress: 0,
				defaultCover: '/static/music-cover.png',
				isSeeking: false,
				playList: [],
				currentIndex: -1,
				playMode: 'loop', // loop, single, random
				lyrics: [],
				currentLyricIndex: -1,
				scrollTop: 0,
				scrollTimer: null,
				audioContext: null,
				displayLyrics: Array(6).fill().map(() => ({ text: '' })), // 初始化6行空歌词
				showPlayList: false, // 控制播放列表弹窗显示
			}
		},
		computed: {
			playModeIcon() {
				switch (this.playMode) {
					case 'loop':
						return 'list-dot'
					case 'single':
						return 'reload'
					case 'random':
						return 'chrome-circle-fill'
					default:
						return 'list-dot'
				}
			},
			playModeText() {
				switch (this.playMode) {
					case 'loop':
						return '列表循环'
					case 'single':
						return '单曲循环'
					case 'random':
						return '随机播放'
					default:
						return '列表循环'
				}
			}
		},
		onLoad() {
			// 初始化音频上下文
			this.audioContext = uni.createInnerAudioContext()
			this.initAudioContext()
			
			// 设置自动播放
			this.audioContext.autoplay = true
			
			// 标记用户交互
			uni.setStorageSync('hasUserInteraction', 'true')
			
			// 从播放历史加载播放列表
			try {
				const playHistory = getPlayHistory()
				if (playHistory && playHistory.length > 0) {
					console.log('从播放历史加载播放列表，共', playHistory.length, '首歌曲')
					this.playList = playHistory
					
					// 从本地存储获取当前索引
					const storedIndex = uni.getStorageSync('currentIndex')
					if (storedIndex !== '' && !isNaN(Number(storedIndex))) {
						this.currentIndex = Number(storedIndex)
					} else {
						// 如果没有保存的索引，使用0
						this.currentIndex = 0
					}
					
					// 保存播放列表到存储
					uni.setStorageSync('playList', JSON.stringify(this.playList))
				} else {
					// 如果没有播放历史，尝试从本地获取播放列表
					const storedPlayList = uni.getStorageSync('playList')
					if (storedPlayList) {
						try {
							this.playList = JSON.parse(storedPlayList)
							console.log('从本地存储加载播放列表，共', this.playList.length, '首歌曲')
							
							// 获取当前索引
							const storedIndex = uni.getStorageSync('currentIndex')
							if (storedIndex !== '' && !isNaN(Number(storedIndex))) {
								this.currentIndex = Number(storedIndex)
							}
						} catch (e) {
							console.error('解析播放列表失败:', e)
							this.playList = []
							this.currentIndex = -1
						}
					} else {
						console.log('未找到播放列表和播放历史')
						this.playList = []
						this.currentIndex = -1
					}
				}
			} catch (e) {
				console.error('加载播放列表失败:', e)
				// 从本地存储获取播放列表作为备选
				const playList = uni.getStorageSync('playList')
				if (playList) {
					try {
						this.playList = JSON.parse(playList)
					} catch (parseError) {
						console.error('解析播放列表失败:', parseError)
						this.playList = []
					}
				}
			}

			// 监听退出登录事件
			uni.$on('logout', this.handleLogout)
			
			// 监听保存播放状态事件
			uni.$on('save_player_state', this.savePlayerState)
			
			// 监听播放歌曲事件
			uni.$on('play_song', this.handlePlaySongEvent)
		},
		onShow() {
			console.log('播放器页面显示')
			
			// 检查是否需要自动播放
			const autoPlay = uni.getStorageSync('autoPlay')
			if (autoPlay === 'true') {
				console.log('检测到自动播放标记')
				// 清除自动播放标志
				uni.removeStorageSync('autoPlay')
				
				// 加载并播放当前歌曲
				this.loadCurrentSong(true)
			} else {
				// 如果当前有歌曲在播放，继续播放
				if (this.currentSong && this.currentSong.id && this.isPlaying) {
					console.log('继续播放当前歌曲:', this.currentSong.name)
				} else if (this.currentSong && this.currentSong.id) {
					// 只更新UI，不自动播放
					console.log('显示当前歌曲信息但不播放:', this.currentSong.name)
					this.loadCurrentSong(false)
				} else {
					// 尝试从存储加载最近的歌曲
					console.log('尝试加载最近的歌曲')
					this.loadCurrentSong(false)
				}
			}
		},
		methods: {
			// 处理播放歌曲事件
			async handlePlaySongEvent(data) {
				console.log('接收到播放事件:', data);
				
				if (!data || !data.song) {
					console.error('播放数据无效');
					return;
				}
				
				try {
					// 标准化歌曲数据，处理各种可能的字段命名
					const songToPlay = {
						id: data.song.id || data.song.songId || data.song.neteaseId || data.song.netease_id || '',
						name: data.song.name || data.song.title || data.song.songName || '未知歌曲',
						artist: data.song.artist || data.song.singer || data.song.artistName || '未知歌手',
						album: data.song.album || data.song.albumName || '未知专辑',
						cover: data.song.cover || data.song.coverUrl || data.song.cover_url || this.defaultCover,
						duration: data.song.duration || 0,
						// 确保有URL
						url: data.song.url || `https://music.163.com/song/media/outer/url?id=${data.song.id}.mp3`
					};
					
					console.log('标准化后的歌曲数据:', songToPlay);
					
					// 确保song对象有id
					if (!songToPlay.id) {
						console.error('播放的歌曲缺少ID');
						uni.showToast({
							title: '播放失败：歌曲ID缺失',
							icon: 'none'
						});
						return;
					}
					
					// 检查是否应该使用播放历史作为播放列表
					if (data.useHistoryAsPlaylist) {
						try {
							// 从播放历史获取播放列表
							const playHistory = getPlayHistory();
							console.log('已获取播放历史作为播放列表，长度:', playHistory.length);
							
							// 使用播放历史作为播放列表
							if (playHistory && playHistory.length > 0) {
								this.playList = playHistory;
								
								// 查找当前歌曲在播放历史中的位置
								const songIndex = this.playList.findIndex(item => item.id === songToPlay.id);
								this.currentIndex = songIndex >= 0 ? songIndex : 0;
								
								// 如果歌曲不在播放历史中，将其添加到播放列表的开头
								if (songIndex === -1) {
									this.playList.unshift(songToPlay);
									this.currentIndex = 0;
								}
								
								// 保存到本地存储
								uni.setStorageSync('playList', JSON.stringify(this.playList));
								uni.setStorageSync('currentIndex', this.currentIndex);
							} else {
								// 历史为空，使用当前歌曲创建播放列表
								this.playList = [songToPlay];
								this.currentIndex = 0;
								uni.setStorageSync('playList', JSON.stringify(this.playList));
								uni.setStorageSync('currentIndex', this.currentIndex);
							}
						} catch (historyError) {
							console.error('获取播放历史失败，使用单曲模式:', historyError);
							// 如果获取播放历史失败，就只播放当前歌曲
							this.playList = [songToPlay];
							this.currentIndex = 0;
							uni.setStorageSync('playList', JSON.stringify(this.playList));
							uni.setStorageSync('currentIndex', this.currentIndex);
						}
					} else if (data.playList && Array.isArray(data.playList) && data.index !== undefined) {
						// 如果提供了完整的播放列表和索引
						
						// 标准化播放列表中的每首歌曲
						this.playList = data.playList.map(song => {
							// 确保ID字段的一致性
							const songId = song.id || song.song_id || song.songId || song.netease_id || '';
							
							// 标准化歌曲数据
							const standardSong = {
								id: songId,
								song_id: song.song_id || songId, // 保留song_id字段
								name: (song.name && song.name !== '未知歌曲') ? song.name : (song.song_name || song.songName || song.title || '未知歌曲'),
								artist: song.artist || song.singer || song.artistName || '未知歌手',
								album: song.album || song.albumName || '未知专辑',
								cover: song.cover || song.coverUrl || song.cover_url || this.defaultCover,
								duration: song.duration || 0,
								// 确保有URL
								url: song.url || song.mp3Url || song.mp3_url || `https://music.163.com/song/media/outer/url?id=${songId}.mp3`
							};
							return standardSong;
						});
						
						this.currentIndex = data.index;
						
						// 保存到本地存储
						uni.setStorageSync('playList', JSON.stringify(this.playList));
						uni.setStorageSync('currentIndex', this.currentIndex);
					} else {
						// 默认情况，只播放传入的歌曲
						this.playList = [songToPlay];
						this.currentIndex = 0;
						uni.setStorageSync('playList', JSON.stringify(this.playList));
						uni.setStorageSync('currentIndex', this.currentIndex);
					}
					
					// 检查是否需要页面跳转
					const pages = getCurrentPages();
					const currentPage = pages[pages.length - 1];
					if (currentPage.route !== 'pages/player/player') {
						// 先跳转到播放器页面，再播放歌曲
						uni.switchTab({
							url: '/pages/player/player',
							success: async () => {
								// 页面跳转成功后播放歌曲
								setTimeout(async () => {
									await this.playSong(songToPlay);
								}, 300); // 给页面跳转一点时间
							},
							fail: (err) => {
								console.error('跳转到播放器页面失败:', err);
								// 即使跳转失败，也尝试播放歌曲
								this.playSong(songToPlay);
								uni.showToast({
									title: '已开始播放，请点击底部播放按钮查看',
									icon: 'none',
									duration: 2000
								});
							}
						});
					} else {
						// 当前已在播放器页面，直接播放
						await this.playSong(songToPlay);
					}
				} catch (error) {
					console.error('处理播放事件失败:', error);
					uni.showToast({
						title: '播放失败，请重试',
						icon: 'none',
						duration: 2000
					});
				}
			},

			// 处理用户交互
			handleUserInteraction() {
				// 记录用户交互
				uni.setStorageSync('hasUserInteraction', 'true')
				// 移除事件监听
				document.removeEventListener('click', this.handleUserInteraction)
				document.removeEventListener('touchstart', this.handleUserInteraction)
			},

			// 初始化音频上下文
			initAudioContext() {
				this.audioContext.onPlay(() => {
					this.isPlaying = true
				})

				this.audioContext.onPause(() => {
					this.isPlaying = false
				})

				this.audioContext.onStop(() => {
					this.isPlaying = false
					this.currentTime = 0
					this.progress = 0
				})

				this.audioContext.onTimeUpdate(() => {
					if (!this.isSeeking) {
						this.currentTime = this.audioContext.currentTime
						this.duration = this.audioContext.duration
						this.progress = (this.currentTime / this.duration) * 100
						this.updateLyric()
					}
				})

				this.audioContext.onEnded(() => {
					this.handleMusicEnd()
				})

				this.audioContext.onError((res) => {
					console.error('播放错误：', res)
					uni.showToast({
						title: '播放失败，请尝试其他歌曲',
						icon: 'none',
						duration: 2000
					})
				})
			},

			// 加载当前歌曲
			async loadCurrentSong(shouldPlay = false) {
				try {
					console.log('加载当前歌曲, 是否自动播放:', shouldPlay)
					
					// 从本地存储获取当前歌曲信息
					const songInfo = uni.getStorageSync('currentSong')
					if (!songInfo) {
						console.log('没有找到保存的歌曲信息')
						return
					}
					
					const song = JSON.parse(songInfo)
					// 只有当没有正在播放的歌曲时，才设置新歌曲
					if (!this.currentSong.id || this.currentSong.id !== song.id) {
						this.currentSong = song
						this.audioContext.src = song.url
						
						// 获取歌曲详情（包括封面等信息）
						try {
							console.log(song);
							
							// 优先使用song_id获取歌曲详情
							const songId = song.song_id || song.id;
							console.log('使用ID获取歌曲详情:', songId);
							
							const songDetail = await getMusicById(songId)
							if (songDetail) {
								console.log('获取到歌曲详情')
								this.currentSong = {
									...this.currentSong,
									...songDetail
								}
								// 添加到播放历史
								await addToPlayHistory(this.currentSong);
							}
						} catch (error) {
							console.error('获取歌曲详情失败：', error)
						}

						// 加载歌词
						try {
							// 优先使用song_id获取歌词
							const lyricId = song.song_id || song.id;
							console.log('使用ID获取歌词:', lyricId);
							
							const lyric = await getLyric(lyricId)
							this.lyrics = parseLyrics(lyric)
							this.currentLyricIndex = -1
							this.scrollTop = 0
							console.log('加载歌词成功')
						} catch (error) {
							console.error('加载歌词失败：', error)
						}
						
						// 如果需要播放，直接尝试播放
						if (shouldPlay) {
							console.log('尝试立即播放歌曲')
							try {
								await this.audioContext.play()
								console.log('播放成功')
							} catch (error) {
								console.error('播放失败：', error)
								uni.showToast({
									title: '请点击播放按钮开始播放',
									icon: 'none',
									duration: 2000
								})
							}
						}
					} else {
						console.log('当前歌曲已加载，无需重新设置')
						// 如果需要播放但当前没有播放，就开始播放
						if (shouldPlay && !this.isPlaying) {
							console.log('开始播放当前已加载的歌曲')
							try {
								await this.audioContext.play()
							} catch (error) {
								console.error('播放失败：', error)
							}
						}
					}
					
					// 从本地存储获取播放列表
					const playList = uni.getStorageSync('playList')
					if (playList) {
						try {
							this.playList = JSON.parse(playList)
							// 优先使用song_id匹配歌曲
							if (this.currentSong.song_id) {
								this.currentIndex = this.playList.findIndex(item => 
									(item.song_id && item.song_id === this.currentSong.song_id) || 
									item.id === this.currentSong.id
								)
							} else {
							this.currentIndex = this.playList.findIndex(item => item.id === this.currentSong.id)
							}
							console.log('加载播放列表成功, 长度:', this.playList.length, '当前索引:', this.currentIndex)
						} catch (e) {
							console.error('解析播放列表失败:', e)
						}
					}
					
					// 获取本地存储的当前索引
					const storedIndex = uni.getStorageSync('currentIndex')
					if (storedIndex !== '' && !isNaN(Number(storedIndex))) {
						this.currentIndex = Number(storedIndex)
						console.log('从存储中恢复当前索引:', this.currentIndex)
					}
				} catch (error) {
					console.error('加载当前歌曲失败：', error)
				}
			},

			// 播放歌曲
			async playSong(song) {
				try {
					console.log('开始播放歌曲:', song);
					
					// 重新检查确保歌曲对象包含必要属性
					if (!song) {
						throw new Error('歌曲对象无效');
					}
					
					// 确保ID字段的一致性，优先使用song_id
					const songId = song.song_id || song.id || song.songId || song.netease_id || '';
					
					// 标准化歌曲对象
					this.currentSong = {
						id: song.id || songId, // 保留原始id用于本地匹配
						song_id: song.song_id || songId, // 保留song_id字段用于API请求
						name: (song.name && song.name !== '未知歌曲') ? song.name : (song.song_name || song.songName || song.title || '未知歌曲'),
						artist: song.artist || song.singer || song.artistName || '未知歌手', 
						album: song.album || song.albumName || '未知专辑',
						cover: song.cover || song.coverUrl || song.cover_url || this.defaultCover,
						duration: song.duration || 0,
						url: song.url || song.mp3Url || song.mp3_url || `https://music.163.com/song/media/outer/url?id=${song.song_id || songId}.mp3`
					};

					// 确保歌曲信息有效
					if (!this.currentSong.id && !this.currentSong.song_id) {
						console.warn('歌曲ID缺失，尝试创建默认唯一ID');
						this.currentSong.id = `local_${Date.now()}_${Math.random().toString(36).substring(2)}`;
					}

					// 确保歌曲有URL，优先使用song_id
					if (!this.currentSong.url) {
						const idForUrl = this.currentSong.song_id || this.currentSong.id;
						this.currentSong.url = `https://music.163.com/song/media/outer/url?id=${idForUrl}.mp3`;
						console.log('已自动生成歌曲URL:', this.currentSong.url);
							}
					
					// 歌曲URL解码，处理特殊字符
					try {
						this.currentSong.url = decodeURIComponent(encodeURIComponent(this.currentSong.url));
					} catch (e) {
						console.warn('URL解码失败，使用原URL:', e);
					}
					
					console.log('处理后的歌曲对象:', this.currentSong);
					
					// 保存当前播放歌曲
					uni.setStorageSync('currentSong', JSON.stringify(this.currentSong));
					
					// 添加到播放历史并同步到服务器
					try {
						await addToPlayHistory(this.currentSong);
					} catch(historyError) {
						console.error('添加播放历史失败:', historyError);
					}
					
					// 设置音频源
					this.audioContext.src = this.currentSong.url;
					
					// 重置进度条
					this.currentTime = 0;
					this.progress = 0;
					
					// 获取歌词，优先使用song_id
					const lyricId = this.currentSong.song_id || this.currentSong.id;
					this.getLyrics(lyricId);
					
					// 自动播放
					const autoPlay = uni.getStorageSync('autoPlay') === 'true';
					if (autoPlay) {
						// 播放音频
						this.audioContext.play();
					}
				} catch (error) {
					console.error('播放歌曲失败:', error);
					uni.showToast({
						title: error.message || '播放失败，请重试',
						icon: 'none'
					});
				}
			},

			// 切换播放状态
			async togglePlay() {
				if (!this.currentSong.url) return

				try {
					if (this.isPlaying) {
						this.audioContext.pause()
					} else {
						// 记录用户交互
						uni.setStorageSync('hasUserInteraction', 'true')
						await this.audioContext.play()
					}
				} catch (error) {
					console.error('播放控制失败：', error)
				}
			},

			// 切换播放模式
			togglePlayMode() {
				const modes = ['loop', 'single', 'random']
				const currentIndex = modes.indexOf(this.playMode)
				this.playMode = modes[(currentIndex + 1) % modes.length]
				
				// 显示切换提示
				uni.showToast({
					title: this.playModeText,
					icon: 'none',
					duration: 1500
				})
			},

			// 播放上一首
			playPrev() {
				if (this.playList.length === 0) {
					uni.showToast({
						title: '播放列表为空',
						icon: 'none',
						duration: 1000
					})
					return
				}
				
				// 检查当前索引是否有效
				if (this.currentIndex === -1 && this.playList.length > 0) {
					this.currentIndex = 0
				}

				// 如果正在播放，先停止当前歌曲
				this.audioContext.stop()

				switch (this.playMode) {
					case 'random':
						// 生成一个不包含当前索引的随机索引
						let newRandomIndex;
						do {
							newRandomIndex = Math.floor(Math.random() * this.playList.length);
						} while (newRandomIndex === this.currentIndex && this.playList.length > 1);
						this.currentIndex = newRandomIndex;
						break
					default:
						if (this.currentIndex <= 0) {
							this.currentIndex = this.playList.length - 1
						} else {
							this.currentIndex--
						}
				}

				console.log('播放上一首，当前索引:', this.currentIndex)
				// 保存当前索引到本地存储
				uni.setStorageSync('currentIndex', this.currentIndex)
				this.playSong(this.playList[this.currentIndex])
				uni.showToast({
					title: '上一首',
					icon: 'none',
					duration: 1000
				})
			},

			// 播放下一首
			playNext() {
				if (this.playList.length === 0) {
					uni.showToast({
						title: '播放列表为空',
						icon: 'none',
						duration: 1000
					})
					return
				}
				
				// 检查当前索引是否有效
				if (this.currentIndex === -1 && this.playList.length > 0) {
					this.currentIndex = 0
				}

				// 如果正在播放，先停止当前歌曲
				this.audioContext.stop()

				switch (this.playMode) {
					case 'random':
						// 生成一个不包含当前索引的随机索引
						let newRandomIndex;
						do {
							newRandomIndex = Math.floor(Math.random() * this.playList.length);
						} while (newRandomIndex === this.currentIndex && this.playList.length > 1);
						this.currentIndex = newRandomIndex;
						break
					case 'single':
						// 单曲循环模式下重新播放当前歌曲
						this.audioContext.seek(0)
						this.audioContext.play()
						uni.showToast({
							title: '重新播放',
							icon: 'none',
							duration: 1000
						})
						return
					default:
						if (this.currentIndex >= this.playList.length - 1) {
							this.currentIndex = 0
						} else {
							this.currentIndex++
						}
				}

				console.log('播放下一首，当前索引:', this.currentIndex)
				// 保存当前索引到本地存储
				uni.setStorageSync('currentIndex', this.currentIndex)
				this.playSong(this.playList[this.currentIndex])
				uni.showToast({
					title: '下一首',
					icon: 'none',
					duration: 1000
				})
			},

			// 处理音乐播放结束
			handleMusicEnd() {
				switch (this.playMode) {
					case 'single':
						// 单曲循环模式下重新播放当前歌曲
						this.audioContext.seek(0)
						this.audioContext.play()
						break
					default:
						this.playNext()
				}
			},

			// 进度条改变中
			onSliderChanging(e) {
				this.isSeeking = true
				this.progress = e.detail.value
				this.currentTime = (this.progress / 100) * this.duration
			},

			// 进度条改变完成
			onSliderChange(e) {
				this.isSeeking = false
				const position = (e.detail.value / 100) * this.duration
				this.audioContext.seek(position)
			},

			// 格式化时间
			formatTime(time) {
				if (!time) return '00:00'
				const minutes = Math.floor(time / 60)
				const seconds = Math.floor(time % 60)
				return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
			},

			// 更新歌词
			updateLyric() {
				const currentTime = this.currentTime
				const index = this.lyrics.findIndex((line, i) => {
					const nextLine = this.lyrics[i + 1]
					return line.time <= currentTime && (!nextLine || nextLine.time > currentTime)
				})

				if (index !== this.currentLyricIndex) {
					this.currentLyricIndex = index
					this.updateDisplayLyrics(index)
				}
			},

			// 更新显示的6行歌词
			updateDisplayLyrics(currentIndex) {
				if (currentIndex < 0 || !this.lyrics.length) {
					// 创建6个独立的空歌词对象，而不是共享同一个引用
					this.displayLyrics = Array(6).fill().map(() => ({ text: '' }));
					return;
				}

				// 计算需要显示的歌词范围
				const start = Math.max(0, currentIndex - 2);
				const end = Math.min(this.lyrics.length, start + 6);

				// 构建显示的歌词数组 - 确保每个对象都是独立的
				this.displayLyrics = Array(6).fill().map((_, index) => {
					const lyricIndex = start + index;
					return lyricIndex < end ? { ...this.lyrics[lyricIndex] } : { text: '' };
				});
			},

			// 滚动到当前歌词
			scrollToCurrentLyric() {
				if (this.currentLyricIndex < 0) return

				const lineHeight = 80 // 每行歌词的高度
				const scrollTop = this.currentLyricIndex * lineHeight - 200 // 200是偏移量，使当前歌词显示在中间位置

				this.scrollTop = scrollTop
			},

			// 处理滚动事件
			handleScroll(e) {
				if (this.scrollTimer) {
					clearTimeout(this.scrollTimer)
				}

				this.scrollTimer = setTimeout(() => {
					const scrollTop = e.detail.scrollTop
					const lineHeight = 80
					const index = Math.round(scrollTop / lineHeight)

					if (index >= 0 && index < this.lyrics.length) {
						this.currentLyricIndex = index
						this.seekToTime(this.lyrics[index].time)
					}
				}, 100)
			},

			// 跳转到指定时间
			seekToTime(time) {
				this.audioContext.seek(time)
			},

			// 返回上一页
			goBack() {
				uni.navigateBack()
			},

			// 处理播放列表弹窗变化
			onPopupChange(e) {
				// 这里可以根据需要处理播放列表弹窗的变化
			},

			// 打开播放列表
			popupList() {
				console.log('打开播放列表')
				this.showPlayList = true
			},
			
			// 关闭播放列表
			closePlayList() {
				console.log('关闭播放列表')
				this.showPlayList = false
			},
			
			// 通过索引播放歌曲
			playSongByIndex(index) {
				if (index === this.currentIndex) {
					this.closePlayList()
					return
				}
				
				// 立即播放选中的歌曲
				this.currentIndex = index
				// 保存当前索引到本地存储
				uni.setStorageSync('currentIndex', this.currentIndex)
				this.playSong(this.playList[index])
				this.closePlayList()
				
				// 显示提示
				uni.showToast({
					title: '正在播放',
					icon: 'none',
					duration: 1000
				})
			},
			
			// 清空播放列表
			clearPlayList() {
				// 先关闭弹窗，再显示确认对话框
				this.showPlayList = false;
				
				// 延迟显示确认对话框，确保弹窗已关闭
				setTimeout(() => {
					uni.showModal({
						title: '提示',
						content: '确定要清空播放列表吗？',
						success: (res) => {
							if (res.confirm) {
								this.audioContext.stop()
								this.currentSong = {}
								this.currentIndex = -1
								this.playList = []
								uni.removeStorageSync('playList')
								uni.removeStorageSync('currentSong')
								uni.showToast({
									title: '播放列表已清空',
									icon: 'success',
									duration: 2000
								})
							}
						}
					})
				}, 300);
			},
			
			// 删除单首歌曲
			deleteSong(index) {
				// 先关闭弹窗，再显示确认对话框
				this.showPlayList = false;
				
				// 延迟显示确认对话框，确保弹窗已关闭
				setTimeout(() => {
					uni.showModal({
						title: '提示',
						content: '确定要删除这首歌吗？',
						success: (res) => {
							if (res.confirm) {
								// 如果删除的是当前播放的歌曲
								if (index === this.currentIndex) {
									// 如果播放列表只剩一首歌，停止播放并重置状态
									if (this.playList.length === 1) {
										this.audioContext.stop()
										this.currentSong = {}
										this.currentIndex = -1
										this.playList = []
										uni.removeStorageSync('playList')
										uni.removeStorageSync('currentSong')
										uni.showToast({
											title: '播放列表已清空',
											icon: 'success',
											duration: 2000
										})
										return
									}
									// 否则播放下一首
									this.playNext()
								}
								
								// 从播放列表中删除
								this.playList.splice(index, 1)
								// 更新当前索引
								if (index < this.currentIndex) {
									this.currentIndex--
								}
								// 保存更新后的播放列表
								uni.setStorageSync('playList', JSON.stringify(this.playList))
								uni.showToast({
									title: '已从播放列表移除',
									icon: 'success',
									duration: 2000
								})
							} else {
								// 用户取消了删除操作，重新打开播放列表
								this.showPlayList = true;
							}
						}
					})
				}, 300);
			},

			// 处理删除按钮点击
			handleDeleteClick(index) {
				// 阻止事件冒泡
				event.stopPropagation && event.stopPropagation();
				// 调用删除方法
				this.deleteSong(index);
			},

			// 处理退出登录
			handleLogout(event = {}) {
				console.log('播放器收到登出事件:', event);
				
				// 同步播放列表到服务器，确保不会丢失
				if (this.playList && this.playList.length > 0) {
					try {
						// 只在非清除模式下保存本地列表
						if (!event.clearLocal) {
							uni.setStorageSync('playList', JSON.stringify(this.playList));
							console.log('播放列表已保存到本地存储');
						}
					} catch (e) {
						console.error('保存播放列表失败:', e);
					}
				}
				
				// 停止播放
				if (this.audioContext) {
					try {
						this.audioContext.stop();
					} catch (e) {
						console.error('停止播放失败:', e);
					}
				}
				
				// 清空播放状态
				this.isPlaying = false;
				this.currentSong = {};
				this.currentIndex = -1;
				this.playList = [];
				this.currentTime = 0;
				this.duration = 0;
				this.progress = 0;
				this.lyrics = [];
				this.currentLyricIndex = -1;
				
				// 清除本地存储的播放列表（因为已经同步到了服务器）
				if (event.clearLocal) {
					try {
						uni.removeStorageSync('playList');
						uni.removeStorageSync('currentSong');
						console.log('本地播放列表已清除');
					} catch (e) {
						console.error('清除本地播放列表失败:', e);
					}
				}
			},

			// 保存播放器状态
			savePlayerState() {
				console.log('保存播放器状态');
				if (this.playList && this.playList.length > 0) {
					try {
						uni.setStorageSync('playList', JSON.stringify(this.playList));
						console.log('已保存播放列表，长度:', this.playList.length);
						
						if (this.currentSong && this.currentSong.id) {
							uni.setStorageSync('currentSong', this.currentSong);
							console.log('已保存当前歌曲:', this.currentSong.name);
						}
						
						// 保存当前索引
						if (this.currentIndex >= 0) {
							uni.setStorageSync('currentIndex', this.currentIndex);
							console.log('已保存当前索引:', this.currentIndex);
						}
					} catch (error) {
						console.error('保存播放器状态失败:', error);
					}
				} else {
					console.log('播放列表为空，无需保存');
				}
			},

			// 加载歌词
			async getLyrics(songId) {
				try {
					// 检查ID是否有效
					if (!songId) {
						console.warn('歌词ID无效，尝试使用currentSong中的ID');
						// 尝试从当前歌曲中获取ID
						songId = this.currentSong.id || this.currentSong.song_id;
						
						if (!songId) {
							console.error('无法获取有效的歌曲ID，无法加载歌词');
							this.lyrics = parseLyrics('[00:00.00]暂无歌词');
							return;
						}
					}
					
					console.log('获取歌词，ID:', songId);
					const lyric = await getLyric(songId);
					this.lyrics = parseLyrics(lyric);
					this.currentLyricIndex = -1;
					this.scrollTop = 0;
				} catch (error) {
					console.error('获取歌词失败:', error);
					// 设置默认歌词
					this.lyrics = parseLyrics('[00:00.00]暂无歌词');
				}
			}
		},
		onUnload() {
			if (this.scrollTimer) {
				clearTimeout(this.scrollTimer)
			}
			if (this.audioContext) {
				this.audioContext.stop()
				this.audioContext.destroy()
			}
			// 移除事件监听
			uni.$off('logout', this.handleLogout)
			uni.$off('save_player_state', this.savePlayerState)
			uni.$off('play_song', this.handlePlaySongEvent)
		}
	}
</script>

<style lang="scss">
	@import '@/scss/player.scss';
</style>
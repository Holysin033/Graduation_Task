<template>
	<view class="container">
		<!-- 用户信息 -->
		<view class="user-info">
			<image class="avatar" :src="userInfo.avatar || '/static/default-avatar.png'" mode="aspectFill"
				@click="changeAvatar"></image>
			<view class="info" v-if="isLoggedIn">
				<view class="nickname-wrapper" @click="changeUsername">
					<text class="nickname">{{ userInfo.username || '未设置用户名' }}</text>
					<text class="iconfont icon-edit"></text>
				</view>
				<text class="username">ID: {{ userInfo.id || '未知' }}</text>
			</view>
			<view class="info" v-else>
				<text class="nickname">未登录</text>
				<text class="username">点击登录</text>
			</view>
			<view class="login-btn" v-if="!isLoggedIn" @click="goToLogin">登录</view>
		</view>

		<!-- 用户统计 -->
		<view class="user-stats" v-if="isLoggedIn">
			<view class="stat-item">
				<text class="count">{{ stats.favorites || 0 }}</text>
				<text class="label">收藏</text>
			</view>
			<view class="stat-item">
				<text class="count">{{ stats.history || 0 }}</text>
				<text class="label">历史</text>
			</view>
			<view class="stat-item">
				<text class="count">{{ stats.playlists || 0 }}</text>
				<text class="label">歌单</text>
			</view>
		</view>

		<!-- 同步状态显示 -->
		<view class="sync-status" v-if="isLoggedIn">
			<text class="status-text">上次同步时间: {{lastSyncTime || '从未同步'}}</text>
			<text class="sync-now" @click="startManualSync">立即同步</text>
		</view>

		<!-- 功能列表 -->
		<view class="menu-list">
			<view class="menu-item" @click="showSyncDetails">
				<text class="icon iconfont icon-sync"></text>
				<text class="title">数据同步</text>
				<text class="arrow iconfont icon-right"></text>
			</view>
			<view class="menu-item" @click="goToFavorites">
				<text class="icon iconfont icon-star"></text>
				<text class="title">我的收藏</text>
				<text class="arrow iconfont icon-right"></text>
			</view>
			<view class="menu-item" @click="goToHistory">
				<text class="icon iconfont icon-clock"></text>
				<text class="title">播放历史</text>
				<text class="arrow iconfont icon-right"></text>
			</view>
			<view class="menu-item" @click="goToPlaylists">
				<text class="icon iconfont icon-list"></text>
				<text class="title">我的播放列表</text>
				<text class="arrow iconfont icon-right"></text>
			</view>
			<view class="menu-item" @click="goToSettings">
				<text class="icon iconfont icon-setting"></text>
				<text class="title">设置</text>
				<text class="arrow iconfont icon-right"></text>
			</view>
		</view>

		<!-- 退出登录按钮 -->
		<view class="logout-section" v-if="isLoggedIn">
			<u-button type="error" @click="handleLogout">退出登录</u-button>
		</view>

		<!-- 同步详情弹窗 -->
		<uni-popup ref="syncPopup" type="center">
			<view class="sync-popup">
				<view class="sync-popup-title">数据同步</view>
				
				<view class="sync-info">
					<view class="sync-info-item">
						<text class="sync-info-label">上次同步时间:</text>
						<text class="sync-info-value">{{lastSyncTime}}</text>
					</view>
					<view class="sync-info-item">
						<text class="sync-info-label">同步状态:</text>
						<text :class="['sync-info-value', syncStatusClass]">{{syncStatusText}}</text>
					</view>
					<view class="sync-info-item" v-if="syncError">
						<text class="sync-info-label">错误信息:</text>
						<text class="sync-info-value error">{{syncError}}</text>
					</view>
				</view>
				
				<view class="sync-stats">
					<view class="sync-stat-item">
						<text class="sync-stat-count">{{syncStats.favorites}}</text>
						<text class="sync-stat-label">收藏</text>
					</view>
					<view class="sync-stat-item">
						<text class="sync-stat-count">{{syncStats.history}}</text>
						<text class="sync-stat-label">历史</text>
					</view>
					<view class="sync-stat-item">
						<text class="sync-stat-count">{{syncStats.playlists}}</text>
						<text class="sync-stat-label">歌单</text>
					</view>
				</view>
				
				<view class="sync-actions">
					<button 
						class="sync-button" 
						:disabled="isSyncing" 
						:loading="isSyncing"
						@click="startManualSync">
						{{isSyncing ? '同步中...' : '立即同步'}}
					</button>
				</view>
				
				<text class="sync-close" @click="closeSyncPopup">关闭</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import authService from '@/utils/authService.js';
import { getFavoritesCount, getFavoritePlaylists, getPlayHistory } from '@/utils/musicData.js';
import { syncAllUserData } from '@/utils/syncService.js';
import { safeGetStorage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/utils/constants';

export default {
	data() {
		return {
			userInfo: {
				avatar: '',
				nickname: '',
				username: '',
				id: ''
			},
			stats: {
				favorites: 0,
				history: 0,
				playlists: 0
			},
			isLoggingOut: false,
			lastSyncTime: '',
			favoriteCount: 0,
			historyCount: 0,
			playlistCount: 0,
			syncStatus: 'none', // none, success, partial, error, syncing
			syncError: '',
			isSyncing: false,
			syncStats: {
				favorites: 0,
				history: 0,
				playlists: 0
			},
			_isLoggedIn: false
		}
	},
	computed: {
		// 同步状态文本
		syncStatusText() {
			const statusMap = {
				'none': '从未同步',
				'success': '同步成功',
				'partial': '部分同步',
				'error': '同步失败',
				'syncing': '同步中...'
			};
			return statusMap[this.syncStatus] || '未知状态';
		},
		// 同步状态样式类
		syncStatusClass() {
			const classMap = {
				'none': 'status-none',
				'success': 'status-success',
				'partial': 'status-warning',
				'error': 'status-error',
				'syncing': 'status-syncing'
			};
			return classMap[this.syncStatus] || '';
		},
		// 登录状态
		isLoggedIn: {
			get() {
				// 同时检查内部状态和用户ID
				return this._isLoggedIn && !!this.userInfo.id;
			},
			set(value) {
				this._isLoggedIn = value;
			}
		}
	},
	onShow() {
		// 每次页面显示时强制刷新登录状态，增加日志以便调试
		console.log('用户页面显示，开始强制刷新登录状态...');
		
		// 优先级执行 - 先强制刷新登录状态
		this.forceRefreshLoginStatus();
		
		// 短暂延迟后再次检查登录状态，确保状态一致性
		setTimeout(() => {
			console.log('延迟检查登录状态...');
			this.checkLogin();
			
			// 加载用户相关数据
			this.loadUserData();
			this.loadSyncStatus();
			this.loadSyncStats();
		}, 100);
	},
	onLoad() {
		// 监听登录成功事件
		uni.$on('login_success', this.handleLoginSuccess);
		// 监听退出登录事件
		uni.$on('logout', this.handleLogout);
		// 监听同步完成事件
		uni.$on('sync_completed', this.checkLogin);

		// 初始检查登录状态
		this.forceRefreshLoginStatus();
	},
	onUnload() {
		// 组件销毁时移除事件监听
		uni.$off('login_success', this.handleLoginSuccess);
		uni.$off('logout', this.handleLogout);
		uni.$off('sync_completed', this.checkLogin);
	},
	methods: {
		// 强制刷新登录状态 - 完全刷新登录状态的可靠方法
		forceRefreshLoginStatus() {
			console.log('强制刷新登录状态...');
			
			// 先清空现有状态
			this.resetUIState();
			
			// 检查登录状态
			const loginStatus = authService.checkLoginStatus();
			console.log('当前登录状态:', loginStatus);
			
			// 更新内部状态 
			this._isLoggedIn = loginStatus;
			
			if (loginStatus) {
				try {
					// 从本地存储获取最新用户信息
					const storedUserInfo = uni.getStorageSync('userInfo');
					if (!storedUserInfo) {
						console.error('登录状态异常：检测为已登录但无法获取用户信息');
						this._isLoggedIn = false;
						return;
					}
					
					// 确保userInfo是一个对象
					if (typeof storedUserInfo === 'string') {
						try {
							this.userInfo = JSON.parse(storedUserInfo);
						} catch (e) {
							console.error('解析用户信息失败:', e);
							this._isLoggedIn = false;
							return;
						}
					} else {
						this.userInfo = storedUserInfo;
					}
					
					// 检查用户ID
					if (!this.userInfo.id) {
						console.error('用户信息中缺少ID字段');
						if (this.userInfo.userId) {
							this.userInfo.id = this.userInfo.userId;
						} else {
							this._isLoggedIn = false;
							return;
						}
					}
					
					// 确保显示username字段
					if (!this.userInfo.username && this.userInfo.nickname) {
						this.userInfo.username = this.userInfo.nickname;
					}
					
					console.log('用户信息已刷新:', this.userInfo);
					
					// 获取用户最新信息
					this.fetchUserInfo();
					
					// 获取用户统计数据
					this.getUserStats();
				} catch (error) {
					console.error('强制刷新登录状态时出错:', error);
					this._isLoggedIn = false;
					this.resetUserInfo();
				}
			} else {
				console.log('用户未登录或会话已过期');
				this.resetUserInfo();
			}
		},
		
		// 重置UI状态，但保留内部状态
		resetUIState() {
			this.userInfo = {
				avatar: '',
				nickname: '',
				username: '',
				id: ''
			};
			this.stats = {
				favorites: 0,
				history: 0,
				playlists: 0
			};
		},
		
		// 检查登录状态
		checkLogin() {
			// 直接调用强制刷新方法
			this.forceRefreshLoginStatus();
		},

		// 重置用户信息
		resetUserInfo() {
			this.userInfo = {
				avatar: '',
				nickname: '',
				username: '',
				id: ''
			};
			this.stats = {
				favorites: 0,
				history: 0,
				playlists: 0
			};
			this._isLoggedIn = false;
		},

		// 获取用户统计数据
		async getUserStats() {
			try {
				if (!this.isLoggedIn) return;

				// 使用封装好的函数获取数据
				const favoritePlaylists = getFavoritePlaylists();
				const playHistory = getPlayHistory();
				const playlists = uni.getStorageSync('playlists') || [];

				// 更新统计数据
				this.stats.favorites = favoritePlaylists.length;
				this.stats.history = playHistory.length;
				this.stats.playlists = Array.isArray(playlists) ? playlists.length : 0;
			} catch (error) {
				console.error('获取用户统计数据失败：', error);
			}
		},

		// 修改头像
		changeAvatar() {
			if (!this.isLoggedIn) return

			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: async (res) => {
					const tempFilePath = res.tempFilePaths[0]
					try {
						// 将图片转换为base64
						const base64 = await this.imageToBase64(tempFilePath)
						
						// 上传头像
						const result = await authService.updateUserInfo({
							avatar: base64
						})
						
						if (result.code === 200) {
							this.userInfo.avatar = base64
							uni.showToast({
								title: '头像修改成功',
								icon: 'success'
							})
						}
					} catch (error) {
						console.error('修改头像失败：', error)
						uni.showToast({
							title: '修改头像失败',
							icon: 'none'
						})
					}
				}
			})
		},

		// 图片转base64方法
		imageToBase64(filePath) {
			return new Promise((resolve, reject) => {
				// #ifdef H5
				// H5环境下使用FileReader
				const xhr = new XMLHttpRequest()
				xhr.open('GET', filePath, true)
				xhr.responseType = 'blob'
				xhr.onload = function() {
					if (this.status === 200) {
						const reader = new FileReader()
						reader.onloadend = function() {
							resolve(reader.result)
						}
						reader.onerror = function() {
							reject(new Error('读取文件失败'))
						}
						reader.readAsDataURL(this.response)
					} else {
						reject(new Error('获取图片失败'))
					}
				}
				xhr.onerror = function() {
					reject(new Error('网络请求失败'))
				}
				xhr.send()
				// #endif

				// #ifndef H5
				// 非H5环境使用uni.getFileSystemManager
				uni.getFileSystemManager().readFile({
					filePath: filePath,
					encoding: 'base64',
					success: res => {
						resolve('data:image/jpeg;base64,' + res.data)
					},
					fail: err => {
						reject(err)
					}
				})
				// #endif
			})
		},

		// 获取最新的用户信息
		async fetchUserInfo() {
			if (!this.isLoggedIn || !this.userInfo.id) return;
			
			try {
				const result = await authService.getUserInfo(this.userInfo.id);
				if (result && result.code === 200 && result.data) {
					// 更新用户信息
					this.userInfo = {...this.userInfo, ...result.data};
					// 更新本地存储
					uni.setStorageSync('userInfo', this.userInfo);
					console.log('用户信息已更新:', this.userInfo);
				}
			} catch (error) {
				console.error('获取用户信息失败:', error);
			}
		},

		// 跳转到登录页面
		goToLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},

		// 跳转到收藏页面
		goToFavorites() {
			if (!this.isLoggedIn) {
				this.goToLogin()
				return
			}
			uni.navigateTo({
				url: '/pages/user/favorites'
			})
		},

		// 跳转到历史记录页面
		goToHistory() {
			if (!this.isLoggedIn) {
				this.goToLogin()
				return
			}
			uni.navigateTo({
				url: '/pages/user/history'
			})
		},

		// 跳转到歌单页面
		goToPlaylists() {
			if (this.isLoggedIn) {
				uni.navigateTo({
					url: '/pages/user/playlists'
				});
			} else {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
			}
		},

		// 跳转到设置页面
		goToSettings() {
			if (!this.isLoggedIn) {
				this.goToLogin()
				return
			}
			uni.navigateTo({
				url: '/pages/user/settings'
			})
		},

		// 处理登录成功事件
		handleLoginSuccess(data) {
			console.log('收到登录成功事件:', data);
			
			// 立即尝试从缓存获取最新用户信息
			try {
				// 清除旧状态
				this.resetUIState();
				
				const storedUserInfo = uni.getStorageSync('userInfo');
				const token = uni.getStorageSync('token');
				
				if (storedUserInfo && token) {
					// 有缓存的用户信息，立即更新
					if (typeof storedUserInfo === 'string') {
						try {
							this.userInfo = JSON.parse(storedUserInfo);
						} catch (e) {
							console.error('解析用户信息失败:', e);
						}
					} else {
						this.userInfo = storedUserInfo;
					}
					
					// 确保ID字段存在
					if (!this.userInfo.id && data && data.userId) {
						this.userInfo.id = data.userId;
					}
					
					// 设置登录状态
					this._isLoggedIn = true;
					
					console.log('登录成功，用户信息已更新:', this.userInfo);
					
					// 立即更新统计数据
					this.getUserStats();
					this.loadUserData();
					this.loadSyncStatus();
					this.loadSyncStats();
					
					// 强制重新渲染视图
					this.$forceUpdate();
					
					// 确保用户看到登录后的状态，如果状态不一致则重载页面
					setTimeout(() => {
						if (!this.isLoggedIn || !this.userInfo.id) {
							console.log('登录状态不一致，重新加载页面...');
							uni.reLaunch({
								url: '/pages/user/user'
							});
						}
					}, 200);
				} else {
					// 没有缓存的用户信息，重新加载页面
					console.log('登录成功但未找到缓存的用户信息，将重新加载页面');
					uni.reLaunch({
						url: '/pages/user/user'
					});
				}
			} catch (error) {
				console.error('处理登录成功事件出错:', error);
				// 出错时重新加载页面
				uni.reLaunch({
					url: '/pages/user/user'
				});
			}
		},

		// 退出登录
		async handleLogout(event = {}) {
			// 添加防抖处理，避免用户连续点击导致重复操作
			if (this.isLoggingOut) {
				console.log('退出操作正在进行中，忽略重复点击');
				return;
			}

			// 添加确认弹窗，询问用户是否确认退出
			if (!event.confirmed) {
				uni.showModal({
					title: '退出登录',
					content: '确定要退出当前账号吗？',
					confirmText: '确认退出',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							// 用户确认退出，调用自身并传入confirmed标记
							this.handleLogout({ ...event, confirmed: true });
						}
					}
				});
				return;
			}

			try {
				this.isLoggingOut = true;
				console.log('用户页面开始退出登录流程');

				// 先将播放器的内容保存到本地，以便在退出前同步
				uni.$emit('save_player_state');

				// 给播放器状态保存预留时间
				await new Promise(resolve => setTimeout(resolve, 300));

				// 调用认证服务的登出方法 (authService.logout 会自动处理跳转到登录页面)
				const result = await authService.logout();
				console.log('认证服务退出结果:', result);

				// 重置UI状态
				this._isLoggedIn = false;
				this.resetUserInfo();
				
				// 显示提示（如果不是静默模式）
				if (!event.silent) {
					uni.showToast({
						title: result.code === 200 ? '已退出登录' : '退出可能不完整',
						icon: result.code === 200 ? 'success' : 'none'
					});
				}
				
				// 不需要在这里跳转页面，authService.logout已经处理
			} catch (error) {
				console.error('退出登录过程发生异常:', error);
				
				// 显示错误提示
				uni.showToast({
					title: '退出处理中出现错误',
					icon: 'none'
				});

				// 即使出错，也尝试重置状态
				this._isLoggedIn = false;
				this.resetUserInfo();
				
				// 不需要在这里跳转，authService.logout会处理错误情况下的跳转
			} finally {
				// 延迟恢复状态，避免短时间内重复操作
				setTimeout(() => {
					this.isLoggingOut = false;
					console.log('退出登录流程结束，重置状态');
				}, 1000);
			}
		},
		// 添加定期同步方法
		startAutoSync() {
			if (this.syncInterval) {
				clearInterval(this.syncInterval);
			}

			// 每5分钟同步一次数据
			this.syncInterval = setInterval(async () => {
				if (this.isLoggedIn && this.userInfo.id) {
					await syncUserDataToServer(this.userInfo.id);
				}
			}, 5 * 60 * 1000);
		},

		// 在组件销毁时清理
		beforeDestroy() {
			if (this.syncInterval) {
				clearInterval(this.syncInterval);
			}
		},

		async loadUserData() {
			if (!this.isLoggedIn) return;
			
			// 加载收藏数量
			const favorites = uni.getStorageSync(`user_${this.userInfo.id}_favoriteSongs`) || [];
			this.favoriteCount = favorites.length;
			
			// 加载历史记录数量
			const history = uni.getStorageSync(`user_${this.userInfo.id}_playHistory`) || [];
			this.historyCount = history.length;
			
			// 加载歌单数量
			const playlists = uni.getStorageSync(`user_${this.userInfo.id}_playlists`) || [];
			this.playlistCount = playlists.length;
			
			// 加载上次同步时间
			this.lastSyncTime = uni.getStorageSync('lastSyncTime') || '';
		},

		// 修改用户名
		changeUsername() {
			if (!this.isLoggedIn) return

			uni.showModal({
				title: '修改用户名',
				editable: true,
				placeholderText: '请输入新用户名',
				content: this.userInfo.username || '',
				success: async (res) => {
					if (res.confirm && res.content) {
						try {
							// 更新用户名
							const result = await authService.updateUserInfo({
								username: res.content
							});
							
							if (result.code === 200) {
								this.userInfo.username = res.content;
								// 同时更新nickname字段保持一致性
								this.userInfo.nickname = res.content;
								// 更新本地存储
								uni.setStorageSync('userInfo', this.userInfo);
								
								uni.showToast({
									title: '用户名修改成功',
									icon: 'success'
								});
							}
						} catch (error) {
							console.error('修改用户名失败：', error);
							uni.showToast({
								title: '修改用户名失败',
								icon: 'none'
							});
						}
					}
				}
			});
		},

		// 显示同步详情弹窗
		showSyncDetails() {
			if (this.isLoggedIn) {
				this.loadSyncStatus();
				this.loadSyncStats();
				this.$refs.syncPopup.open();
			} else {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
			}
		},

		// 关闭同步详情弹窗
		closeSyncPopup() {
			this.$refs.syncPopup.close();
		},

		// 加载同步状态
		loadSyncStatus() {
			if (!this.isLoggedIn || !this.userInfo.id) return;
			
			const syncStatusKey = STORAGE_KEYS.SYNC_STATUS(this.userInfo.id);
			const syncStatusData = safeGetStorage(syncStatusKey);
			
			if (syncStatusData) {
				this.syncStatus = syncStatusData.status || 'none';
				this.syncError = syncStatusData.error || '';
				
				if (syncStatusData.lastSync) {
					const date = new Date(syncStatusData.lastSync);
					this.lastSyncTime = date.toLocaleString();
				} else {
					this.lastSyncTime = '从未同步';
				}
			} else {
				this.syncStatus = 'none';
				this.lastSyncTime = '从未同步';
				this.syncError = '';
			}
		},
		
		// 加载同步统计数据
		loadSyncStats() {
			if (!this.isLoggedIn || !this.userInfo.id) return;
			
			const userId = this.userInfo.id;
			
			const favorites = safeGetStorage(STORAGE_KEYS.FAVORITE_SONGS(userId)) || [];
			const history = safeGetStorage(STORAGE_KEYS.PLAY_HISTORY(userId)) || [];
			const playlists = safeGetStorage(STORAGE_KEYS.PLAYLISTS(userId)) || [];
			
			this.syncStats = {
				favorites: favorites.length,
				history: history.length,
				playlists: playlists.length
			};
		},
		
		// 开始手动同步
		async startManualSync() {
			if (!this.isLoggedIn || !this.userInfo.id) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			
			if (this.isSyncing) return;
			
			try {
				this.isSyncing = true;
				this.syncStatus = 'syncing';
				this.syncError = '';
				
				uni.showLoading({
					title: '正在同步数据...',
					mask: true
				});
				
				const result = await syncAllUserData(this.userInfo.id);
				
				uni.hideLoading();
				
				if (result.code === 200) {
					uni.showToast({
						title: '同步成功',
						icon: 'success'
					});
				} else {
					uni.showToast({
						title: result.message || '部分同步成功',
						icon: 'none'
					});
				}
				
			} catch (error) {
				uni.hideLoading();
				
				uni.showToast({
					title: '同步失败，请稍后重试',
					icon: 'none'
				});
				
				console.error('手动同步失败:', error);
				this.syncError = error.message || '未知错误';
			} finally {
				this.isSyncing = false;
				this.loadSyncStatus();
				this.loadSyncStats();
			}
		}
	}
}
</script>

<style lang="scss">
@import "@/scss/user.scss";
</style>
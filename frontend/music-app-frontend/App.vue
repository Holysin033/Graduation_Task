<script>
	import { checkLoginStatus, navigateToLogin } from '@/utils/auth.js'
	import { fixPlaylistsData } from '@/utils/syncService.js'

	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			// 检查本地存储中的登录信息
			const userInfo = uni.getStorageSync('userInfo');
			const token = uni.getStorageSync('token');
			
			// 如果有用户信息和token，尝试恢复登录状态
			if (userInfo && token) {
				console.log('发现本地存储的用户信息，尝试恢复登录状态');
				// 获取用户ID
				const userId = typeof userInfo === 'string' ? JSON.parse(userInfo).id : userInfo.id;
				
				// 确保用户ID存储在全局位置，方便其他组件使用
				uni.setStorageSync('userId', userId);
				
				// 修复播放列表数据格式问题
				this.fixPlaylistsData(userId);
				
				// 触发登录成功事件，通知各页面恢复登录状态
				setTimeout(() => {
					uni.$emit('login_success', { 
						userId: userId,
						fromAppLaunch: true
					});
				}, 500);
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 修复播放列表数据格式问题
			async fixPlaylistsData(userId) {
				if (!userId) return;
				
				console.log('尝试修复用户播放列表数据格式问题...');
				try {
					const result = await fixPlaylistsData(userId);
					console.log('播放列表数据修复结果:', result);
					
					if (result.fixed) {
						// 如果修复了数据，确保UI及时更新
						setTimeout(() => {
							uni.$emit('playlists_updated', {
								userId: userId,
								timestamp: new Date().getTime()
							});
						}, 1000);
					}
				} catch (error) {
					console.error('修复播放列表数据出错:', error);
				}
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/node_modules/uview-ui/index.scss";
	@import "@/node_modules/uview-ui/theme.scss";

	/* 引入字体图标 */
	@import "@/static/fonts/iconfont.css";

	/* 全局样式 */
	page {
		background-color: #f8f8f8;
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
			Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei',
			sans-serif;
	}

	/* 去除按钮默认边框 */
	button::after {
		border: none;
	}

	/* 去除导航栏边框 */
	.uni-page-head {
		border-bottom-width: 0;
	}
</style>

<template>
	<view class="login-container">
		<view class="login-box">
			<view class="title">登录</view>
			
			<view class="input-group">
				<input type="number" v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
				<input type="safe-password" v-model="form.password" placeholder="请输入密码" password/>
			</view>
			
			<button class="login-btn" @click="login">登录</button>
			
			<button class="guest-btn" @click="enterGuestMode">游客模式</button>
			
			<view class="register-link" @click="goToRegister">没有账号？立即注册</view>
			
			<view class="test-account">
				<text>测试账号：18561265910</text>
				<text>测试密码：123456</text>
			</view>
		</view>
	</view>
</template>

<script>
import { login as oldLogin, setGuestMode } from '@/utils/musicData.js'; // 导入游客模式设置函数
import authService from '@/utils/authService.js'; // 导入新的认证服务
import { initSyncAfterLogin } from '@/utils/syncService.js'; // 直接导入同步函数

export default {
	data() {
		return {
			form: {
				phone: '',
				password: ''
			},
			isLoading: false,
			rules: {
				phone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					{ pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
				]
			},
			useNewAuth: true, // 设置为true使用新的认证服务，false使用旧的模拟登录
			errorMessage: ''
		}
	},
	onLoad() {
		// 页面加载时可以执行的初始化操作
	},
	methods: {
		// 进入游客模式
		enterGuestMode() {
			// 启用游客模式
			setGuestMode(true)
			
			// 清除可能存在的登录信息
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('token')
			
			// 显示提示
			uni.showToast({
				title: '已进入游客模式',
				icon: 'success',
				duration: 1500
			})
			
			// 延迟后跳转到首页
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}, 1500)
		},
		
		async login() {
			// 表单验证
			const valid = this.validateForm()
			if (!valid) return;
			
			this.isLoading = true
			this.errorMessage = ''
			
			try {
				// 确保退出游客模式
				setGuestMode(false)
				
				let result;
				
				if (this.useNewAuth) {
					// 使用新的认证服务 (连接到MySQL数据库)
					result = await authService.loginByPhone(this.form.phone, this.form.password);
				} else {
					// 使用旧的模拟登录
					result = await oldLogin(this.form.phone, this.form.password);
				}
				
				// 登录成功，保存用户信息并跳转到个人中心页面
				this.handleLoginSuccess(result)
			} catch (error) {
				// 登录失败，显示错误信息
				this.errorMessage = error.message || '登录失败，请检查账号和密码'
				uni.showToast({
					title: this.errorMessage,
					icon: 'none'
				})
			} finally {
				this.isLoading = false
			}
		},
		
		// 表单验证
		validateForm() {
			// 验证手机号
			if (!this.form.phone) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				})
				return false
			}
			
			// 验证手机号格式
			if (!/^1[3-9]\d{9}$/.test(this.form.phone)) {
				uni.showToast({
					title: '手机号格式不正确',
					icon: 'none'
				})
				return false
			}
			
			// 验证密码
			if (!this.form.password) {
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				})
				return false
			}
			
			// 验证密码长度
			if (this.form.password.length < 6) {
				uni.showToast({
					title: '密码长度不能小于6位',
					icon: 'none'
				})
				return false
			}
			
			return true
		},
		
		// 处理登录成功
		handleLoginSuccess(result) {
			try {
				// 确保result.profile包含必要的用户信息
				if (!result.profile || !result.profile.id) {
					console.error('登录成功但返回的用户信息不完整:', result);
					throw new Error('登录成功但用户信息不完整');
				}
				
				const userId = result.profile.id;
				
				// 设置token与用户ID一致，确保checkLoginStatus能正确验证
				uni.setStorageSync('token', userId);
				
				// 保存用户信息，确保包含id字段
				const userInfo = {
					...result.profile,
					id: userId
				};
				uni.setStorageSync('userInfo', userInfo);
				
				console.log('已保存用户信息和token:', {
					userId,
					hasToken: !!userId,
					userInfo: JSON.stringify(userInfo).substring(0, 100) + '...'
				});
				
				// 显示登录成功提示
				uni.showToast({
					title: '登录成功',
					icon: 'success'
				});
				
				// 先迁移本地数据到用户特定键名
				this.migrateLocalData(userId);
				
				// 触发登录成功事件
				uni.$emit('login_success', { userId });
				
				// 在跳转前添加一个短暂的延迟，确保数据已更新
				setTimeout(() => {
					// 使用reLaunch而不是switchTab，强制重新加载页面
					uni.reLaunch({
						url: '/pages/user/user'
					});
				}, 300);
				
				// 后台进行数据同步，不阻塞用户操作
				this.syncUserData(userId).then(() => {
					console.log('后台数据同步完成');
				}).catch(error => {
					console.error('后台数据同步出错:', error);
				});
			} catch (error) {
				console.error('处理登录成功时出错:', error);
				// 显示错误提示
				uni.showToast({
					title: '登录处理失败，请重试',
					icon: 'none'
				});
			}
		},
		
		// 迁移本地数据到用户特定键名
		migrateLocalData(userId) {
			try {
				console.log('开始迁移本地数据到用户特定键名')
				
				// 1. 迁移收藏数据
				const favoriteSongs = uni.getStorageSync('favoriteSongs') || []
				if (favoriteSongs.length > 0) {
					console.log(`发现 ${favoriteSongs.length} 条收藏记录，正在迁移`)
					uni.setStorageSync(`user_${userId}_favoriteSongs`, favoriteSongs)
				}
				
				// 2. 迁移播放历史
				const playHistory = uni.getStorageSync('playHistory') || []
				if (playHistory.length > 0) {
					console.log(`发现 ${playHistory.length} 条播放历史，正在迁移`)
					uni.setStorageSync(`user_${userId}_playHistory`, playHistory)
				}
				
				// 3. 迁移歌单
				const playlists = uni.getStorageSync('playlists') || []
				if (playlists.length > 0) {
					console.log(`发现 ${playlists.length} 个歌单，正在迁移`)
					uni.setStorageSync(`user_${userId}_playlists`, playlists)
				}
				
				// 4. 迁移当前播放数据
				const currentSong = uni.getStorageSync('currentSong')
				if (currentSong) {
					uni.setStorageSync(`user_${userId}_currentSong`, currentSong)
				}
				
				const playList = uni.getStorageSync('playList')
				if (playList) {
					uni.setStorageSync(`user_${userId}_playList`, playList)
				}
				
				console.log('本地数据迁移完成')
			} catch (error) {
				console.error('迁移本地数据失败:', error)
			}
		},
		// 同步用户数据
		async syncUserData(userId) {
			try {
				// 使用改进后的同步函数，带有UI交互选项和强制同步选项
				const syncOptions = { 
					showToast: true, 
					forceSyncLocalData: true // 强制同步本地数据即使服务器已有数据
				}
				
				const syncResult = await initSyncAfterLogin(userId, syncOptions)
				
				console.log('数据同步结果:', syncResult)
				
				// 同步播放历史记录
				try {
					const { syncAllPlayHistoryToDatabase } = require('@/utils/musicData.js');
					const historyResult = await syncAllPlayHistoryToDatabase();
					if (historyResult.success) {
						console.log('播放历史同步成功:', historyResult.message);
					} else {
						console.warn('播放历史同步未完全成功:', historyResult.message);
					}
				} catch (historyError) {
					console.error('播放历史同步出错:', historyError);
				}
				
				if (syncResult.code === 200) {
					// 同步成功
					uni.showToast({
						title: '数据同步成功',
						icon: 'success',
						duration: 1500
					})
					return Promise.resolve()
				} else if (syncResult.code === -1) {
					// 网络未连接
					uni.showToast({
						title: '网络未连接，将使用本地数据',
						icon: 'none',
						duration: 2000
					})
					return Promise.resolve()
				} else if (syncResult.fallbackToAnonymous) {
					// 使用了匿名数据作为备份
					uni.showToast({
						title: '数据同步失败，已转移本地数据',
						icon: 'none',
						duration: 2000
					})
					return Promise.resolve()
				} else {
					// 其他错误
					throw new Error(syncResult.message || '数据同步失败')
				}
			} catch (error) {
				console.error('数据同步失败:', error)
				uni.showToast({
					title: '数据同步失败，可能影响使用体验',
					icon: 'none',
					duration: 2000
				})
				return Promise.reject(error)
			}
		},
		
		// 跳转到注册页面
		goToRegister() {
			uni.navigateTo({
				url: '/pages/register/register'
			})
		},
		
		// 返回上一页
		goBack() {
			uni.navigateBack()
		}
	}
}
</script>

<style lang="scss">
@import "@/scss/login.scss";
</style> 
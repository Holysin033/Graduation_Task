<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<text class="iconfont icon-back" @click="goBack"></text>
			<text class="title">设置</text>
		</view>
		
		<!-- 设置列表 -->
		<view class="settings-list">
			<view class="settings-group">
				<view class="settings-title">账号设置</view>
				<view class="settings-item" @click="goToProfile">
					<text class="item-title">个人资料</text>
					<text class="iconfont icon-right"></text>
				</view>
				<view class="settings-item" @click="goToSecurity">
					<text class="item-title">账号安全</text>
					<text class="iconfont icon-right"></text>
				</view>
			</view>
			
			<view class="settings-group">
				<view class="settings-title">应用设置</view>
				<view class="settings-item">
					<text class="item-title">自动播放</text>
					<u-switch v-model="settings.autoPlay" @change="saveSettings"></u-switch>
				</view>
				<view class="settings-item">
					<text class="item-title">后台播放</text>
					<u-switch v-model="settings.backgroundPlay" @change="saveSettings"></u-switch>
				</view>
				<view class="settings-item">
					<text class="item-title">主题切换</text>
					<view class="item-value" @click="showThemeSelector">
						<text>{{themeOptions[settings.theme]}}</text>
						<text class="iconfont icon-right"></text>
					</view>
				</view>
				<view class="settings-item">
					<text class="item-title">游客模式</text>
					<view class="guest-mode-switch">
						<u-switch v-model="isGuestMode" @change="toggleGuestMode"></u-switch>
					</view>
				</view>
			</view>
			
			<view class="settings-group">
				<view class="settings-title">其他</view>
				<view class="settings-item" @click="goToAbout">
					<text class="item-title">关于我们</text>
					<text class="iconfont icon-right"></text>
				</view>
				<view class="settings-item" @click="clearCache">
					<text class="item-title">清除缓存</text>
					<text class="cache-size">{{cacheSize}}</text>
				</view>
				<view class="settings-item" @click="goToFixData" v-if="isAdmin">
					<text class="item-title">数据修复</text>
					<text class="iconfont icon-right"></text>
				</view>
			</view>
		</view>
		
		<!-- 主题选择弹窗 -->
		<u-popup v-model="showTheme" mode="bottom">
			<view class="theme-popup">
				<view class="popup-header">
					<text class="popup-title">主题切换</text>
					<text class="popup-close" @click="showTheme = false">关闭</text>
				</view>
				<view class="theme-options">
					<view 
						class="theme-option" 
						v-for="(name, value) in themeOptions" 
						:key="value"
						:class="{ active: settings.theme === value }"
						@click="selectTheme(value)"
					>
						<text>{{name}}</text>
						<text class="iconfont icon-check" v-if="settings.theme === value"></text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { checkLoginStatus } from '@/utils/auth.js'
import { setGuestMode, isInGuestMode } from '@/utils/musicData.js' // 导入游客模式相关函数

export default {
	data() {
		return {
			settings: {
				autoPlay: true,
				backgroundPlay: true,
				theme: 'light'
			},
			themeOptions: {
				'light': '浅色主题',
				'dark': '深色主题',
				'system': '跟随系统'
			},
			showTheme: false,
			cacheSize: '0MB',
			isAdmin: false,
			isGuestMode: false
		}
	},
	onShow() {
		// 检查登录状态
		if (!checkLoginStatus() && !isInGuestMode()) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
			return
		}
		
		// 获取设置
		this.getSettings()
		// 获取缓存大小
		this.getCacheSize()
		// 检查是否是管理员
		this.checkIsAdmin()
		// 检查是否是游客模式
		this.isGuestMode = isInGuestMode()
	},
	methods: {
		// 获取设置
		getSettings() {
			const settings = uni.getStorageSync('appSettings')
			if (settings) {
				this.settings = JSON.parse(settings)
				// 兼容旧版本设置，如果没有theme属性则添加默认值
				if (!this.settings.hasOwnProperty('theme')) {
					this.settings.theme = 'light'
					this.saveSettings()
				}
			}
		},
		
		// 保存设置
		saveSettings() {
			uni.setStorageSync('appSettings', JSON.stringify(this.settings))
		},
		
		// 显示主题选择器
		showThemeSelector() {
			this.showTheme = true
		},
		
		// 选择主题
		selectTheme(theme) {
			this.settings.theme = theme
			this.saveSettings()
			this.showTheme = false
			
			// 应用主题
			this.applyTheme(theme)
		},
		
		// 应用主题
		applyTheme(theme) {
			// 根据选择的主题应用相应的样式
			switch(theme) {
				case 'dark':
					// 应用深色主题
					uni.setTabBarStyle({
						backgroundColor: '#222222',
						borderStyle: 'black'
					})
					break
				case 'light':
					// 应用浅色主题
					uni.setTabBarStyle({
						backgroundColor: '#ffffff',
						borderStyle: 'white'
					})
					break
				case 'system':
					// 获取系统主题并应用
					uni.getSystemInfo({
						success: (res) => {
							const isDark = res.theme === 'dark'
							uni.setTabBarStyle({
								backgroundColor: isDark ? '#222222' : '#ffffff',
								borderStyle: isDark ? 'black' : 'white'
							})
						}
					})
					break
			}
		},
		
		// 获取缓存大小
		getCacheSize() {
			// 这里可以计算应用缓存大小
			// 目前使用模拟数据
			this.cacheSize = '12.5MB'
		},
		
		// 清除缓存
		clearCache() {
			uni.showModal({
				title: '提示',
				content: '确定要清除缓存吗？',
				success: (res) => {
					if (res.confirm) {
						// 清除缓存
						uni.clearStorageSync()
						// 保留用户信息
						const userInfo = uni.getStorageSync('userInfo')
						const cookie = uni.getStorageSync('cookie')
						if (userInfo) {
							uni.setStorageSync('userInfo', userInfo)
						}
						if (cookie) {
							uni.setStorageSync('cookie', cookie)
						}
						// 更新缓存大小
						this.cacheSize = '0MB'
						// 提示清除成功
						uni.showToast({
							title: '清除成功',
							icon: 'success'
						})
					}
				}
			})
		},
		
		// 跳转到个人资料页面
		goToProfile() {
			uni.navigateTo({
				url: '/pages/user/profile'
			})
		},
		
		// 跳转到账号安全页面
		goToSecurity() {
			uni.navigateTo({
				url: '/pages/user/security'
			})
		},
		
		// 跳转到关于页面
		goToAbout() {
			uni.navigateTo({
				url: '/pages/user/about'
			})
		},
		
		// 返回上一页
		goBack() {
			uni.navigateBack()
		},
		
		// 检查是否是管理员
		checkIsAdmin() {
			const userInfo = uni.getStorageSync('userInfo')
			if (userInfo && userInfo.role === 'admin') {
				this.isAdmin = true
			} else {
				// 开发环境默认开启管理员功能，方便调试
				// #ifdef APP-PLUS
				this.isAdmin = true
				// #endif
				
				// 临时：为了便于修复此次数据问题，向所有用户开放数据修复功能
				this.isAdmin = true
			}
		},
		
		// 跳转到数据修复页面
		goToFixData() {
			uni.navigateTo({
				url: '/pages/admin/fix-data'
			})
		},
		
		// 切换游客模式
		toggleGuestMode(value) {
			// 判断是开启还是关闭游客模式
			if (value) {
				// 开启游客模式，需要确认是否退出登录
				uni.showModal({
					title: '退出登录',
					content: '开启游客模式将退出当前账号，是否继续？',
					confirmText: '确认退出',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							// 用户确认退出
							// 使用 musicData.js 中的方法设置游客模式
							setGuestMode(true)
							
							// 清除登录信息
							uni.removeStorageSync('userInfo')
							uni.removeStorageSync('token')
							
							// 提示用户
							uni.showToast({
								title: '已退出登录，进入游客模式',
								icon: 'none',
								duration: 2000
							})
						} else {
							// 用户取消，恢复开关状态
							this.isGuestMode = false
						}
					}
				})
			} else {
				// 关闭游客模式，跳转到登录页面
				uni.showModal({
					title: '退出游客模式',
					content: '需要登录账号才能退出游客模式，是否前往登录？',
					confirmText: '去登录',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							// 设置游客模式状态
							setGuestMode(false)
							
							// 跳转到登录页面
							uni.navigateTo({
								url: '/pages/login/login'
							})
						} else {
							// 用户取消，恢复开关状态
							this.isGuestMode = true
						}
					}
				})
			}
		}
	}
}
</script>

<style lang="scss">
@import '@/scss/user.scss';

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

.settings-list {
	padding: 20rpx;
	
	.settings-group {
		margin-bottom: 20rpx;
		background-color: #fff;
		border-radius: 12rpx;
		overflow: hidden;
		
		.settings-title {
			padding: 20rpx 30rpx;
			font-size: 28rpx;
			color: #999;
		}
		
		.settings-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx;
			background-color: #fff;
			border-bottom: 1rpx solid #f5f5f5;
			
			&:last-child {
				border-bottom: none;
			}
			
			.item-title {
				font-size: 30rpx;
				color: #333;
			}
			
			.item-value {
				display: flex;
				align-items: center;
				
				text {
					font-size: 28rpx;
					color: #999;
					margin-right: 10rpx;
				}
				
				.icon-right {
					font-size: 24rpx;
					color: #999;
				}
			}
			
			.cache-size {
				font-size: 28rpx;
				color: #999;
			}
		}
	}
}

.theme-popup {
	background-color: #fff;
	border-radius: 24rpx 24rpx 0 0;
	padding: 30rpx;
	
	.popup-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;
		
		.popup-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
		}
		
		.popup-close {
			font-size: 28rpx;
			color: #999;
		}
	}
	
	.theme-options {
		.theme-option {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 0;
			border-bottom: 1rpx solid #f5f5f5;
			
			&:last-child {
				border-bottom: none;
			}
			
			text {
				font-size: 30rpx;
				color: #333;
			}
			
			.icon-check {
				color: #007AFF;
			}
			
			&.active {
				text {
					color: #007AFF;
				}
			}
		}
	}
}
</style> 
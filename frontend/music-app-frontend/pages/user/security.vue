<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<text class="iconfont icon-back" @click="goBack"></text>
			<text class="title">账号安全</text>
		</view>
		
		<!-- 安全设置列表 -->
		<view class="security-list">
			<view class="security-item" @click="showChangePassword">
				<view class="item-info">
					<text class="item-title">修改密码</text>
					<text class="item-desc">定期修改密码可以保障账号安全</text>
				</view>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		
		<!-- 修改密码弹窗 -->
		<uni-popup ref="passwordPopup" type="center">
			<view class="popup-container">
				<view class="popup-title">修改密码</view>
				
				<view class="form-item">
					<text class="label">当前密码</text>
					<input type="password" v-model="passwordForm.oldPassword" placeholder="请输入当前密码" />
				</view>
				
				<view class="form-item">
					<text class="label">新密码</text>
					<input type="password" v-model="passwordForm.newPassword" placeholder="请输入6位以上新密码" />
				</view>
				
				<view class="form-item">
					<text class="label">确认密码</text>
					<input type="password" v-model="passwordForm.confirmPassword" placeholder="请再次输入新密码" />
				</view>
				
				<view class="error-message" v-if="errorMessage">{{errorMessage}}</view>
				
				<view class="popup-buttons">
					<button class="cancel-btn" @click="cancelChangePassword">取消</button>
					<button class="confirm-btn" @click="confirmChangePassword" :disabled="isSubmitting">
						{{isSubmitting ? '提交中...' : '确认修改'}}
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { checkLoginStatus } from '@/utils/auth.js'
import authService from '@/utils/authService.js'

export default {
	components: {
		uniPopup: () => import('@/uni_modules/uni-popup/components/uni-popup/uni-popup')
	},
	data() {
		return {
			passwordForm: {
				oldPassword: '',
				newPassword: '',
				confirmPassword: ''
			},
			errorMessage: '',
			isSubmitting: false
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
	},
	methods: {
		// 显示修改密码弹窗
		showChangePassword() {
			this.resetPasswordForm()
			this.$refs.passwordPopup.open('center')
		},
		
		// 取消修改密码
		cancelChangePassword() {
			this.$refs.passwordPopup.close()
			this.resetPasswordForm()
		},
		
		// 重置密码表单
		resetPasswordForm() {
			this.passwordForm = {
				oldPassword: '',
				newPassword: '',
				confirmPassword: ''
			}
			this.errorMessage = ''
		},
		
		// 确认修改密码
		async confirmChangePassword() {
			// 表单验证
			if (!this.validatePasswordForm()) {
				return
			}
			
			this.isSubmitting = true
			this.errorMessage = ''
			
			try {
				// 调用修改密码接口
				const result = await authService.updateUserInfo({
					oldPassword: this.passwordForm.oldPassword,
					password: this.passwordForm.newPassword
				})
				
				if (result.code === 200) {
					this.$refs.passwordPopup.close()
					this.resetPasswordForm()
					
					uni.showToast({
						title: '密码修改成功',
						icon: 'success'
					})
					
					// 密码修改成功后，提示用户重新登录
					setTimeout(() => {
						uni.showModal({
							title: '提示',
							content: '密码已修改，请重新登录',
							showCancel: false,
							success: async () => {
								// 调用登出方法清除用户信息，会自动跳转到登录页面
								await authService.logout()
								
								// 不需要跳转代码，authService.logout()已经处理
							}
						})
					}, 1500)
				} else {
					this.errorMessage = result.message || '修改密码失败'
				}
			} catch (error) {
				console.error('修改密码失败:', error)
				this.errorMessage = error.message || '修改密码失败，请重试'
			} finally {
				this.isSubmitting = false
			}
		},
		
		// 验证密码表单
		validatePasswordForm() {
			// 验证当前密码
			if (!this.passwordForm.oldPassword) {
				this.errorMessage = '请输入当前密码'
				return false
			}
			
			// 验证新密码
			if (!this.passwordForm.newPassword) {
				this.errorMessage = '请输入新密码'
				return false
			}
			
			// 验证新密码长度
			if (this.passwordForm.newPassword.length < 6) {
				this.errorMessage = '新密码不能少于6位'
				return false
			}
			
			// 验证确认密码
			if (!this.passwordForm.confirmPassword) {
				this.errorMessage = '请确认新密码'
				return false
			}
			
			// 验证两次密码是否一致
			if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
				this.errorMessage = '两次输入的密码不一致'
				return false
			}
			
			// 验证新密码与旧密码不同
			if (this.passwordForm.oldPassword === this.passwordForm.newPassword) {
				this.errorMessage = '新密码不能与当前密码相同'
				return false
			}
			
			return true
		},
		
		// 返回上一页
		goBack() {
			uni.navigateBack()
		}
	}
}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f8f8f8;
}

.nav-bar {
	display: flex;
	align-items: center;
	height: 90rpx;
	background-color: #fff;
	padding: 0 30rpx;
	border-bottom: 1rpx solid #f1f1f1;
	
	.icon-back {
		font-size: 40rpx;
		color: #333;
	}
	
	.title {
		flex: 1;
		text-align: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #333;
		margin-right: 40rpx;
	}
}

.security-list {
	margin-top: 20rpx;
	background-color: #fff;
	
	.security-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
		border-bottom: 1rpx solid #f1f1f1;
		
		.item-info {
			display: flex;
			flex-direction: column;
			
			.item-title {
				font-size: 30rpx;
				color: #333;
				margin-bottom: 10rpx;
			}
			
			.item-desc {
				font-size: 24rpx;
				color: #999;
			}
		}
		
		.icon-right {
			font-size: 36rpx;
			color: #999;
		}
	}
}

.popup-container {
	background-color: #fff;
	padding: 40rpx;
	border-radius: 10rpx;
	width: 80vw;
	
	.popup-title {
		font-size: 34rpx;
		font-weight: bold;
		color: #333;
		text-align: center;
		margin-bottom: 40rpx;
	}
	
	.form-item {
		margin-bottom: 30rpx;
		
		.label {
			display: block;
			font-size: 28rpx;
			color: #666;
			margin-bottom: 10rpx;
		}
		
		input {
			width: 100%;
			height: 80rpx;
			background-color: #f8f8f8;
			border-radius: 8rpx;
			padding: 0 20rpx;
			font-size: 28rpx;
			color: #333;
			box-sizing: border-box;
		}
	}
	
	.error-message {
		color: #ff5151;
		font-size: 24rpx;
		margin-bottom: 20rpx;
		text-align: center;
	}
	
	.popup-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		
		button {
			width: 45%;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			border-radius: 8rpx;
			border: none;
			margin: 0;
			padding: 0;
			
			&.cancel-btn {
				background-color: #f5f5f5;
				color: #666;
			}
			
			&.confirm-btn {
				background-color: #1296db;
				color: #fff;
				
				&:disabled {
					opacity: 0.7;
				}
			}
		}
	}
}
</style> 
<template>
	<view class="register-container">
		<view class="header">
			<view class="back-btn" @click="goBack">
				<text class="iconfont icon-back"></text>
			</view>
			<view class="title">注册账号</view>
		</view>
		
		<view class="form">
			<view class="form-item">
				<text class="label">用户名</text>
				<input type="text" v-model="form.username" placeholder="请输入用户名（选填，默认使用手机号）" />
			</view>
			
			<view class="form-item">
				<text class="label">手机号</text>
				<input type="number" v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
			</view>
			
			<view class="form-item">
				<text class="label">密码</text>
				<input type="password" v-model="form.password" placeholder="请输入密码（不少于6位）" />
			</view>
			
			<view class="form-item">
				<text class="label">确认密码</text>
				<input type="password" v-model="form.confirmPassword" placeholder="请再次输入密码" />
			</view>
		</view>
		
		<view class="error-message" v-if="errorMessage">{{errorMessage}}</view>
		
		<button class="register-btn" :disabled="isLoading" @click="register">
			{{isLoading ? '正在注册...' : '注册'}}
		</button>
		
		<view class="login-link" @click="goToLogin">已有账号？立即登录</view>
	</view>
</template>

<script>
import authService from '@/utils/authService.js';

export default {
	data() {
		return {
			form: {
				username: '',
				phone: '',
				password: '',
				confirmPassword: ''
			},
			isLoading: false,
			errorMessage: ''
		};
	},
	methods: {
		async register() {
			// 验证表单
			if (!this.validateForm()) {
				return;
			}
			
			this.isLoading = true;
			this.errorMessage = '';
			
			// 准备注册数据
			const regData = {
				username: this.form.username || this.form.phone, // 如果用户名为空，使用手机号
				phone: this.form.phone,
				password: this.form.password
			};
			
			console.log('准备提交注册数据:', {
				...regData,
				password: '******' // 密码不输出到日志
			});
			
			try {
				// 调用注册接口
				const result = await authService.register(regData);
				
				console.log('注册成功结果:', result);
				
				// 注册成功
				uni.showToast({
					title: '注册成功，请登录',
					icon: 'success'
				});
				
				// 跳转到登录页
				setTimeout(() => {
					this.goToLogin();
				}, 1500);
			} catch (error) {
				// 注册失败
				console.error('注册失败:', error);
				this.errorMessage = error.message || '注册失败，请重试';
				uni.showToast({
					title: this.errorMessage,
					icon: 'none'
				});
			} finally {
				this.isLoading = false;
			}
		},
		
		validateForm() {
			// 验证手机号
			if (!this.form.phone) {
				this.errorMessage = '请输入手机号';
				return false;
			}
			
			// 验证手机号格式
			if (!/^1[3-9]\d{9}$/.test(this.form.phone)) {
				this.errorMessage = '手机号格式不正确';
				return false;
			}
			
			// 验证密码
			if (!this.form.password) {
				this.errorMessage = '请输入密码';
				return false;
			}
			
			// 验证密码长度
			if (this.form.password.length < 6) {
				this.errorMessage = '密码长度不能小于6位';
				return false;
			}
			
			// 验证确认密码
			if (!this.form.confirmPassword) {
				this.errorMessage = '请再次输入密码';
				return false;
			}
			
			// 验证两次密码是否一致
			if (this.form.password !== this.form.confirmPassword) {
				this.errorMessage = '两次输入的密码不一致';
				return false;
			}
			
			this.errorMessage = '';
			return true;
		},
		
		goToLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		
		goBack() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss">
.register-container {
	padding: 30rpx;
	
	.header {
		display: flex;
		align-items: center;
		margin-bottom: 60rpx;
		
		.back-btn {
			font-size: 40rpx;
			margin-right: 30rpx;
		}
		
		.title {
			font-size: 36rpx;
			font-weight: bold;
		}
	}
	
	.form {
		margin-bottom: 30rpx;
		
		.form-item {
			margin-bottom: 30rpx;
			
			.label {
				display: block;
				margin-bottom: 15rpx;
				font-size: 28rpx;
				color: #666;
			}
			
			input {
				width: 100%;
				height: 80rpx;
				background-color: #f8f8f8;
				border-radius: 8rpx;
				padding: 0 20rpx;
				font-size: 28rpx;
			}
		}
	}
	
	.error-message {
		color: #ff4d4f;
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}
	
	.register-btn {
		width: 100%;
		height: 80rpx;
		background-color: #1296db;
		color: #fff;
		border-radius: 8rpx;
		font-size: 30rpx;
		line-height: 80rpx;
		margin-bottom: 30rpx;
		
		&:active {
			background-color: #0e7fc0;
		}
		
		&:disabled {
			background-color: #ccc;
		}
	}
	
	.login-link {
		text-align: center;
		font-size: 26rpx;
		color: #1296db;
		margin-top: 20rpx;
	}
}
</style> 
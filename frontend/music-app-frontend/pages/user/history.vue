<template>
	<view class="container">
		<!-- 导航栏 -->
		<view class="nav-bar">
			<view class="status-bar" :style="statusBarStyle"></view>
			<view class="nav-content">
				<view class="back-btn" @tap="goBack">
					<text class="iconfont icon-back"></text>
				</view>
				<view class="title">播放历史</view>
				<view class="placeholder" style="width: 60rpx;"></view>
			</view>
		</view>
		
		<!-- 历史记录列表 -->
		<scroll-view class="history-list" scroll-y :style="contentStyle">
			<!-- 有历史记录时 -->
			<view v-if="historyList.length > 0" class="list-content">
				<view class="list-header">
					<text class="total-count">{{ historyList.length }}条播放记录</text>
				</view>
				<view 
					class="history-item" 
					v-for="(item, index) in historyList" 
					:key="item.id" 
					@tap="playSong(item)"
				>
					<view class="song-info">
						<view class="song-name">{{item.name}}</view>
						<view class="song-artist">{{item.artist}}</view>
					</view>
					<view class="history-time">
						<text>{{formatTime(item.playTime)}}</text>
					</view>
					<view class="song-actions">
						<text class="iconfont icon-play"></text>
					</view>
				</view>
				
				<!-- 清空历史按钮 -->
				<view class="clear-btn" @tap="clearHistory">
					<text class="iconfont icon-delete"></text>
					<text>清空历史记录</text>
				</view>
			</view>
			
			<!-- 空状态 -->
			<view v-if="historyList.length === 0" class="empty-state">
				<image class="empty-image" src="/static/empty.png" mode="aspectFit"></image>
				<view class="empty-text">暂无播放历史</view>
				<view class="empty-tips">您还没有播放过任何歌曲</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { checkLoginStatus } from '@/utils/auth.js'
import { getPlayHistory, clearPlayHistory } from '@/utils/musicData.js'
import apiConfig from '@/utils/apiConfig.js'
import request from '@/utils/request.js'

// 新增：批量获取歌曲详情
async function fetchSongDetails(ids = []) {
	if (!ids.length) return [];
	try {
		const url = `${apiConfig.song.baseUrl}/song/detail?ids=${ids.join(',')}`;
		const res = await request(url, 'GET');
		if (res.code === 200 && res.songs) {
			return res.songs;
		}
	} catch (e) {
		console.warn('批量获取歌曲详情失败', e);
	}
	return [];
}

export default {
	data() {
		return {
			historyList: [],
			statusBarHeight: 25,
			loading: false
		}
	},
	computed: {
		// 计算状态栏样式
		statusBarStyle() {
			return {
				height: `${this.statusBarHeight}px`
			}
		},
		// 计算主内容区域样式
		contentStyle() {
			return {
				paddingTop: `${this.statusBarHeight + 100}rpx`
			}
		}
	},
	onLoad() {
		// 获取状态栏高度
		this.getStatusBarHeight();
	},
	onShow() {
		// 检查登录状态
		if (!checkLoginStatus()) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
			return
		}
		
		// 获取历史记录
		this.getHistoryList()
	},
	methods: {
		// 获取状态栏高度
		getStatusBarHeight() {
			try {
				const systemInfo = uni.getSystemInfoSync();
				this.statusBarHeight = systemInfo.statusBarHeight || 25;
			} catch (e) {
				console.error('获取状态栏高度失败:', e);
				this.statusBarHeight = 25; // 默认高度
			}
		},
		
		// 获取历史记录
		async getHistoryList() {
			try {
				this.loading = true;
				const userInfo = uni.getStorageSync('userInfo');
				let localHistory = getPlayHistory();
				if (userInfo && userInfo.id) {
					try {
						const url = `${apiConfig.history.baseUrl}${apiConfig.history.list(userInfo.id)}`;
						const response = await request(url, 'GET');
						if (response.code === 200 && response.data) {
							const serverHistory = response.data;
							const historyMap = new Map();
							localHistory.forEach(item => {
								historyMap.set(item.id + '_' + item.playTime, item);
							});
							serverHistory.forEach(item => {
								const key = item.id + '_' + item.playTime;
								historyMap.set(key, item);
							});
							let merged = Array.from(historyMap.values())
								.filter(item => item.playTime && !isNaN(item.playTime));
							// 检查是否有缺失歌曲信息的记录
							const missingInfoIds = merged.filter(item => !item.name).map(item => item.id);
							if (missingInfoIds.length) {
								const details = await fetchSongDetails(missingInfoIds);
								merged = merged.map(item => {
									if (!item.name) {
										const detail = details.find(d => d.id === item.id);
										if (detail) {
											return {
												...item,
												name: detail.name,
												artist: detail.ar || (detail.ar && detail.ar.map(a => a.name).join('/')) || detail.artist || '',
												duration: detail.dt || detail.duration || 0
											};
										}
									}
									return item;
								});
							}
							// 过滤无效数据，按时间排序
							this.historyList = merged.filter(item => item.name && item.playTime)
								.sort((a, b) => b.playTime - a.playTime);
						} else {
							this.historyList = localHistory.filter(item => item.name && item.playTime);
						}
					} catch (error) {
						console.warn('从服务器获取历史记录失败，使用本地数据:', error);
						this.historyList = localHistory.filter(item => item.name && item.playTime);
					}
				} else {
					this.historyList = localHistory.filter(item => item.name && item.playTime);
				}
			} catch (error) {
				console.error('加载历史记录失败：', error);
				uni.showToast({
					title: '加载历史记录失败',
					icon: 'none'
				});
			} finally {
				this.loading = false;
			}
		},
		
		// 播放歌曲
		playSong(song) {
			// 将歌曲添加到播放队列
			uni.$emit('addToPlaylist', song)
			// 跳转到播放页面
			uni.switchTab({
				url: '/pages/player/player'
			})
		},
		
		// 清空历史记录
		async clearHistory() {
			uni.showModal({
				title: '提示',
				content: '确定要清空播放历史吗？',
				confirmColor: '#8e71c7',
				success: async (res) => {
					if (res.confirm) {
						try {
							const userInfo = uni.getStorageSync('userInfo');
							
							// 清空本地历史记录
							const localResult = clearPlayHistory();
							
							// 如果用户已登录，同时清空服务器历史记录
							if (userInfo && userInfo.id) {
								try {
									const url = `${apiConfig.history.baseUrl}${apiConfig.history.clear(userInfo.id)}`;
									const response = await request(url, 'DELETE');
									
									if (response.code === 200) {
										this.historyList = [];
										uni.showToast({
											title: '清空成功',
											icon: 'success'
										});
									} else {
										throw new Error(response.message || '清空失败');
									}
								} catch (error) {
									console.error('清空服务器历史记录失败:', error);
									// 如果服务器清空失败，但本地清空成功，仍然显示成功
									if (localResult.success) {
										this.historyList = [];
										uni.showToast({
											title: '本地历史记录已清空',
											icon: 'success'
										});
									} else {
										throw error;
									}
								}
							} else {
								// 未登录用户只清空本地记录
								if (localResult.success) {
									this.historyList = [];
									uni.showToast({
										title: localResult.message,
										icon: 'success'
									});
								} else {
									uni.showToast({
										title: localResult.message,
										icon: 'none'
									});
								}
							}
						} catch (error) {
							console.error('清空历史记录失败:', error);
							uni.showToast({
								title: '清空失败，请重试',
								icon: 'none'
							});
						}
					}
				}
			});
		},
		
		// 格式化时间
		formatTime(timestamp) {
			if (!timestamp || isNaN(timestamp)) return '';
			const now = new Date().getTime();
			const diff = now - timestamp;
			if (diff < 0) return '';
			if (diff < 3600000) {
				const minutes = Math.floor(diff / 60000);
				return `${minutes}分钟前`;
			}
			if (diff < 86400000) {
				const hours = Math.floor(diff / 3600000);
				return `${hours}小时前`;
			}
			if (diff < 2592000000) {
				const days = Math.floor(diff / 86400000);
				return `${days}天前`;
			}
			const date = new Date(timestamp);
			if (isNaN(date.getTime())) return '';
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
	background-color: #f9f9f9;
	position: relative;
	
	.nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		background: linear-gradient(135deg, #8e71c7, #61a0e4);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		
		.status-bar {
			height: var(--status-bar-height, 15px);
		}
		
		.nav-content {
			display: flex;
			align-items: center;
			height: 100rpx;
			padding: 0 30rpx;
		
			.back-btn {
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				background-color: rgba(255, 255, 255, 0.2);
				
				.iconfont {
					font-size: 36rpx;
					color: #ffffff;
				}
			}
			
			.title {
				flex: 1;
				text-align: center;
				font-size: 34rpx;
				color: #ffffff;
				font-weight: 600;
				letter-spacing: 2rpx;
			}
		}
	}
	
	.history-list {
		height: 100vh;
		padding-top: calc(var(--status-bar-height, 25px) + 100rpx);
		
		.list-content {
			padding: 20rpx 30rpx;
			position: relative;
			
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(255, 255, 255, 0.8);
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 1;
				opacity: 0;
				pointer-events: none;
				transition: opacity 0.3s;
			}
			
			&.loading::after {
				opacity: 1;
				pointer-events: auto;
				
				&::before {
					content: '加载中...';
					font-size: 28rpx;
					color: #666;
				}
			}
		}
		
		.list-header {
			padding: 20rpx 10rpx 30rpx;
			
			.total-count {
				font-size: 28rpx;
				color: #888;
				font-weight: 500;
				position: relative;
				display: inline-block;
				
				&::after {
					content: '';
					position: absolute;
					bottom: -6rpx;
					left: 0;
					width: 40%;
					height: 4rpx;
					background: linear-gradient(90deg, #8e71c7, transparent);
					border-radius: 4rpx;
				}
			}
		}
		
		.history-item {
			display: flex;
			align-items: center;
			padding: 24rpx;
			margin-bottom: 24rpx;
			background-color: #ffffff;
			border-radius: 16rpx;
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
			transition: all 0.3s;
			
			&:active {
				transform: scale(0.98);
				opacity: 0.9;
			}
			
			.song-info {
				flex: 1;
				
				.song-name {
					font-size: 30rpx;
					color: #333;
					margin-bottom: 12rpx;
					font-weight: 500;
				}
				
				.song-artist {
					font-size: 24rpx;
					color: #888;
					background-color: #f5f5f5;
					padding: 4rpx 12rpx;
					border-radius: 20rpx;
					display: inline-block;
				}
			}
			
			.history-time {
				margin: 0 20rpx;
				
				text {
					font-size: 24rpx;
					color: #999;
					padding: 4rpx 10rpx;
					background-color: rgba(142, 113, 199, 0.1);
					border-radius: 20rpx;
				}
			}
			
			.song-actions {
				.icon-play {
					font-size: 44rpx;
					color: #61a0e4;
					filter: drop-shadow(0 0 2rpx rgba(97, 160, 228, 0.3));
				}
			}
		}
		
		.empty-state {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-top: 20vh;
			
			.empty-image {
				width: 240rpx;
				height: 240rpx;
				margin-bottom: 30rpx;
				opacity: 0.8;
			}
			
			.empty-text {
				font-size: 32rpx;
				color: #999;
				letter-spacing: 2rpx;
				background: linear-gradient(to right, #8e71c7, #61a0e4);
				-webkit-background-clip: text;
				color: transparent;
				font-weight: 500;
				margin-bottom: 10rpx;
			}
			
			.empty-tips {
				font-size: 26rpx;
				color: #aaa;
				max-width: 80%;
				text-align: center;
			}
		}
		
		.clear-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 40rpx auto;
			height: 88rpx;
			background: linear-gradient(to right, #ff6b6b, #ff4d4f);
			border-radius: 44rpx;
			width: 60%;
			box-shadow: 0 4rpx 16rpx rgba(255, 77, 79, 0.2);
			transition: all 0.3s;
			
			&:active {
				transform: scale(0.96);
				opacity: 0.9;
			}
			
			.icon-delete {
				font-size: 32rpx;
				color: #fff;
				margin-right: 10rpx;
			}
			
			text {
				font-size: 28rpx;
				color: #fff;
				letter-spacing: 2rpx;
			}
		}
	}
}
</style> 
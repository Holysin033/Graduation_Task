<template>
	<view class="container">
		<!-- 导航栏 -->
		<view class="nav-bar">
			<view class="status-bar" :style="statusBarStyle"></view>
			<view class="nav-content">
				<view class="back-btn" @tap="goBack">
					<text class="iconfont icon-back"></text>
				</view>
				<view class="title">我的收藏</view>
				<view class="placeholder" style="width: 60rpx;"></view>
			</view>
		</view>
		
		<!-- 个性歌单入口 -->
		<view class="personalized-entry" @tap="goToPersonalPlaylist">
			<image class="entry-img" src="/static/personalized-playlist.png" mode="aspectFill"></image>
			<view class="entry-content">
				<text class="entry-title">个性歌单推荐</text>
				<text class="entry-desc">根据您的音乐喜好，定制专属歌单</text>
			</view>
			<text class="iconfont icon-right"></text>
		</view>
		
		<!-- 收藏列表 -->
		<scroll-view class="favorites-list" scroll-y>
			<!-- 歌单列表 -->
			<view v-if="favoritePlaylists.length > 0" class="list-content">
				<view class="list-header">
					<text class="total-count">{{ favoritePlaylists.length }}个收藏歌单</text>
				</view>
				<view 
					v-for="(playlist, index) in favoritePlaylists" 
					:key="playlist.id"
					class="playlist-item"
					@tap="viewPlaylist(playlist)"
				>
					<image class="cover" :src="playlist.cover" mode="aspectFill"></image>
					<view class="info">
						<view class="name text-ellipsis">{{ playlist.name }}</view>
						<view class="count">{{ formatPlayCount(playlist.playCount) }}次播放</view>
					</view>
					<view class="actions">
						<text class="iconfont icon-heart-filled" @tap.stop="removeFromFavorites(playlist.id)"></text>
					</view>
				</view>
			</view>
			
			<!-- 空状态 -->
			<view v-if="isEmpty" class="empty-state">
				<image class="empty-image" src="/static/empty-favorites.png" mode="aspectFit"></image>
				<view class="empty-text">暂无收藏内容</view>
				<view class="empty-tips">收藏你喜欢的歌单，随时欣赏</view>
				<view class="empty-action">
					<button class="try-btn" @tap="goToPersonalPlaylist">尝试个性推荐</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { 
	getFavoritePlaylistsFromServer,
	removePlaylistFromFavorites
} from '@/utils/musicData.js'

export default {
	data() {
		return {
			favoritePlaylists: [],
			statusBarHeight: 25
		}
	},
	computed: {
		isEmpty() {
			return this.favoritePlaylists.length === 0
		},
		// 计算状态栏样式
		statusBarStyle() {
			return {
				height: `${this.statusBarHeight}px`
			}
		}
	},
	onLoad() {
		// 获取状态栏高度
		this.getStatusBarHeight();
	},
	onShow() {
		this.loadFavorites()
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
		
		// 加载收藏内容
		async loadFavorites() {
			try {
				// 显示加载提示
				uni.showLoading({
					title: '加载收藏歌单...',
					mask: false
				});
				
				console.log('开始加载收藏歌单列表');
				
				// 首先尝试从本地缓存加载数据
				let localData = [];
				try {
					const cachedData = uni.getStorageSync('cachedFavoritePlaylists');
					if (cachedData) {
						try {
							const parsedData = JSON.parse(cachedData);
							if (Array.isArray(parsedData) && parsedData.length > 0) {
								localData = parsedData;
								console.log(`从本地缓存读取了${localData.length}个收藏歌单`);
							}
						} catch (parseError) {
							console.error('解析缓存数据失败:', parseError);
						}
					}
				} catch (cacheError) {
					console.error('读取缓存失败:', cacheError);
				}
				
				// 从服务器获取最新数据
				const result = await getFavoritePlaylistsFromServer();
				
				// 决定使用哪个数据源
				let finalData = [];
				if (result.success) {
					console.log(`成功获取收藏歌单: ${result.data.length}个${result.fromCache ? ' (来自缓存)' : ''}`);
					
					// 如果API返回的数据为空但本地缓存有数据，使用本地缓存
					if (result.data.length === 0 && localData.length > 0) {
						console.log('服务器返回空数据，但本地缓存有数据，使用本地缓存');
						finalData = localData;
					} else {
						finalData = result.data;
					}
				} else {
					// API调用失败，使用本地缓存
					console.warn('从服务器获取收藏歌单失败, 使用本地缓存');
					finalData = localData;
					
					// 只有在本地缓存也为空时显示错误提示
					if (localData.length === 0) {
						uni.showToast({
							title: result.message || '加载收藏失败',
							icon: 'none'
						});
					}
				}
				
				// 处理最终数据
				if (finalData.length === 0) {
					console.log('收藏歌单列表为空');
					this.favoritePlaylists = [];
				} else {
					// 数据处理 - 确保每个歌单有所需的字段
					this.favoritePlaylists = finalData.map(playlist => {
						// 处理数据格式，确保字段名一致
						return {
							...playlist,
							id: playlist.id || playlist.playlist_id, // 确保有id字段
							playlist_id: playlist.playlist_id || playlist.id, // 确保有playlist_id字段
							name: playlist.name || playlist.playlist_name || '未知歌单', // 确保有name字段
							playlist_name: playlist.playlist_name || playlist.name || '未知歌单', // 确保有playlist_name字段
							cover: playlist.cover || playlist.coverImgUrl || '/static/music-cover.png',
							playCount: playlist.playCount || 0
						};
					});
					
					console.log('收藏歌单数据处理完成，第一个歌单:', 
						this.favoritePlaylists.length > 0 ? JSON.stringify(this.favoritePlaylists[0]) : '无');
					
					// 如果处理后的数据与本地缓存不同，更新本地缓存
					if (!result.fromCache && this.favoritePlaylists.length > 0) {
						try {
							uni.setStorageSync('cachedFavoritePlaylists', JSON.stringify(this.favoritePlaylists));
							console.log(`已更新本地缓存，保存了${this.favoritePlaylists.length}个收藏歌单`);
						} catch (updateCacheError) {
							console.error('更新本地缓存失败:', updateCacheError);
						}
					}
				}
			} catch (error) {
				console.error('加载收藏歌单失败：', error);
				
				// 尝试从本地缓存加载
				try {
					const cachedData = uni.getStorageSync('cachedFavoritePlaylists');
					if (cachedData) {
						const parsedData = JSON.parse(cachedData);
						if (Array.isArray(parsedData)) {
							this.favoritePlaylists = parsedData.map(playlist => ({
								...playlist,
								id: playlist.id || playlist.playlist_id,
								playlist_id: playlist.playlist_id || playlist.id,
								name: playlist.name || playlist.playlist_name || '未知歌单',
								playlist_name: playlist.playlist_name || playlist.name || '未知歌单',
								cover: playlist.cover || playlist.coverImgUrl || '/static/music-cover.png',
								playCount: playlist.playCount || 0
							}));
							console.log(`从本地缓存恢复了${this.favoritePlaylists.length}个收藏歌单`);
							// 有缓存数据，不显示错误提示
							return;
						}
					}
				} catch (cacheError) {
					console.error('读取缓存失败:', cacheError);
				}
				
				// 没有缓存或缓存读取失败，显示空状态
				this.favoritePlaylists = [];
				
				// 添加错误提示
				uni.showToast({
					title: '加载收藏失败',
					icon: 'none'
				});
			} finally {
				// 确保在任何情况下都隐藏加载提示
				uni.hideLoading();
			}
		},
		
		// 前往个性歌单页面
		goToPersonalPlaylist() {
			uni.navigateTo({
				url: '/pages/user/personal_playlist'
			})
		},
		
		// 查看歌单
		viewPlaylist(playlist) {
			// 打印调试信息
			console.log('查看歌单:', playlist);
			
			// 优先使用playlist_id字段，如果不存在则使用id
			const playlistId = playlist.playlist_id || playlist.id;
			
			if (!playlistId) {
				console.error('歌单ID不存在:', playlist);
				uni.showToast({
					title: '无效的歌单ID',
					icon: 'none'
				});
				return;
			}
			
			console.log('跳转到歌单:', playlistId);
			
			uni.navigateTo({
				url: `/pages/playlist/playlist?id=${playlistId}`
			});
		},
		
		// 从收藏中移除歌单
		async removeFromFavorites(playlistId) {
			uni.showModal({
				title: '提示',
				content: '确定要取消收藏这个歌单吗？',
				confirmColor: '#8e71c7',
				success: async (res) => {
					if (res.confirm) {
						const result = await removePlaylistFromFavorites(playlistId);
						if (result.success) {
							await this.loadFavorites();
							uni.showToast({
								title: result.message,
								icon: 'none'
							});
						}
					}
				}
			});
		},
		
		// 格式化播放次数
		formatPlayCount(count) {
			if (!count) return '0';
			if (count >= 10000) {
				return (count / 10000).toFixed(1) + '万';
			}
			return count.toString();
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
			height: var(--status-bar-height, 25px);
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
	
	.personalized-entry {
		margin: calc(var(--status-bar-height, 25px) + 170rpx) 30rpx 0;
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
		
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
	
	.favorites-list {
		height: calc(100vh - var(--status-bar-height, 25px) - 280rpx);
		margin-top: 20rpx;
		
		.list-content {
			padding: 20rpx 30rpx;
		}
		
		.list-header {
			padding: 20rpx 10rpx 30rpx;
			
			.total-count {
				font-size: 28rpx;
				color: #888;
				font-weight: 500;
			}
		}
		
		.playlist-item {
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
			
			.cover {
				width: 120rpx;
				height: 120rpx;
				flex-shrink: 0; /* 防止图片被压缩 */
				border-radius: 12rpx;
				margin-right: 24rpx;
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
			}
			
			.info {
				flex: 1;
				width: 0; /* 关键：确保flex子元素宽度计算正确，允许text-overflow生效 */
				min-width: 0; /* 允许内容缩小到比内容本身更窄 */
				overflow: hidden; /* 确保溢出内容被隐藏 */
				
				.name {
					font-size: 30rpx;
					color: #333;
					font-weight: 600;
					margin-bottom: 12rpx;
					line-height: 1.3;
					max-width: 100%;
				}
				
				.text-ellipsis {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				
				.count {
					font-size: 24rpx;
					color: #999;
				}
			}
			
			.actions {
				padding: 10rpx;
				margin-left: 16rpx;
				flex-shrink: 0; /* 防止操作区域被挤压 */
				
				.icon-heart-filled {
					font-size: 40rpx;
					color: #ff4d6a;
					transition: all 0.3s;
					
					&:active {
						transform: scale(1.2);
					}
				}
			}
		}
	}
	
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60rpx 0;
		
		.empty-image {
			width: 240rpx;
			height: 240rpx;
			margin-bottom: 40rpx;
		}
		
		.empty-text {
			font-size: 32rpx;
			color: #333;
			font-weight: 500;
			margin-bottom: 16rpx;
		}
		
		.empty-tips {
			font-size: 28rpx;
			color: #999;
			margin-bottom: 40rpx;
		}
		
		.empty-action {
			margin-top: 20rpx;
			
			.try-btn {
				padding: 16rpx 40rpx;
				background: linear-gradient(135deg, #8e71c7, #61a0e4);
				color: white;
				font-size: 28rpx;
				border-radius: 40rpx;
				border: none;
			}
		}
	}
}
</style> 
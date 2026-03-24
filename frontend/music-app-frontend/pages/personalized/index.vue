<template>
	<view class="personalized-container">
		<!-- 未登录状态 -->
		<view v-if="!isLoggedIn" class="login-prompt">
			<image src="/static/logo.png" mode="aspectFit"></image>
			<text>登录后即可享受个性化推荐</text>
			<button @click="goToLogin" class="login-btn">立即登录</button>
			
			<!-- 游客也可以访问的功能区 -->
			<view class="guest-features">
				<view class="feature-item" @tap="goToRankPage">
					<view class="feature-icon">
						<u-icon name="list" size="32" color="#ffffff"></u-icon>
					</view>
					<text class="feature-name">排行榜</text>
				</view>
				<view class="feature-item" @tap="goToPersonalPlaylist">
					<view class="feature-icon">
						<u-icon name="star" size="32" color="#ffffff"></u-icon>
					</view>
					<text class="feature-name">个性歌单</text>
				</view>
			</view>
		</view>
		
		<!-- 已登录状态 -->
		<view v-else class="recommend-content">
			<!-- 功能入口区域 -->
			<view class="features-section">
				<view class="feature-item" @tap="goToRankPage">
					<view class="feature-icon">
						<u-icon name="list" size="32" color="#ffffff"></u-icon>
					</view>
					<text class="feature-name">排行榜</text>
				</view>
				<view class="feature-item" @tap="goToPersonalPlaylist">
					<view class="feature-icon">
						<u-icon name="star" size="32" color="#ffffff"></u-icon>
					</view>
					<text class="feature-name">个性歌单</text>
				</view>
				<!-- 可以添加其他功能入口 -->
			</view>
			
			<!-- 音乐播放区域 -->
			<view class="music-player">
				<image :src="currentSong.cover" mode="aspectFill" class="cover-image"></image>
				<view class="song-info">
					<text class="song-name">{{currentSong.name}}</text>
					<text class="artist-name">{{currentSong.artist}}</text>
				</view>
				<view class="player-controls">
					<view class="action-buttons">
						<button class="dislike-btn" @click="handleDislike">
							<image src="/static/images/dislike.png" mode="aspectFit"></image>
						</button>
						<button class="like-btn" @click="handleLike">
							<image src="/static/images/like.png" mode="aspectFit"></image>
						</button>
					</view>
					<view class="next-buttons" v-if="isLiked">
						<button class="next-btn" @click="playNext">下一首</button>
						<button class="continue-btn" @click="continuePlaying">继续播放</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentSong: {
				name: '',
				artist: '',
				cover: '',
				url: ''
			},
			isLiked: false,
			songList: [],
			currentIndex: 0
		}
	},
	computed: {
		isLoggedIn() {
			const userInfo = uni.getStorageSync('userInfo')
			return !!userInfo
		}
	},
	onLoad() {
		if (this.isLoggedIn) {
			this.loadRecommendations()
		}
	},
	onShow() {
		if (this.isLoggedIn && this.songList.length === 0) {
			this.loadRecommendations()
		}
	},
	methods: {
		// 前往排行榜页面 - 游客也可访问
		goToRankPage() {
			uni.navigateTo({
				url: '/pages/personalized/rank'
			});
		},
		
		// 前往个性歌单页面 - 游客也可访问
		goToPersonalPlaylist() {
			uni.navigateTo({
				url: '/pages/user/personal_playlist'
			});
		},
		
		loadRecommendations() {
			// 模拟推荐歌曲数据
			this.songList = [
				{
					name: '起风了',
					artist: '买辣椒也用券',
					cover: '/static/images/song-cover-1.jpg',
					url: 'https://music.163.com/song/media/outer/url?id=1330348068.mp3'
				},
				{
					name: '光年之外',
					artist: 'G.E.M.邓紫棋',
					cover: '/static/images/song-cover-2.jpg',
					url: 'https://music.163.com/song/media/outer/url?id=449818741.mp3'
				},
				{
					name: '年少有为',
					artist: '李荣浩',
					cover: '/static/images/song-cover-3.jpg',
					url: 'https://music.163.com/song/media/outer/url?id=1299550536.mp3'
				},
				{
					name: '消愁',
					artist: '毛不易',
					cover: '/static/images/song-cover-4.jpg',
					url: 'https://music.163.com/song/media/outer/url?id=569213220.mp3'
				}
			]
			this.playCurrentSong()
		},
		playCurrentSong() {
			if (this.songList.length > 0) {
				this.currentSong = this.songList[this.currentIndex]
				// 这里可以添加播放音乐的逻辑
			}
		},
		handleLike() {
			this.isLiked = true
			// 添加到收藏
			const favorites = uni.getStorageSync('favoriteSongs') || []
			if (!favorites.some(song => song.name === this.currentSong.name)) {
				favorites.push(this.currentSong)
				uni.setStorageSync('favoriteSongs', favorites)
				uni.showToast({
					title: '已添加到收藏',
					icon: 'success'
				})
			}
		},
		handleDislike() {
			// 从收藏中移除
			const favorites = uni.getStorageSync('favoriteSongs') || []
			const newFavorites = favorites.filter(song => song.name !== this.currentSong.name)
			uni.setStorageSync('favoriteSongs', newFavorites)
			this.playNext()
		},
		playNext() {
			this.currentIndex = (this.currentIndex + 1) % this.songList.length
			this.isLiked = false
			this.playCurrentSong()
		},
		continuePlaying() {
			this.isLiked = false
		},
		goToLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	}
}
</script>

<style lang="scss">
.personalized-container {
	min-height: 100vh;
	background-color: #f8f8f8;
	
	.login-prompt {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
		height: 100vh;
		
		image {
			width: 300rpx;
			height: 300rpx;
			margin-bottom: 40rpx;
		}
		
		text {
			font-size: 32rpx;
			color: #666;
			margin-bottom: 40rpx;
		}
		
		.login-btn {
			width: 80%;
			height: 88rpx;
			line-height: 88rpx;
			background-color: #1296db;
			color: #fff;
			border-radius: 44rpx;
			font-size: 32rpx;
			border: none;
			text-align: center;
			margin: 0;
			padding: 0;
			margin-bottom: 80rpx;
		}
		
		/* 游客可用功能区样式 */
		.guest-features {
			display: flex;
			justify-content: center;
			width: 100%;
			gap: 60rpx;
			
			.feature-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.feature-icon {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					background-color: #1296db;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 20rpx;
				}
				
				.feature-name {
					font-size: 28rpx;
					color: #333;
				}
			}
		}
	}
	
	.recommend-content {
		padding: 40rpx;
		
		/* 功能入口样式 */
		.features-section {
			display: flex;
			background-color: #fff;
			padding: 30rpx;
			border-radius: 20rpx;
			margin-bottom: 30rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
			
			.feature-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 30rpx;
				
				.feature-icon {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					background-color: #1296db;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 10rpx;
				}
				
				.feature-name {
					font-size: 24rpx;
					color: #333;
				}
			}
		}
		
		.music-player {
			background-color: #fff;
			border-radius: 20rpx;
			padding: 40rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
			
			.cover-image {
				width: 600rpx;
				height: 600rpx;
				border-radius: 20rpx;
				margin-bottom: 40rpx;
			}
			
			.song-info {
				text-align: center;
				margin-bottom: 40rpx;
				
				.song-name {
					font-size: 36rpx;
					font-weight: bold;
					color: #333;
					margin-bottom: 10rpx;
					display: block;
				}
				
				.artist-name {
					font-size: 28rpx;
					color: #666;
				}
			}
			
			.player-controls {
				.action-buttons {
					display: flex;
					justify-content: center;
					gap: 60rpx;
					margin-bottom: 40rpx;
					
					button {
						width: 100rpx;
						height: 100rpx;
						padding: 0;
						background: none;
						border: none;
						margin: 0;
						line-height: 1;
						
						&::after {
							border: none;
						}
						
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				
				.next-buttons {
					display: flex;
					justify-content: center;
					gap: 40rpx;
					
					button {
						width: 200rpx;
						height: 80rpx;
						line-height: 80rpx;
						background-color: #1296db;
						color: #fff;
						border-radius: 40rpx;
						font-size: 28rpx;
						border: none;
						text-align: center;
						
						&::after {
							border: none;
						}
					}
				}
			}
		}
	}
}
</style> 
<template>
	<view class="rank-container">
		<!-- 顶部导航 -->
		<!-- <view class="nav-bar">
			<view class="title">音乐排行榜</view>
		</view> -->

		<!-- 排行榜列表 -->
		<scroll-view class="rank-scroll" scroll-y="true" @scrolltolower="loadMoreIfNeeded">
			<!-- 加载状态 -->
			<view v-if="loading && !rankList.length" class="loading-container">
				<u-loading-icon size="28" mode="circle" color="#1296db"></u-loading-icon>
				<text class="loading-text">加载中...</text>
			</view>

			<!-- 排行榜内容 -->
			<block v-else>
				<!-- 官方榜单 -->
				<view class="rank-section">
					<view class="section-title">官方榜单</view>
					<view class="official-rank-list">
						<view class="official-rank-item" 
							v-for="(item, index) in officialRankList" 
							:key="item.id">
							<view class="rank-cover-wrapper" @tap="goToRankDetail(item)">
								<image :src="item.coverImgUrl" mode="aspectFill" class="rank-cover"></image>
								<view class="update-time">{{formatUpdateTime(item.updateTime)}}</view>
							</view>
							<view class="rank-songs">
								<view class="rank-song-item" 
									v-for="(song, songIndex) in item.tracks.slice(0, 3)" 
									:key="songIndex"
									@tap="playTopSong(song, item)">
									<text class="song-index">{{songIndex + 1}}</text>
									<text class="song-name text-ellipsis">{{song.first}}</text>
									<text class="song-artist text-ellipsis">- {{song.second}}</text>
								</view>
								<view class="view-more" @tap="goToRankDetail(item)">查看更多 ></view>
							</view>
						</view>
					</view>
				</view>

				<!-- 全球榜单 -->
				<view class="rank-section">
					<view class="section-title">全球榜单</view>
					<view class="global-rank-list">
						<view class="global-rank-item" 
							v-for="(item, index) in globalRankList" 
							:key="item.id"
							@tap="goToRankDetail(item)">
							<image :src="item.coverImgUrl" mode="aspectFill" class="rank-cover"></image>
							<view class="rank-name">{{item.name}}</view>
							<view class="update-time">{{formatUpdateTime(item.updateTime)}}</view>
						</view>
					</view>
				</view>
			</block>

			<!-- 底部加载更多 -->
			<view v-if="loading && rankList.length" class="loading-more">
				<u-loading-icon size="24" mode="circle" color="#1296db"></u-loading-icon>
				<text class="loading-text">加载中...</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			rankList: [], // 所有榜单
			currentPage: 1,
			pageSize: 20,
			hasMore: true
		}
	},
	computed: {
		// 官方榜单
		officialRankList() {
			return this.rankList.filter(item => item.tracks && item.tracks.length > 0).slice(0, 4);
		},
		// 全球榜单
		globalRankList() {
			return this.rankList.filter(item => !item.tracks || item.tracks.length === 0);
		}
	},
	onLoad() {
		this.loadRankList();
	},
	methods: {
		// 加载排行榜数据
		async loadRankList() {
			try {
				this.loading = true;
				
				// 使用 toplist_detail 接口获取所有排行榜
				const response = await uni.request({
					url: 'http://localhost:3000/toplist/detail',
					method: 'GET'
				});
				
				if (response.statusCode === 200 && response.data && response.data.list) {
					this.rankList = response.data.list;
					
					// 如果没有数据，设置hasMore为false
					if (this.rankList.length === 0) {
						this.hasMore = false;
					}
				} else {
					throw new Error('获取排行榜数据失败');
				}
			} catch (error) {
				console.error('加载排行榜失败：', error);
				uni.showToast({
					title: '加载排行榜失败，请重试',
					icon: 'none',
					duration: 2000
				});
			} finally {
				this.loading = false;
			}
		},
		
		// 加载更多数据（如果需要）
		loadMoreIfNeeded() {
			if (!this.loading && this.hasMore) {
				this.currentPage++;
				this.loadRankList();
			}
		},
		
		// 格式化更新时间
		formatUpdateTime(timestamp) {
			if (!timestamp) return '未知';
			
			const date = new Date(timestamp);
			const month = date.getMonth() + 1;
			const day = date.getDate();
			
			return `${month}月${day}日更新`;
		},
		
		// 进入排行榜详情
		goToRankDetail(rankItem) {
			// 将排行榜信息保存到本地存储，以便在详情页使用
			uni.setStorageSync('currentRank', JSON.stringify(rankItem));
			
			// 跳转到播放列表页面，传入排行榜ID
			uni.navigateTo({
				url: `/pages/playlist/playlist?id=${rankItem.id}&type=rank`
			});
		},
		
		// 播放排行榜中预览的歌曲
		async playTopSong(song, rankItem) {
			try {
				uni.showLoading({
					title: '加载中...'
				});
				
				// 需要获取完整的歌曲信息
				const songId = await this.getSongIdFromRankPreview(song, rankItem);
				
				if (!songId) {
					throw new Error('无法获取歌曲ID');
				}
				
				// 获取歌曲详情
				const response = await uni.request({
					url: `http://localhost:3000/song/detail`,
					method: 'GET',
					data: {
						ids: songId
					}
				});
				
				if (response.statusCode !== 200 || !response.data.songs || !response.data.songs.length) {
					throw new Error('获取歌曲详情失败');
				}
				
				const songDetail = response.data.songs[0];
				
				// 构建播放信息
				const songInfo = {
					id: songDetail.id,
					name: songDetail.name,
					artist: songDetail.ar[0].name,
					album: songDetail.al.name,
					cover: songDetail.al.picUrl,
					url: `https://music.163.com/song/media/outer/url?id=${songDetail.id}.mp3`
				};
				
				// 保存当前歌曲信息到本地存储
				uni.setStorageSync('currentSong', JSON.stringify(songInfo));
				
				// 设置自动播放标志
				uni.setStorageSync('autoPlay', 'true');
				
				// 添加到播放列表
				let playList = uni.getStorageSync('playList');
				if (playList) {
					playList = JSON.parse(playList);
					
					// 检查歌曲是否已在播放列表中
					const songIndex = playList.findIndex(item => item.id === songInfo.id);
					if (songIndex === -1) {
						// 不在播放列表中，添加到列表
						playList.push(songInfo);
					}
					
					// 更新当前索引
					const currentIndex = playList.findIndex(item => item.id === songInfo.id);
					uni.setStorageSync('currentIndex', currentIndex);
					
					// 保存更新后的播放列表
					uni.setStorageSync('playList', JSON.stringify(playList));
				} else {
					// 播放列表为空，创建新的播放列表
					uni.setStorageSync('playList', JSON.stringify([songInfo]));
					uni.setStorageSync('currentIndex', 0);
				}
				
				uni.hideLoading();
				
				// 跳转到播放页面
				uni.switchTab({
					url: '/pages/player/player'
				});
			} catch (error) {
				uni.hideLoading();
				console.error('播放失败：', error);
				uni.showToast({
					title: '无法播放该歌曲，请尝试查看完整榜单',
					icon: 'none',
					duration: 2000
				});
				
				// 如果播放失败，跳转到排行榜详情
				this.goToRankDetail(rankItem);
			}
		},
		
		// 从排行榜预览中获取歌曲ID
		async getSongIdFromRankPreview(song, rankItem) {
			// 首先检查是否可以从预览数据中提取ID
			if (song.id) {
				return song.id;
			}
			
			// 如果无法从预览获取ID，尝试通过搜索获取
			try {
				const searchResponse = await uni.request({
					url: 'http://localhost:3000/search',
					method: 'GET',
					data: {
						keywords: `${song.first} ${song.second}`,
						type: 1,
						limit: 1
					}
				});
				
				if (searchResponse.statusCode === 200 && 
					searchResponse.data.result && 
					searchResponse.data.result.songs && 
					searchResponse.data.result.songs.length > 0) {
					return searchResponse.data.result.songs[0].id;
				}
			} catch (error) {
				console.error('搜索歌曲失败：', error);
			}
			
			// 如果搜索也失败了，返回null
			return null;
		}
	}
}
</script>

<style lang="scss">
.rank-container {
	min-height: 100vh;
	background-color: #f8f8f8;
	padding-bottom: 30rpx;
	
	.nav-bar {
		padding: 20rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
		}
	}
	
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 200rpx;
		
		.loading-text {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #999;
		}
	}
	
	.rank-scroll {
		height: calc(100vh - 80rpx);
	}
	
	.rank-section {
		margin: 30rpx 0;
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			padding: 0 30rpx;
			margin-bottom: 20rpx;
		}
		
		.official-rank-list {
			padding: 0 20rpx;
			
			.official-rank-item {
				margin-bottom: 20rpx;
				background-color: #fff;
				border-radius: 12rpx;
				display: flex;
				overflow: hidden;
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
				
				.rank-cover-wrapper {
					position: relative;
					width: 220rpx;
					height: 220rpx;
					flex-shrink: 0;
					
					.rank-cover {
						width: 100%;
						height: 100%;
					}
					
					.update-time {
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						padding: 6rpx 10rpx;
						background-color: rgba(0, 0, 0, 0.4);
						color: #fff;
						font-size: 20rpx;
						text-align: center;
					}
				}
				
				.rank-songs {
					flex: 1;
					padding: 12rpx 16rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					
					.rank-song-item {
						display: flex;
						align-items: center;
						line-height: 1.5;
						padding: 8rpx 0;
						border-radius: 8rpx;
						
						&:active {
							background-color: #f5f5f5;
						}
						
						.song-index {
							width: 40rpx;
							font-size: 28rpx;
							font-weight: bold;
							color: #666;
							text-align: center;
						}
						
						.song-name {
							flex: 1;
							font-size: 26rpx;
							color: #333;
							margin-right: 10rpx;
							font-weight: 500;
						}
						
						.song-artist {
							font-size: 22rpx;
							color: #999;
							max-width: 30%;
							flex-shrink: 0;
						}
					}
					
					.view-more {
						text-align: right;
						font-size: 24rpx;
						color: #1296db;
						padding: 8rpx 10rpx 0;
					}
				}
			}
		}
		
		.global-rank-list {
			display: flex;
			flex-wrap: wrap;
			padding: 0 15rpx;
			
			.global-rank-item {
				width: calc(33.33% - 20rpx);
				margin: 0 10rpx 20rpx;
				border-radius: 12rpx;
				overflow: hidden;
				background-color: #fff;
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
				
				.rank-cover {
					width: 100%;
					height: 210rpx;
					border-radius: 12rpx 12rpx 0 0;
				}
				
				.rank-name {
					font-size: 24rpx;
					color: #333;
					padding: 10rpx;
					text-align: center;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				
				.update-time {
					font-size: 20rpx;
					color: #999;
					padding: 0 10rpx 10rpx;
					text-align: center;
				}
			}
		}
	}
	
	.loading-more {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20rpx 0;
		
		.loading-text {
			margin-left: 10rpx;
			font-size: 24rpx;
			color: #999;
		}
	}
	
	.text-ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style> 
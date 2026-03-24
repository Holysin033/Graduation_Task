<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<text class="iconfont icon-back" @click="goBack"></text>
			<text class="title">艺术家</text>
		</view>
		
		<!-- 艺术家信息 -->
		<view class="artist-info" v-if="artist">
			<image class="artist-avatar" :src="artist.avatar" mode="aspectFill"></image>
			<view class="artist-details">
				<text class="artist-name">{{artist.name}}</text>
				<text class="artist-desc">{{artist.description}}</text>
				<view class="artist-stats">
					<view class="stat-item">
						<text class="stat-value">{{artist.songs}}</text>
						<text class="stat-label">歌曲</text>
					</view>
					<view class="stat-item">
						<text class="stat-value">{{artist.albums}}</text>
						<text class="stat-label">专辑</text>
					</view>
					<view class="stat-item">
						<text class="stat-value">{{artist.followers}}</text>
						<text class="stat-label">粉丝</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 操作按钮 -->
		<view class="action-buttons" v-if="artist">
			<view class="action-btn follow-btn" @click="toggleFollow">
				<text class="iconfont" :class="isFollowing ? 'icon-check' : 'icon-plus'"></text>
				<text>{{isFollowing ? '已关注' : '关注'}}</text>
			</view>
			<view class="action-btn share-btn" @click="shareArtist">
				<text class="iconfont icon-share"></text>
				<text>分享</text>
			</view>
		</view>
		
		<!-- 标签页 -->
		<view class="tabs" v-if="artist">
			<view 
				class="tab-item" 
				v-for="(tab, index) in tabs" 
				:key="index"
				:class="{ active: currentTab === index }"
				@click="switchTab(index)"
			>
				<text>{{tab}}</text>
			</view>
		</view>
		
		<!-- 热门歌曲 -->
		<view class="content-section" v-if="artist && currentTab === 0">
			<view class="section-title">热门歌曲</view>
			<view class="song-list">
				<view class="song-item" v-for="(song, index) in hotSongs" :key="song.id" @click="playSong(song)">
					<view class="song-index">{{index + 1}}</view>
					<view class="song-info">
						<text class="song-name">{{song.name}}</text>
						<text class="song-duration">{{formatDuration(song.duration)}}</text>
					</view>
					<view class="song-actions">
						<text class="iconfont icon-play"></text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 专辑 -->
		<view class="content-section" v-if="artist && currentTab === 1">
			<view class="section-title">专辑</view>
			<scroll-view class="album-list" scroll-x>
				<view class="album-item" v-for="album in albums" :key="album.id" @click="viewAlbum(album)">
					<image class="album-cover" :src="album.cover" mode="aspectFill"></image>
					<text class="album-name">{{album.name}}</text>
					<text class="album-date">{{album.date}}</text>
				</view>
			</scroll-view>
		</view>
		
		<!-- 简介 -->
		<view class="content-section" v-if="artist && currentTab === 2">
			<view class="section-title">简介</view>
			<view class="artist-bio">
				<text>{{artist.biography}}</text>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-if="!artist">
			<image src="/static/empty.png" mode="aspectFit"></image>
			<text>暂无艺术家信息</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			artistId: '',
			artist: null,
			isFollowing: false,
			currentTab: 0,
			tabs: ['热门歌曲', '专辑', '简介'],
			hotSongs: [],
			albums: []
		}
	},
	onLoad(options) {
		if (options.id) {
			this.artistId = options.id
			this.getArtistInfo()
		}
	},
	methods: {
		// 获取艺术家信息
		getArtistInfo() {
			// 这里应该调用API获取艺术家信息
			// 目前使用模拟数据
			this.artist = {
				id: this.artistId,
				name: '周杰伦',
				avatar: '/static/artist-avatar.jpg',
				description: '华语流行乐男歌手、音乐人、演员、导演、编剧、监制、商人',
				songs: 150,
				albums: 14,
				followers: '5000万',
				biography: '周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行乐男歌手、音乐人、演员、导演、编剧、监制、商人。2000年发行首张个人专辑《Jay》。2001年发行专辑《范特西》。2002年举行"The One"世界巡回演唱会。2003年成为美国《时代周刊》封面人物。2004年获得世界音乐大奖中国区最畅销艺人奖。2005年凭借动作片《头文字D》获得台湾电影金马奖最佳新人奖。2006年起连续三年获得世界音乐大奖中国区最畅销艺人奖。2007年自编自导的文艺片《不能说的秘密》获得台湾电影金马奖年度台湾杰出电影奖。2008年凭借歌曲《青花瓷》获得第19届金曲奖最佳作曲人奖。2010年入选美国CNN评出的"25位亚洲最具影响力的人物"。2011年凭借专辑《跨时代》再度获得金曲奖最佳国语男歌手奖，并且第4次获得金曲奖最佳国语专辑奖。2012年登福布斯中国名人榜榜首。2014年发行华语乐坛首张数字音乐专辑《哎呦，不错哦》。2016年发行专辑《周杰伦的床边故事》。2019年发行单曲《说好不哭》。'
			}
			
			// 获取热门歌曲
			this.getHotSongs()
			
			// 获取专辑
			this.getAlbums()
			
			// 检查是否已关注
			this.checkFollowStatus()
		},
		
		// 获取热门歌曲
		getHotSongs() {
			// 这里应该调用API获取热门歌曲
			// 目前使用模拟数据
			this.hotSongs = [
				{ id: 1, name: '稻香', duration: 235 },
				{ id: 2, name: '青花瓷', duration: 235 },
				{ id: 3, name: '七里香', duration: 300 },
				{ id: 4, name: '晴天', duration: 269 },
				{ id: 5, name: '菊花台', duration: 235 },
				{ id: 6, name: '夜曲', duration: 235 },
				{ id: 7, name: '发如雪', duration: 235 },
				{ id: 8, name: '简单爱', duration: 235 },
				{ id: 9, name: '龙卷风', duration: 235 },
				{ id: 10, name: '双截棍', duration: 235 }
			]
		},
		
		// 获取专辑
		getAlbums() {
			// 这里应该调用API获取专辑
			// 目前使用模拟数据
			this.albums = [
				{ id: 1, name: '叶惠美', cover: '/static/album-cover1.jpg', date: '2003-07-31' },
				{ id: 2, name: '七里香', cover: '/static/album-cover2.jpg', date: '2004-08-03' },
				{ id: 3, name: '十一月的萧邦', cover: '/static/album-cover3.jpg', date: '2005-11-01' },
				{ id: 4, name: '依然范特西', cover: '/static/album-cover4.jpg', date: '2006-09-05' },
				{ id: 5, name: '我很忙', cover: '/static/album-cover5.jpg', date: '2007-11-02' }
			]
		},
		
		// 检查关注状态
		checkFollowStatus() {
			// 这里应该调用API检查关注状态
			// 目前使用模拟数据
			this.isFollowing = false
		},
		
		// 切换标签页
		switchTab(index) {
			this.currentTab = index
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
		
		// 查看专辑
		viewAlbum(album) {
			uni.navigateTo({
				url: `/pages/playlist/playlist?id=${album.id}&type=album`
			})
		},
		
		// 关注/取消关注
		toggleFollow() {
			// 这里应该调用API关注/取消关注
			// 目前使用模拟数据
			this.isFollowing = !this.isFollowing
			uni.showToast({
				title: this.isFollowing ? '关注成功' : '已取消关注',
				icon: 'success'
			})
		},
		
		// 分享艺术家
		shareArtist() {
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		
		// 格式化时长
		formatDuration(seconds) {
			const minutes = Math.floor(seconds / 60)
			const remainingSeconds = seconds % 60
			return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
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

.artist-info {
	display: flex;
	padding: 30rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	
	.artist-avatar {
		width: 160rpx;
		height: 160rpx;
		border-radius: 80rpx;
		margin-right: 30rpx;
	}
	
	.artist-details {
		flex: 1;
		
		.artist-name {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 10rpx;
		}
		
		.artist-desc {
			font-size: 28rpx;
			color: #666;
			margin-bottom: 20rpx;
		}
		
		.artist-stats {
			display: flex;
			
			.stat-item {
				flex: 1;
				text-align: center;
				
				.stat-value {
					display: block;
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					margin-bottom: 5rpx;
				}
				
				.stat-label {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
}

.action-buttons {
	display: flex;
	padding: 20rpx 30rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	
	.action-btn {
		flex: 1;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 40rpx;
		margin: 0 10rpx;
		font-size: 28rpx;
		
		.iconfont {
			font-size: 32rpx;
			margin-right: 10rpx;
		}
	}
	
	.follow-btn {
		background-color: #007AFF;
		color: #fff;
	}
	
	.share-btn {
		background-color: #f5f5f5;
		color: #333;
	}
}

.tabs {
	display: flex;
	background-color: #fff;
	margin-bottom: 20rpx;
	
	.tab-item {
		flex: 1;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #666;
		position: relative;
		
		&.active {
			color: #007AFF;
			font-weight: bold;
			
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 40rpx;
				height: 4rpx;
				background-color: #007AFF;
				border-radius: 2rpx;
			}
		}
	}
}

.content-section {
	background-color: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;
	
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}
	
	.song-list {
		.song-item {
			display: flex;
			align-items: center;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #f5f5f5;
			
			&:last-child {
				border-bottom: none;
			}
			
			.song-index {
				width: 60rpx;
				font-size: 28rpx;
				color: #999;
				text-align: center;
			}
			
			.song-info {
				flex: 1;
				
				.song-name {
					font-size: 30rpx;
					color: #333;
					margin-bottom: 5rpx;
				}
				
				.song-duration {
					font-size: 24rpx;
					color: #999;
				}
			}
			
			.song-actions {
				.icon-play {
					font-size: 40rpx;
					color: #007AFF;
				}
			}
		}
	}
	
	.album-list {
		white-space: nowrap;
		
		.album-item {
			display: inline-block;
			width: 200rpx;
			margin-right: 20rpx;
			
			.album-cover {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
				margin-bottom: 10rpx;
			}
			
			.album-name {
				display: block;
				font-size: 28rpx;
				color: #333;
				margin-bottom: 5rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			
			.album-date {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	
	.artist-bio {
		text {
			font-size: 28rpx;
			color: #666;
			line-height: 1.6;
		}
	}
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 100rpx 0;
	
	image {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 30rpx;
	}
	
	text {
		font-size: 28rpx;
		color: #999;
	}
}
</style> 
<template>
	<view class="play-list" v-if="show">
		<view class="mask" @click="handleClose"></view>
		<view class="content">
			<view class="header">
				<text class="title">播放列表</text>
				<text class="count">({{list.length}}首)</text>
				<view class="close" @click="handleClose">
					<u-icon name="close" size="30"></u-icon>
				</view>
			</view>
			
			<scroll-view class="list" scroll-y>
				<view 
					class="item" 
					v-for="(item, index) in list" 
					:key="index"
					:class="{ active: currentIndex === index }"
					@click="handleSelect(index)"
				>
					<view class="info">
						<text class="name">{{item.name}}</text>
						<text class="artist">{{item.artist}}</text>
					</view>
					<view class="duration">{{formatTime(item.duration)}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'PlayList',
	props: {
		show: {
			type: Boolean,
			default: false
		},
		list: {
			type: Array,
			default: () => []
		},
		currentIndex: {
			type: Number,
			default: 0
		}
	},
	methods: {
		handleClose() {
			this.$emit('close')
		},
		handleSelect(index) {
			this.$emit('select', index)
		},
		formatTime(seconds) {
			const min = Math.floor(seconds / 60)
			const sec = Math.floor(seconds % 60)
			return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
		}
	}
}
</script>

<style lang="scss" scoped>
.play-list {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999;
	
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		transform: translateY(0);
		transition: transform 0.3s ease-out;
		
		.header {
			display: flex;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1rpx solid #eee;
			
			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
			
			.count {
				font-size: 28rpx;
				color: #999;
				margin-left: 10rpx;
			}
			
			.close {
				margin-left: auto;
			}
		}
		
		.list {
			height: 60vh;
			
			.item {
				display: flex;
				align-items: center;
				padding: 20rpx 30rpx;
				border-bottom: 1rpx solid #eee;
				
				&.active {
					background-color: #f5f5f5;
					
					.name {
						color: #018EFF;
					}
				}
				
				.info {
					flex: 1;
					
					.name {
						font-size: 28rpx;
						color: #333;
						margin-bottom: 6rpx;
					}
					
					.artist {
						font-size: 24rpx;
						color: #999;
					}
				}
				
				.duration {
					font-size: 24rpx;
					color: #999;
					margin-left: 20rpx;
				}
			}
		}
	}
}
</style> 
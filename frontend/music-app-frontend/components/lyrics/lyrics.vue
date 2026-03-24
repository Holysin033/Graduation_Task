<template>
	<view class="lyrics-container">
		<scroll-view 
			class="lyrics-scroll" 
			scroll-y 
			:scroll-top="scrollTop"
			:scroll-with-animation="true"
			@scroll="handleScroll"
		>
			<view 
				class="lyrics-item" 
				v-for="(item, index) in lyrics" 
				:key="index"
				:class="{ active: currentIndex === index }"
				:id="'lyrics-' + index"
				@click="handleClick(index)"
			>
				<text class="lyrics-text">{{item.text}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'Lyrics',
	props: {
		lyrics: {
			type: Array,
			default: () => []
		},
		currentTime: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			currentIndex: 0,
			scrollTop: 0,
			itemHeight: 50, // 每行歌词的高度
			containerHeight: 0
		}
	},
	watch: {
		currentTime: {
			handler(newTime) {
				this.updateCurrentLyrics(newTime)
			},
			immediate: true
		}
	},
	methods: {
		updateCurrentLyrics(time) {
			// 找到当前时间对应的歌词
			const index = this.lyrics.findIndex((item, i) => {
				const nextTime = this.lyrics[i + 1] ? this.lyrics[i + 1].time : Infinity
				return time >= item.time && time < nextTime
			})
			
			if (index !== -1 && index !== this.currentIndex) {
				this.currentIndex = index
				this.scrollToLyrics(index)
			}
		},
		scrollToLyrics(index) {
			// 计算滚动位置，使当前歌词居中显示
			const scrollTop = index * this.itemHeight - (this.containerHeight / 2) + (this.itemHeight / 2)
			this.scrollTop = Math.max(0, scrollTop)
		},
		handleScroll(e) {
			// 处理滚动事件
		},
		handleClick(index) {
			// 点击歌词跳转到对应时间
			this.$emit('seek', this.lyrics[index].time)
		}
	},
	mounted() {
		// 获取容器高度
		const query = uni.createSelectorQuery().in(this)
		query.select('.lyrics-scroll').boundingClientRect(data => {
			this.containerHeight = data.height
		}).exec()
	}
}
</script>

<style lang="scss" scoped>
.lyrics-container {
	height: 100%;
	
	.lyrics-scroll {
		height: 100%;
		padding: 20rpx 0;
		
		.lyrics-item {
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10rpx 0;
			transition: all 0.3s;
			
			.lyrics-text {
				font-size: 28rpx;
				color: #666;
				text-align: center;
				transition: all 0.3s;
			}
			
			&.active {
				.lyrics-text {
					width:100vw;
					font-size: 35rpx;
					color: #018EFF;
					font-weight: bold;
					background-color: #e7e7e7
				}
			}
		}
	}
}
</style> 
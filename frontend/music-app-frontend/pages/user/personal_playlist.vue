<template>
	<view class="container">
		<!-- 导航栏 -->
		<view class="nav-bar">
			<view class="status-bar" :style="statusBarStyle"></view>
			<view class="nav-content">
				<view class="back-btn" @tap="goBack">
					<text class="iconfont icon-back"></text>
				</view>
				<view class="title">个性歌单</view>
				<view class="placeholder" style="width: 60rpx;"></view>
			</view>
		</view>
		
		<view class="content">
			<!-- 引导文本 -->
			<view class="guide-text">
				<text class="title">选择您喜爱的音乐标签</text>
				<text class="subtitle">至少选择3个，最多选择6个标签</text>
			</view>
			
			<!-- 标签选择 -->
			<view class="tags-container">
				<view
					v-for="(tag, index) in tags"
					:key="index"
					:class="['tag-item', selectedTags.includes(tag) ? 'active' : '']"
					@tap="toggleTag(tag)"
				>
					{{ tag }}
				</view>
			</view>
			
			<!-- 已选标签 -->
			<view class="selected-tags" v-if="selectedTags.length > 0">
				<text class="label">已选择 ({{ selectedTags.length }}/6):</text>
				<view class="selected-tag-list">
					<view 
						v-for="(tag, index) in selectedTags" 
						:key="index"
						class="selected-tag"
					>
						{{ tag }}
						<text class="remove-tag" @tap="removeTag(tag)">×</text>
					</view>
				</view>
			</view>
			
			<!-- 生成按钮 -->
			<view class="action-buttons">
				<button 
					class="generate-btn" 
					:disabled="selectedTags.length < 3" 
					@tap="generatePlaylists"
				>
					{{ isGenerating ? '生成中...' : '生成个性歌单' }}
				</button>
				<button
					class="reset-btn"
					@tap="resetTags"
				>
					重新选择
				</button>
			</view>
			
			<!-- 结果展示 -->
			<view class="results-container" v-if="generatedPlaylists.length > 0">
				<view class="results-title">为您推荐的歌单</view>
				
				<view class="playlist-grid">
					<view
						v-for="(playlist, index) in generatedPlaylists"
						:key="playlist.id"
						class="playlist-item"
						@tap="viewPlaylist(playlist)"
					>
						<image class="playlist-cover" :src="playlist.coverImgUrl" mode="aspectFill"></image>
						<view class="playlist-name text-ellipsis">{{ playlist.name }}</view>
						<view class="playlist-info">{{ playlist.trackCount }}首</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { searchPlaylistsByTags, savePersonalizedPlaylist } from '@/utils/musicData.js'

export default {
	data() {
		return {
			tags: [
				// 音乐风格
				"流行", "摇滚", "民谣", "电子", "嘻哈", "爵士", "古典", "R&B", "说唱", 
				"金属", "朋克", "乡村", "蓝调", "拉丁", "独立", "另类", "世界音乐",
				// 场景/心情
				"清晨", "夜晚", "学习", "工作", "运动", "旅行", "派对", "relaxing",
				"伤感", "治愈", "浪漫", "快乐", "孤独", "兴奋", "安静", "思念",
				// 年代
				"70年代", "80年代", "90年代", "00年代", "10年代", "20年代",
				// 语言
				"华语", "欧美", "日语", "韩语", "粤语", 
				// 主题
				"影视原声", "游戏", "动漫", "广场舞", "网络歌曲", "婚礼", "KTV热歌"
			],
			selectedTags: [],
			generatedPlaylists: [],
			isGenerating: false,
			statusBarHeight: 25
		}
	},
	computed: {
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
		
		// 加载本地保存的标签选择
		this.loadSavedTags();
		
		// 加载上次生成的歌单
		this.loadSavedPlaylists();
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
		
		// 切换标签选择状态
		toggleTag(tag) {
			const index = this.selectedTags.indexOf(tag);
			if (index === -1) {
				// 如果未选中且未达到上限，则添加
				if (this.selectedTags.length < 6) {
					this.selectedTags.push(tag);
					this.saveTagsToStorage();
				} else {
					uni.showToast({
						title: '最多选择6个标签',
						icon: 'none'
					});
				}
			} else {
				// 如果已选中，则移除
				this.selectedTags.splice(index, 1);
				this.saveTagsToStorage();
			}
		},
		
		// 移除已选标签
		removeTag(tag) {
			const index = this.selectedTags.indexOf(tag);
			if (index !== -1) {
				this.selectedTags.splice(index, 1);
				this.saveTagsToStorage();
			}
		},
		
		// 重置所有标签
		resetTags() {
			this.selectedTags = [];
			this.saveTagsToStorage();
		},
		
		// 保存标签选择到本地存储
		saveTagsToStorage() {
			try {
				uni.setStorageSync('selected_music_tags', JSON.stringify(this.selectedTags));
			} catch (e) {
				console.error('保存标签选择失败:', e);
			}
		},
		
		// 从本地存储加载标签选择
		loadSavedTags() {
			try {
				const savedTags = uni.getStorageSync('selected_music_tags');
				if (savedTags) {
					this.selectedTags = JSON.parse(savedTags);
				}
			} catch (e) {
				console.error('加载标签选择失败:', e);
			}
		},
		
		// 加载上次生成的歌单
		loadSavedPlaylists() {
			try {
				const savedData = uni.getStorageSync('generated_playlists');
				if (savedData) {
					const data = JSON.parse(savedData);
					// 检查是否是当前标签组合生成的歌单
					const currentTags = JSON.stringify(this.selectedTags.sort());
					const savedTags = JSON.stringify((data.tags || []).sort());
					
					if (currentTags === savedTags && data.playlists && data.playlists.length > 0) {
						this.generatedPlaylists = data.playlists;
					}
				}
			} catch (e) {
				console.error('加载保存的歌单失败:', e);
			}
		},
		
		// 生成个性化歌单
		async generatePlaylists() {
			if (this.selectedTags.length < 3) {
				uni.showToast({
					title: '请至少选择3个标签',
					icon: 'none'
				});
				return;
			}
			
			// 设置加载状态
			this.isGenerating = true;
			
			// 显示加载提示
			uni.showLoading({
				title: '正在生成歌单...',
				mask: true
			});
			
			try {
				// 构建查询关键词，基于标签组合与权重算法
				const queryKeywords = this.generateQueryKeywords();
				
				console.log('使用关键词搜索歌单:', queryKeywords);
				
				// 使用更新后的API查询歌单
				const result = await searchPlaylistsByTags(queryKeywords);
				
				// 隐藏加载提示
				uni.hideLoading();
				
				if (result.success && result.data && Array.isArray(result.data)) {
					// 过滤并处理结果
					this.generatedPlaylists = this.processPlaylistResults(result.data);
					
					// 验证处理后的歌单数据
					const validPlaylists = this.generatedPlaylists.filter(playlist => 
						playlist && playlist.id && playlist.name && playlist.coverImgUrl
					);
					
					if (validPlaylists.length > 0) {
						// 将生成的歌单保存到本地
						this.savePlaylistsToStorage();
						
						uni.showToast({
							title: '歌单生成成功',
							icon: 'success',
							duration: 1500
						});
					} else {
						// 有结果但处理后无有效歌单
						uni.showToast({
							title: '未找到符合条件的歌单，请尝试其他标签',
							icon: 'none',
							duration: 2000
						});
						this.generatedPlaylists = [];
					}
				} else if (result.success && (!result.data || result.data.length === 0)) {
					// API请求成功但没有返回数据
					uni.showToast({
						title: '未找到符合条件的歌单，请尝试其他标签',
						icon: 'none',
						duration: 2000
					});
					this.generatedPlaylists = [];
				} else {
					// API请求失败
					uni.showToast({
						title: result.message || '获取歌单失败，请稍后重试',
						icon: 'none',
						duration: 2000
					});
					
					console.error('获取歌单失败:', result);
				}
			} catch (error) {
				// 隐藏加载提示
				uni.hideLoading();
				
				console.error('生成歌单失败:', error);
				
				uni.showToast({
					title: '生成歌单失败，请检查网络后重试',
					icon: 'none',
					duration: 2000
				});
			} finally {
				// 恢复按钮状态
				this.isGenerating = false;
			}
		},
		
		// 生成查询关键词
		generateQueryKeywords() {
			// 基础算法：组合选中标签、随机排序并赋予权重
			const shuffledTags = [...this.selectedTags];
			
			// 随机排序标签
			for (let i = shuffledTags.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffledTags[i], shuffledTags[j]] = [shuffledTags[j], shuffledTags[i]];
			}
			
			// 组合前3个标签作为主要关键词
			const primaryTags = shuffledTags.slice(0, 3);
			const primaryKeyword = primaryTags.join(' ');
			
			return primaryKeyword;
		},
		
		// 处理和过滤歌单结果
		processPlaylistResults(playlists) {
			try {
				// 如果没有结果，返回空数组
				if (!playlists || !Array.isArray(playlists) || playlists.length === 0) {
					console.log('无歌单数据或数据格式错误');
					return [];
				}
				
				// 过滤无效的歌单数据
				const validPlaylists = playlists.filter(playlist => 
					playlist && playlist.id && 
					playlist.name && 
					(playlist.coverImgUrl || playlist.picUrl)
				);
				
				if (validPlaylists.length === 0) {
					console.log('所有歌单数据均无效');
					return [];
				}
				
				// 计算每个歌单与所选标签的匹配度
				const scoredPlaylists = validPlaylists.map(playlist => {
					let score = 0;
					
					// 确保歌单名称存在
					const playlistName = playlist.name || '';
					
					// 标题匹配
					this.selectedTags.forEach(tag => {
						if (playlistName.includes(tag)) {
							score += 3;
						}
					});
					
					// 描述匹配 - 确保描述存在
					const description = playlist.description || '';
					if (description) {
						this.selectedTags.forEach(tag => {
							if (description.includes(tag)) {
								score += 1;
							}
						});
					}
					
					// 标签匹配 - 如果有标签数据
					const tags = playlist.tags || [];
					if (Array.isArray(tags) && tags.length > 0) {
						this.selectedTags.forEach(selectedTag => {
							if (tags.some(tag => tag.includes(selectedTag))) {
								score += 2;
							}
						});
					}
					
					// 随机因子，增加多样性
					score += Math.random() * 2;
					
					// 确保所有必要的字段都存在
					return {
						id: playlist.id,
						name: playlistName,
						coverImgUrl: playlist.coverImgUrl || playlist.picUrl || '/static/default-playlist.png',
						trackCount: playlist.trackCount || 0,
						playCount: playlist.playCount || 0,
						creator: (playlist.creator && playlist.creator.nickname) || '未知创建者',
						description: description || '暂无描述',
						score
					};
				});
				
				// 按匹配度排序
				scoredPlaylists.sort((a, b) => b.score - a.score);
				
				// 最多返回6个结果
				const result = scoredPlaylists.slice(0, 6);
				console.log('处理后的歌单数据:', result);
				return result;
			} catch (error) {
				console.error('处理歌单数据出错:', error);
				return [];
			}
		},
		
		// 保存生成的歌单到本地存储
		savePlaylistsToStorage() {
			try {
				uni.setStorageSync('generated_playlists', JSON.stringify({
					playlists: this.generatedPlaylists,
					tags: this.selectedTags,
					timestamp: new Date().getTime()
				}));
				
				// 同时将每个歌单单独保存
				this.generatedPlaylists.forEach(playlist => {
					savePersonalizedPlaylist(playlist);
				});
			} catch (e) {
				console.error('保存生成的歌单失败:', e);
			}
		},
		
		// 查看歌单详情
		viewPlaylist(playlist) {
			// 优先使用playlist_id字段，如果不存在则使用id
			const playlistId = playlist.playlist_id || playlist.id;
			uni.navigateTo({
				url: `/pages/playlist/playlist?id=${playlistId}`
			});
		},
		
		// 返回上一页
		goBack() {
			uni.navigateBack();
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
	
	.content {
        margin-top: 50rpx;
		padding: calc(var(--status-bar-height, 25px) + 120rpx) 30rpx 50rpx;
		
		.guide-text {
			text-align: center;
			margin-bottom: 40rpx;
			
			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 10rpx;
				display: block;
			}
			
			.subtitle {
				font-size: 28rpx;
				color: #666;
				display: block;
			}
		}
		
		.tags-container {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin-bottom: 30rpx;
			
			.tag-item {
				padding: 16rpx 30rpx;
				background-color: #fff;
				border-radius: 30rpx;
				margin: 10rpx;
				font-size: 28rpx;
				color: #666;
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
				transition: all 0.3s;
				
				&.active {
					background: linear-gradient(135deg, #8e71c7, #61a0e4);
					color: #fff;
					box-shadow: 0 2rpx 10rpx rgba(142, 113, 199, 0.3);
				}
				
				&:active {
					transform: scale(0.95);
				}
			}
		}
		
		.selected-tags {
			margin-bottom: 40rpx;
			
			.label {
				font-size: 28rpx;
				color: #666;
				margin-bottom: 16rpx;
				display: block;
			}
			
			.selected-tag-list {
				display: flex;
				flex-wrap: wrap;
				
				.selected-tag {
					display: flex;
					align-items: center;
					padding: 10rpx 20rpx;
					background: linear-gradient(135deg, #8e71c7, #61a0e4);
					color: #fff;
					border-radius: 24rpx;
					margin: 8rpx;
					font-size: 26rpx;
					
					.remove-tag {
						margin-left: 10rpx;
						font-size: 32rpx;
						line-height: 1;
					}
				}
			}
		}
		
		.action-buttons {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 50rpx;
			
			.generate-btn {
				width: 80%;
				height: 80rpx;
				line-height: 80rpx;
				background: linear-gradient(135deg, #8e71c7, #61a0e4);
				color: #fff;
				border-radius: 40rpx;
				font-size: 30rpx;
				font-weight: 500;
				margin-bottom: 20rpx;
				
				&:disabled {
					opacity: 0.6;
				}
			}
			
			.reset-btn {
				background: transparent;
				color: #666;
				font-size: 28rpx;
				border: none;
				
				&::after {
					border: none;
				}
			}
		}
		
		.results-container {
			margin-top: 40rpx;
			
			.results-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 30rpx;
				position: relative;
				padding-left: 20rpx;
				
				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 6rpx;
					height: 32rpx;
					background: linear-gradient(135deg, #8e71c7, #61a0e4);
					border-radius: 3rpx;
				}
			}
			
			.playlist-grid {
				display: flex;
				flex-wrap: wrap;
				margin: 0 -10rpx;
				
				.playlist-item {
					width: calc(50% - 20rpx);
					margin: 10rpx;
					background-color: #fff;
					border-radius: 16rpx;
					overflow: hidden;
					box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
					transition: all 0.3s;
					
					&:active {
						transform: scale(0.98);
					}
					
					.playlist-cover {
						width: 100%;
						height: 270rpx;
						display: block;
					}
					
					.playlist-name {
						padding: 16rpx 20rpx 8rpx;
						font-size: 28rpx;
						color: #333;
						font-weight: 500;
						width: 100%;
						max-width: 100%;
						box-sizing: border-box;
					}
					
					.text-ellipsis {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					
					.playlist-info {
						padding: 0 20rpx 16rpx;
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}
	}
}
</style> 
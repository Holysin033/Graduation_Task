<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search-bar">
			<view class="search-input" @tap="goToSearch">
				<text class="iconfont icon-search"></text>
				<text class="placeholder">搜索音乐</text>
			</view>
		</view>
		
		<!-- 分类标签 -->
		<scroll-view class="category-scroll" scroll-x="true" :show-scrollbar="false">
			<view class="category-list">
				<view 
					v-for="category in categories" 
					:key="category.id"
					:class="['category-item', currentCategory === category.id ? 'active' : '']"
					@tap="changeCategory(category.id)"
				>
					{{ category.name }}
				</view>
			</view>
		</scroll-view>
		
		<!-- 推荐歌单 -->
		<view class="playlist-section">
			<view class="section-title">推荐歌单</view>
			<view class="playlist-grid">
				<view 
					class="playlist-item" 
					v-for="playlist in filteredPlaylists" 
					:key="playlist.id"
					@tap="goToPlaylist(playlist)"
				>
					<image :src="playlist.cover" mode="aspectFill" class="playlist-cover"></image>
					<view class="playlist-info">
						<text class="playlist-name text-ellipsis">{{ playlist.name }}</text>
						<text class="playlist-count">{{ formatPlayCount(playlist.playCount) }}</text>
					</view>
					<view class="favorite-btn" @tap.stop="toggleFavorite(playlist)">
						<text 
							class="iconfont" 
							:class="isPlaylistFavorited(playlist.id) ? 'icon-star' : 'icon-star'" 
							:style="{ color: isPlaylistFavorited(playlist.id) ? '#007AFF' : '#ffffff' }"
						></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { 
	getRecommendPlaylists, 
	getCategories, 
	getMusicList,
	addPlaylistToFavorites,
	removePlaylistFromFavorites,
	isPlaylistFavorited,
	getFavoritePlaylists,
	getFavoritePlaylistsFromServer,
	isInGuestMode,
	showGuestModeLimit
} from '@/utils/musicData.js'

export default {
	data() {
		return {
			playlists: [],
			categories: [],
			currentCategory: 0,
			loading: false,
			favoritePlaylists: []
		}
	},
	computed: {
		filteredPlaylists() {
			return this.playlists
		}
	},
	onLoad() {
		this.loadData()
		this.loadFavorites()
	},
	onShow() {
		// 每次页面显示时重新加载收藏状态
		this.loadFavorites()
	},
	methods: {
		// 加载收藏的歌单
		async loadFavorites() {
			try {
				console.log('开始加载收藏歌单...');
				
				// 从服务器获取最新数据
				const result = await getFavoritePlaylistsFromServer();
				
				if (result.success && Array.isArray(result.data)) {
					console.log(`成功加载收藏歌单: ${result.data.length}个`);
					this.favoritePlaylists = result.data;
				} else {
					console.warn('从服务器获取收藏歌单失败或数据格式不正确:', result.message);
					// 保留现有的收藏数据，避免清空
					if (this.favoritePlaylists.length === 0) {
						this.favoritePlaylists = [];
					}
				}
			} catch (error) {
				console.error('加载收藏歌单失败：', error);
				// 保留现有的收藏数据，避免清空
				if (this.favoritePlaylists.length === 0) {
				this.favoritePlaylists = [];
				}
			}
		},
		
		// 检查歌单是否已收藏
		isPlaylistFavorited(playlistId) {
			// 直接使用本地favoritePlaylists数组检查收藏状态
			return this.favoritePlaylists.some(item => 
				// 优先使用playlist_id字段，如果不存在则使用id
				(item.playlist_id && item.playlist_id == playlistId) || 
				(item.id && item.id == playlistId)
			);
		},
		
		// 切换歌单收藏状态
		async toggleFavorite(playlist) {
			// 检查是否为游客模式
			if (isInGuestMode()) {
				showGuestModeLimit('收藏歌单');
				return;
			}
			
			try {
				// 使用本地方法检查收藏状态
				const isFavorited = this.isPlaylistFavorited(playlist.id);
				
				if (!isFavorited) {
					// 添加到收藏 - 确保传递完整的歌单数据
					console.log('准备添加歌单到收藏:', playlist);
					
					// 创建一个更完整的歌单对象
					const fullPlaylist = {
						id: playlist.id,
						name: playlist.name || '未知歌单',
						description: playlist.description || '',
						cover: playlist.cover || playlist.coverImgUrl || '',
						playCount: playlist.playCount || 0,
						creator: typeof playlist.creator === 'object' ? 
							playlist.creator : 
							{ nickname: playlist.creator_name || '未知创建者' }
					};
					
					const result = await addPlaylistToFavorites(fullPlaylist);
					
					if (result.success) {
						// 重新加载收藏数据
						await this.loadFavorites();
						uni.showToast({
							title: result.message,
							icon: 'none',
							duration: 1500
						});
					} else {
						uni.showToast({
							title: result.message || '收藏失败',
							icon: 'none',
							duration: 1500
						});
					}
				} else {
					// 取消收藏 - 找到实际的收藏项
					const favoriteItem = this.favoritePlaylists.find(item => 
						(item.playlist_id && item.playlist_id == playlist.id) || 
						(item.id && item.id == playlist.id)
					);
					
					// 使用正确的ID调用取消收藏API
					const idToRemove = favoriteItem ? (favoriteItem.playlist_id || favoriteItem.id) : playlist.id;
					console.log('准备取消收藏歌单:', idToRemove);
					
					const result = await removePlaylistFromFavorites(idToRemove);
					
					if (result.success) {
						// 重新加载收藏数据
						await this.loadFavorites();
						uni.showToast({
							title: result.message,
							icon: 'none',
							duration: 1500
						});
					} else {
						uni.showToast({
							title: result.message || '取消收藏失败',
							icon: 'none',
							duration: 1500
						});
					}
				}
			} catch (error) {
				console.error('收藏操作失败：', error);
				uni.showToast({
					title: '操作失败，请重试',
					icon: 'none',
					duration: 1500
				});
			}
		},
		async loadData() {
			try {
				this.loading = true
				const response = await getRecommendPlaylists()
				this.playlists = response
				// 获取分类
				this.categories = getCategories()
			} catch (error) {
				console.error('加载推荐歌单失败：', error)
				uni.showToast({
					title: '加载推荐歌单失败',
					icon: 'none',
					duration: 3000
				})
			} finally {
				this.loading = false
			}
		},
		async changeCategory(id) {
			if (this.loading) return
			
			this.loading = true
			this.currentCategory = id
			
			try {
				if (id === 0) {
					// 全部分类，显示推荐歌单
					this.playlists = await getRecommendPlaylists()
				} else {
					// 根据分类获取歌单
					const response = await uni.request({
						url: 'http://localhost:3000/api/playlists/category',
						method: 'GET',
						data: {
							cat: this.categories.find(c => c.id === id).name,
							limit: 30
						}
					})
					
					if (response.statusCode === 200 && response.data.code === 200) {
						this.playlists = response.data.playlists.map(item => ({
							id: item.id,
							name: item.name,
							cover: item.coverImgUrl,
							playCount: item.playCount
						}))
					} else {
						throw new Error(response.data.message || '获取分类歌单失败')
					}
				}
			} catch (error) {
				console.error('获取分类歌单失败：', error)
				uni.showToast({
					title: '获取分类歌单失败',
					icon: 'none',
					duration: 3000
				})
			} finally {
				this.loading = false
			}
		},
		goToPlaylist(playlist) {
			uni.navigateTo({
				url: `/pages/playlist/playlist?id=${playlist.id}`
			})
		},
		goToSearch() {
			// 检查是否为游客模式
			if (isInGuestMode()) {
				showGuestModeLimit('搜索音乐');
				return;
			}
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		formatPlayCount(count) {
			if (count >= 10000) {
				return (count / 10000).toFixed(1) + '万'
			}
			return count
		}
	}
}
</script>

<style lang="scss">
	@import '@/scss/index.scss';

.text-ellipsis {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
	display: block;
}

/* 覆盖index.scss中的样式 */
.playlist-section {
	.playlist-grid {
		.playlist-item {
			.playlist-info {
				.playlist-name {
					max-width: 100%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: 1.3;
				}
			}
		}
	}
}
</style>

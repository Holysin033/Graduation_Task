// 本地服务器 API 基础地址
const BASE_URL = 'http://localhost:3000'

// 游客模式状态管理
let isGuestMode = false

// 设置游客模式
export function setGuestMode(enabled) {
	isGuestMode = enabled
	// 保存到本地存储以便下次启动时保持状态
	uni.setStorageSync('guestMode', enabled)
	
	// 如果启用游客模式，则显示提示
	if (enabled) {
		uni.showToast({
			title: '已进入游客模式，部分功能受限',
			icon: 'none', 
			duration: 2000
		})
	} else {
		uni.showToast({
			title: '已退出游客模式',
			icon: 'none',
			duration: 2000
		})
	}
	
	return enabled
}

// 检查是否处于游客模式
export function isInGuestMode() {
	// 首次访问时从本地存储读取状态
	if (isGuestMode === undefined) {
		const storedMode = uni.getStorageSync('guestMode')
		isGuestMode = storedMode === true || storedMode === 'true'
	}
	return isGuestMode
}

// 游客模式功能限制提示
export function showGuestModeLimit(feature) {
	if (isInGuestMode()) {
		uni.showToast({
			title: `游客模式下不能${feature}，请退出游客模式`,
			icon: 'none',
			duration: 2000
		})
		return true
	}
	return false
}

// 处理需要验证码的API响应
export async function handleCaptchaRequired(response) {
	if (response.data && response.data.code === -462) {
		// 获取验证码相关信息
		const captchaData = response.data.data
		const verifyUrl = captchaData.url
		
		// 提示用户需要完成验证
		uni.showModal({
			title: '需要验证',
			content: '网易云音乐需要验证操作，请点击确定前往完成验证',
			success: (res) => {
				if (res.confirm) {
					// 使用uni-app的API在浏览器中打开链接，替代plus.runtime.openURL
					// 根据平台使用不同的方式打开URL
					// #ifdef APP-PLUS
					plus.runtime.openURL(verifyUrl);
					// #endif
					
					// #ifdef H5
					window.open(verifyUrl, '_blank');
					// #endif
					
					// #ifdef MP
					uni.setClipboardData({
						data: verifyUrl,
						success: function() {
							uni.showToast({
								title: '验证链接已复制，请在浏览器中打开',
								icon: 'none',
								duration: 3000
							});
						}
					});
					// #endif
					
					// 提示用户完成验证后返回
					uni.showToast({
						title: '完成验证后请返回App',
						icon: 'none',
						duration: 3000
					});
				}
			}
		});
		
		// 返回验证状态，便于调用者处理
		return {
			needVerification: true,
			verifyData: captchaData
		};
	}
	
	// 不需要验证，返回null
	return {
		needVerification: false
	};
}

// 检查 API 是否可用
export async function checkApiStatus() {
	try {
		const response = await uni.request({
			url: `${BASE_URL}/api/status`,
			method: 'GET',
			timeout: 10000
		})
		return response.statusCode === 200
	} catch (error) {
		console.error('API 检查失败：', error)
		return false
	}
}

// 获取音乐列表
export const getMusicList = async () => {
	try {
		const response = await uni.request({
			url: `${BASE_URL}/top/list`,
			method: 'GET',
			limit:50
		})
		
		// 检查是否需要验证码
		const captchaCheck = await handleCaptchaRequired(response)
		if (captchaCheck.needVerification) {
			uni.showToast({
				title: '请完成验证后重试',
				icon: 'none',
				duration: 2000
			})
			return []
		}
		
		if (response.statusCode !== 200 || !response.data.playlist) {
			throw new Error('获取音乐列表失败')
		}
		
		return response.data.playlist.tracks
	} catch (error) {
		console.error('获取音乐列表失败：', error)
		uni.showToast({
			title: '获取音乐列表失败',
			icon: 'none',
			duration: 2000
		})
		return []
	}
}

// 获取首页推荐歌单
export async function getRecommendPlaylists() {
	try {
		const response = await uni.request({
			url: `${BASE_URL}/api/recommend/playlists`,
			method: 'GET',
			timeout: 10000,

		})
		
		// 检查是否需要验证码
		const captchaCheck = await handleCaptchaRequired(response)
		if (captchaCheck.needVerification) {
			uni.showToast({
				title: '请完成验证后重试',
				icon: 'none',
				duration: 2000
			})
			return [
				{
					id: 1,
					name: '热门歌单',
					cover: 'https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
					playCount: 1000000
				},
				{
					id: 2,
					name: '新歌推荐',
					cover: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
					playCount: 800000
				},
				{
					id: 3,
					name: '经典老歌',
					cover: 'https://p1.music.126.net/8tGcHWOwXfGBlpcXI2Movw==/18696095720518497.jpg',
					playCount: 600000
				}
			]
		}
		
		if (response.statusCode === 200 && response.data.code === 200) {
			return response.data.result.map(item => ({
				id: item.id,
				name: item.name,
				cover: item.picUrl,
				playCount: item.playCount
			}))
		} else {
			throw new Error(response.data.message || '获取推荐歌单失败')
		}
	} catch (error) {
		console.error('获取推荐歌单失败：', error)
		// 如果请求失败，返回一些默认数据
		return [
			{
				id: 1,
				name: '热门歌单',
				cover: 'https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
				playCount: 1000000
			},
			{
				id: 2,
				name: '新歌推荐',
				cover: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
				playCount: 800000
			},
			{
				id: 3,
				name: '经典老歌',
				cover: 'https://p1.music.126.net/8tGcHWOwXfGBlpcXI2Movw==/18696095720518497.jpg',
				playCount: 600000
			}
		]
	}
}

// 获取个性化推荐歌单
export async function getPersonalizedPlaylists() {
	try {
		// 检查是否有用户历史数据
		let playHistory = uni.getStorageSync('playHistory');
		
		// 检查playHistory是否为有效的JSON字符串
		if (!playHistory || typeof playHistory !== 'string' || playHistory.trim() === '' || playHistory === '[]' || playHistory === 'null' || playHistory === 'undefined') {
			console.log('无播放历史或播放历史为空');
			
			// 确保playHistory为空数组字符串
			uni.setStorageSync('playHistory', '[]');
			
			// 冷启动：返回默认推荐歌单
			return {
				success: true,
				data: [
					{
						id: 'recommend_1',
						name: '每日推荐',
						cover: '/static/recommend-1.png',
						songCount: 20,
						description: '根据你的口味，每日更新',
						creator: '网易云音乐'
					},
					{
						id: 'recommend_2',
						name: '热门歌单',
						cover: '/static/recommend-1 copy.png',
						songCount: 30,
						description: '大家都在听什么',
						creator: '网易云音乐'
					},
					{
						id: 'recommend_3',
						name: '新歌速递',
						cover: '/static/recommend-1 copy 2.png',
						songCount: 25,
						description: '最新上架的好音乐',
						creator: '网易云音乐'
					}
				]
			};
		}

		// 安全解析播放历史
		let history;
		try {
			// 先检查字符串是否是有效的JSON
			if (!playHistory.startsWith('[') && !playHistory.startsWith('{')) {
				console.error('播放历史不是有效的JSON字符串:', playHistory.slice(0, 20) + '...');
				
				// 重置为空数组
				uni.setStorageSync('playHistory', '[]');
				throw new Error('播放历史格式错误');
			}
			
			history = JSON.parse(playHistory);
			
			// 确保history是数组
			if (!Array.isArray(history)) {
				console.error('解析后的播放历史不是数组:', typeof history);
				
				// 重置为空数组
				uni.setStorageSync('playHistory', '[]');
				throw new Error('播放历史格式错误');
			}
			
			// 检查数组内容是否有效
			if (history.length === 0) {
				console.log('播放历史为空数组');
				throw new Error('播放历史为空');
			}
			
			// 过滤掉无效的数据项
			const validHistory = history.filter(item => 
				item && typeof item === 'object' && (item.id || item.name || item.artist)
			);
			
			if (validHistory.length === 0) {
				console.error('播放历史中没有有效的数据项');
				throw new Error('播放历史数据无效');
			}
			
			// 使用经过验证的数据
			history = validHistory;
			
		} catch (parseError) {
			console.error('解析播放历史失败：', parseError);
			// 如果解析失败，返回默认推荐
			return {
				success: true,
				data: [
					{
						id: 'recommend_1',
						name: '每日推荐',
						cover: '/static/recommend-1.png',
						songCount: 20,
						description: '根据你的口味，每日更新',
						creator: '网易云音乐'
					},
					{
						id: 'recommend_2',
						name: '热门歌单',
						cover: '/static/recommend-2.png',
						songCount: 30,
						description: '大家都在听什么',
						creator: '网易云音乐'
					},
					{
						id: 'recommend_3',
						name: '新歌速递',
						cover: '/static/recommend-3.png',
						songCount: 25,
						description: '最新上架的好音乐',
						creator: '网易云音乐'
					}
				]
			};
		}
		
		// 分析用户偏好
		const preferences = analyzeUserPreferences(history);
		
		// 根据用户偏好生成推荐歌单
		const recommendedPlaylists = generateRecommendations(preferences);
		
		return {
			success: true,
			data: recommendedPlaylists
		};
	} catch (error) {
		console.error('获取个性化推荐歌单失败：', error);
		return {
			success: false,
			message: '获取个性化推荐歌单失败'
		};
	}
}

// 分析用户偏好
function analyzeUserPreferences(history) {
	const preferences = {
		genres: {}, // 音乐风格偏好
		artists: {}, // 歌手偏好
		playCount: 0, // 总播放次数
		recentSongs: [] // 最近播放的歌曲
	}
	
	// 只分析最近100条记录
	const recentHistory = history.slice(-100)
	
	recentHistory.forEach(item => {
		// 统计音乐风格
		if (item.genre) {
			preferences.genres[item.genre] = (preferences.genres[item.genre] || 0) + 1
		}
		
		// 统计歌手
		if (item.artist) {
			preferences.artists[item.artist] = (preferences.artists[item.artist] || 0) + 1
		}
		
		preferences.playCount++
		preferences.recentSongs.push(item)
	})
	
	return preferences
}

// 生成推荐歌单
function generateRecommendations(preferences) {
	const recommendations = []
	
	// 1. 基于用户最常听的音乐风格生成歌单
	const topGenres = Object.entries(preferences.genres)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 3)
	
	topGenres.forEach(([genre, count], index) => {
		recommendations.push({
			id: `genre_${index}`,
			name: `${genre}精选`,
			cover: `/static/genre-${index + 1}.png`,
			songCount: 20,
			description: `根据你喜欢的${genre}风格推荐`,
			creator: '网易云音乐'
		})
	})
	
	// 2. 基于用户最常听的歌手生成歌单
	const topArtists = Object.entries(preferences.artists)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 2)
	
	topArtists.forEach(([artist, count], index) => {
		recommendations.push({
			id: `artist_${index}`,
			name: `${artist}的热门歌曲`,
			cover: `/static/artist-${index + 1}.png`,
			songCount: 25,
			description: `你喜欢的${artist}的精选歌曲`,
			creator: '网易云音乐'
		})
	})
	
	// 3. 添加每日推荐歌单
	recommendations.unshift({
		id: 'daily_recommend',
		name: '每日推荐',
		cover: '/static/daily-recommend.png',
		songCount: 30,
		description: '根据你的听歌习惯，每日更新',
		creator: '网易云音乐'
	})
	
	return recommendations
}

// 获取歌单详情
export async function getPlaylistDetail(id) {
	try {
		// 检查是否是自定义ID，如daily_recommend、recommend_开头或artist_开头的ID
		if (id === 'daily_recommend' || id.startsWith('recommend_') || id.startsWith('artist_') || id.startsWith('genre_')) {
			console.log('使用本地模拟数据生成歌单:', id);
			// 使用generateMockSongsForPlaylist生成模拟数据
			return generateMockSongsForPlaylist(id);
		}
		
		// 获取歌单详情
		const response = await uni.request({
			url: `${BASE_URL}/playlist/detail`,
			method: 'GET',
			data: { id },
			timeout: 15000
		})
		
		// 检查是否需要验证码
		const captchaCheck = await handleCaptchaRequired(response)
		if (captchaCheck.needVerification) {
			console.log('歌单详情需要验证码验证，使用本地模拟数据')
			return generateMockSongsForPlaylist(id)
		}
		
		if (response.statusCode !== 200 || response.data.code !== 200) {
			throw new Error('获取歌单详情失败')
		}
		
		const playlist = response.data.playlist
		
		// 检查歌曲数据
		if (!playlist.trackIds || !Array.isArray(playlist.trackIds)) {
			throw new Error('获取歌单歌曲失败：数据格式错误')
		}
		
		// 获取tracks和trackIds
		const tracks = playlist.tracks || []
		const trackIds = playlist.trackIds || []
		
		console.log(`歌单 ${playlist.name} 包含 ${trackIds.length} 首歌曲，API返回 ${tracks.length} 首`)
		
		// 如果tracks已包含全部歌曲，直接使用
		if (tracks.length >= trackIds.length) {
			const fullTracks = tracks.map(track => {
			// 确保track对象存在
			if (!track) return null
			
			// 处理歌手信息
			let artist = '未知歌手'
			if (track.ar && Array.isArray(track.ar)) {
				artist = track.ar.map(ar => ar.name).join(' / ')
			}
			
			return {
				id: track.id || '',
				name: track.name || '未知歌曲',
				artist: artist,
				cover: track.al ? track.al.picUrl : '/static/music-cover.png',
				duration: track.dt || 0  // 使用 dt 字段作为时长
			}
		}).filter(song => song !== null)
		
		// 返回完整的歌单信息
		return {
			id: playlist.id,
			name: playlist.name,
			cover: playlist.coverImgUrl,
			description: playlist.description,
			creator: playlist.creator ? playlist.creator.nickname : '未知用户',
				tracks: fullTracks,
				totalCount: trackIds.length
			}
		}
		
		// 需要分批获取完整歌曲详情
		// 先使用已有的tracks
		let fullTracks = tracks.map(track => {
			// 确保track对象存在
			if (!track) return null
			
			// 处理歌手信息
			let artist = '未知歌手'
			if (track.ar && Array.isArray(track.ar)) {
				artist = track.ar.map(ar => ar.name).join(' / ')
			}
			
			return {
				id: track.id || '',
				name: track.name || '未知歌曲',
				artist: artist,
				cover: track.al ? track.al.picUrl : '/static/music-cover.png',
				duration: track.dt || 0  // 使用 dt 字段作为时长
			}
		}).filter(song => song !== null)
		
		// 收集已获取的歌曲ID
		const existingIds = new Set(fullTracks.map(track => track.id.toString()))
		
		// 收集未获取的歌曲ID
		const missingIds = trackIds
			.filter(trackId => !existingIds.has(trackId.id.toString()))
			.map(trackId => trackId.id)
		
		console.log(`需要额外获取 ${missingIds.length} 首歌曲详情`)
		
		// 如果有缺失的歌曲，分批获取详情
		if (missingIds.length > 0) {
			// 每批获取的歌曲数量
			const batchSize = 20
			
			// 用于存储所有获取的歌曲
			const additionalTracks = []
			
			// 分批处理
			for (let i = 0; i < missingIds.length; i += batchSize) {
				const batchIds = missingIds.slice(i, i + batchSize)
				
				try {
					// 获取本批次歌曲详情
					const batchResponse = await uni.request({
						url: `${BASE_URL}/song/detail`,
						method: 'GET',
						data: { ids: batchIds.join(',') },
						timeout: 15000
					})
					
					// 处理本批次数据
					if (batchResponse.statusCode === 200 && batchResponse.data.code === 200) {
						const songs = batchResponse.data.songs || []
						
						// 处理返回的歌曲
						const batchTracks = songs.map(song => {
							// 处理歌手信息
							let artist = '未知歌手'
							if (song.ar && Array.isArray(song.ar)) {
								artist = song.ar.map(ar => ar.name).join(' / ')
							}
							
							return {
								id: song.id || '',
								name: song.name || '未知歌曲',
								artist: artist,
								cover: song.al ? song.al.picUrl : '/static/music-cover.png',
								duration: song.dt || 0
							}
						})
						
						// 添加到结果中
						additionalTracks.push(...batchTracks)
					}
				} catch (error) {
					console.error(`获取批次歌曲详情失败:`, error)
					// 继续处理下一批，不中断整个过程
				}
				
				// 可以考虑加入延迟，避免频繁请求
				await new Promise(resolve => setTimeout(resolve, 300))
			}
			
			// 将额外获取的歌曲添加到结果中
			if (additionalTracks.length > 0) {
				fullTracks = [...fullTracks, ...additionalTracks]
				console.log(`成功额外获取了 ${additionalTracks.length} 首歌曲详情`)
			}
		}
		
		// 返回完整的歌单信息
		return {
			id: playlist.id,
			name: playlist.name,
			cover: playlist.coverImgUrl,
			description: playlist.description,
			
			creator: playlist.creator ? playlist.creator.nickname : '未知用户',
			tracks: fullTracks,
			totalCount: trackIds.length
		}
		
	} catch (error) {
		console.error('获取歌单详情失败：', error)
		// 在出错时也尝试使用本地数据
		if (id === 'daily_recommend' || id.startsWith('recommend_') || id.startsWith('artist_') || id.startsWith('genre_')) {
			console.log('API请求失败，使用本地模拟数据生成歌单:', id);
			return generateMockSongsForPlaylist(id);
		}
		throw error
	}
}

// 获取新歌
export const getNewSongs = async () => {
	try {
		const response = await uni.request({
			url: `${BASE_URL}/new/songs`,
			method: 'GET'
		})
		
		// 检查是否需要验证码
		const captchaCheck = await handleCaptchaRequired(response)
		if (captchaCheck.needVerification) {
			uni.showToast({
				title: '请完成验证后重试',
				icon: 'none',
				duration: 2000
			})
			return []
		}
		
		if (response.statusCode !== 200 || !response.data.songs) {
			throw new Error('获取新歌失败')
		}
		
		return response.data.songs
	} catch (error) {
		console.error('获取新歌失败：', error)
		uni.showToast({
			title: '获取新歌失败',
			icon: 'none',
			duration: 2000
		})
		return []
	}
}

// 获取歌手列表
export const getArtistList = async (type = -1, area = -1, initial = -1) => {
	try {
		const response = await uni.request({
			url: `${BASE_URL}/artist/list?type=${type}&area=${area}&initial=${initial}`,
			method: 'GET'
		})
		
		// 检查是否需要验证码
		const captchaCheck = await handleCaptchaRequired(response)
		if (captchaCheck.needVerification) {
			uni.showToast({
				title: '请完成验证后重试',
				icon: 'none',
				duration: 2000
			})
			return []
		}
		
		if (response.statusCode !== 200 || !response.data.artists) {
			throw new Error('获取歌手列表失败')
		}
		
		return response.data.artists
	} catch (error) {
		console.error('获取歌手列表失败：', error)
		uni.showToast({
			title: '获取歌手列表失败',
			icon: 'none',
			duration: 2000
		})
		return []
	}
}

// 获取音乐 URL
export async function getMusicUrl(id) {
	try {
		// 直接返回网易云音乐的外链地址
		return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
	} catch (error) {
		console.error('获取音乐 URL 失败：', error)
		throw error
	}
}

// 获取音乐详情
export async function getMusicById(id) {
	try {
		// 检查ID是否有效
		if (!id) {
			console.error('尝试获取音乐详情但ID为空')
			// 返回默认空歌曲对象
			return {
				id: '',
				name: '未知歌曲',
				artist: '未知歌手',
				album: '未知专辑',
				cover: '/static/music-cover.png',
				duration: 0,
				url: ''
			}
		}
		
		// 尝试从ID中提取song_id（如果ID是对象且包含song_id字段）
		let realId = id;
		if (typeof id === 'object' && id.song_id) {
			realId = id.song_id;
			console.log('从对象中提取song_id:', realId);
		} else if (typeof id === 'string' && !isNaN(Number(id))) {
			// 如果是数值型ID，可能是本地数据库索引，尝试从存储中查找对应的song_id
			const playList = uni.getStorageSync('playList');
			if (playList) {
				try {
					const songs = JSON.parse(playList);
					const song = songs.find(s => s.id == id);
					if (song && song.song_id) {
						realId = song.song_id;
						console.log('从播放列表中找到对应的song_id:', realId);
					}
				} catch (e) {
					console.error('解析播放列表失败:', e);
				}
			}
		}
		
		const response = await uni.request({
			url: `${BASE_URL}/song/detail`,
			method: 'GET',
			data: { ids: realId }
		})
		
		// 检查是否需要验证码
		const captchaCheck = await handleCaptchaRequired(response)
		if (captchaCheck.needVerification) {
			uni.showToast({
				title: '请完成验证后重试',
				icon: 'none',
				duration: 2000
			})
			throw new Error('需要验证码')
		}
		console.log(response.data);
		
		if (response.statusCode === 200 && response.data.code === 200 && response.data.songs && response.data.songs.length > 0) {
			const song = response.data.songs[0]
			return {
				id: id, // 保留原始ID以便于本地匹配
				song_id: song.id.toString(), // 网易云音乐ID
				name: song.name,
				artist: song.ar && song.ar[0] ? song.ar[0].name : '未知歌手',
				cover: song.al ? song.al.picUrl : '/static/music-cover.png',
				album: song.al ? song.al.name : '未知专辑',
				duration: song.dt || 0,
				url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
			}
		} else {
			// 如果API返回数据不完整，尝试创建填充数据
			console.warn('API返回的歌曲数据不完整，使用ID生成基本信息')
			return {
				id: id,
				song_id: String(realId), // 确保song_id字段存在
				name: '未知歌曲',
				artist: '未知歌手',
				album: '未知专辑',
				cover: '/static/music-cover.png',
				duration: 0,
				url: `https://music.163.com/song/media/outer/url?id=${realId}.mp3`
			}
		}
	} catch (error) {
		console.error('获取音乐详情失败：', error)
		// 出错时也返回基本数据而不是抛出错误
		const realId = typeof id === 'object' && id.song_id ? id.song_id : id;
		return {
			id: id || '',
			song_id: String(realId || id), // 确保song_id字段存在
			name: '未知歌曲',
			artist: '未知歌手',
			album: '未知专辑',
			cover: '/static/music-cover.png',
			duration: 0,
			url: realId ? `https://music.163.com/song/media/outer/url?id=${realId}.mp3` : ''
		}
	}
}

// 搜索音乐
export async function searchMusic(keyword, options = {}) {
	// 判断游客模式，直接返回空结果
	if (isInGuestMode()) {
		showGuestModeLimit('搜索音乐');
		return {
			songs: [],
			artists: [],
			albums: [],
			lyrics: [],
			hasMore: {
				songs: false,
				artists: false,
				albums: false,
				lyrics: false
			},
			count: {
				songs: 0,
				artists: 0,
				albums: 0,
				lyrics: 0
			}
		};
	}
	
	try {
		// 默认参数
		const defaultOptions = {
			type: 1, // 1: 单曲, 100: 歌手, 10: 专辑, 1006: 歌词
			limit: 20, // 返回数量限制
			offset: 0, // 偏移，用于分页
			ignoreCache: false // 是否忽略缓存
		}
		
		const searchOptions = { ...defaultOptions, ...options }
		
		console.log(`搜索${keyword}，类型:${searchOptions.type}，页码:${searchOptions.offset / searchOptions.limit + 1}`);
		
		// 构建API请求
		const response = await uni.request({
			url: `${BASE_URL}/search`,
			method: 'GET',
			data: {
				keywords: keyword,
				type: searchOptions.type,
				limit: searchOptions.limit,
				offset: searchOptions.offset
			},
			timeout: 10000
		});
		
		// 检查是否需要验证码
		const captchaCheck = await handleCaptchaRequired(response);
		if (captchaCheck.needVerification) {
			console.log('搜索请求需要验证码');
			// 在无法访问API的情况下使用本地模拟数据
			return generateMockSearchResults(keyword, searchOptions);
		}
		
		if (response.statusCode !== 200 || !response.data || response.data.code !== 200) {
			console.error('搜索API返回错误:', response.data);
			throw new Error('搜索失败: API响应异常');
		}
		
		// 根据搜索类型处理不同的响应格式
		const result = { totalCount: {} };
		
		switch (searchOptions.type) {
			case 1: // 单曲
				if (response.data.result && response.data.result.songs) {
					result.songs = response.data.result.songs.map(item => ({
						id: item.id,
						name: item.name,
						artist: (item.artists && item.artists.length > 0) ? item.artists.map(a => a.name).join('/') : '未知歌手',
						album: (item.album && item.album.name) ? item.album.name : '未知专辑',
						duration: item.duration || 0,
						cover: (item.album && item.album.picUrl) ? item.album.picUrl : '/static/music-cover.png'
					}));
					result.totalCount.songs = response.data.result.songCount || 0;
				} else {
					result.songs = [];
					result.totalCount.songs = 0;
				}
				break;
				
			case 100: // 歌手
				if (response.data.result && response.data.result.artists) {
					result.artists = response.data.result.artists.map(item => ({
						id: item.id,
						name: item.name,
						avatar: item.picUrl || '/static/avatar.png',
						albumSize: item.albumSize || 0,
						musicSize: item.musicSize || 0
					}));
					result.totalCount.artists = response.data.result.artistCount || 0;
				} else {
					result.artists = [];
					result.totalCount.artists = 0;
				}
				break;
				
			case 10: // 专辑
				if (response.data.result && response.data.result.albums) {
					result.albums = response.data.result.albums.map(item => ({
						id: item.id,
						name: item.name,
						artist: (item.artist && item.artist.name) ? item.artist.name : '未知歌手',
						cover: item.picUrl || '/static/music-cover.png',
						publishTime: item.publishTime || 0,
						size: item.size || 0
					}));
					result.totalCount.albums = response.data.result.albumCount || 0;
				} else {
					result.albums = [];
					result.totalCount.albums = 0;
				}
				break;
				
			case 1006: // 歌词
				if (response.data.result && response.data.result.songs) {
					result.lyrics = response.data.result.songs.map(item => {
						// 处理歌词格式，将JSON字符串解析为纯文本
						let cleanLyrics = '暂无歌词';
						if (item.lyrics) {
							try {
								// 检查lyrics是否为字符串类型
								if (typeof item.lyrics === 'string') {
									// 尝试解析JSON格式的歌词
									if (item.lyrics.startsWith('{') && item.lyrics.includes('txt')) {
										const lyricsObj = JSON.parse(item.lyrics);
										if (lyricsObj.txt) {
											cleanLyrics = lyricsObj.txt;
										}
									} else {
										cleanLyrics = item.lyrics;
									}
								} else if (typeof item.lyrics === 'object') {
									// 如果lyrics已经是对象，直接检查是否有txt字段
									if (item.lyrics.txt) {
										cleanLyrics = item.lyrics.txt;
									} else {
										cleanLyrics = JSON.stringify(item.lyrics);
									}
								} else {
									// 其他情况，转为字符串
									cleanLyrics = String(item.lyrics);
								}
							} catch (e) {
								console.error('解析歌词失败:', e);
								// 如果解析失败，尝试使用String转换
								try {
									cleanLyrics = String(item.lyrics);
								} catch (e2) {
									console.error('转换歌词为字符串失败:', e2);
									cleanLyrics = '暂无歌词';
								}
							}
						}
				
				return {
							id: item.id,
							name: item.name,
							artist: (item.artists && item.artists.length > 0) ? item.artists.map(a => a.name).join('/') : '未知歌手',
							album: (item.album && item.album.name) ? item.album.name : '未知专辑',
							duration: item.duration || 0,
							cover: (item.album && item.album.picUrl) ? item.album.picUrl : '/static/music-cover.png',
							lyrics: cleanLyrics,
				};
			});
					result.totalCount.lyrics = response.data.result.songCount || 0;
				} else {
					result.lyrics = [];
					result.totalCount.lyrics = 0;
				}
				break;
				
			default:
				console.warn(`未处理的搜索类型: ${searchOptions.type}`);
				return generateMockSearchResults(keyword, searchOptions);
		}
		
		return result;
		
	} catch (error) {
		console.error('搜索失败:', error);
		// 在无法访问API的情况下使用本地模拟数据
		return generateMockSearchResults(keyword, options);
	}
}

// 生成模拟搜索结果
function generateMockSearchResults(keyword, options) {
	const { type, limit, offset } = options;
	const result = { totalCount: {} };
	
	// 根据关键词生成随机数据
	const seed = keyword.length + offset; // 使用关键词长度和偏移量作为随机种子
	const random = (min, max) => Math.floor(seed % 10 * (max - min) / 10 + min);
	
	// 根据搜索类型生成不同的模拟数据
	switch (type) {
		case 1: // 单曲
			result.songs = Array.from({ length: random(5, limit) }, (_, i) => ({
				id: `mock_song_${offset + i}_${Date.now()}`,
				name: `${keyword}的歌 ${offset + i + 1}`,
				artist: ['周杰伦', '林俊杰', '陈奕迅', '李荣浩', '薛之谦'][random(0, 5)],
				album: `${keyword}专辑`,
				duration: 180000 + random(0, 120000),
				cover: `/static/song-cover-${random(1, 5)}.png`
			}));
			result.totalCount.songs = offset + result.songs.length + random(10, 50);
			break;
			
		case 100: // 歌手
			result.artists = Array.from({ length: random(3, limit) }, (_, i) => ({
				id: `mock_artist_${offset + i}_${Date.now()}`,
				name: `${keyword}歌手 ${offset + i + 1}`,
				avatar: `/static/artist-avatar-${random(1, 5)}.png`,
				albumSize: random(5, 20),
				musicSize: random(20, 100)
			}));
			result.totalCount.artists = offset + result.artists.length + random(5, 20);
			break;
			
		case 10: // 专辑
			result.albums = Array.from({ length: random(4, limit) }, (_, i) => ({
				id: `mock_album_${offset + i}_${Date.now()}`,
				name: `${keyword}专辑 ${offset + i + 1}`,
				artist: ['周杰伦', '林俊杰', '陈奕迅', '李荣浩', '薛之谦'][random(0, 5)],
				cover: `/static/album-cover-${random(1, 5)}.png`,
				publishTime: Date.now() - random(0, 5 * 365 * 24 * 60 * 60 * 1000),
				size: random(10, 20)
			}));
			result.totalCount.albums = offset + result.albums.length + random(5, 25);
			break;
			
		case 1006: // 歌词
			const mockLyrics = [
				`${keyword}出现在歌词里...心随你动`,
				`今天的${keyword}让我想起了你`,
				`听说${keyword}是你最爱的歌`,
				`${keyword}如风，吹过我的指尖`,
				`没有了${keyword}，世界多了一份寂静`
			];
			
			result.lyrics = Array.from({ length: random(3, limit) }, (_, i) => {
				const songIndex = random(0, 5);
				const lyricsIndex = random(0, 5);
		return {
					id: `mock_lyric_${offset + i}_${Date.now()}`,
					name: ['晴天', '稻香', '七里香', '告白气球', '不能说的秘密'][songIndex],
					artist: ['周杰伦', '林俊杰', '陈奕迅', '李荣浩', '薛之谦'][songIndex],
					album: `${keyword}专辑`,
					duration: 180000 + random(0, 120000),
					cover: `/static/song-cover-${random(1, 5)}.png`,
					lyrics: mockLyrics[lyricsIndex] // 已经是纯文本，不需要额外处理
				};
			});
			result.totalCount.lyrics = offset + result.lyrics.length + random(5, 15);
			break;
			
		default:
			console.warn(`未处理的模拟搜索类型: ${type}`);
			result.songs = [];
			result.artists = [];
			result.albums = [];
			result.lyrics = [];
			result.totalCount = { songs: 0, artists: 0, albums: 0, lyrics: 0 };
	}
	
	return result;
}

// 获取歌词
export const getLyric = async (id) => {
	try {
		// 检查ID是否有效
		if (!id) {
			console.error('尝试获取歌词但ID为空')
			// 返回空歌词
			return ''
		}
		
		// 尝试从ID中提取song_id
		let realId = id;
		if (typeof id === 'object' && id.song_id) {
			realId = id.song_id;
			console.log('从对象中提取song_id用于获取歌词:', realId);
		} else if (typeof id === 'string' && !isNaN(Number(id))) {
			// 如果是数值型ID，尝试从存储中查找对应的song_id
			const playList = uni.getStorageSync('playList');
			if (playList) {
				try {
					const songs = JSON.parse(playList);
					const song = songs.find(s => s.id == id);
					if (song && song.song_id) {
						realId = song.song_id;
						console.log('从播放列表中找到对应的song_id用于获取歌词:', realId);
					}
				} catch (e) {
					console.error('解析播放列表失败:', e);
				}
			}
		}
		
		const response = await uni.request({
			url: `${BASE_URL}/lyric?id=${realId}`,
			method: 'GET'
		})
		
		// 检查是否需要验证码
		const captchaCheck = await handleCaptchaRequired(response)
		if (captchaCheck.needVerification) {
			uni.showToast({
				title: '请完成验证后重试',
				icon: 'none',
				duration: 2000
			})
			return ''
		}
		
		if (response.statusCode !== 200) {
			throw new Error('获取歌词失败')
		}
		
		if (!response.data.lrc || !response.data.lrc.lyric) {
			console.warn('未找到歌词数据')
			return '[00:00.00]暂无歌词\n[00:05.00]'  // 返回简单的默认歌词而不是抛出错误
		}
		
		return response.data.lrc.lyric
	} catch (error) {
		console.error('获取歌词失败：', error)
		uni.showToast({
			title: error.message || '获取歌词失败',
			icon: 'none',
			duration: 2000
		})
		// 返回默认歌词数据而不是空字符串
		return '[00:00.00]暂无歌词\n[00:05.00]'
	}
}

// 解析歌词
export const parseLyrics = (lyric) => {
	if (!lyric) return []
	
	const lines = lyric.split('\n')
	const timeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
	
	return lines
		.map(line => {
			const matches = timeExp.exec(line)
			if (matches) {
				const time = matches[1] * 60 + Number(matches[2]) + Number(matches[3]) / 1000
				const text = line.replace(timeExp, '').trim()
				return { time, text }
			}
			return null
		})
		.filter(line => line !== null)
		.sort((a, b) => a.time - b.time)
}

// 获取音乐分类
export function getCategories() {
	return [
		{ id: 0, name: '全部' },
		{ id: 1, name: '华语' },
		{ id: 2, name: '欧美' },
		{ id: 3, name: '日语' },
		{ id: 4, name: '韩语' },
		{ id: 5, name: '粤语' },
		{ id: 6, name: '小语种' },
		{ id: 7, name: '流行' },
		{ id: 8, name: '摇滚' },
		{ id: 9, name: '民谣' },
		{ id: 10, name: '电子' }
	]
}

// 模拟用户数据
const mockUsers = [
	{
		id: '1',
		phone: '18561265911',
		password: '123456',
		nickname: '测试用户1',
		avatar: '/static/avatar.png',
		createTime: '2024-01-01'
	},
	{
		id: '2',
		phone: '13800138001',
		password: '123456',
		nickname: '测试用户2',
		avatar: '/static/avatar.png',
		createTime: '2024-01-02'
	}
]

// 模拟登录
export const mockLogin = async (phone, password) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const user = mockUsers.find(u => u.phone === phone && u.password === password)
			if (user) {
				// 模拟登录成功
				const { password, ...userInfo } = user
				resolve({
					code: 200,
					message: '登录成功',
					profile: userInfo,
					cookie: 'mock_cookie_' + Date.now()
				})
			} else {
				reject(new Error('手机号或密码错误'))
			}
		}, 1000) // 模拟网络延迟
	})
}

// 模拟获取用户信息
export const mockGetUserInfo = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				code: 200,
				profile: {
					id: '1',
					nickname: '测试用户1',
					avatar: '/static/avatar.png',
					createTime: '2024-01-01'
				}
			})
		}, 500)
	})
}

// 模拟退出登录
export const mockLogout = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				code: 200,
				message: '退出成功'
			})
		}, 500)
	})
}

// 替换原有的登录相关函数
export const login = mockLogin
export const getUserInfo = mockGetUserInfo
export const logout = mockLogout

// 获取收藏的歌曲列表
export const getFavoriteSongs = () => {
	// 游客模式下返回空数组
	if (isInGuestMode()) {
		return []
	}
	
	try {
		const favorites = uni.getStorageSync('favoriteSongs') || []
		return Array.isArray(favorites) ? favorites : []
	} catch (error) {
		console.error('获取收藏歌曲失败：', error)
		return []
	}
}

// 获取收藏的歌单列表
export const getFavoritePlaylists = async () => {
	// 游客模式下返回空数组
	if (isInGuestMode()) {
		return []
	}
	
	try {
		const userInfo = uni.getStorageSync('userInfo');
		if (!userInfo || !userInfo.id) {
			return [];
		}
		
		const response = await uni.request({
			url: `http://localhost:3002/api/sync/favorite-playlists/${userInfo.id}`,
			method: 'GET'
		});
		
		if (response.statusCode === 200 && response.data.code === 200) {
			return response.data.data;
		}
		return [];
	} catch (error) {
		console.error('获取收藏歌单失败：', error);
		return [];
	}
}

// 获取播放历史
export const getPlayHistory = () => {
	try {
		const historyData = uni.getStorageSync('playHistory');
		
		// 检查是否有有效数据
		if (!historyData || typeof historyData !== 'string' || historyData.trim() === '' || historyData === 'null' || historyData === 'undefined') {
			console.log('无播放历史或播放历史为空');
			// 重置为空数组
			uni.setStorageSync('playHistory', '[]');
			return [];
		}
		
		// 安全解析
		try {
			// 检查是否是有效的JSON格式
			if (!historyData.startsWith('[')) {
				console.error('播放历史不是有效的JSON数组');
				// 重置为空数组
				uni.setStorageSync('playHistory', '[]');
				return [];
			}
			
			const history = JSON.parse(historyData);
			
			// 确认是否是数组
			if (!Array.isArray(history)) {
				console.error('解析后的播放历史不是数组');
				// 重置为空数组
				uni.setStorageSync('playHistory', '[]');
				return [];
			}
			
			// 过滤掉无效的数据项
			const validHistory = history.filter(item => 
				item && typeof item === 'object' && (item.id || item.name || item.artist)
			);
			
			// 如果过滤后的数组变小了，更新存储
			if (validHistory.length < history.length) {
				console.log(`从播放历史中移除了 ${history.length - validHistory.length} 个无效数据项`);
				uni.setStorageSync('playHistory', JSON.stringify(validHistory));
			}
			
			return validHistory;
			
		} catch (parseError) {
			console.error('解析播放历史失败:', parseError);
			// 重置为空数组
			uni.setStorageSync('playHistory', '[]');
			return [];
		}
	} catch (error) {
		console.error('获取播放历史失败:', error);
		return [];
	}
}

// 添加歌单到收藏
export const addPlaylistToFavorites = async (playlist) => {
	// 检查游客模式
	if (showGuestModeLimit('收藏歌单')) {
		return {
			success: false,
			message: '游客模式下不能收藏'
		}
	}
	
	try {
		// 获取用户信息
		const userInfo = uni.getStorageSync('userInfo');
		if (!userInfo || !userInfo.id) {
			return {
				success: false,
				message: '请先登录'
			}
		}
		
		console.log('准备收藏歌单:', playlist);
		
		// 格式化歌单数据 - 确保字段格式符合收藏列表需求
		const formattedPlaylist = {
			playlist_id: String(playlist.id),  // 确保是字符串类型
			id: String(playlist.id),  // 增加id字段作为备份
			playlist_name: playlist.name || '未知歌单',
			name: playlist.name || '未知歌单',  // 添加name字段用于兼容
			description: playlist.description || '',
			cover: playlist.cover || playlist.coverImgUrl || '',
			coverImgUrl: playlist.cover || playlist.coverImgUrl || '',  // 添加coverImgUrl字段用于兼容
			playCount: playlist.playCount || 0,  // 添加playCount字段
			creator_name: playlist.creator ? (typeof playlist.creator === 'string' ? playlist.creator : playlist.creator.nickname) : '',
			created_at: new Date().toISOString(),
			user_id: userInfo.id
		};
		
		console.log('格式化后的歌单数据:', formattedPlaylist);
		
		// 显示加载提示
		uni.showLoading({
			title: '添加收藏中...',
			mask: true
		});
		
		// 直接发送到数据库
		const response = await uni.request({
			url: `http://localhost:3002/api/sync/favorite-playlists`,
			method: 'POST',
			data: {
				userId: userInfo.id,
				favoritePlaylists: [formattedPlaylist]
			}
		});
		
		// 隐藏加载提示
		uni.hideLoading();
		
		if (response.statusCode === 200 && response.data.code === 200) {
			console.log('歌单收藏成功:', response.data);
			
			// 检查API返回的收藏列表是否有效
			if (response.data.data && response.data.data.favoritePlaylists && 
				Array.isArray(response.data.data.favoritePlaylists)) {
				
				// 直接保存API返回的最新数据到本地缓存
				const favoritePlaylists = response.data.data.favoritePlaylists;
				try {
					uni.setStorageSync('cachedFavoritePlaylists', JSON.stringify(favoritePlaylists));
					console.log(`已从API响应中缓存${favoritePlaylists.length}个收藏歌单到本地存储`);
				} catch (cacheError) {
					console.error('缓存收藏歌单失败:', cacheError);
				}
			} else {
				// 如果API返回数据不完整，手动将当前收藏的歌单添加到缓存
				try {
					let cachedPlaylists = [];
					const cachedData = uni.getStorageSync('cachedFavoritePlaylists');
					if (cachedData) {
						try {
							cachedPlaylists = JSON.parse(cachedData);
							// 确保是数组
							if (!Array.isArray(cachedPlaylists)) {
								cachedPlaylists = [];
							}
						} catch (e) {
							console.error('解析缓存数据失败:', e);
							cachedPlaylists = [];
						}
					}
					
					// 检查缓存中是否已存在相同ID的歌单
					const exists = cachedPlaylists.some(item => 
						String(item.playlist_id) === String(formattedPlaylist.playlist_id) || 
						String(item.id) === String(formattedPlaylist.id)
					);
					
					if (!exists) {
						// 添加到缓存
						cachedPlaylists.push(formattedPlaylist);
						uni.setStorageSync('cachedFavoritePlaylists', JSON.stringify(cachedPlaylists));
						console.log(`已手动添加收藏歌单到缓存，现在共有${cachedPlaylists.length}个`);
					}
				} catch (localCacheError) {
					console.error('更新本地缓存失败:', localCacheError);
				}
			}
			
			// 立即获取最新的收藏列表
			try {
				// 使用同步机制确保收藏列表被更新
				const favoriteResult = await getFavoritePlaylistsFromServer();
				if (favoriteResult.success) {
					console.log(`已刷新收藏列表，当前有${favoriteResult.data.length}个收藏歌单`);
				} else {
					console.warn('刷新收藏列表失败:', favoriteResult.message);
				}
			} catch (refreshError) {
				console.error('刷新收藏列表失败:', refreshError);
			}
		
		return {
			success: true,
			message: '收藏成功'
			}
		} else {
			console.error('歌单收藏API响应错误:', response.data || response.errMsg);
			throw new Error(response.data ? response.data.message || '收藏失败' : response.errMsg || '服务器无响应');
		}
	} catch (error) {
		console.error('添加歌单收藏失败：', error);
		return {
			success: false,
			message: error.message || '收藏失败，请重试'
		}
	}
}

// 检查歌曲是否已收藏
export const isSongFavorited = (songId) => {
	// 游客模式下始终返回false
	if (isInGuestMode()) {
		return false
	}
	
	try {
		const favorites = uni.getStorageSync('favoriteSongs') || []
		return favorites.some(song => song.id === songId)
	} catch (error) {
		console.error('检查歌曲收藏状态失败：', error)
		return false
	}
}

// 添加歌曲到收藏
export const addToFavorites = (song) => {
	// 检查游客模式
	if (showGuestModeLimit('收藏歌曲')) {
		return {
			success: false,
			message: '游客模式下不能收藏'
		}
	}
	
	try {
		let favorites = uni.getStorageSync('favoriteSongs') || []
		
		// 检查是否已经收藏
		if (favorites.some(item => item.id === song.id)) {
			return {
				success: false,
				message: '该歌曲已在收藏列表中'
			}
		}
		
		// 添加到收藏列表
		favorites.unshift(song)
		uni.setStorageSync('favoriteSongs', favorites)
		
		return {
			success: true,
			message: '收藏成功'
		}
	} catch (error) {
		console.error('添加收藏失败：', error)
		return {
			success: false,
			message: '收藏失败，请重试'
		}
	}
}

// 从收藏中移除歌曲
export const removeFromFavorites = (songId) => {
	// 检查游客模式
	if (showGuestModeLimit('取消收藏')) {
		return {
			success: false,
			message: '游客模式下无法操作'
		}
	}
	
	try {
		let favorites = uni.getStorageSync('favoriteSongs') || []
		
		// 过滤掉要移除的歌曲
		favorites = favorites.filter(song => song.id !== songId)
		uni.setStorageSync('favoriteSongs', favorites)
		
		return {
			success: true,
			message: '已取消收藏'
		}
	} catch (error) {
		console.error('取消收藏失败：', error)
		return {
			success: false,
			message: '取消收藏失败，请重试'
		}
	}
}

// 从收藏中移除歌单
export const removePlaylistFromFavorites = async (playlistId) => {
	// 检查游客模式
	if (showGuestModeLimit('取消收藏')) {
		return {
			success: false,
			message: '游客模式下无法操作'
		}
	}
	
	try {
		// 验证playlistId
		if (!playlistId) {
			console.error('取消收藏歌单缺少ID');
			return {
				success: false,
				message: '无效的歌单ID'
			}
		}
		
		// 获取用户信息
		const userInfo = uni.getStorageSync('userInfo');
		if (!userInfo || !userInfo.id) {
			return {
				success: false,
				message: '请先登录'
			}
		}
		
		console.log('准备取消收藏歌单:', { userId: userInfo.id, playlistId });
		
		// 直接从数据库删除
		const response = await uni.request({
			url: `http://localhost:3002/api/sync/favorite-playlists/${playlistId}`,
			method: 'DELETE',
			data: {
				user_id: userInfo.id
			}
		});
		
		if (response.statusCode === 200 && response.data.code === 200) {
			console.log('取消收藏歌单成功');
			
			// 刷新收藏列表缓存
			await getFavoritePlaylistsFromServer();
		
		return {
			success: true,
			message: '已取消收藏'
			}
		} else {
			console.error('取消收藏歌单API响应错误:', response.data);
			throw new Error(response.data.message || '取消收藏失败');
		}
	} catch (error) {
		console.error('取消收藏歌单失败：', error);
		return {
			success: false,
			message: error.message || '取消收藏失败，请重试'
		}
	}
}

// 添加到播放历史
export const addToPlayHistory = async (song) => {
	try {
		// 验证歌曲对象是否有效
		if (!song || typeof song !== 'object' || !song.id) {
			console.error('无效的歌曲对象:', song);
			return {
				success: false,
				message: '无效的歌曲数据'
			};
		}
		
		// 安全获取当前历史记录
		let history = [];
		try {
			const historyData = uni.getStorageSync('playHistory');
			
			// 检查历史数据是否有效
			if (historyData && typeof historyData === 'string' && historyData.trim() !== '') {
				try {
					const parsedHistory = JSON.parse(historyData);
					if (Array.isArray(parsedHistory)) {
						history = parsedHistory;
					} else {
						console.error('播放历史不是数组:', typeof parsedHistory);
						// 重置为空数组
						uni.setStorageSync('playHistory', '[]');
					}
				} catch (parseError) {
					console.error('解析播放历史失败:', parseError);
					// 重置为空数组
					uni.setStorageSync('playHistory', '[]');
				}
			} else {
				// 如果没有有效的历史数据，初始化为空数组
				uni.setStorageSync('playHistory', '[]');
			}
		} catch (storageError) {
			console.error('读取播放历史失败:', storageError);
			// 初始化为空数组
			uni.setStorageSync('playHistory', '[]');
		}
		
		// 检查是否已存在该歌曲
		const index = history.findIndex(item => item && item.id === song.id);
		
		// 创建带有播放时间的新歌曲记录
		const songWithTime = {
			...song,
			playTime: Date.now()
		};
		
		if (index !== -1) {
			// 如果已存在，更新播放时间
			history[index] = songWithTime;
		} else {
			// 如果不存在，添加到历史记录开头
			history.unshift(songWithTime);
			
			// 限制历史记录数量为100条
			if (history.length > 100) {
				history = history.slice(0, 100);
			}
		}
		
		// 安全存储更新后的历史记录
		try {
			uni.setStorageSync('playHistory', JSON.stringify(history));
			
			// 同步到数据库（仅在登录状态下）
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo && userInfo.id) {
				// 异步处理数据库同步，不阻塞主流程
				syncPlayHistoryToDatabase(songWithTime, userInfo.id).catch(error => {
					console.error('同步播放历史到数据库失败:', error);
				});
			}
			
			return {
				success: true,
				message: '已添加到播放历史'
			};
		} catch (saveError) {
			console.error('保存播放历史失败:', saveError);
			return {
				success: false,
				message: '保存播放历史失败'
			};
		}
	} catch (error) {
		console.error('添加到播放历史失败:', error);
		return {
			success: false,
			message: '添加到播放历史失败'
		};
	}
}

// 将单条播放记录同步到数据库
async function syncPlayHistoryToDatabase(song, userId) {
	try {
		if (!userId || !song || !song.id) {
			console.error('同步播放历史参数无效:', { userId, songId: song?.id });
			return false;
		}
		
		// 导入API配置
		const apiConfig = require('./apiConfig.js').default;
		
		// 格式化歌曲数据，符合后端接口要求
		const songData = {
			song_id: song.song_id || song.id,  // 优先使用song_id字段
			song_name: song.name,
			artist: song.artist || song.singer || '未知歌手',
			album: song.album || '未知专辑',
			duration: song.duration || 0,
			cover: song.cover || song.coverUrl || '/static/music-cover.png',
			play_time: song.playTime || Date.now()
		};
		
		console.log('正在同步播放记录到数据库:', songData);
		
		// 构建API请求URL
		const url = `${apiConfig.history.baseUrl}${apiConfig.history.add(userId)}`;
		
		// 导入请求工具
		const request = require('./request.js').default;
		
		// 使用封装好的request函数发送请求而不是直接使用uni.request
		const response = await request(url, 'POST', songData);
		
		// 处理响应
		if (response.code === 200) {
			console.log('播放历史同步到数据库成功');
			return true;
		} else {
			console.error('播放历史同步到数据库失败:', response);
			return false;
		}
	} catch (error) {
		console.error('播放历史同步到数据库过程出错:', error);
		return false;
	}
}

// 批量同步播放历史到数据库
export const syncAllPlayHistoryToDatabase = async () => {
	try {
		// 获取用户信息
		const userInfo = uni.getStorageSync('userInfo');
		if (!userInfo || !userInfo.id) {
			console.log('用户未登录，不同步播放历史');
			return {
				success: false,
				message: '请先登录'
			};
		}
		
		// 获取本地播放历史
		const history = getPlayHistory();
		if (!history || history.length === 0) {
			console.log('没有播放历史需要同步');
			return {
				success: true,
				message: '没有播放历史需要同步'
			};
		}
		
		// 导入API配置
		const apiConfig = require('./apiConfig.js').default;
		
		// 构建API请求URL
		const url = `${apiConfig.sync.baseUrl}${apiConfig.sync.playHistory}`;
		
		// 导入请求工具
		const request = require('./request.js').default;
		
		// 发送批量同步请求
		const response = await request(url, 'POST', {
			userId: userInfo.id,
			history: history
		});
		
		// 处理响应
		if (response.code === 200) {
			console.log('批量同步播放历史成功', response);
			return {
				success: true,
				message: `成功同步${response.data?.added || 0}条播放记录`
			};
		} else {
			console.error('批量同步播放历史失败:', response);
			return {
				success: false,
				message: '同步播放历史失败'
			};
		}
	} catch (error) {
		console.error('批量同步播放历史失败:', error);
		return {
			success: false,
			message: '同步失败，请检查网络连接'
		};
	}
}

// 清空播放历史
export const clearPlayHistory = async () => {
	try {
		// 清空本地存储
		uni.setStorageSync('playHistory', []);
		
		// 尝试清除数据库中的播放历史
		const userInfo = uni.getStorageSync('userInfo');
		if (userInfo && userInfo.id) {
			try {
				// 导入API配置
				const apiConfig = require('./apiConfig.js').default;
				
				// 导入请求工具
				const request = require('./request.js').default;
				
				// 构建API请求URL
				const url = `${apiConfig.history.baseUrl}${apiConfig.history.clear(userInfo.id)}`;
				
				// 发送请求
				const response = await request(url, 'DELETE');
				
				if (response.code === 200) {
					console.log('成功清除数据库中的播放历史');
				} else {
					console.error('清除数据库播放历史失败:', response);
				}
			} catch (dbError) {
				console.error('清除数据库播放历史出错:', dbError);
			}
		}
		
		return {
			success: true,
			message: '清空播放历史成功'
		};
	} catch (error) {
		console.error('清空播放历史失败：', error);
		return {
			success: false,
			message: '清空播放历史失败'
		};
	}
}

// 更新用户信息
export async function updateUserInfo(data) {
	try {
		// 获取当前用户信息
		const userInfo = uni.getStorageSync('userInfo')
		if (!userInfo) {
			throw new Error('用户未登录')
		}
		
		// 更新用户信息
		const updatedInfo = {
			...userInfo,
			...data
		}
		
		// 保存到本地存储
		uni.setStorageSync('userInfo', updatedInfo)
		
		return {
			code: 200,
			message: '更新成功',
			profile: updatedInfo
		}
	} catch (error) {
		console.error('更新用户信息失败：', error)
		return {
			code: 500,
			message: error.message || '更新用户信息失败'
		}
	}
}

// 获取收藏数量
export function getFavoritesCount() {
	try {
		// 只统计favoritePlaylists
		const favoritePlaylists = getFavoritePlaylists();
		
		// 计算总数
		const totalCount = favoritePlaylists.length;
		
		return {
			code: 200,
			data: totalCount
		};
	} catch (error) {
		console.error('获取收藏数量失败：', error);
		return {
			code: 500,
			message: '获取收藏数量失败'
		};
	}
}

// 检查歌单是否已收藏
export const isPlaylistFavorited = async (playlistId) => {
	if (isInGuestMode()) {
		return false;
	}
	
	try {
		const userInfo = uni.getStorageSync('userInfo');
		if (!userInfo || !userInfo.id) {
			return false;
		}
		
		// 确保参数有效
		if (!playlistId) {
			console.error('检查收藏状态失败: playlistId为空');
			return false;
		}
		
		console.log('检查歌单收藏状态:', { userId: userInfo.id, playlistId });
		
		// 尝试API请求
		try {
			const response = await uni.request({
				url: `http://localhost:3002/api/sync/favorite-playlists/check/${userInfo.id}/${playlistId}`,
				method: 'GET',
				timeout: 3000 // 设置较短的超时时间，避免长时间等待
			});
			
			if (response.statusCode === 200 && response.data.code === 200) {
				return response.data.data.isFavorited;
			} else {
				console.warn('获取收藏状态响应异常:', response.statusCode, response.data);
				return false;
			}
		} catch (requestError) {
			console.error('检查收藏状态请求失败:', requestError);
			return false;
		}
	} catch (error) {
		console.error('检查收藏状态失败：', error);
		return false;
	}
}

// 根据标签搜索歌单
export async function searchPlaylistsByTags(tags) {
	// 检查游客模式
	if (isInGuestMode()) {
		showGuestModeLimit('搜索歌单')
		return {
			success: false,
			message: '游客模式下不能搜索'
		}
	}
	
	try {
		// 将多个标签组合成搜索关键词
		const keywords = Array.isArray(tags) ? tags.join(' ') : tags;
		
		if (!keywords || keywords.trim() === '') {
			return {
				success: false,
				message: '搜索关键词不能为空'
			};
		}
		
		console.log('搜索歌单关键词:', keywords);
		
		// 使用正确的API端点 - 使用网易云API的搜索端点，而不是/api/search
		const result = await new Promise((resolve, reject) => {
			uni.request({
				url: `${BASE_URL}/search`,  // 修改为正确的API端点
				method: 'GET',
				data: {
					keywords: keywords,
					type: 1000, // 1000表示搜索歌单
					limit: 20
				},
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject(err);
				}
			});
		});
		
		// 检查是否需要验证码
		const captchaCheck = await handleCaptchaRequired(result)
		if (captchaCheck.needVerification) {
			console.log('搜索歌单需要验证码，使用本地模拟数据')
			const mockPlaylists = generateMockPlaylistsForKeywords(keywords)
			
			if (mockPlaylists.length > 0) {
				return {
					success: true,
					data: mockPlaylists,
					isLocal: true
				}
			} else {
				return {
					success: false,
					message: '请完成验证后重试'
				}
			}
		}
		
		// 检查响应是否有效
		if (result.statusCode === 200) {
			console.log('搜索歌单结果:', result.data);
			
			// 检查数据格式
			if (result.data && result.data.code === 200 && result.data.result && result.data.result.playlists) {
				// 如果有结果数据，返回成功
				if (result.data.result.playlists.length > 0) {
					return {
						success: true,
						data: result.data.result.playlists
					};
				} else {
					// 空结果
					return {
						success: false,
						message: '未找到符合条件的歌单，请尝试其他标签'
					};
				}
			} else if (result.data && result.data.code !== 200) {
				// 处理特定的API错误
				return {
					success: false,
					message: result.data.message || `服务器返回错误(${result.data.code})`
				};
			}
		}
		
		// 尝试备用方案 - 使用个人化推荐
		console.log('API搜索失败，尝试使用本地推荐');
		
		// 生成一些与搜索关键词相关的本地推荐
		const mockPlaylists = generateMockPlaylistsForKeywords(keywords);
		
		if (mockPlaylists.length > 0) {
			return {
				success: true,
				data: mockPlaylists,
				isLocal: true // 标记为本地生成的数据
			};
		}
		
		// 响应格式不正确或无结果
		return {
			success: false,
			message: '未找到符合条件的歌单或API返回格式错误'
		};
	} catch (error) {
		console.error('搜索歌单失败:', error);
		
		// 尝试备用方案
		console.log('搜索发生错误，尝试使用本地推荐');
		
		// 从关键词生成模拟数据
		if (tags) {
			const mockPlaylists = generateMockPlaylistsForKeywords(Array.isArray(tags) ? tags.join(' ') : tags);
			
			if (mockPlaylists.length > 0) {
				return {
					success: true,
					data: mockPlaylists,
					isLocal: true // 标记为本地生成的数据
				};
			}
		}
		
		// 返回友好的错误信息
		return {
			success: false,
			message: error.message || '搜索歌单失败，请检查网络连接'
		};
	}
}

// 根据关键词生成模拟歌单
function generateMockPlaylistsForKeywords(keywords) {
	// 将关键词拆分为标签
	const tags = keywords.split(' ').filter(tag => tag.trim() !== '');
	
	// 基础模拟歌单模板
	const mockPlaylistTemplates = [
		{
			name: '流行音乐精选',
			description: '最热门的流行音乐歌单，包含多种风格',
			trackCount: 40,
			playCount: 1200000,
			coverImgUrl: '/static/recommend-1.png'
		},
		{
			name: '电子音乐专区',
			description: '高品质电子音乐合集，提供沉浸式聆听体验',
			trackCount: 35,
			playCount: 980000,
			coverImgUrl: '/static/recommend-2.png'
		},
		{
			name: '民谣珍藏集',
			description: '治愈系民谣歌曲，感受音乐的温暖力量',
			trackCount: 45,
			playCount: 850000,
			coverImgUrl: '/static/recommend-3.png'
		},
		{
			name: '摇滚经典',
			description: '摇滚乐的不朽经典，燃爆你的耳膜',
			trackCount: 38,
			playCount: 920000,
			coverImgUrl: '/static/daily-recommend.png'
		},
		{
			name: '嘻哈说唱集锦',
			description: '最潮最炫的嘻哈说唱音乐',
			trackCount: 30,
			playCount: 750000,
			coverImgUrl: '/static/artist-1.png'
		},
		{
			name: '华语音乐精选',
			description: '华语乐坛精品歌曲，陪你度过每一天',
			trackCount: 50,
			playCount: 1500000,
			coverImgUrl: '/static/artist-2.png'
		}
	];
	
	// 基于标签筛选和生成歌单
	const result = [];
	
	// 遍历所有标签
	tags.forEach(tag => {
		// 为每个标签创建一个自定义歌单
		const customPlaylist = {
			id: `local_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
			name: `${tag}精选歌单`,
			description: `基于"${tag}"为您量身打造的个性化歌单`,
			trackCount: 20 + Math.floor(Math.random() * 30),
			playCount: Math.floor(Math.random() * 1000000) + 500000,
			coverImgUrl: `/static/genre-${Math.floor(Math.random() * 3) + 1}.png`,
			creator: {
				nickname: '音乐助手',
				userId: 1,
				avatarUrl: '/static/avatar.png'
			},
			tags: [tag]
		};
		
		result.push(customPlaylist);
		
		// 从模板中选择匹配的歌单
		mockPlaylistTemplates.forEach(template => {
			if (template.name.includes(tag) || template.description.includes(tag)) {
				const playlist = {
					...template,
					id: `local_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
					creator: {
						nickname: '网易云音乐',
						userId: 2,
						avatarUrl: '/static/avatar.png'
					},
					tags: [tag]
				};
				
				result.push(playlist);
			}
		});
	});
	
	// 确保结果不重复且不超过6个
	const uniqueResults = result.filter((playlist, index, self) => 
		index === self.findIndex(p => p.name === playlist.name)
	).slice(0, 6);
	
	return uniqueResults;
}

// 获取推荐歌单中的歌曲列表
export async function getPlaylistSongs(playlistId) {
	try {
		// 检查是否是本地生成的歌单ID
		if (playlistId && playlistId.startsWith('local_')) {
			console.log('获取本地模拟歌单数据:', playlistId);
			// 生成模拟歌曲数据
			return {
				success: true,
				data: generateMockSongsForPlaylist(playlistId),
				isLocal: true
			};
		}
		
		// 处理网络请求
		const response = await uni.request({
			url: `${BASE_URL}/playlist/detail`,  // 正确的歌单详情API端点
			method: 'GET',
			data: {
				id: playlistId
			}
		});
		
		// 检查是否需要验证码
		const captchaCheck = await handleCaptchaRequired(response)
		if (captchaCheck.needVerification) {
			console.log('获取歌单歌曲需要验证码，使用本地模拟数据')
			return {
				success: true,
				data: generateMockSongsForPlaylist(playlistId),
				isLocal: true
			}
		}
		
		if (response.statusCode === 200 && response.data.code === 200 && response.data.playlist) {
			const playlist = response.data.playlist;
			const tracks = playlist.tracks || [];
			
			return {
				success: true,
				data: {
					id: playlist.id,
					name: playlist.name,
					description: playlist.description,
					cover: playlist.coverImgUrl,
					playCount: playlist.playCount,
					creator: playlist.creator ? playlist.creator.nickname : '',
					createTime: playlist.createTime,
					songs: tracks.map(track => ({
						id: track.id,
						name: track.name,
						artist: track.ar && track.ar[0] ? track.ar[0].name : '未知歌手',
						album: track.al ? track.al.name : '未知专辑',
						cover: track.al && track.al.picUrl ? track.al.picUrl : '',
						duration: track.dt || 0,
						url: `https://music.163.com/song/media/outer/url?id=${track.id}.mp3`
					}))
				}
			};
		} else {
			console.error('获取歌单详情失败，响应:', response.data);
			
			// 尝试本地模拟
			console.log('API获取歌单详情失败，使用本地模拟数据');
			return {
				success: true,
				data: generateMockSongsForPlaylist(playlistId),
				isLocal: true
			};
		}
	} catch (error) {
		console.error('获取歌单详情失败:', error);
		
		// 在错误情况下也使用本地模拟数据
		console.log('由于错误使用本地模拟数据');
		return {
			success: true,
			data: generateMockSongsForPlaylist(playlistId),
			isLocal: true
		};
	}
}

// 为歌单生成模拟歌曲数据
function generateMockSongsForPlaylist(playlistId) {
	// 基础歌单信息
	const playlistInfo = {
		id: playlistId,
		name: '个性化推荐歌单',
		description: '根据您的音乐喜好生成的个性化歌单',
		cover: '/static/recommend-1.png',
		playCount: 58000 + Math.floor(Math.random() * 100000),
		creator: '音乐助手',
		createTime: Date.now(),
		songs: []
	};
	
	// 如果ID中包含关键词，可以定制化歌单信息
	if (playlistId.includes('genre_') || playlistId.includes('artist_')) {
		// 从ID中提取类型
		const type = playlistId.includes('genre_') ? '流派' : '歌手';
		playlistInfo.name = `${type}推荐歌单`;
		playlistInfo.description = `基于您喜欢的${type}推荐`;
	}
	
	// 预设歌曲模板
	const songTemplates = [
		{ name: '春风十里', artist: '鹿先森乐队', album: '所有的酒，都不如你', duration: 326000 },
		{ name: '孤独之书', artist: '陈绮贞', album: '华语民谣', duration: 253000 },
		{ name: '山海', artist: '草东没有派对', album: '山海', duration: 294000 },
		{ name: '飘向北方', artist: '黄明志/王力宏', album: '亚洲通吃', duration: 282000 },
		{ name: '这个年纪', artist: '齐一', album: '这个年纪', duration: 316000 },
		{ name: '消愁', artist: '毛不易', album: '明日之子', duration: 261000 },
		{ name: '可能否', artist: '木小雅', album: '可能否', duration: 206000 },
		{ name: '年少有为', artist: '李荣浩', album: '耳朵', duration: 274000 },
		{ name: '光年之外', artist: '邓紫棋', album: '光年之外', duration: 235000 },
		{ name: '起风了', artist: '买辣椒也用券', album: '起风了', duration: 325000 },
		{ name: 'BINGBIAN病变', artist: '鞠文娴', album: 'BINGBIAN病变', duration: 201000 },
		{ name: '追光者', artist: '岑宁儿', album: '追光者', duration: 198000 },
		{ name: '大碗宽面', artist: '吴亦凡', album: '大碗宽面', duration: 184000 },
		{ name: '说谎', artist: '林宥嘉', album: '神秘嘉宾', duration: 269000 },
		{ name: '凉凉', artist: '杨宗纬/张碧晨', album: '三生三世十里桃花OST', duration: 304000 },
		{ name: '离人愁', artist: '李袁杰', album: '离人愁', duration: 316000 },
		{ name: '光', artist: '陈粒', album: '小梦大半', duration: 242000 },
		{ name: '晚安', artist: '颜人中', album: '晚安', duration: 128000 },
		{ name: '只对你有感觉', artist: '林俊杰/金莎', album: '她说', duration: 266000 },
		{ name: '我的名字', artist: '焦迈奇', album: '我的名字', duration: 220000 },
		// 额外添加的歌曲数据
		{ name: '夜曲', artist: '周杰伦', album: '十一月的萧邦', duration: 220000 },
		{ name: '晴天', artist: '周杰伦', album: '叶惠美', duration: 270000 },
		{ name: '稻香', artist: '周杰伦', album: '魔杰座', duration: 234000 },
		{ name: '青花瓷', artist: '周杰伦', album: '我很忙', duration: 211000 },
		{ name: '天下', artist: '张杰', album: '明天过后', duration: 252000 },
		{ name: '听妈妈的话', artist: '周杰伦', album: '依然范特西', duration: 277000 },
		{ name: '认真的雪', artist: '薛之谦', album: '意外', duration: 244000 },
		{ name: '演员', artist: '薛之谦', album: '绅士', duration: 261000 },
		{ name: '算什么男人', artist: '周杰伦', album: '哎哟，不错哦', duration: 251000 },
		{ name: '小幸运', artist: '田馥甄', album: '小幸运', duration: 216000 },
		{ name: '匆匆那年', artist: '王菲', album: '匆匆那年', duration: 231000 },
		{ name: '告白气球', artist: '周杰伦', album: '周杰伦的床边故事', duration: 215000 },
		{ name: '修炼爱情', artist: '林俊杰', album: '因你而在', duration: 248000 },
		{ name: '那些年', artist: '胡夏', album: '那些年，我们一起追的女孩', duration: 230000 },
		{ name: '够钟', artist: '周柏豪', album: '同行', duration: 195000 },
		{ name: '后来', artist: '刘若英', album: '我等你', duration: 270000 },
		{ name: '想你的夜', artist: '关喆', album: '想你的夜', duration: 272000 },
		{ name: '不再犹豫', artist: 'Beyond', album: '不再犹豫', duration: 285000 },
		{ name: '海阔天空', artist: 'Beyond', album: '乐与怒', duration: 323000 },
		{ name: '真的爱你', artist: 'Beyond', album: '真的爱你', duration: 269000 }
	];
	
	// 电子音乐歌曲
	const electronicSongs = [
		{ name: 'Faded', artist: 'Alan Walker', album: 'Faded', duration: 212000 },
		{ name: 'The Nights', artist: 'Avicii', album: 'The Days / Nights EP', duration: 176000 },
		{ name: 'Animals', artist: 'Martin Garrix', album: 'Animals', duration: 186000 },
		{ name: 'Summer', artist: 'Calvin Harris', album: 'Motion', duration: 224000 },
		{ name: 'Lean On', artist: 'Major Lazer/MØ/DJ Snake', album: 'Lean On', duration: 177000 },
		{ name: 'Waiting For Love', artist: 'Avicii', album: 'Stories', duration: 231000 },
		{ name: 'Wake Me Up', artist: 'Avicii', album: 'True', duration: 249000 },
		{ name: 'Save The World', artist: 'Swedish House Mafia', album: 'Until Now', duration: 212000 },
		// 额外添加的电子音乐
		{ name: 'Clarity', artist: 'Zedd ft. Foxes', album: 'Clarity', duration: 271000 },
		{ name: 'Don\'t You Worry Child', artist: 'Swedish House Mafia', album: 'Until Now', duration: 212000 },
		{ name: 'Levels', artist: 'Avicii', album: 'Levels', duration: 324000 },
		{ name: 'This Is What You Came For', artist: 'Calvin Harris ft. Rihanna', album: 'This Is What You Came For', duration: 222000 },
		{ name: 'Alone', artist: 'Marshmello', album: 'Alone', duration: 177000 },
		{ name: 'The Middle', artist: 'Zedd, Maren Morris & Grey', album: 'The Middle', duration: 185000 },
		{ name: 'Roses', artist: 'The Chainsmokers ft. ROZES', album: 'Bouquet', duration: 219000 },
		{ name: 'Let Me Love You', artist: 'DJ Snake ft. Justin Bieber', album: 'Encore', duration: 205000 },
		{ name: 'Stay', artist: 'Zedd & Alessia Cara', album: 'Stay', duration: 211000 },
		{ name: 'Happier', artist: 'Marshmello & Bastille', album: 'Happier', duration: 214000 },
		{ name: 'Something Just Like This', artist: 'The Chainsmokers & Coldplay', album: 'Memories...Do Not Open', duration: 247000 },
		{ name: 'One Kiss', artist: 'Calvin Harris & Dua Lipa', album: 'One Kiss', duration: 214000 }
	];
	
	// 民谣歌曲
	const folkSongs = [
		{ name: '斑马斑马', artist: '宋冬野', album: '安和桥北', duration: 237000 },
		{ name: '董小姐', artist: '宋冬野', album: '安和桥北', duration: 340000 },
		{ name: '成都', artist: '赵雷', album: '无法长大', duration: 313000 },
		{ name: '理想', artist: '赵雷', album: '吉姆餐厅', duration: 261000 },
		{ name: '南山南', artist: '马頔', album: '南山南', duration: 330000 },
		{ name: '平凡之路', artist: '朴树', album: '猎户星座', duration: 300000 },
		{ name: '最远的你是我最近的爱', artist: '李雨', album: '最远的你是我最近的爱', duration: 275000 },
		{ name: '像风一样自由', artist: '阿木', album: '像风一样自由', duration: 246000 },
		// 额外添加的民谣歌曲
		{ name: '安和桥', artist: '宋冬野', album: '安和桥北', duration: 257000 },
		{ name: '关忆北', artist: '宋冬野', album: '安和桥北', duration: 372000 },
		{ name: '莉莉安', artist: '宋冬野', album: '安和桥北', duration: 319000 },
		{ name: '奇妙能力歌', artist: '陈粒', album: '如也', duration: 208000 },
		{ name: '易燃易爆炸', artist: '陈粒', album: '如也', duration: 216000 },
		{ name: '借我', artist: '谢春花', album: '算云烟', duration: 235000 },
		{ name: '我好想你', artist: '苏打绿', album: '你在烦恼什么', duration: 269000 },
		{ name: '小情歌', artist: '苏打绿', album: '小情歌', duration: 269000 },
		{ name: '我要你', artist: '任素汐', album: '驴得水', duration: 236000 },
		{ name: '山阴路的夏天', artist: '李志', album: '1701', duration: 463000 },
		{ name: '当你老了', artist: '赵照', album: '当你老了', duration: 219000 },
		{ name: '卡夫卡', artist: '赵雷', album: '无法长大', duration: 303000 }
	];
	
	// 嘻哈说唱歌曲
	const hipHopSongs = [
		{ name: '中国话', artist: '阿里郎', album: '中国话', duration: 270000 },
		{ name: '普通话', artist: '伦桑', album: '普通话', duration: 229000 },
		{ name: '我的新衣', artist: 'VAVA', album: '我的新衣', duration: 198000 },
		{ name: '艳火', artist: 'GAI', album: '艳火', duration: 220000 },
		{ name: '万里长城', artist: 'GAI', album: '万里长城', duration: 231000 },
		{ name: '红花会', artist: 'PG One', album: '红花会', duration: 195000 },
		{ name: '你有本事说话啊', artist: 'PGONE', album: '你有本事说话啊', duration: 238000 },
		{ name: '天府Rap', artist: 'CDC', album: '天府Rap', duration: 190000 },
		// 额外添加的嘻哈说唱歌曲
		{ name: 'H.M.E', artist: '红花会', album: 'H.M.E', duration: 194000 },
		{ name: '两个人', artist: '张艺兴', album: '梦不落雨林', duration: 237000 },
		{ name: '大碗宽面', artist: '吴亦凡', album: '大碗宽面', duration: 175000 },
		{ name: 'Pull Up', artist: 'AIR/Z.TAO', album: 'The Road', duration: 190000 },
		{ name: '三重门', artist: 'GAI周延', album: '三重门', duration: 256000 },
		{ name: '热狗', artist: '谢帝', album: '热狗', duration: 183000 },
		{ name: '烧麦', artist: '吴亦凡', album: '烧麦', duration: 159000 },
		{ name: '弹壳', artist: 'Higher Brothers', album: '弹壳', duration: 202000 },
		{ name: '泡沫', artist: 'Higher Brothers', album: '泡沫', duration: 186000 },
		{ name: '可口可乐', artist: 'Higher Brothers', album: 'Journey to the West', duration: 177000 },
		{ name: '星球坠落', artist: 'JustinD', album: '星球坠落', duration: 218000 },
		{ name: '莲花', artist: '周杰伦', album: '叶惠美', duration: 226000 }
	];
	
	// 准备歌曲来源列表
	let songsPool = [...songTemplates];
	
	// 根据歌单ID选择合适的歌曲池
	if (playlistId.includes('电子')) {
		songsPool = [...electronicSongs, ...songsPool.slice(0, 30)];
	} else if (playlistId.includes('民谣')) {
		songsPool = [...folkSongs, ...songsPool.slice(0, 30)];
	} else if (playlistId.includes('嘻哈')) {
		songsPool = [...hipHopSongs, ...songsPool.slice(0, 30)];
	}
	
	// 随机打乱歌曲池
	const shuffledSongs = songsPool.sort(() => 0.5 - Math.random());
	
	// 选择30-50首歌曲（而不是之前的10-20首）
	const songCount = 30 + Math.floor(Math.random() * 20);
	const selectedSongs = shuffledSongs.slice(0, songCount);
	
	// 构建歌曲数据
	playlistInfo.songs = selectedSongs.map((template, index) => {
		const songId = `local_song_${Date.now()}_${index}`;
		return {
			id: songId,
			name: template.name,
			artist: template.artist,
			album: template.album || '未知专辑',
			cover: `/static/song-cover-${(index % 4) + 1}.png`,
			duration: template.duration || 240000,
			url: `https://music.163.com/song/media/outer/url?id=${songId}.mp3`
		};
	});
	
	return playlistInfo;
}

// 保存个性歌单到本地存储
export function savePersonalizedPlaylist(playlist) {
	try {
		// 获取现有的个性歌单
		const existingData = uni.getStorageSync('personalized_playlists');
		let playlists = [];
		
		if (existingData) {
			try {
				playlists = JSON.parse(existingData);
				if (!Array.isArray(playlists)) {
					playlists = [];
				}
			} catch (e) {
				console.error('解析个性歌单数据失败:', e);
				playlists = [];
			}
		}
		
		// 检查是否已存在相同ID的歌单
		const existingIndex = playlists.findIndex(p => p.id === playlist.id);
		if (existingIndex !== -1) {
			// 更新已存在的歌单
			playlists[existingIndex] = {
				...playlist,
				savedAt: new Date().getTime()
			};
		} else {
			// 添加新歌单
			playlists.push({
				...playlist,
				savedAt: new Date().getTime()
			});
		}
		
		// 保存到本地存储
		uni.setStorageSync('personalized_playlists', JSON.stringify(playlists));
		
		return {
			success: true,
			message: '歌单已保存'
		};
	} catch (error) {
		console.error('保存个性歌单失败:', error);
		return {
			success: false,
			message: '保存个性歌单失败'
		};
	}
}

// 获取保存的个性歌单
export function getSavedPersonalizedPlaylists() {
	try {
		const data = uni.getStorageSync('personalized_playlists');
		if (data) {
			try {
				const playlists = JSON.parse(data);
				return {
					success: true,
					data: Array.isArray(playlists) ? playlists : []
				};
			} catch (e) {
				console.error('解析个性歌单数据失败:', e);
				return {
					success: false,
					message: '解析个性歌单数据失败'
				};
			}
		} else {
			return {
				success: true,
				data: []
			};
		}
	} catch (error) {
		console.error('获取个性歌单失败:', error);
		return {
			success: false,
			message: '获取个性歌单失败'
		};
	}
}

// 从服务器获取收藏的歌单列表
export const getFavoritePlaylistsFromServer = async () => {
	// 游客模式下返回空数组
	if (isInGuestMode()) {
		console.log('游客模式，跳过获取收藏歌单');
		return {
			success: false,
			message: '游客模式无法获取收藏歌单',
			data: []
		}
	}
	
	try {
		// 获取用户信息
		const userInfo = uni.getStorageSync('userInfo');
		if (!userInfo || !userInfo.id) {
			console.log('未登录，无法获取收藏歌单');
			return {
				success: false,
				message: '请先登录',
				data: []
			};
		}
		
		console.log(`开始获取用户${userInfo.id}的收藏歌单`);
		
		// 直接从数据库获取
		const response = await uni.request({
			url: `http://localhost:3002/api/sync/favorite-playlists/${userInfo.id}`,
			method: 'GET',
			timeout: 10000 // 添加10秒超时
		});
		
		console.log('获取收藏歌单API响应:', {
			statusCode: response.statusCode,
			code: response.data ? response.data.code : 'none',
			dataLength: response.data && response.data.data ? response.data.data.length : 0
		});
		
		if (response.statusCode === 200 && response.data.code === 200) {
			// 缓存收藏数据到本地
			try {
				const favoritePlaylists = response.data.data || [];
				uni.setStorageSync('cachedFavoritePlaylists', JSON.stringify(favoritePlaylists));
				console.log(`已缓存${favoritePlaylists.length}个收藏歌单到本地存储`);
			} catch (cacheError) {
				console.error('缓存收藏歌单失败:', cacheError);
			}
			
			return {
				success: true,
				message: '获取收藏歌单成功',
				data: response.data.data || []
			};
		} else {
			// 尝试从缓存获取
			try {
				const cachedData = uni.getStorageSync('cachedFavoritePlaylists');
				if (cachedData) {
					const favoritePlaylists = JSON.parse(cachedData);
					console.log(`API请求失败，使用缓存中的${favoritePlaylists.length}个收藏歌单`);
					return {
						success: true,
						message: '使用缓存数据',
						data: favoritePlaylists,
						fromCache: true
					};
				}
			} catch (parseError) {
				console.error('解析缓存数据失败:', parseError);
			}
			
			throw new Error(response.data ? response.data.message || '获取收藏歌单失败' : '服务器无响应');
		}
	} catch (error) {
		console.error('获取收藏歌单失败：', error);
		
		// 尝试从缓存获取
		try {
			const cachedData = uni.getStorageSync('cachedFavoritePlaylists');
			if (cachedData) {
				const favoritePlaylists = JSON.parse(cachedData);
				console.log(`发生错误，使用缓存中的${favoritePlaylists.length}个收藏歌单`);
				return {
					success: true,
					message: '使用缓存数据',
					data: favoritePlaylists,
					fromCache: true
				};
			}
		} catch (parseError) {
			console.error('解析缓存数据失败:', parseError);
		}
		
		return {
			success: false,
			message: error.message || '获取收藏歌单失败',
			data: []
		};
	}
};

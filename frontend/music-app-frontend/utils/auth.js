// 检查是否已登录
export const checkLoginStatus = () => {
	const userInfo = uni.getStorageSync('userInfo')
	const token = uni.getStorageSync('token')
	return !!(userInfo && token)
}

// 获取用户信息
export const getUserInfo = () => {
	return uni.getStorageSync('userInfo')
}

// 保存用户信息
export const saveUserInfo = (userInfo, token) => {
	uni.setStorageSync('userInfo', userInfo)
	uni.setStorageSync('token', token)
}

// 清除用户数据
export function clearUserData() {
	try {
		// 清除用户信息
		uni.removeStorageSync('userInfo')
		uni.removeStorageSync('cookie')
		uni.removeStorageSync('token')
		
		// 只清除核心用户数据
		// uni.removeStorageSync('favoriteSongs')
		uni.removeStorageSync('favoritePlaylists')
		uni.removeStorageSync('playHistory')
		
		// 清除播放列表相关数据
		uni.removeStorageSync('playList')
		uni.removeStorageSync('currentSong')
		uni.removeStorageSync('playMode')
		
		// 清除其他用户相关数据
		uni.removeStorageSync('playlists')
		uni.removeStorageSync('hasUserInteraction')
		
		return {
			code: 200,
			message: '用户数据已清除'
		}
	} catch (error) {
		return {
			code: 500,
			message: '清除用户数据失败：' + error.message
		}
	}
}

// 跳转到登录页面
export const navigateToLogin = () => {
	uni.navigateTo({
		url: '/pages/login/login'
	})
} 
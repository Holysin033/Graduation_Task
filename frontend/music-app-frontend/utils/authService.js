import apiConfig from './apiConfig';
import { getFavoritePlaylists, getPlayHistory } from './musicData.js';
import CryptoJS from 'crypto-js';

// 定义认证相关的API路径
const API_URL = apiConfig.sync.baseUrl;
const SECRET_KEY = 'music-app-secret-key-2025';

// 生成加密的token
const generateToken = (userId, expiresIn = 86400) => {
  // token的组成部分
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userId,
    iat: now,
    exp: now + expiresIn, // 默认24小时过期
    jti: CryptoJS.lib.WordArray.random(16).toString()
  };
  
  // Base64编码header和payload
  const base64Header = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(header))
  ).replace(/=+$/, '');
  
  const base64Payload = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(payload))
  ).replace(/=+$/, '');
  
  // 使用HMAC SHA256生成签名
  const signature = CryptoJS.HmacSHA256(
    base64Header + '.' + base64Payload,
    SECRET_KEY
  );
  const base64Signature = CryptoJS.enc.Base64.stringify(signature).replace(/=+$/, '');
  
  // 组合成JWT格式的token
  return base64Header + '.' + base64Payload + '.' + base64Signature;
};

// 验证token有效性
const verifyToken = (token) => {
  try {
    // 处理不同类型的token
    if (!token) {
      console.log('token为空');
      return null;
    }
    
    // 处理对象类型的token，例如 {type: "number", data: 1}
    if (typeof token === 'object' && token !== null) {
      console.log('检测到对象类型token:', token);
      // 如果是{type: "number", data: 数字}格式
      if (token.type === 'number' && typeof token.data === 'number') {
        // 将data数字作为用户ID来处理
        return { sub: token.data };
      }
      return null;
    }
    
    // 处理数字类型token，可能直接是用户ID
    if (typeof token === 'number') {
      console.log('检测到数字类型token:', token);
      // 将数字直接作为用户ID处理
      return { sub: token };
    }
    
    // 如果token不是字符串类型
    if (typeof token !== 'string') {
      console.log('无效的token类型:', typeof token);
      return null;
    }
    
    // 解析JWT格式的token
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log('无效的token格式');
      return null;
    }
    
    // 验证签名
    const newSignature = CryptoJS.HmacSHA256(
      parts[0] + '.' + parts[1],
      SECRET_KEY
    );
    const base64NewSignature = CryptoJS.enc.Base64.stringify(newSignature).replace(/=+$/, '');
    
    if (base64NewSignature !== parts[2]) {
      console.log('token签名验证失败');
      return null;
    }
    
    // 解析payload
    const payload = JSON.parse(
      CryptoJS.enc.Utf8.stringify(
        CryptoJS.enc.Base64.parse(parts[1])
      )
    );
    
    // 检查token是否过期
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      console.log('token已过期');
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('token验证失败:', error);
    return null;
  }
};

// 根据电话号码登录
export const loginByPhone = async (phone, password) => {
  try {
    // 确保参数不为空
    if (!phone || !password) {
      throw new Error('手机号和密码不能为空');
    }
    
    // 尝试使用手机号登录
    const response = await uni.request({
      url: `${API_URL}/users/login`,
      method: 'POST',
      data: { phone, password },
      header: { 'Content-Type': 'application/json' }
    });
    
    if (response.statusCode === 200 && response.data && response.data.code === 200) {
      // 生成加密token
      const token = generateToken(response.data.data.id);
      
      // 登录成功，保存用户信息
      uni.setStorageSync('userInfo', response.data.data);
      uni.setStorageSync('token', token);
      
      // 从服务器获取用户数据
      await syncUserDataFromServer(response.data.data.id);
      
      // 触发登录成功事件
      uni.$emit('login_success', { userId: response.data.data.id });
      
      return {
        code: 200,
        message: response.data.message || '登录成功',
        profile: response.data.data
      };
    } else {
      throw new Error(response.data?.message || '登录失败');
    }
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};

// 用户登录，兼容旧API
export const login = loginByPhone;

// 用户注册
export const register = async (userData) => {
  try {
    const { phone, password } = userData;
    
    if (!phone || !password) {
      throw new Error('手机号和密码不能为空');
    }
    
    const username = userData.username || phone;
    
    const response = await uni.request({
      url: `${API_URL}/users/register`,
      method: 'POST',
      data: { username, phone, password },
      header: { 'Content-Type': 'application/json' }
    });
    
    if (response.statusCode === 200 && response.data && response.data.code === 200) {
      return {
        code: 200,
        message: response.data.message || '注册成功',
        data: response.data.data
      };
    } else {
      const errorMsg = response.data?.error || response.data?.message || '注册失败';
      throw new Error(errorMsg);
    }
  } catch (error) {
    console.error('注册失败:', error);
    throw error;
  }
};

// 获取用户信息
export const getUserInfo = async (userId) => {
  try {
    // 如果没有传入userId，尝试从本地存储获取
    if (!userId) {
      const userInfo = uni.getStorageSync('userInfo');
      if (!userInfo) {
        throw new Error('用户未登录');
      }
      userId = userInfo.id;
    }
    
    console.log('获取用户信息, userId:', userId);
    
    const response = await uni.request({
      url: `${API_URL}/users/${userId}`,
      method: 'GET',
      header: { 'Content-Type': 'application/json' }
    });
    
    if (response.statusCode === 200 && response.data.code === 200) {
      // 如果是当前登录用户，更新本地存储
      const currentUserInfo = uni.getStorageSync('userInfo');
      if (currentUserInfo && currentUserInfo.id === userId) {
        uni.setStorageSync('userInfo', response.data.data);
      }
      
      return {
        code: 200,
        message: '获取用户信息成功',
        data: response.data.data
      };
    } else {
      throw new Error(response.data.message || '获取用户信息失败');
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
    // 如果API请求失败，尝试返回本地存储的用户信息
    if (!userId) {
      const userInfo = uni.getStorageSync('userInfo');
      if (userInfo) {
        return { 
          code: 200, 
          message: '从本地获取用户信息成功',
          data: userInfo 
        };
      }
    }
    return {
      code: 500,
      message: error.message || '获取用户信息失败',
      error: error
    };
  }
};

// 退出登录
export const logout = async () => {
  try {
    console.log('开始退出登录流程');
    
    // 获取用户ID并同步数据
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo && userInfo.id) {
      console.log('从本地存储获取用户信息成功，用户ID:', userInfo.id);
      
      // 确保播放列表也同步到服务器
      const playList = uni.getStorageSync('playList');
      if (playList) {
        try {
          // 将播放列表转换为适合存储的格式并同步
          console.log('播放列表存在，长度:', typeof playList === 'string' ? 
            (JSON.parse(playList) || []).length : 
            (Array.isArray(playList) ? playList.length : 0));
            
          if (typeof playList === 'string') {
            uni.setStorageSync('playlists', JSON.parse(playList));
          } else if (Array.isArray(playList)) {
            uni.setStorageSync('playlists', playList);
          }
        } catch (e) {
          console.error('转换播放列表失败，但将继续退出流程:', e);
        }
      } else {
        console.log('本地不存在播放列表数据');
      }
      
      // 尝试同步所有用户数据到服务器，但不阻止退出流程
      try {
        const syncResult = await syncUserDataToServer(userInfo.id);
        console.log('数据同步结果:', syncResult ? '成功' : '失败');
      } catch (syncError) {
        console.error('数据同步过程出错，但将继续退出流程:', syncError);
      }
    } else {
      console.log('本地没有用户信息，跳过数据同步');
    }
    
    // 我们不再调用后端logout接口，因为它不存在
    console.log('开始清理本地数据');
    
    // 添加额外的清理：确保清除playList
    try {
      uni.removeStorageSync('playList');
      console.log('已清除播放列表');
    } catch (e) {
      console.error('清除播放列表失败:', e);
    }
    
    // 清除本地缓存
    const clearResult = clearUserInfo();
    console.log('清除用户信息结果:', clearResult.success ? '成功' : '失败');
    
    // 触发全局退出事件
    uni.$emit('logout', { silent: true, clearLocal: true });
    console.log('已触发全局退出事件');
    
    console.log('退出登录流程完成');
    
    // 跳转到登录页面
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/login/login',
        success: () => {
          console.log('已跳转到登录页面');
        },
        fail: (err) => {
          console.error('跳转到登录页面失败:', err);
        }
      });
    }, 100);
    
    return { code: 200, message: '退出成功' };
  } catch (error) {
    console.error('退出过程中发生错误:', error);
    
    // 即使出错也尝试清理本地数据
    try {
      uni.removeStorageSync('playList');
      clearUserInfo();
      console.log('尽管出错，已尝试清理本地数据');
    } catch (e) {
      console.error('清理本地数据失败:', e);
    }
    
    // 即使出错也触发退出事件
    try {
      uni.$emit('logout', { silent: true, clearLocal: true, error: true });
      console.log('尽管出错，已触发退出事件');
    } catch (e) {
      console.error('触发退出事件失败:', e);
    }
    
    // 即使出错也跳转到登录页面
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/login/login'
      });
    }, 100);
    
    return { code: 500, message: '退出过程中发生错误，但已尽可能清理本地数据' };
  }
};

// 检查登录状态
export const checkLoginStatus = () => {
  try {
    const userInfo = uni.getStorageSync('userInfo');
    let token = uni.getStorageSync('token');
    
    console.log('检查登录状态, token类型:', typeof token, token);
    
    // 确保userInfo有效且包含必要字段
    if (!userInfo || !userInfo.id) {
      console.log('登录检查: userInfo无效或不包含ID');
      return false;
    }
    
    // 确保token存在且有效
    if (!token) {
      console.log('登录检查: token不存在');
      return false;
    }
    
    // 处理直接是数字的token
    if (typeof token === 'number') {
      console.log('登录检查: 检测到数字类型token，正在升级...');
      // 如果token直接是数字类型，可能是用户ID
      token = generateToken(token.toString());
      uni.setStorageSync('token', token);
    }
    // 检查token是否为旧格式的对象 {type: "number", data: 数字}
    else if (typeof token === 'object' && token !== null && token.type === 'number' && typeof token.data === 'number') {
      console.log('登录检查: 检测到旧格式对象token，正在升级...');
      // 生成新格式token并保存
      token = generateToken(token.data.toString());
      uni.setStorageSync('token', token);
    }
    // 向下兼容 - 如果token是用户ID（旧格式），则为其生成新格式的token
    else if (typeof token === 'string' && !token.includes('.')) {
      console.log('登录检查: 检测到旧格式字符串token，正在升级...');
      // 生成新格式token并保存
      token = generateToken(token);
      uni.setStorageSync('token', token);
    }
    
    // 使用加密算法验证token
    const payload = verifyToken(token);
    if (!payload) {
      console.log('登录检查: token验证失败，payload为空');
      return false;
    }
    
    // 比较token中的用户ID和存储的用户ID
    const tokenUserId = payload.sub;
    const storedUserId = userInfo.id;
    
    console.log('登录检查: 对比ID', '存储ID类型:', typeof storedUserId, '存储ID:', storedUserId, 
                'Token ID类型:', typeof tokenUserId, 'Token ID:', tokenUserId);
    
    // 兼容不同类型的ID比较
    const isMatch = String(tokenUserId) === String(storedUserId);
    
    if (!isMatch) {
      console.log('登录检查: 用户ID不匹配');
      return false;
    }
    
    console.log('登录检查: 用户已登录，ID:', userInfo.id);
    return true;
  } catch (error) {
    console.error('登录状态检查出错:', error);
    return false;
  }
};

// 更新用户信息
export const updateUserInfo = async (userData) => {
  try {
    const userInfo = uni.getStorageSync('userInfo');
    if (!userInfo) {
      throw new Error('用户未登录');
    }
    
    const userId = userInfo.id;
    
    // 将nickname转换为username
    if (userData.nickname && !userData.username) {
      userData.username = userData.nickname;
      delete userData.nickname;
    }
    
    const response = await uni.request({
      url: `${API_URL}/users/${userId}`,
      method: 'PUT',
      data: userData,
      header: { 'Content-Type': 'application/json' }
    });
    
    if (response.statusCode === 200 && response.data.code === 200) {
      // 更新本地存储
      const updatedUserInfo = response.data.data;
      
      // 确保前端保持nickname字段一致性
      if (updatedUserInfo.username && !updatedUserInfo.nickname) {
        updatedUserInfo.nickname = updatedUserInfo.username;
      }
      
      uni.setStorageSync('userInfo', updatedUserInfo);
      return {
        code: 200,
        message: response.data.message || '更新成功',
        profile: updatedUserInfo
      };
    } else {
      throw new Error(response.data.message || '更新用户信息失败');
    }
  } catch (error) {
    console.error('更新用户信息失败:', error);
    throw error;
  }
};

// 从服务器同步用户数据
async function syncUserDataFromServer(userId) {
  try {
    // 获取用户所有数据
    const promises = [
      // 获取收藏歌单
      uni.request({
        url: `${API_URL}/favorites/${userId}`,
        method: 'GET'
      }),
      // 获取播放历史
      uni.request({
        url: `${API_URL}/history/${userId}`,
        method: 'GET'
      }),
      // 获取用户歌单
      uni.request({
        url: `${API_URL}/playlists/${userId}`,
        method: 'GET'
      })
    ];
    
    const [favoritesRes, historyRes, playlistsRes] = await Promise.all(promises);
    
    // 只在响应有效时存储数据
    if (favoritesRes.statusCode === 200 && favoritesRes.data.code === 200) {
      const data = Array.isArray(favoritesRes.data.data) ? favoritesRes.data.data : [];
      uni.setStorageSync('favoritePlaylists', data);
    }
    
    if (historyRes.statusCode === 200 && historyRes.data.code === 200) {
      const data = Array.isArray(historyRes.data.data) ? historyRes.data.data : [];
      uni.setStorageSync('playHistory', data);
    }
    
    if (playlistsRes.statusCode === 200 && playlistsRes.data.code === 200) {
      const data = Array.isArray(playlistsRes.data.data) ? playlistsRes.data.data : [];
      uni.setStorageSync('playlists', data);
    }
    
    uni.$emit('sync_completed');
    return true;
  } catch (error) {
    console.error('同步用户数据失败:', error);
    return false;
  }
}

// 将用户数据同步到服务器
// frontend/music-app-frontend/utils/authService.js
async function syncUserDataToServer(userId) {
  try {
    // 格式化数据
    const favoritePlaylists = getFavoritePlaylists().map(playlist => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description || '',
      cover: playlist.cover || '',
      creator_name: playlist.creator || playlist.creatorName || '',
      added_at: new Date().toISOString()
    }));
    
    const playHistory = getPlayHistory().map(record => ({
      song_id: record.id,
      song_name: record.name,
      artist: record.artist,
      play_time: record.playTime || new Date().toISOString()
    }));
    
    const playlists = (uni.getStorageSync('playlists') || []).map(playlist => ({
      name: playlist.name,
      description: playlist.description || '',
      cover: playlist.cover || '',
      songs: (playlist.songs || []).map(song => ({
        id: song.id,
        name: song.name,
        artist: song.artist,
        album: song.album,
        duration: song.duration,
        cover: song.cover,
        url: song.url
      }))
    }));
    
    const syncData = {
      userId,
      data: {
        favorites: uni.getStorageSync('favoriteSongs') || [],
        playHistory: playHistory,
        playlists: playlists,
        favoritePlaylists: favoritePlaylists
      }
    };
    
    const response = await uni.request({
      url: `${API_URL}/sync/user-data`,
      method: 'POST',
      data: syncData,
      header: { 'Content-Type': 'application/json' }
    });
    console.log(111111)
    return response.statusCode === 200;
  } catch (error) {
    console.error('同步数据失败:', error);
    return false;
  }
}
// 清除用户信息
export function clearUserInfo() {
  try {
    // 获取当前用户ID以清除与用户相关的特定键
    let userId = null;
    try {
      const userInfo = uni.getStorageSync('userInfo');
      if (userInfo && userInfo.id) {
        userId = userInfo.id;
      }
    } catch (e) {
      console.error('获取用户ID失败:', e);
    }
    
    // 完整的需要清除的键列表
    const keysToRemove = [
      'userInfo', 
      'token', 
      'favoritePlaylists',
      'playHistory', 
      'currentSong',
      'playlists',
      'playList', // 添加播放列表
      'autoPlay',  // 清除自动播放标记
      'logout_toast_shown', // 清除退出提示状态
      'lastSyncTime' // 清除上次同步时间
    ];
    
    // 如果有用户ID，还需要清除特定用户的数据
    if (userId) {
      keysToRemove.push(
        `user_${userId}_favoriteSongs`,
        `user_${userId}_playHistory`,
        `user_${userId}_playlists`,
        `user_${userId}_favoritePlaylists`
      );
    }
    
    // 清除所有键
    keysToRemove.forEach(key => {
      try {
        uni.removeStorageSync(key);
        console.log(`已清除存储键: ${key}`);
      } catch (err) {
        console.error(`清除${key}失败:`, err);
      }
    });
    
    console.log('所有用户数据已清除');
    return { success: true, code: 200, message: '清除用户数据成功' };
  } catch (error) {
    console.error('清除用户数据失败：', error);
    return { success: false, code: 500, message: '清除用户数据失败' };
  }
}

export default {
  login,
  loginByPhone,
  register,
  getUserInfo,
  logout,
  checkLoginStatus,
  updateUserInfo,
  generateToken,
  verifyToken
}; 
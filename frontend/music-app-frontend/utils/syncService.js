/**
 * 数据同步服务
 * 用于将本地存储的数据与后端数据库同步
 */

import apiConfig from './apiConfig';
import { API_URL } from './apiConfig';

// 同步服务 API 基础地址
const SYNC_API_URL = apiConfig.sync.baseUrl;

// 统一的本地存储键名前缀
const STORAGE_PREFIX = 'user_';

// 统一的存储键名定义
const STORAGE_KEYS = {
  FAVORITE_SONGS: (userId) => `${STORAGE_PREFIX}${userId}_favoriteSongs`,
  PLAY_HISTORY: (userId) => `${STORAGE_PREFIX}${userId}_playHistory`,
  PLAYLISTS: (userId) => `${STORAGE_PREFIX}${userId}_playlists`,
  FAVORITE_PLAYLISTS: (userId) => `${STORAGE_PREFIX}${userId}_favoritePlaylists`,
  SONGS: (userId) => `${STORAGE_PREFIX}${userId}_songs`,
  USER_PROFILE: (userId) => `${STORAGE_PREFIX}${userId}_profile`,
  SYNC_STATUS: (userId) => `${STORAGE_PREFIX}${userId}_syncStatus`
};

/**
 * 记录详细日志
 * @param {String} type 日志类型 (info/warn/error/debug)
 * @param {String} message 日志消息
 * @param {Object} data 相关数据
 */
const log = (type = 'info', message, data = null) => {
  const timestamp = new Date().toISOString();
  const prefix = `[SyncService] ${timestamp}`;
  
  switch(type.toLowerCase()) {
    case 'error':
      console.error(`${prefix} ERROR: ${message}`, data || '');
      break;
    case 'warn':
      console.warn(`${prefix} WARN: ${message}`, data || '');
      break;
    case 'debug':
      console.debug(`${prefix} DEBUG: ${message}`, data || '');
      break;
    case 'info':
    default:
      console.log(`${prefix} INFO: ${message}`, data || '');
  }
  
  // TODO: 可以考虑添加本地错误日志持久化，便于后续分析
};

/**
 * 安全地获取本地存储中的数据
 * 处理可能格式不正确的数据
 * @param {String} key 存储键名
 * @returns {Array} 解析后的数据数组
 */
const safeGetStorage = (key) => {
  try {
    const data = uni.getStorageSync(key);
    
    // 如果数据为空，返回空数组
    if (!data) return [];
    
    // 检查是否为字符串类型(可能是JSON字符串)
    if (typeof data === 'string') {
      try {
        // 尝试解析JSON字符串
        return JSON.parse(data) || [];
      } catch (e) {
        log('error', `解析${key}数据失败:`, e);
        return [];
      }
    }
    
    // 检查是否为对象类型且有data字段(统一存储格式)
    if (typeof data === 'object' && data !== null) {
      // 如果有data字段，返回data字段的值
      if (data.data !== undefined) {
        return Array.isArray(data.data) ? data.data : [];
      }
      // 如果本身就是数组，直接返回
      if (Array.isArray(data)) {
        return data;
      }
    }
    
    // 默认返回空数组
    return [];
  } catch (error) {
    log('error', `获取${key}数据失败:`, error);
    return [];
  }
};

/**
 * 安全设置本地存储
 * @param {String} key 存储键名
 * @param {Any} data 要存储的数据
 * @returns {Boolean} 是否成功
 */
const safeSetStorage = (key, data) => {
  try {
    uni.setStorageSync(key, data);
    log('debug', `数据已保存到本地存储: ${key}`);
    return true;
  } catch (error) {
    log('error', `保存数据到${key}失败:`, error);
    return false;
  }
};

/**
 * 检查网络连接状态
 * @returns {Promise<boolean>} 网络是否连接
 */
const checkNetworkStatus = () => {
  return new Promise((resolve) => {
    uni.getNetworkType({
      success: (res) => {
        const isConnected = res.networkType !== 'none';
        log('debug', `网络状态检查: ${isConnected ? '已连接' : '未连接'} (${res.networkType})`);
        resolve(isConnected);
      },
      fail: (err) => {
        log('error', '网络状态检查失败:', err);
        resolve(false);
      }
    });
  });
};

/**
 * 标准化HTTP请求
 * @param {String} url 请求URL
 * @param {String} method 请求方法
 * @param {Object} data 请求数据
 * @param {Object} options 其他选项
 * @returns {Promise} 请求结果
 */
const request = (url, method = 'GET', data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    // 确保URL正确
    const fullUrl = url.startsWith('http') 
      ? url 
      : url.startsWith('/') 
        ? `${SYNC_API_URL}${url}` 
        : `${SYNC_API_URL}/${url}`;
    
    log('debug', `发送${method}请求到: ${fullUrl}`, { data });
    
    // 默认配置
    const config = {
      url: fullUrl,
      method,
      data,
      timeout: options.timeout || 30000,
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          log('debug', `请求成功: ${res.statusCode}`, res.data);
          resolve(res.data);
        } else {
          log('error', `请求失败: ${res.statusCode}`, res.data);
          reject({
            code: res.statusCode,
            message: res.data?.message || '请求失败',
            data: res.data
          });
        }
      },
      fail: (err) => {
        log('error', '请求错误:', err);
        reject({
          code: -1,
          message: err.errMsg || '网络请求失败',
          error: err
        });
      },
      complete: options.complete
    };
    
    uni.request(config);
  });
};

/**
 * 统一字段名格式
 * 将不同来源的对象转换为统一的字段名格式
 * @param {Object} obj 源对象
 * @param {String} type 对象类型(song/playlist/history)
 * @returns {Object} 格式化后的对象
 */
const normalizeFields = (obj, type = 'song') => {
  if (!obj) return null;
  
  switch (type.toLowerCase()) {
    case 'song':
      return {
        netease_id: obj.netease_id || obj.neteaseId || obj.id || obj.song_id || obj.songId || null,
        name: obj.name || obj.song_name || obj.songName || obj.title || '未知歌曲',
        artist: obj.artist || obj.artistName || obj.singer || obj.ar?.map(a => a.name).join(', ') || '未知艺术家',
        album: obj.album || obj.albumName || obj.al?.name || '未知专辑',
        duration: obj.duration || obj.dt || 0,
        cover_url: obj.cover_url || obj.coverUrl || obj.cover || obj.picUrl || obj.al?.picUrl || '',
        url: obj.url || obj.mp3Url || '',
        lyrics: obj.lyrics || obj.lrc || '',
        play_count: obj.play_count || obj.playCount || 0,
        created_at: obj.created_at || obj.createdAt || new Date().toISOString(),
        updated_at: obj.updated_at || obj.updatedAt || new Date().toISOString()
      };
      
    case 'playlist':
      // 确保songs是一个数组，并且正确格式化每首歌曲
      let songs = [];
      if (Array.isArray(obj.songs)) {
        // 过滤掉无效的歌曲数据
        songs = obj.songs
          .filter(song => song && (song.id || song.song_id || song.songId))
          .map(song => normalizeFields(song, 'song'));
      }
      
      return {
        id: obj.id || obj.playlist_id || obj.playlistId || null, // 使用id而不是netease_id
        name: obj.name || obj.playlist_name || obj.playlistName || '未命名歌单',
        description: obj.description || '',
        cover_url: obj.cover || obj.coverUrl || obj.cover_url || obj.coverImgUrl || '',
        creator: obj.creator || '',
        song_count: songs.length || obj.song_count || obj.songCount || 0,
        play_count: obj.play_count || obj.playCount || 0,
        created_at: obj.created_at || obj.createdAt || new Date().toISOString(),
        updated_at: obj.updated_at || obj.updatedAt || new Date().toISOString(),
        songs: songs
      };
      
    case 'history':
      return {
        netease_id: obj.netease_id || obj.neteaseId || obj.id || obj.song_id || obj.songId || null,
        name: obj.name || obj.song_name || obj.songName || obj.title || '未知歌曲',
        artist: obj.artist || obj.artistName || obj.singer || '',
        play_time: obj.play_time || obj.playTime || obj.played_at || obj.playedAt || new Date().toISOString()
      };
      
    default:
      return obj;
  }
};

/**
 * 同步收藏数据
 * @param {String} userId 用户ID
 * @returns {Promise} 同步结果
 */
export const syncFavorites = async (userId) => {
  try {
    // 检查网络状态
    const isConnected = await checkNetworkStatus();
    if (!isConnected) {
      log('warn', '无网络连接，无法同步收藏数据');
      return { success: false, message: '无网络连接' };
    }
    
    // 获取本地收藏数据
    const key = STORAGE_KEYS.FAVORITE_SONGS(userId);
    const favorites = safeGetStorage(key);
    log('info', `本地收藏数据数量: ${favorites.length}`);
    
    if (favorites.length > 0) {
      log('debug', `本地收藏数据样本:`, favorites.slice(0, 3));
    }
    
    // 确保数据格式正确
    const formattedFavorites = favorites.map(song => normalizeFields(song, 'song'));
    
    log('info', `准备同步收藏数据，格式化后共 ${formattedFavorites.length} 条`);
    
    // 发送同步请求
    try {
      const response = await uni.request({
        url: `${SYNC_API_URL}${apiConfig.sync.favorites}`,
        method: 'POST',
        data: {
          userId: parseInt(userId),
          favorites: formattedFavorites
        },
        header: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });
      
      log('debug', `同步收藏响应: ${response.statusCode}`, response.data);
      
      if (response.statusCode === 200) {
        log('info', '收藏数据同步成功');
      
      // 更新本地存储
        if (response.data && response.data.data && response.data.data.favorites) {
          const serverFavorites = response.data.data.favorites.favorites || [];
          log('info', `服务器返回收藏数据: ${serverFavorites.length} 条`);
          
          if (serverFavorites.length > 0) {
            safeSetStorage(key, serverFavorites);
          }
        } else {
          log('warn', '服务器未返回收藏数据');
        }
        
        return { 
          success: true, 
          message: '收藏数据同步成功',
          data: response.data?.data
        };
      } else {
        log('error', '收藏数据同步失败:', response.data);
        return { 
          success: false, 
          message: response.data?.message || '同步失败',
          statusCode: response.statusCode,
          error: response.data
        };
      }
    } catch (requestError) {
      log('error', '收藏数据同步请求失败:', requestError);
      return {
        success: false,
        message: requestError.message || '网络请求错误',
        error: requestError
      };
    }
  } catch (error) {
    log('error', '收藏数据同步过程出现异常:', error);
    return {
      success: false, 
      message: error.message || '同步过程异常',
      error
    };
  }
};

/**
 * 同步播放历史
 * @param {String} userId 用户ID
 * @returns {Promise} 同步结果
 */
export const syncPlayHistory = async (userId) => {
  try {
    // 检查网络状态
    const isConnected = await checkNetworkStatus();
    if (!isConnected) {
      log('warn', '无网络连接，无法同步播放历史');
      return { success: false, message: '无网络连接' };
    }
    
    // 获取本地播放历史
    const key = STORAGE_KEYS.PLAY_HISTORY(userId);
    const history = safeGetStorage(key);
    log('info', `本地播放历史数量: ${history.length}`);
    
    if (history.length > 0) {
      log('debug', `本地播放历史样本:`, history.slice(0, 3));
    }
    
    // 确保数据格式正确
    const formattedHistory = history.map(record => normalizeFields(record, 'history'));
    
    log('info', `准备同步播放历史，格式化后共 ${formattedHistory.length} 条`);
    
    // 发送同步请求
    try {
      const response = await uni.request({
        url: `${SYNC_API_URL}${apiConfig.sync.playHistory}`,
        method: 'POST',
        data: {
          userId: parseInt(userId),
          playHistory: formattedHistory
        },
        header: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });
      
      log('debug', `同步播放历史响应: ${response.statusCode}`, response.data);
      
      if (response.statusCode === 200) {
        log('info', '播放历史同步成功');
      
      // 更新本地存储
        if (response.data && response.data.data && response.data.data.history) {
          const serverHistory = response.data.data.history || [];
          log('info', `服务器返回播放历史数据: ${serverHistory.length} 条`);
          
          if (serverHistory.length > 0) {
            safeSetStorage(key, serverHistory);
          }
        } else {
          log('warn', '服务器未返回播放历史数据');
        }
        
        return {
          success: true,
          message: '播放历史同步成功',
          data: response.data?.data
        };
      } else {
        log('error', '播放历史同步失败:', response.data);
        return { 
          success: false, 
          message: response.data?.message || '同步失败',
          statusCode: response.statusCode,
          error: response.data
        };
      }
    } catch (requestError) {
      log('error', '播放历史同步请求失败:', requestError);
      return {
        success: false,
        message: requestError.message || '网络请求错误',
        error: requestError
      };
    }
  } catch (error) {
    log('error', '播放历史同步过程出现异常:', error);
    return {
      success: false, 
      message: error.message || '同步过程异常',
      error
    };
  }
};

/**
 * 同步歌单
 * @param {String} userId 用户ID
 * @returns {Promise} 同步结果
 */
export const syncPlaylists = async (userId) => {
  try {
    // 检查网络状态
    const isConnected = await checkNetworkStatus();
    if (!isConnected) {
      log('warn', '无网络连接，无法同步歌单');
      return { success: false, message: '无网络连接' };
    }
    
    // 获取本地歌单数据
    const key = STORAGE_KEYS.PLAYLISTS(userId);
    const playlists = safeGetStorage(key);
    log('info', `本地歌单数量: ${playlists.length}`);
    
    if (playlists.length > 0) {
      log('debug', `本地歌单样本:`, playlists.slice(0, 1));
    }
    
    // 确保数据格式正确
    const formattedPlaylists = playlists.map(playlist => normalizeFields(playlist, 'playlist'));
    
    log('info', `准备同步歌单，格式化后共 ${formattedPlaylists.length} 个`);
    
    // 调试输出：检查格式化后的第一个歌单
    if (formattedPlaylists.length > 0) {
      log('debug', '格式化后的歌单示例:', {
        id: formattedPlaylists[0].id,
        name: formattedPlaylists[0].name,
        song_count: formattedPlaylists[0].song_count,
        songs_length: formattedPlaylists[0].songs?.length || 0
      });
    }
    
    // 发送同步请求
    try {
      const response = await uni.request({
        url: `${SYNC_API_URL}${apiConfig.sync.playlists}`,
        method: 'POST',
        data: {
          userId: parseInt(userId),
          localPlaylists: formattedPlaylists
        },
        header: {
          'Content-Type': 'application/json'
        },
        timeout: 60000
      });
      
      log('debug', `同步歌单响应: ${response.statusCode}`, response.data);
      
      if (response.statusCode === 200) {
        log('info', '歌单同步成功');
    
        // 更新本地存储
        if (response.data && response.data.data && response.data.data.playlists) {
          const serverPlaylists = response.data.data.playlists || [];
          log('info', `服务器返回歌单数据: ${serverPlaylists.length} 个`);
          
          if (serverPlaylists.length > 0) {
            safeSetStorage(key, serverPlaylists);
          }
        } else {
          log('warn', '服务器未返回歌单数据');
        }
        
        return {
          success: true,
          message: '歌单同步成功',
          data: response.data?.data
        };
      } else {
        log('error', '歌单同步失败:', response.data);
        return {
          success: false, 
          message: response.data?.message || '同步失败',
          statusCode: response.statusCode,
          error: response.data
        };
      }
    } catch (requestError) {
      log('error', '歌单同步请求失败:', requestError);
      return {
        success: false,
        message: requestError.message || '网络请求错误',
        error: requestError
      };
    }
  } catch (error) {
    log('error', '歌单同步过程出现异常:', error);
    return {
      success: false, 
      message: error.message || '同步过程异常',
      error
    };
  }
};

/**
 * 同步收藏歌单到服务器
 * @param {Number} userId 用户ID
 * @returns {Promise} 同步结果
 */
export const syncFavoritePlaylists = async (userId) => {
  try {
    if (!userId) {
      log('error', '同步收藏歌单失败: 用户ID为空');
      return {
        success: false,
        message: '用户ID不能为空'
      };
    }
    
    // 检查网络连接
    const isConnected = await checkNetworkStatus();
    if (!isConnected) {
      log('warn', '网络未连接，无法同步收藏歌单');
      return {
        success: false,
        message: '网络未连接，无法同步收藏歌单'
      };
    }
    
    // 获取本地存储的收藏歌单
    const key = STORAGE_KEYS.FAVORITE_PLAYLISTS(userId);
    const favoritePlaylists = safeGetStorage(key);
    log('info', `准备同步 ${favoritePlaylists.length} 个收藏歌单`);
    
    if (favoritePlaylists.length > 0) {
      log('debug', '收藏歌单样本:', favoritePlaylists.slice(0, 1));
    }
    
    // 确保数据格式正确
    const formattedPlaylists = favoritePlaylists.map(playlist => normalizeFields(playlist, 'playlist'));
    
    // 发送同步请求
    try {
      const response = await uni.request({
        url: `${SYNC_API_URL}${apiConfig.sync.favorites}/playlists`,
        method: 'POST',
        data: {
          userId: parseInt(userId),
          favoritePlaylists: formattedPlaylists
        },
        header: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });
      
      log('debug', '收藏歌单同步响应:', response);
      
      if (response.statusCode === 200 && response.data && 
          (response.data.code === 200 || response.data.status === 'success')) {
        log('info', '收藏歌单同步成功');
        
        // 更新本地存储的收藏歌单(使用服务器返回的最新数据)
        if (response.data.data && response.data.data.favoritePlaylists) {
          const serverPlaylists = response.data.data.favoritePlaylists;
          log('info', `服务器返回收藏歌单: ${serverPlaylists.length} 个`);
          
          safeSetStorage(key, serverPlaylists);
        }
        
        return {
          success: true,
          added: response.data.data?.added || 0,
          removed: response.data.data?.removed || 0,
          message: '收藏歌单同步成功'
      };
    } else {
        log('error', '收藏歌单同步请求失败:', response.data);
        return {
          success: false,
          message: response.data?.message || '收藏歌单同步失败',
          statusCode: response.statusCode,
          error: response.data
        };
      }
    } catch (requestError) {
      log('error', '收藏歌单同步请求失败:', requestError);
      return {
        success: false,
        message: requestError.message || '网络请求错误',
        error: requestError
      };
    }
  } catch (error) {
    log('error', '同步收藏歌单出错:', error);
    return {
      success: false,
      message: error.message || '同步收藏歌单出错',
      error
    };
  }
};

/**
 * 同步所有用户数据
 * @param {Number} userId 用户ID
 * @returns {Promise} 同步结果
 */
export const syncAllUserData = async (userId) => {
  try {
    log('info', '开始同步所有用户数据', { userId });
    
    // 检查输入
    if (!userId) {
      log('error', '同步所有用户数据失败: 用户ID为空');
      return {
        code: 400,
        message: '用户ID不能为空'
      };
    }
    
    // 检查网络连接
    const isConnected = await checkNetworkStatus();
    if (!isConnected) {
      log('warn', '网络未连接，无法同步');
      return {
        code: -1,
        message: '网络未连接，无法同步'
      };
    }
    
    // 获取本地数据
    const favorites = safeGetStorage(STORAGE_KEYS.FAVORITE_SONGS(userId));
    const playHistory = safeGetStorage(STORAGE_KEYS.PLAY_HISTORY(userId));
    const playlists = safeGetStorage(STORAGE_KEYS.PLAYLISTS(userId));
    const favoritePlaylists = safeGetStorage(STORAGE_KEYS.FAVORITE_PLAYLISTS(userId));
    
    log('info', '本地数据统计', {
      favorites: favorites.length,
      playHistory: playHistory.length,
      playlists: playlists.length,
      favoritePlaylists: favoritePlaylists.length
    });
    
    // 检查是否有任何数据需要同步
    const hasDataToSync = favorites.length > 0 || playHistory.length > 0 || 
                          playlists.length > 0 || favoritePlaylists.length > 0;
    
    if (!hasDataToSync) {
      log('info', '没有本地数据需要同步，跳过同步过程');
      return {
        code: 200,
        message: '没有数据需要同步',
        data: {
          favorites: { added: 0, removed: 0, favorites: [] },
          playHistory: { added: 0, history: [] },
          playlists: { created: 0, updated: 0, deleted: 0, playlists: [] },
          favoritePlaylists: { added: 0, removed: 0, favoritePlaylists: [] }
        }
      };
    }
    
    // 同步数据
    const results = {
      favorites: null,
      playHistory: null,
      playlists: null,
      favoritePlaylists: null
    };
    
    // 同步收藏
    if (favorites.length > 0) {
      log('info', '开始同步收藏歌曲...');
      results.favorites = await syncFavorites(userId);
      log('info', '收藏歌曲同步结果', results.favorites);
    }
    
    // 同步播放历史
    if (playHistory.length > 0) {
      log('info', '开始同步播放历史...');
      results.playHistory = await syncPlayHistory(userId);
      log('info', '播放历史同步结果', results.playHistory);
    }
    
    // 同步歌单
    if (playlists.length > 0) {
      log('info', '开始同步歌单...');
      results.playlists = await syncPlaylists(userId);
      log('info', '歌单同步结果', results.playlists);
    }
    
    // 同步收藏歌单
    if (favoritePlaylists.length > 0) {
      log('info', '开始同步收藏歌单...');
      results.favoritePlaylists = await syncFavoritePlaylists(userId);
      log('info', '收藏歌单同步结果', results.favoritePlaylists);
    }
    
    // 检查是否所有同步都成功
    const allSuccess = 
      (!favorites.length || results.favorites?.success) && 
      (!playHistory.length || results.playHistory?.success) &&
      (!playlists.length || results.playlists?.success) &&
      (!favoritePlaylists.length || results.favoritePlaylists?.success);
    
    if (allSuccess) {
      log('info', '所有数据同步成功');
      
      // 更新同步状态
      safeSetStorage(STORAGE_KEYS.SYNC_STATUS(userId), {
        lastSync: new Date().toISOString(),
        status: 'success'
      });
      
      return {
        code: 200,
        message: '所有数据同步成功',
        data: results
      };
    } else {
      log('error', '部分数据同步失败', results);
      
      // 更新同步状态，记录失败
      safeSetStorage(STORAGE_KEYS.SYNC_STATUS(userId), {
        lastSync: new Date().toISOString(),
        status: 'partial',
        error: '部分数据同步失败'
      });
      
      return {
        code: 207, // 多状态返回
        message: '部分数据同步失败',
        data: results
      };
    }
  } catch (error) {
    log('error', '同步所有用户数据失败', error);
    
    // 更新同步状态，记录失败
    safeSetStorage(STORAGE_KEYS.SYNC_STATUS(userId), {
      lastSync: new Date().toISOString(),
      status: 'error',
      error: error.message || '未知错误'
    });
    
    return {
      code: error.code || 500,
      message: error.message || '同步所有用户数据失败',
      error
    };
  }
};

/**
 * 用户登录后初始化同步
 * @param {Number} userId 用户ID
 * @param {Object} options 选项参数
 * @returns {Promise} 同步结果
 */
export const initSyncAfterLogin = async (userId, options = {}) => {
  try {
    log('info', '开始初始化同步, 用户ID:', userId, '选项:', options);
    
    if (!userId) {
      log('error', '初始化同步失败: 用户ID为空');
      return {
        code: 400,
        message: '用户ID不能为空'
      };
    }
    
    // 检查网络连接
    const isConnected = await checkNetworkStatus();
    if (!isConnected) {
      log('warn', '网络未连接，暂时使用本地数据');
      return {
        code: -1,
        message: '网络未连接，暂时使用本地数据'
      };
    }
    
    // 确保本地存储中的数据格式正确
    if (options.forceSyncLocalData) {
      log('info', '开始强制迁移本地数据');
      
      // 获取通用键名的数据
      const genericFavorites = safeGetStorage('favoriteSongs');
      const genericHistory = safeGetStorage('playHistory');
      const genericPlaylists = safeGetStorage('playlists');
      
      // 确保用户特定键名有数据
      if (genericFavorites.length > 0) {
        log(`迁移收藏数据: ${genericFavorites.length} 项`);
        safeSetStorage(STORAGE_KEYS.FAVORITE_SONGS(userId), genericFavorites);
      }
      
      if (genericHistory.length > 0) {
        log(`迁移播放历史: ${genericHistory.length} 项`);
        safeSetStorage(STORAGE_KEYS.PLAY_HISTORY(userId), genericHistory);
      }
      
      if (genericPlaylists.length > 0) {
        log(`迁移歌单: ${genericPlaylists.length} 项`);
        safeSetStorage(STORAGE_KEYS.PLAYLISTS(userId), genericPlaylists);
      }
    } else {
      // 清除本地可能存在的旧数据
      safeSetStorage(STORAGE_KEYS.FAVORITE_SONGS(userId), []);
      safeSetStorage(STORAGE_KEYS.PLAY_HISTORY(userId), []);
      safeSetStorage(STORAGE_KEYS.PLAYLISTS(userId), []);
    }
    
    // 迁移匿名用户数据（如果有）
    const anonymousFavorites = safeGetStorage('favoriteSongs');
    const anonymousHistory = safeGetStorage('playHistory');
    const anonymousPlaylists = safeGetStorage('playlists');
    
    // 显示同步开始提示
    if (options.showToast !== false) {
      uni.showLoading({
        title: '正在同步数据...',
        mask: true
      });
    }
    
    // 全量同步，最多尝试3次
    let retryCount = 0;
    let syncResult = null;
    let success = false;
    
    while (!success && retryCount < 3) {
      try {
        syncResult = await syncAllUserData(userId);
        if (syncResult.code === 200) {
          success = true;
        } else {
          throw new Error(syncResult.message || '同步失败');
        }
      } catch (error) {
        retryCount++;
        log('error', `同步失败，第 ${retryCount} 次重试:`, error);
        
        if (retryCount < 3) {
          // 等待一段时间后重试
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    
    // 隐藏加载提示
    if (options.showToast !== false) {
      uni.hideLoading();
    }
    
    if (success) {
      log('info', '初始化同步成功');
      
      // 同步完成后，触发同步完成事件
      uni.$emit('sync_completed', { 
        userId,
        success: true,
        timestamp: new Date().getTime()
      });
      
      return {
        code: 200,
        message: '数据同步成功',
        retryCount
      };
    } else {
      log('error', '多次尝试后同步仍然失败');
      
      // 如果同步失败但有匿名数据，先使用匿名数据
      if (anonymousFavorites.length > 0) {
        safeSetStorage(STORAGE_KEYS.FAVORITE_SONGS(userId), anonymousFavorites);
      }
      
      if (anonymousHistory.length > 0) {
        safeSetStorage(STORAGE_KEYS.PLAY_HISTORY(userId), anonymousHistory);
      }
      
      if (anonymousPlaylists.length > 0) {
        safeSetStorage(STORAGE_KEYS.PLAYLISTS(userId), anonymousPlaylists);
      }
      
      // 显示提示
      if (options.showToast !== false) {
        uni.showToast({
          title: '数据同步失败，将在网络恢复后重试',
          icon: 'none',
          duration: 2000
        });
      }
      
      return {
        code: 500,
        message: '多次尝试后同步失败，将在网络恢复后重试',
        fallbackToAnonymous: !!(anonymousFavorites.length || anonymousHistory.length || anonymousPlaylists.length)
      };
    }
  } catch (error) {
    log('error', '初始化同步出现未预期错误:', error);
    
    // 隐藏加载提示
    if (options.showToast !== false) {
      uni.hideLoading();
    }
    
    return {
      code: error.code || 500,
      message: error.message || '初始化同步失败'
    };
  }
};

/**
 * 同步服务类 - 处理用户数据在本地存储和服务器间的同步
 */
class SyncService {
  constructor() {
    this.isSyncing = false;
    this.lastSyncTime = null;
    this.syncStatus = {
      favorites: 'idle',
      playlists: 'idle',
      playHistory: 'idle',
      songs: 'idle',
      userData: 'idle'
    };
    
    log('info', 'SyncService 已初始化');
  }
  
  /**
   * 获取同步状态
   * @returns {Object} 当前同步状态
   */
  getSyncStatus() {
    return {
      ...this.syncStatus,
      isSyncing: this.isSyncing,
      lastSyncTime: this.lastSyncTime
    };
  }
  
  /**
   * 更新同步状态
   * @param {String} key 状态键
   * @param {String} status 状态值
   */
  updateSyncStatus(key, status) {
    if (this.syncStatus.hasOwnProperty(key)) {
      this.syncStatus[key] = status;
      log('debug', `同步状态更新: ${key} => ${status}`);
    }
    
    if (status === 'syncing') {
      this.isSyncing = true;
    } else if (Object.values(this.syncStatus).every(s => s !== 'syncing')) {
      this.isSyncing = false;
      if (status === 'success') {
        this.lastSyncTime = new Date().toISOString();
      }
    }
  }
  
  /**
   * 上传歌单
   * @param {string} userId 用户ID
   */
  async uploadPlaylists(userId) {
    try {
      this.updateSyncStatus('playlists', 'syncing');
      
      // 获取本地数据
      const key = STORAGE_KEYS.PLAYLISTS(userId);
      const playlists = safeGetStorage(key);
      
      log('info', `开始上传歌单，用户ID: ${userId}, 本地歌单数量: ${playlists.length}`);
      
      if (playlists.length === 0) {
        log('info', '没有歌单需要上传');
        this.updateSyncStatus('playlists', 'success');
        return {
          success: true,
          message: '没有歌单需要上传'
        };
      }
      
      // 详细记录处理前的原始数据结构
      if (playlists.length > 0) {
        log('debug', '原始歌单数据示例:', playlists[0]);
        if (playlists[0]?.songs?.length > 0) {
          log('debug', '原始歌曲数据示例:', playlists[0].songs[0]);
        }
      }
      
      // 调整数据格式以符合后端期望
      const formattedPlaylists = playlists.map(playlist => normalizeFields(playlist, 'playlist'));
      
      log('info', `调整格式后的歌单数量: ${formattedPlaylists.length}`);
      if (formattedPlaylists.length > 0) {
        log('debug', '格式化后的歌单示例:', formattedPlaylists[0]);
        if (formattedPlaylists[0]?.songs?.length > 0) {
          log('debug', '格式化后的歌曲示例:', formattedPlaylists[0].songs[0]);
        }
      }
      
      // 使用apiConfig中定义的端点
      const syncUrl = `${SYNC_API_URL}${apiConfig.sync.playlists}`;
      log('debug', '请求URL:', syncUrl);
      
      try {
        // 发送请求
      const response = await uni.request({
          url: syncUrl,
        method: 'POST',
        data: { 
            userId: parseInt(userId), 
          localPlaylists: formattedPlaylists 
        },
        header: {
          'Content-Type': 'application/json'
          },
          timeout: 60000 // 较长的超时时间以处理大量数据
        });
        
        log('debug', `歌单上传响应: ${response.statusCode}`, response.data);
        
        if (response.statusCode === 200 && response.data && 
            (response.data.code === 200 || response.data.status === 'success')) {
          
          log('info', '歌单上传成功');
          
          // 如果服务器返回了更新的数据，更新本地存储
          if (response.data.data && response.data.data.playlists) {
            const serverPlaylists = response.data.data.playlists.playlists || [];
            log('info', `服务器返回歌单: ${serverPlaylists.length} 个`);
            
            if (serverPlaylists.length > 0) {
              safeSetStorage(key, serverPlaylists);
            }
          }
          
          this.updateSyncStatus('playlists', 'success');
          return {
            success: true,
            message: '歌单同步成功',
            data: response.data.data || response.data
          };
      } else {
          const errorMsg = response.data?.message || response.data?.error || '上传失败，服务器返回错误';
          log('error', `歌单上传失败: ${errorMsg}`, {
            statusCode: response.statusCode,
            response: response.data
          });
          
          this.updateSyncStatus('playlists', 'error');
        return {
            success: false,
            message: errorMsg,
            error: response.data,
            statusCode: response.statusCode
          };
        }
      } catch (requestError) {
        log('error', '歌单上传请求失败:', requestError);
        this.updateSyncStatus('playlists', 'error');
        return {
          success: false,
          message: requestError.message || '网络请求错误',
          error: requestError
        };
      }
    } catch (error) {
      log('error', '歌单上传过程出现异常:', error);
      this.updateSyncStatus('playlists', 'error');
      return {
        success: false,
        message: error.message || '上传过程中发生异常',
        error
      };
    }
  }
  
  // 其他方法都应类似优化
}

export default new SyncService();

/**
 * 修复播放列表数据格式
 * 用于确保同步的播放列表数据能正确渲染
 * @param {Number} userId 用户ID
 * @returns {Object} 修复结果
 */
export const fixPlaylistsData = async (userId) => {
  try {
    if (!userId) {
      log('error', '修复播放列表数据失败: 用户ID为空');
      return {
        success: false,
        message: '用户ID不能为空'
      };
    }
    
    log('info', `开始修复用户 ${userId} 的播放列表数据`);
    
    // 获取本地存储的播放列表数据
    const key = STORAGE_KEYS.PLAYLISTS(userId);
    let playlists = safeGetStorage(key);
    
    log('info', `当前本地播放列表数量: ${playlists.length}`);
    
    // 尝试修复数据
    let needFix = false;
    let fixedPlaylists = [];
    
    // 检查是否为数组
    if (!Array.isArray(playlists)) {
      if (typeof playlists === 'object' && playlists !== null) {
        // 如果是对象，尝试提取数据
        if (playlists.data && Array.isArray(playlists.data)) {
          fixedPlaylists = playlists.data;
          needFix = true;
        } else {
          // 尝试将整个对象作为单个播放列表
          if (playlists.id) {
            fixedPlaylists = [playlists];
            needFix = true;
          } else {
            // 无法修复，重置为空数组
            fixedPlaylists = [];
            needFix = true;
          }
        }
      } else if (typeof playlists === 'string') {
        // 尝试解析JSON字符串
        try {
          const parsed = JSON.parse(playlists);
          if (Array.isArray(parsed)) {
            fixedPlaylists = parsed;
          } else if (typeof parsed === 'object' && parsed !== null && parsed.data && Array.isArray(parsed.data)) {
            fixedPlaylists = parsed.data;
          } else if (typeof parsed === 'object' && parsed !== null && parsed.id) {
            fixedPlaylists = [parsed];
          } else {
            fixedPlaylists = [];
          }
          needFix = true;
        } catch (e) {
          log('error', '解析播放列表JSON字符串失败:', e);
          fixedPlaylists = [];
          needFix = true;
        }
      } else {
        // 无法修复，重置为空数组
        fixedPlaylists = [];
        needFix = true;
      }
    } else {
      // 是数组，但需要检查每个元素是否格式正确
      needFix = playlists.some(list => !list.id || !list.name);
      
      if (needFix) {
        // 过滤出有效的播放列表
        fixedPlaylists = playlists.filter(list => list && typeof list === 'object' && list.id).map(list => ({
          id: list.id,
          name: list.name || '未命名歌单',
          cover: list.cover || '/static/default-playlist.png',
          creator: list.creator || '我',
          description: list.description || '',
          songs: Array.isArray(list.songs) ? list.songs.map(song => {
            // 确保有id
            const songId = song.id || song.netease_id || song.neteaseId || song.songId || `local_${Date.now()}_${Math.random().toString(36).substring(2)}`;
            
            // 确保有歌曲名称（优先级：name > song_name > title > songName）
            const songName = song.name || song.song_name || song.title || song.songName || '未知歌曲';
            
            // 确保能正确显示的格式
            return {
              id: songId,
              name: songName,
              artist: song.artist || song.artistName || song.singer || '未知歌手',
              album: song.album || song.albumName || '未知专辑',
              cover: song.cover || song.coverUrl || song.cover_url || '/static/default-song.png',
              duration: song.duration || 0,
              url: song.url || `https://music.163.com/song/media/outer/url?id=${songId}.mp3`
            };
          }) : []
        }));
      } else {
        // 不需要修复，使用原数据
        fixedPlaylists = playlists;
      }
    }
    
    if (needFix) {
      log('info', `修复后的播放列表数量: ${fixedPlaylists.length}`);
      
      // 保存修复后的数据
      safeSetStorage(key, fixedPlaylists);
      
      // 同步回服务器
      if (fixedPlaylists.length > 0) {
        log('info', '尝试将修复后的数据同步到服务器');
        
        // 检查网络连接
        const isConnected = await checkNetworkStatus();
        if (isConnected) {
          try {
            const syncResult = await syncPlaylists(userId);
            log('info', '修复后的数据同步结果:', syncResult);
          } catch (syncError) {
            log('error', '同步修复后的数据失败:', syncError);
          }
        } else {
          log('warn', '网络未连接，暂时仅保存在本地');
        }
      }
      
      // 触发更新事件
      uni.$emit('playlists_fixed', {
        userId,
        count: fixedPlaylists.length,
        timestamp: new Date().getTime()
      });
      
      return {
        success: true,
        message: `播放列表数据已修复，共 ${fixedPlaylists.length} 个列表`,
        fixed: needFix,
        count: fixedPlaylists.length
      };
    } else {
      log('info', '播放列表数据格式正确，无需修复');
      return {
        success: true,
        message: '播放列表数据格式正确',
        fixed: false,
        count: playlists.length
      };
    }
  } catch (error) {
    log('error', '修复播放列表数据出错:', error);
    return {
      success: false,
      message: error.message || '修复播放列表数据出错',
      error
    };
  }
}; 
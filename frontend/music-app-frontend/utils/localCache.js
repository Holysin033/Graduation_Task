/**
 * 本地缓存工具
 * 用于管理收藏歌单等需要本地缓存的数据
 */

// 缓存键名
const CACHE_KEYS = {
  FAVORITE_PLAYLISTS: 'cachedFavoritePlaylists'
};

/**
 * 保存收藏歌单到本地缓存
 * @param {Array} playlists - 歌单数组
 * @returns {Boolean} - 保存结果
 */
export const saveFavoritePlaylists = (playlists) => {
  try {
    if (!Array.isArray(playlists)) {
      console.error('保存收藏歌单失败：参数必须是数组');
      return false;
    }
    
    // 格式化数据
    const formattedPlaylists = playlists.map(playlist => ({
      id: String(playlist.id || playlist.playlist_id || ''),
      playlist_id: String(playlist.playlist_id || playlist.id || ''),
      name: playlist.name || playlist.playlist_name || '未知歌单',
      playlist_name: playlist.playlist_name || playlist.name || '未知歌单',
      description: playlist.description || '',
      cover: playlist.cover || playlist.coverImgUrl || '',
      coverImgUrl: playlist.cover || playlist.coverImgUrl || '',
      creator_name: typeof playlist.creator === 'object' ? 
                    (playlist.creator.nickname || '') : 
                    (playlist.creator_name || playlist.creator || ''),
      play_count: playlist.playCount || playlist.play_count || 0,
      created_at: playlist.created_at || new Date().toISOString()
    }));
    
    uni.setStorageSync(CACHE_KEYS.FAVORITE_PLAYLISTS, JSON.stringify(formattedPlaylists));
    console.log(`已保存${formattedPlaylists.length}个收藏歌单到本地缓存`);
    return true;
  } catch (error) {
    console.error('保存收藏歌单到本地缓存失败：', error);
    return false;
  }
};

/**
 * 从本地缓存加载收藏歌单
 * @returns {Array} - 歌单数组
 */
export const loadFavoritePlaylists = () => {
  try {
    const cachedData = uni.getStorageSync(CACHE_KEYS.FAVORITE_PLAYLISTS);
    if (!cachedData) {
      return [];
    }
    
    const playlists = JSON.parse(cachedData);
    if (!Array.isArray(playlists)) {
      console.error('缓存中的收藏歌单数据格式不正确');
      return [];
    }
    
    console.log(`从本地缓存加载了${playlists.length}个收藏歌单`);
    return playlists;
  } catch (error) {
    console.error('从本地缓存加载收藏歌单失败：', error);
    return [];
  }
};

/**
 * 添加歌单到收藏缓存
 * @param {Object} playlist - 要添加的歌单
 * @returns {Boolean} - 添加结果
 */
export const addFavoritePlaylist = (playlist) => {
  try {
    if (!playlist || !playlist.id) {
      console.error('添加收藏歌单失败：缺少有效的歌单数据');
      return false;
    }
    
    // 获取现有缓存
    const currentPlaylists = loadFavoritePlaylists();
    
    // 检查是否已存在
    const playlistId = String(playlist.id || playlist.playlist_id);
    const existingIndex = currentPlaylists.findIndex(item => 
      String(item.id) === playlistId || String(item.playlist_id) === playlistId
    );
    
    if (existingIndex !== -1) {
      console.log(`歌单已在收藏中：${playlistId}`);
      return true; // 已存在，视为添加成功
    }
    
    // 格式化要添加的歌单
    const formattedPlaylist = {
      id: playlistId,
      playlist_id: playlistId,
      name: playlist.name || '未知歌单',
      playlist_name: playlist.name || '未知歌单',
      description: playlist.description || '',
      cover: playlist.cover || playlist.coverImgUrl || '',
      coverImgUrl: playlist.cover || playlist.coverImgUrl || '',
      creator_name: typeof playlist.creator === 'object' ? 
                    (playlist.creator.nickname || '') : 
                    (playlist.creator_name || playlist.creator || ''),
      play_count: playlist.playCount || playlist.play_count || 0,
      created_at: new Date().toISOString()
    };
    
    // 添加到缓存
    currentPlaylists.unshift(formattedPlaylist); // 添加到最前面
    
    // 保存更新后的缓存
    saveFavoritePlaylists(currentPlaylists);
    
    console.log(`已添加歌单"${formattedPlaylist.name}"到本地收藏`);
    return true;
  } catch (error) {
    console.error('添加收藏歌单到本地缓存失败：', error);
    return false;
  }
};

/**
 * 从收藏缓存中移除歌单
 * @param {String} playlistId - 要移除的歌单ID
 * @returns {Boolean} - 移除结果
 */
export const removeFavoritePlaylist = (playlistId) => {
  try {
    if (!playlistId) {
      console.error('移除收藏歌单失败：歌单ID为空');
      return false;
    }
    
    // 获取现有缓存
    const currentPlaylists = loadFavoritePlaylists();
    
    // 移除指定歌单
    const playlistIdStr = String(playlistId);
    const filteredPlaylists = currentPlaylists.filter(item => 
      String(item.id) !== playlistIdStr && String(item.playlist_id) !== playlistIdStr
    );
    
    if (filteredPlaylists.length === currentPlaylists.length) {
      console.log(`未找到要移除的收藏歌单：${playlistId}`);
      return false;
    }
    
    // 保存更新后的缓存
    saveFavoritePlaylists(filteredPlaylists);
    
    console.log(`已从本地收藏中移除歌单：${playlistId}`);
    return true;
  } catch (error) {
    console.error('从本地缓存移除收藏歌单失败：', error);
    return false;
  }
};

/**
 * 检查歌单是否已收藏
 * @param {String} playlistId - 歌单ID
 * @returns {Boolean} - 是否已收藏
 */
export const isPlaylistFavorited = (playlistId) => {
  try {
    const currentPlaylists = loadFavoritePlaylists();
    const playlistIdStr = String(playlistId);
    
    return currentPlaylists.some(item => 
      String(item.id) === playlistIdStr || String(item.playlist_id) === playlistIdStr
    );
  } catch (error) {
    console.error('检查歌单收藏状态失败：', error);
    return false;
  }
};

export default {
  saveFavoritePlaylists,
  loadFavoritePlaylists,
  addFavoritePlaylist,
  removeFavoritePlaylist,
  isPlaylistFavorited,
  CACHE_KEYS
}; 
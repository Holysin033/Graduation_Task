/**
 * 播放列表缓存管理工具
 * 提供统一的方法来管理播放列表缓存，确保所有歌曲都有正确的URL
 */

/**
 * 保存播放列表到缓存
 * @param {Array} playlists - 要保存的播放列表数组
 * @param {String} userId - 用户ID，可选
 */
export function savePlaylists(playlists, userId) {
  if (!Array.isArray(playlists)) {
    console.error('保存的播放列表必须是数组');
    return false;
  }
  
  try {
    // 确保所有歌曲都有URL
    const processedPlaylists = playlists.map(playlist => {
      if (!playlist) return null;
      
      // 深拷贝播放列表对象
      const newPlaylist = JSON.parse(JSON.stringify(playlist));
      
      // 处理歌曲列表
      if (newPlaylist.songs && Array.isArray(newPlaylist.songs)) {
        newPlaylist.songs = newPlaylist.songs.map(song => {
          // 确保song_id字段存在
          if (!song.song_id && song.id) {
            song.song_id = song.id;
          }
          
          // 如果没有ID则生成一个临时ID
          if (!song.id) {
            song.id = song.song_id || `local_${Date.now()}_${Math.random().toString(36).substring(2)}`;
          }
          
          // 如果没有URL则生成一个，优先使用song_id
          if (!song.url) {
            const idForUrl = song.song_id || song.id;
            song.url = `https://music.163.com/song/media/outer/url?id=${idForUrl}.mp3`;
            console.log(`为歌曲 ${song.name || '未知歌曲'} 生成URL: ${song.url}`);
          }
          
          // 确保其他必要的字段都存在
          return {
            ...song,
            name: (song.name && song.name !== '未知歌曲') ? song.name : (song.song_name || song.songName || song.title || '未知歌曲'),
            artist: song.artist || '未知歌手',
            album: song.album || '未知专辑',
            duration: song.duration || 0,
            cover: song.cover || '/static/music-cover.png'
          };
        });
      }
      
      return newPlaylist;
    }).filter(playlist => playlist !== null);
    
    // 保存到全局播放列表缓存
    uni.setStorageSync('playlists', processedPlaylists);
    console.log('全局播放列表已保存，数量:', processedPlaylists.length);
    
    // 如果有用户ID，也保存到用户特定的缓存中
    if (userId) {
      const userKey = `user_${userId}_playlists`;
      uni.setStorageSync(userKey, processedPlaylists);
      console.log(`用户 ${userId} 的播放列表已保存，数量:`, processedPlaylists.length);
    }
    
    return true;
  } catch (error) {
    console.error('保存播放列表失败:', error);
    return false;
  }
}

/**
 * 从缓存中获取播放列表
 * @param {String} userId - 用户ID，可选
 * @returns {Array} 播放列表数组
 */
export function getPlaylists(userId) {
  try {
    let playlists = [];
    
    // 如果有用户ID，先尝试获取用户特定的缓存
    if (userId) {
      const userKey = `user_${userId}_playlists`;
      const userPlaylists = uni.getStorageSync(userKey);
      
      if (userPlaylists) {
        if (typeof userPlaylists === 'string') {
          try {
            playlists = JSON.parse(userPlaylists);
          } catch (e) {
            console.warn(`解析用户 ${userId} 的播放列表失败:`, e);
          }
        } else if (Array.isArray(userPlaylists)) {
          playlists = userPlaylists;
        }
      }
    }
    
    // 如果没有获取到用户特定的缓存，或没有提供用户ID，尝试获取全局缓存
    if (playlists.length === 0) {
      const globalPlaylists = uni.getStorageSync('playlists');
      
      if (globalPlaylists) {
        if (typeof globalPlaylists === 'string') {
          try {
            playlists = JSON.parse(globalPlaylists);
          } catch (e) {
            console.warn('解析全局播放列表失败:', e);
          }
        } else if (Array.isArray(globalPlaylists)) {
          playlists = globalPlaylists;
        }
      }
    }
    
    // 确保返回的是数组
    if (!Array.isArray(playlists)) {
      console.warn('获取到的播放列表不是数组，重置为空数组');
      playlists = [];
    }
    
    // 确保所有歌曲都有URL
    playlists = playlists.map(playlist => {
      if (!playlist) return null;
      
      // 处理歌曲列表
      if (playlist.songs && Array.isArray(playlist.songs)) {
        playlist.songs = playlist.songs.map(song => {
          // 确保song_id字段存在
          if (!song.song_id && song.id) {
            song.song_id = song.id;
          }
          
          // 如果没有URL则生成一个，优先使用song_id
          if (!song.url) {
            const idForUrl = song.song_id || song.id;
            song.url = `https://music.163.com/song/media/outer/url?id=${idForUrl}.mp3`;
          }
          
          return song;
        });
      }
      
      return playlist;
    }).filter(playlist => playlist !== null);
    
    console.log('获取到播放列表，数量:', playlists.length);
    return playlists;
  } catch (error) {
    console.error('获取播放列表失败:', error);
    return [];
  }
}

/**
 * 获取指定ID的播放列表
 * @param {String|Number} playlistId - 播放列表ID
 * @param {String} userId - 用户ID，可选
 * @returns {Object|null} 播放列表对象或null
 */
export function getPlaylistById(playlistId, userId) {
  if (!playlistId) {
    console.error('获取播放列表需要提供ID');
    return null;
  }
  
  // 获取所有播放列表
  const playlists = getPlaylists(userId);
  
  // 查找匹配ID的播放列表，同时检查id和playlist_id字段
  const playlist = playlists.find(list => 
    list && (
      list.id == playlistId || 
      list.playlist_id == playlistId
    )
  );
  
  if (playlist) {
    console.log(`找到ID为 ${playlistId} 的播放列表`);
    return playlist;
  } else {
    console.warn(`未找到ID为 ${playlistId} 的播放列表`);
    return null;
  }
}

/**
 * 将歌曲添加到播放列表
 * @param {String|Number} playlistId - 播放列表ID
 * @param {Object|Array} songs - 要添加的歌曲或歌曲数组
 * @param {String} userId - 用户ID，可选
 * @returns {Boolean} 是否添加成功
 */
export function addSongsToPlaylist(playlistId, songs, userId) {
  if (!playlistId) {
    console.error('添加歌曲需要提供播放列表ID');
    return false;
  }
  
  // 如果songs是单个歌曲，包装为数组
  const songsToAdd = Array.isArray(songs) ? songs : [songs];
  
  if (songsToAdd.length === 0) {
    console.warn('没有要添加的歌曲');
    return false;
  }
  
  try {
    // 获取所有播放列表
    const playlists = getPlaylists(userId);
    
    // 查找要添加歌曲的播放列表索引
    const playlistIndex = playlists.findIndex(list => list && (list.id == playlistId || list.playlist_id == playlistId));
    
    if (playlistIndex === -1) {
      console.error(`未找到ID为 ${playlistId} 的播放列表`);
      return false;
    }
    
    // 确保播放列表有songs数组
    if (!playlists[playlistIndex].songs) {
      playlists[playlistIndex].songs = [];
    }
    
    // 处理要添加的歌曲，确保所有必要的字段都存在
    const processedSongs = songsToAdd.map(song => {
      console.log('添加歌曲原始数据:', JSON.stringify(song));
      
      // 支持所有可能的字段名，优先使用song_id
      const songId = song.id || `local_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      const song_id = song.song_id || song.songId || song.netease_id || songId;
      const songName = (song.name && song.name !== '未知歌曲') ? song.name : (song.song_name || song.songName || song.title || '未知歌曲');
      const songArtist = song.artist || song.singer || song.artistName || song.artists || '未知歌手';
      
      // 确保有URL，优先使用song_id
      const songUrl = song.url || song.mp3Url || song.mp3_url || `https://music.163.com/song/media/outer/url?id=${song_id || songId}.mp3`;
      
      const processedSong = {
        id: songId,
        song_id: song_id,  // 保证song_id字段存在
        name: songName,
        song_name: songName,  // 同时保存两种命名，增强兼容性
        artist: songArtist,
        album: song.album || song.albumName || '未知专辑',
        duration: song.duration || 0,
        cover: song.cover || song.coverUrl || song.cover_url || '/static/music-cover.png',
        url: songUrl
      };
      
      console.log('处理后的歌曲数据:', JSON.stringify(processedSong));
      return processedSong;
    });
    
    // 添加歌曲到播放列表
    playlists[playlistIndex].songs.push(...processedSongs);
    
    // 更新播放列表的歌曲数量
    playlists[playlistIndex].songCount = playlists[playlistIndex].songs.length;
    
    // 保存更新后的播放列表
    savePlaylists(playlists, userId);
    
    console.log(`成功添加 ${processedSongs.length} 首歌曲到播放列表 ${playlistId}`);
    return true;
  } catch (error) {
    console.error('添加歌曲到播放列表失败:', error);
    return false;
  }
}

/**
 * 创建新的播放列表
 * @param {Object} playlistInfo - 播放列表信息
 * @param {String} userId - 用户ID，可选
 * @returns {String|Number|null} 新创建的播放列表ID，失败则返回null
 */
export function createPlaylist(playlistInfo, userId) {
  if (!playlistInfo || typeof playlistInfo !== 'object') {
    console.error('创建播放列表需要提供播放列表信息对象');
    return null;
  }
  
  try {
    // 获取现有播放列表
    const playlists = getPlaylists(userId);
    
    // 生成新的播放列表ID
    const newId = playlistInfo.id || `local_${Date.now()}`;
    
    // 创建新的播放列表对象
    const newPlaylist = {
      id: newId,
      name: playlistInfo.name || '新建播放列表',
      description: playlistInfo.description || '',
      cover: playlistInfo.cover || '/static/default-playlist.png',
      songs: [],
      songCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // 添加到播放列表数组
    playlists.unshift(newPlaylist);
    
    // 保存更新后的播放列表
    savePlaylists(playlists, userId);
    
    console.log(`成功创建播放列表: ${newPlaylist.name}, ID: ${newId}`);
    return newId;
  } catch (error) {
    console.error('创建播放列表失败:', error);
    return null;
  }
}

/**
 * 删除播放列表
 * @param {String|Number} playlistId - 要删除的播放列表ID
 * @param {String} userId - 用户ID，可选
 * @returns {Boolean} 是否删除成功
 */
export function deletePlaylist(playlistId, userId) {
  if (!playlistId) {
    console.error('删除播放列表需要提供ID');
    return false;
  }
  
  try {
    // 获取现有播放列表
    const playlists = getPlaylists(userId);
    
    // 过滤掉要删除的播放列表
    const filteredPlaylists = playlists.filter(list => list && list.id != playlistId && list.playlist_id != playlistId);
    
    // 如果长度相同，说明没有找到要删除的播放列表
    if (filteredPlaylists.length === playlists.length) {
      console.warn(`未找到ID为 ${playlistId} 的播放列表`);
      return false;
    }
    
    // 保存更新后的播放列表
    savePlaylists(filteredPlaylists, userId);
    
    console.log(`成功删除播放列表 ID: ${playlistId}`);
    return true;
  } catch (error) {
    console.error('删除播放列表失败:', error);
    return false;
  }
}

/**
 * 从服务器和本地完全删除用户创建的歌单
 * @param {String|Number} playlistId - 要删除的播放列表ID
 * @param {String} userId - 用户ID，必需
 * @returns {Promise<Object>} 删除结果
 */
export async function permanentlyDeletePlaylist(playlistId, userId) {
  if (!playlistId) {
    console.error('删除播放列表需要提供ID');
    return {
      success: false,
      message: '缺少歌单ID'
    };
  }
  
  if (!userId) {
    console.error('删除播放列表需要提供用户ID');
    return {
      success: false,
      message: '请先登录'
    };
  }
  
  try {
    console.log(`准备永久删除歌单: ID=${playlistId}, 用户ID=${userId}`);
    
    // 1. 首先从本地缓存删除
    const localSuccess = deletePlaylist(playlistId, userId);
    
    if (!localSuccess) {
      console.warn(`本地未找到ID为 ${playlistId} 的播放列表，继续尝试删除服务器数据`);
    } else {
      console.log('从本地缓存成功删除歌单');
    }
    
    // 2. 尝试从后端服务器删除
    try {
      // 导入API配置
      const apiConfig = require('./apiConfig.js').default;
      // 导入请求工具
      const request = require('./request.js').default;
      
      // 构建API请求URL - 正确使用apiConfig
      const baseUrl = apiConfig.playlist.baseUrl;
      const endpoint = apiConfig.playlist.delete(userId, playlistId);
      const url = `${baseUrl}${endpoint}`;
      
      console.log('删除歌单API URL:', url);
      
      // 使用封装好的request函数发送请求
      const response = await request(url, 'DELETE', { userId });
      
      if (response.code === 200) {
        console.log('成功从服务器删除歌单');
        
        // 如果本地删除失败但服务器成功，再次尝试本地删除
        if (!localSuccess) {
          deletePlaylist(playlistId, userId);
        }
        
        return {
          success: true,
          message: '歌单已永久删除'
        };
      } else {
        // 服务器删除失败，但本地成功则仍视为部分成功
        console.error('从服务器删除歌单失败:', response);
        
        if (localSuccess) {
          return {
            success: true,
            message: '歌单已从本地删除，但服务器删除失败',
            partialSuccess: true
          };
        } else {
          throw new Error(response.message || '服务器删除失败');
        }
      }
    } catch (apiError) {
      console.error('从服务器删除歌单失败:', apiError);
      
      // 如果本地删除成功但API调用失败，仍视为部分成功
      if (localSuccess) {
        return {
          success: true,
          message: '歌单已从本地删除，但服务器通信失败',
          partialSuccess: true
        };
      } else {
        throw apiError; // 本地和服务器都失败，继续往外抛出错误
      }
    }
  } catch (error) {
    console.error('永久删除歌单失败:', error);
    return {
      success: false,
      message: error.message || '删除歌单失败，请重试'
    };
  }
} 
const favoritesModel = require('../models/favoritesModel');
const historyModel = require('../models/historyModel');
const songModel = require('../models/songModel');
const playlistModel = require('../models/playlistModel');
const favoritePlaylistModel = require('../models/favoritePlaylistModel');

class SyncService {
  // 同步收藏数据
  async syncFavorites(userId, localFavorites) {
    try {
      console.log('开始同步收藏数据');
      
      // 确保userId是数字
      userId = parseInt(userId);
      if (isNaN(userId) || userId <= 0) {
        throw new Error('无效的用户ID');
      }
      
      // 获取数据库中的收藏记录
      const dbFavorites = await favoritesModel.getUserFavorites(userId);
      const dbSongIds = dbFavorites.map(fav => fav.song_id);
      
      // 检查本地收藏是否存在于数据库中
      const localSongIds = localFavorites.map(fav => fav.songId || fav.song_id || fav.id);
      
      // 需要添加到数据库的新收藏
      const toAdd = localFavorites.filter(fav => !dbSongIds.includes(fav.songId || fav.song_id || fav.id));
      
      // 需要从本地删除的收藏（数据库已删除）
      const toRemove = dbSongIds.filter(id => !localSongIds.includes(id));
      
      // 同步到数据库
      let addResult = { added: 0 };
      if (toAdd.length > 0) {
        // 格式化数据，确保所有必要字段都存在
        const formattedSongs = toAdd.map(fav => ({
          song_id: fav.songId || fav.song_id || fav.id, // 明确设置song_id字段
          id: fav.songId || fav.song_id || fav.id, // 保留id字段用于兼容性
          name: fav.songName || fav.song_name || fav.name || '',
          artist: fav.artist || '',
          album: fav.album || '',
          duration: fav.duration || 0,
          cover: fav.cover || fav.coverUrl || '',
          url: fav.url || '',
          added_at: fav.createdAt || fav.created_at || new Date()
        }));
        
        addResult = await favoritesModel.addFavoritesBatch(userId, formattedSongs);
      }
      
      // 返回同步结果和需要更新的本地数据
      return {
        added: addResult.added,
        removed: toRemove.length,
        favorites: dbFavorites
      };
    } catch (error) {
      console.error('同步收藏数据失败:', error);
      throw error;
    }
  }

  // 同步收藏歌单
  async syncFavoritePlaylists(userId, localFavoritePlaylists) {
    try {
      console.log('开始同步收藏歌单');
      
      // 确保userId是数字
      userId = parseInt(userId);
      if (isNaN(userId) || userId <= 0) {
        throw new Error('无效的用户ID');
      }
      
      // 验证歌单数据
      if (!Array.isArray(localFavoritePlaylists)) {
        console.warn('本地收藏歌单数据不是数组:', localFavoritePlaylists);
        localFavoritePlaylists = [];
      }
      
      console.log(`用户(${userId})本地收藏歌单数量: ${localFavoritePlaylists.length}`);
      if (localFavoritePlaylists.length > 0) {
        console.log('第一个歌单数据示例:', JSON.stringify(localFavoritePlaylists[0]));
      }
      
      // 获取数据库中的收藏歌单记录
      const dbFavoritePlaylists = await favoritePlaylistModel.getUserFavoritePlaylists(userId);
      console.log(`数据库中收藏歌单数量: ${dbFavoritePlaylists.length}`);
      
      // 将数据库中的歌单ID全部转为字符串，避免字符串和数字比较的问题
      const dbPlaylistIds = dbFavoritePlaylists.map(fav => String(fav.playlist_id || ''));
      console.log('数据库中的歌单ID:', dbPlaylistIds);
      
      // 检查本地收藏歌单是否存在于数据库中 - 兼容多种可能的ID字段名
      const localPlaylistIds = [];
      const localIdMap = {};
      
      // 先收集所有有效的本地ID
      localFavoritePlaylists.forEach(fav => {
        // 确保获取到ID，尝试多种可能的字段
        const id = String(fav.playlistId || fav.playlist_id || fav.id || '').trim();
        if (id) {
          localPlaylistIds.push(id);
          // 保存原始对象到map，用于后续查找
          localIdMap[id] = fav;
        } else {
          console.warn('发现无ID的歌单数据:', fav);
        }
      });
      
      console.log(`本地有效歌单ID数量: ${localPlaylistIds.length}`);
      console.log('本地歌单ID:', localPlaylistIds);
      
      // 需要添加到数据库的新收藏歌单
      const toAdd = [];
      for (const id of localPlaylistIds) {
        // 检查数据库中是否已存在此ID
        if (!dbPlaylistIds.includes(id)) {
          // 获取对应的原始对象
          toAdd.push(localIdMap[id]);
        }
      }
      
      console.log(`需要添加到数据库的歌单数量: ${toAdd.length}`);
      
      // 需要从本地删除的收藏歌单（数据库已删除）- 用于返回信息，不实际删除
      const toRemove = dbPlaylistIds.filter(id => !localPlaylistIds.includes(id));
      
      console.log(`需要从本地删除的歌单数量: ${toRemove.length}`);
      
      // 同步到数据库
      let addResult = { added: 0 };
      if (toAdd.length > 0) {
        // 格式化数据，确保所有必要字段都存在
        const formattedPlaylists = toAdd.map(fav => {
          // 获取ID，优先使用playlist_id
          const playlistId = String(fav.playlistId || fav.playlist_id || fav.id || '').trim();
          
          // 获取歌单名称，支持多种可能的字段名
          const playlistName = fav.playlistName || fav.playlist_name || fav.name || '未知歌单';
          
          // 获取封面图片，支持多种可能的字段名
          const cover = fav.cover || fav.coverUrl || fav.coverImgUrl || '';
          
          // 获取创建者信息，支持多种可能的字段名和格式
          let creatorName = '';
          if (fav.creatorName || fav.creator_name) {
            creatorName = fav.creatorName || fav.creator_name;
          } else if (fav.creator) {
            if (typeof fav.creator === 'string') {
              creatorName = fav.creator;
            } else if (typeof fav.creator === 'object') {
              creatorName = fav.creator.nickname || fav.creator.name || '';
            }
          }
          
          return {
            playlist_id: playlistId,
            id: playlistId, // 保留id字段用于兼容性
            playlist_name: playlistName,
            name: playlistName, // 添加name字段用于兼容性
          description: fav.description || '',
            cover: cover,
            coverImgUrl: cover, // 添加coverImgUrl字段用于兼容性
            creator_name: creatorName,
            created_at: fav.createdAt || fav.created_at || new Date(),
            playCount: fav.playCount || 0 // 添加playCount字段
          };
        });
        
        console.log('处理后的歌单数据示例:', formattedPlaylists.length > 0 ? JSON.stringify(formattedPlaylists[0]) : {});
        
        // 避免批量操作可能的问题，逐个添加
        for (const playlist of formattedPlaylists) {
          try {
            const insertId = await favoritePlaylistModel.addFavoritePlaylist(userId, playlist);
            if (insertId) {
              addResult.added++;
              console.log(`成功添加歌单: ${playlist.name} (ID: ${playlist.playlist_id})`);
            }
          } catch (insertError) {
            console.error(`添加歌单失败: ${playlist.name}`, insertError);
          }
        }
        
        console.log(`成功添加${addResult.added}个歌单`);
      }
      
      // 重新获取数据库中的最新收藏歌单列表
      const updatedFavoritePlaylists = await favoritePlaylistModel.getUserFavoritePlaylists(userId);
      console.log(`更新后数据库中有${updatedFavoritePlaylists.length}个收藏歌单`);
      
      // 返回同步结果和需要更新的本地数据
      return {
        added: addResult.added,
        removed: toRemove.length,
        total: updatedFavoritePlaylists.length,
        favoritePlaylists: updatedFavoritePlaylists
      };
    } catch (error) {
      console.error('同步收藏歌单失败:', error);
      throw error;
    }
  }

  // 同步播放历史
  async syncPlayHistory(userId, localHistory) {
    try {
      console.log('开始同步播放历史');
      
      // 确保userId是数字
      userId = parseInt(userId);
      if (isNaN(userId) || userId <= 0) {
        throw new Error('无效的用户ID');
      }
      
      // 获取数据库中的播放历史
      const dbHistory = await historyModel.getUserHistory(userId, 1000);
      
      // 获取数据库中已有的播放记录ID
      const dbPlayIds = dbHistory.map(item => `${item.song_id}_${new Date(item.play_time).getTime()}`);
      
      // 过滤出需要添加到数据库的新记录
      const toAdd = localHistory.filter(item => {
        const itemId = item.songId || item.song_id || item.id;
        const itemTime = item.playTime || item.play_time || new Date();
        const recordId = `${itemId}_${new Date(itemTime).getTime()}`;
        return !dbPlayIds.includes(recordId);
      });
      
      // 添加新记录到数据库
      let addResult = { added: 0 };
      if (toAdd.length > 0) {
        // 格式化数据，确保所有必要字段都存在
        const formattedHistory = toAdd.map(item => ({
          song_id: item.songId || item.song_id || item.id, // 明确设置song_id字段
          id: item.songId || item.song_id || item.id, // 保留id字段用于兼容性
          name: item.songName || item.song_name || item.name || '',
          artist: item.artist || '',
          album: item.album || '',
          duration: item.duration || 0,
          cover: item.cover || item.coverUrl || '',
          play_time: item.playTime || item.play_time || new Date()
        }));
        
        addResult = await historyModel.addHistoryBatch(userId, formattedHistory);
      }
      
      // 获取最新的播放历史
      const updatedHistory = await historyModel.getUserHistory(userId);
      
      return {
        added: addResult.added,
        history: updatedHistory
      };
    } catch (error) {
      console.error('同步播放历史失败:', error);
      throw error;
    }
  }

  /**
   * 同步用户歌单
   * @param {Object} data - 包含userId和localPlaylists的对象
   * @returns {Promise<Object>} - 同步结果
   */
  async syncPlaylists(data) {
    try {
      // 验证输入数据
      if (!data || typeof data !== 'object') {
        console.error('同步歌单失败: 无效的输入数据');
        throw new Error('无效的输入数据格式');
      }

      const { userId, localPlaylists } = data;

      // 验证userId
      if (!userId || isNaN(Number(userId))) {
        console.error('同步歌单失败: 无效的用户ID');
        throw new Error('无效的用户ID');
      }

      // 验证localPlaylists
      if (!localPlaylists || !Array.isArray(localPlaylists)) {
        console.error('同步歌单失败: 无效的歌单数据格式');
        throw new Error('无效的歌单数据格式，期望接收歌单数组');
      }

      console.log(`开始同步用户(ID: ${userId})的 ${localPlaylists.length} 个歌单`);

      // 获取用户现有歌单
      const existingPlaylists = await playlistModel.getUserPlaylists(userId);
      console.log(`用户现有 ${existingPlaylists.length} 个歌单`);

      // 同步结果
      const result = {
        added: [],
        updated: [],
        unchanged: [],
        error: []
      };

      // 处理每个本地歌单
      for (const playlist of localPlaylists) {
        try {
          // 验证歌单名称
          if (!playlist.name) {
            console.warn('跳过没有名称的歌单');
            result.error.push({ playlist: playlist, error: '歌单缺少名称' });
            continue;
          }

          console.log(`处理歌单: ${playlist.name}`);

          // 处理歌单中的歌曲
          let processedSongs = [];
          if (playlist.songs && Array.isArray(playlist.songs) && playlist.songs.length > 0) {
            console.log(`处理歌单 "${playlist.name}" 中的 ${playlist.songs.length} 首歌曲`);
            processedSongs = await this.checkAndAddSongs(playlist.songs);
          } else {
            console.log(`歌单 "${playlist.name}" 没有歌曲`);
          }

          // 查找是否存在同名歌单
          const existingPlaylist = existingPlaylists.find(p => 
            p.name === playlist.name && p.user_id === Number(userId)
          );

          if (existingPlaylist) {
            // 更新现有歌单
            console.log(`更新现有歌单: "${playlist.name}" (ID: ${existingPlaylist.id})`);
            
            // 更新歌单信息
            const updateData = {
              name: playlist.name,
              description: playlist.description || existingPlaylist.description || '',
              cover_url: playlist.cover_url || playlist.coverUrl || existingPlaylist.cover_url || '',
              updated_at: new Date()
            };
            
            await playlistModel.updatePlaylist(existingPlaylist.id, updateData);
            
            // 同步歌单曲目
            if (processedSongs.length > 0) {
              await playlistModel.syncPlaylistSongs(existingPlaylist.id, processedSongs.map(song => song.id));
              console.log(`为歌单 "${playlist.name}" 同步了 ${processedSongs.length} 首歌曲`);
            }
            
            result.updated.push({
              id: existingPlaylist.id,
              name: playlist.name,
              songsCount: processedSongs.length
            });
          } else {
            // 创建新歌单
            console.log(`创建新歌单: "${playlist.name}"`);
            
            const newPlaylistData = {
              user_id: userId,
              name: playlist.name,
              description: playlist.description || '',
              cover_url: playlist.cover_url || playlist.coverUrl || '',
              created_at: new Date(),
              updated_at: new Date()
            };
            
            const newPlaylistId = await playlistModel.createPlaylist(newPlaylistData);
            
            // 同步歌单曲目
            if (processedSongs.length > 0) {
              await playlistModel.syncPlaylistSongs(newPlaylistId, processedSongs.map(song => song.id));
              console.log(`为新歌单 "${playlist.name}" 添加了 ${processedSongs.length} 首歌曲`);
            }
            
            result.added.push({
              id: newPlaylistId,
              name: playlist.name,
              songsCount: processedSongs.length
            });
          }
        } catch (playlistError) {
          console.error(`处理歌单 "${playlist.name || '未知歌单'}" 时出错:`, playlistError);
          result.error.push({ playlist: playlist, error: playlistError.message });
        }
      }

      console.log('歌单同步完成，结果:', {
        added: result.added.length,
        updated: result.updated.length,
        unchanged: result.unchanged.length,
        error: result.error.length
      });

      return {
        success: true,
        message: '歌单同步完成',
        data: {
          added: result.added.length,
          updated: result.updated.length,
          error: result.error.length,
          addedPlaylists: result.added,
          updatedPlaylists: result.updated,
          errorPlaylists: result.error.map(e => ({
            name: e.playlist.name || '未知歌单',
            error: e.error
          }))
        }
      };
    } catch (error) {
      console.error('同步歌单时出错:', error);
      throw error;
    }
  }

  /**
   * 检查并添加歌曲到数据库
   * @param {Array} songs - 要检查和添加的歌曲数组
   * @returns {Promise<Array>} - 处理后的歌曲数组（包含数据库ID）
   */
  async checkAndAddSongs(songs) {
    try {
      // 检查输入是否有效
      if (!songs || !Array.isArray(songs) || songs.length === 0) {
        console.log('无歌曲数据需要处理');
        return [];
      }
      
      console.log(`处理 ${songs.length} 首歌曲`);
      const processedSongs = [];
      
      for (const song of songs) {
        try {
          // 尝试从多个可能的字段中获取歌曲ID
          let songId = null;
          if (song.neteaseId) songId = song.neteaseId;
          else if (song.id) songId = song.id;
          else if (song.songId) songId = song.songId;
          
          // 如果没有ID，记录警告并跳过
          if (!songId) {
            console.warn('跳过没有ID的歌曲:', song.name || '未知歌曲');
            continue;
          }
          
          // 检查歌曲是否已存在
          const existingSong = await songModel.getSongByNeteaseId(songId);
          
          if (existingSong) {
            // 更新现有歌曲信息
            const updateData = {
              name: song.name || existingSong.name,
              artist: song.artist || existingSong.artist,
              album: song.album || existingSong.album,
              duration: song.duration || existingSong.duration,
              cover_url: song.cover_url || existingSong.cover_url,
              url: song.url || existingSong.url,
              lyrics: song.lyrics || existingSong.lyrics,
              play_count: song.play_count || existingSong.play_count,
              updated_at: new Date()
            };
            
            await songModel.updateSong(existingSong.id, updateData);
            console.log(`更新歌曲: ${song.name || existingSong.name} (ID: ${existingSong.id})`);
            
            processedSongs.push({
              id: existingSong.id,
              neteaseId: songId,
              name: song.name || existingSong.name,
              status: 'updated'
            });
          } else {
            // 添加新歌曲
            const songData = {
              netease_id: songId,
              name: song.name || '未知歌曲',
              artist: song.artist || '未知艺术家',
              album: song.album || '未知专辑',
              duration: song.duration || 0,
              cover_url: song.cover_url || '',
              url: song.url || '',
              lyrics: song.lyrics || '',
              play_count: song.play_count || 0
            };
            
            const newSongId = await songModel.addSong(songData);
            console.log(`添加新歌曲: ${song.name || '未知歌曲'} (ID: ${newSongId})`);
            
            processedSongs.push({
              id: newSongId,
              neteaseId: songId,
              name: song.name || '未知歌曲',
              status: 'added'
            });
          }
        } catch (songError) {
          console.error(`处理歌曲时出错: ${song.name || '未知歌曲'}`, songError);
        }
      }
      
      console.log(`完成处理 ${processedSongs.length} 首歌曲`);
      return processedSongs;
    } catch (error) {
      console.error('检查和添加歌曲时出错:', error);
      return [];
    }
  }

  // 完整同步用户数据
  async syncAllUserData(userId, userData) {
    try {
      console.log('开始全量同步用户数据, userId:', userId);
      
      const results = {};
      
      // 确保userId是数字
      userId = parseInt(userId, 10);
      if (isNaN(userId) || userId <= 0) {
        throw new Error('无效的用户ID');
      }
      
      // 处理数据可能在data字段中的情况
      const syncData = userData.data || userData;
      
      // 1. 同步歌曲信息
      if (syncData.songs && Array.isArray(syncData.songs) && syncData.songs.length > 0) {
        console.log(`同步歌曲数据: ${syncData.songs.length} 首歌曲`);
        results.songs = await this.checkAndAddSongs(syncData.songs);
      } else {
        console.log('没有歌曲数据需要同步');
      }
      
      // 2. 同步收藏歌曲信息
      if (syncData.favorites && Array.isArray(syncData.favorites) && syncData.favorites.length > 0) {
        console.log(`同步收藏数据: ${syncData.favorites.length} 条记录`);
        
        // 确保每条记录都有song_id字段
        const formattedFavorites = syncData.favorites.map(fav => {
          const songId = fav.songId || fav.song_id || fav.id;
          return {
            ...fav,
            song_id: songId,
            id: songId
          };
        }).filter(fav => fav.song_id); // 过滤掉没有song_id的记录
        
        try {
          results.favorites = await this.syncFavorites(userId, formattedFavorites);
        } catch (error) {
          console.error('收藏同步失败:', error);
          results.favorites = { error: error.message };
        }
      } else {
        console.log('没有收藏数据需要同步');
        // 仍然获取现有收藏，以便返回给前端
        const dbFavorites = await favoritesModel.getUserFavorites(userId);
        results.favorites = { added: 0, removed: 0, favorites: dbFavorites };
      }
      
      // 3. 同步收藏歌单信息
      if (syncData.favoritePlaylists && Array.isArray(syncData.favoritePlaylists) && syncData.favoritePlaylists.length > 0) {
        console.log(`同步收藏歌单: ${syncData.favoritePlaylists.length} 条记录`);
        
        // 确保每条记录都有playlist_id字段
        const formattedFavoritePlaylists = syncData.favoritePlaylists.map(fav => {
          const playlistId = fav.playlistId || fav.playlist_id || fav.id;
          return {
            ...fav,
            playlist_id: playlistId,
            id: playlistId
          };
        }).filter(fav => fav.playlist_id); // 过滤掉没有playlist_id的记录
        
        try {
          results.favoritePlaylists = await this.syncFavoritePlaylists(userId, formattedFavoritePlaylists);
        } catch (error) {
          console.error('收藏歌单同步失败:', error);
          results.favoritePlaylists = { error: error.message };
        }
      } else {
        console.log('没有收藏歌单数据需要同步');
        // 仍然获取现有收藏歌单，以便返回给前端
        const dbFavoritePlaylists = await favoritePlaylistModel.getUserFavoritePlaylists(userId);
        results.favoritePlaylists = { added: 0, removed: 0, favoritePlaylists: dbFavoritePlaylists };
      }
      
      // 4. 同步播放历史
      if (syncData.playHistory && Array.isArray(syncData.playHistory) && syncData.playHistory.length > 0) {
        console.log(`同步播放历史: ${syncData.playHistory.length} 条记录`);
        
        // 确保每条记录都有song_id字段
        const formattedHistory = syncData.playHistory.map(item => {
          const songId = item.songId || item.song_id || item.id;
          const playTime = item.playTime || item.play_time || item.played_at || new Date();
          
          return {
            ...item,
            song_id: songId,
            id: songId,
            play_time: playTime
          };
        }).filter(item => item.song_id); // 过滤掉没有song_id的记录
        
        try {
          results.playHistory = await this.syncPlayHistory(userId, formattedHistory);
        } catch (error) {
          console.error('播放历史同步失败:', error);
          results.playHistory = { error: error.message };
        }
      } else {
        console.log('没有播放历史需要同步');
        // 仍然获取现有播放历史，以便返回给前端
        const dbHistory = await historyModel.getUserHistory(userId);
        results.playHistory = { added: 0, history: dbHistory };
      }
      
      // 5. 同步歌单
      if (syncData.playlists && Array.isArray(syncData.playlists) && syncData.playlists.length > 0) {
        console.log(`同步歌单: ${syncData.playlists.length} 个歌单`);
        
        try {
          results.playlists = await this.syncPlaylists(syncData.playlists);
        } catch (error) {
          console.error('歌单同步失败:', error);
          results.playlists = { error: error.message };
        }
      } else {
        console.log('没有歌单需要同步');
        // 仍然获取现有歌单，以便返回给前端
        const dbPlaylists = await playlistModel.getUserPlaylists(userId);
        results.playlists = { created: 0, updated: 0, deleted: 0, playlists: dbPlaylists };
      }
      
      console.log('数据同步完成');
      
      return {
        code: 200,
        message: '数据同步成功',
        data: results
      };
    } catch (error) {
      console.error('同步用户数据失败:', error);
      return {
        code: 500,
        message: '数据同步失败',
        error: error.message
      };
    }
  }

  // 获取用户收藏
  async getUserFavorites(userId) {
    try {
      console.log('获取用户收藏, userId:', userId);
      
      // 确保userId是数字
      userId = parseInt(userId);
      if (isNaN(userId) || userId <= 0) {
        throw new Error('无效的用户ID');
      }
      
      // 从数据库获取收藏列表
      const favorites = await favoritesModel.getUserFavorites(userId);
      
      return favorites;
    } catch (error) {
      console.error('获取用户收藏失败:', error);
      throw error;
    }
  }

  // 获取用户收藏歌单
  async getFavoritePlaylists(userId) {
    try {
      console.log('获取用户收藏歌单, userId:', userId);
      
      // 确保userId是数字
      userId = parseInt(userId);
      if (isNaN(userId) || userId <= 0) {
        throw new Error('无效的用户ID');
      }
      
      // 从数据库获取收藏歌单列表
      const favoritePlaylists = await favoritePlaylistModel.getUserFavoritePlaylists(userId);
      
      return favoritePlaylists;
    } catch (error) {
      console.error('获取用户收藏歌单失败:', error);
      throw error;
    }
  }

  // 获取用户播放历史
  async getUserHistory(userId, limit = 100) {
    try {
      console.log('获取用户播放历史, userId:', userId, 'limit:', limit);
      
      // 确保userId是数字
      userId = parseInt(userId);
      if (isNaN(userId) || userId <= 0) {
        throw new Error('无效的用户ID');
      }
      
      // 从数据库获取播放历史
      const history = await historyModel.getUserHistory(userId, limit);
      
      return history;
    } catch (error) {
      console.error('获取用户播放历史失败:', error);
      throw error;
    }
  }

  // 获取用户歌单
  async getUserPlaylists(userId) {
    try {
      console.log('获取用户歌单, userId:', userId);
      
      // 确保userId是数字
      userId = parseInt(userId);
      if (isNaN(userId) || userId <= 0) {
        throw new Error('无效的用户ID');
      }
      
      // 从数据库获取歌单列表
      const playlists = await playlistModel.getUserPlaylists(userId);
      
      return playlists;
    } catch (error) {
      console.error('获取用户歌单失败:', error);
      throw error;
    }
  }

  /**
   * 同步歌曲数据
   * @param {Object} req - 请求对象
   * @param {Object} res - 响应对象
   * @returns {Promise<void>}
   */
  async syncSongs(req, res) {
    try {
      const { userId, songs } = req.body;
      
      // 验证userId是否为有效数字
      if (!userId || isNaN(Number(userId))) {
        console.error('同步歌曲失败: 无效的用户ID');
        return res.status(400).json({
          success: false,
          message: '无效的用户ID',
          data: null
        });
      }
      
      // 验证songs是否为数组
      if (!songs || !Array.isArray(songs)) {
        console.error('同步歌曲失败: 无效的歌曲数据格式');
        return res.status(400).json({
          success: false,
          message: '无效的歌曲数据格式，期望接收歌曲数组',
          data: null
        });
      }
      
      console.log(`开始为用户ID ${userId} 同步 ${songs.length} 首歌曲`);
      
      // 处理歌曲数据
      const processedSongs = await this.checkAndAddSongs(songs);
      
      console.log(`用户ID ${userId} 成功同步 ${processedSongs.length} 首歌曲`);
      
      // 返回成功响应
      return res.status(200).json({
        success: true,
        message: `成功同步 ${processedSongs.length} 首歌曲`,
        data: {
          syncedCount: processedSongs.length,
          syncedSongs: processedSongs.map(song => ({
            id: song.id,
            name: song.name,
            artist: song.artist
          }))
        }
      });
      
    } catch (error) {
      console.error('同步歌曲时出错:', error);
      return res.status(500).json({
        success: false,
        message: '服务器处理歌曲数据时出错',
        error: error.message
      });
    }
  }
}

module.exports = new SyncService(); 
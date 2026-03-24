const { pool } = require('../config/db');

class FavoritePlaylistModel {
  // 获取用户收藏的歌单
  async getUserFavoritePlaylists(userId) {
    try {
      console.log(`获取用户 ${userId} 的收藏歌单`);
      
      // 类型转换和验证
      userId = parseInt(userId);
      if (isNaN(userId)) {
        console.error('获取收藏歌单失败: 无效的用户ID');
        return [];
      }
      
      const [rows] = await pool.query(
        'SELECT * FROM user_favorite_playlists WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      
      console.log(`找到 ${rows.length} 个收藏歌单`);
      
      // 处理返回数据 - 确保数据格式一致
      const processedRows = rows.map(row => {
        // 确保所有ID字段为字符串类型
        const playlistId = String(row.playlist_id || '');
        
        return {
          ...row,
          // 确保返回所有必要的字段
          id: playlistId,                           // 添加id字段 (与playlist_id相同)
          playlist_id: playlistId,                  // 确保playlist_id存在
          playlist_name: row.playlist_name || '未知歌单',  // 确保playlist_name存在
          name: row.playlist_name || row.name || '未知歌单',  // 添加name字段
          description: row.description || '',       // 确保description存在
          cover: row.cover || '/static/music-cover.png',  // 确保cover存在
          coverImgUrl: row.cover || '/static/music-cover.png',  // 添加coverImgUrl字段
          playCount: row.play_count || 0,           // 确保playCount存在
          creator_name: row.creator_name || '',     // 确保creator_name存在
          user_id: row.user_id                      // 确保user_id存在
        };
      });
      
      if (processedRows.length > 0) {
        console.log('第一个收藏歌单示例:', JSON.stringify(processedRows[0]));
      }
      
      return processedRows;
    } catch (error) {
      console.error('获取用户收藏歌单失败:', error);
      return []; // 返回空数组而不是抛出错误
    }
  }

  // 添加收藏歌单
  async addFavoritePlaylist(userId, playlistData) {
    try {
      // 类型转换
      userId = parseInt(userId);
      if (isNaN(userId)) {
        throw new Error('用户ID必须是数字');
      }
      
      // 获取传入的歌单ID，优先使用playlist_id，如果不存在则使用id
      const playlistId = String(playlistData.playlist_id || playlistData.id || '').trim();
      if (!playlistId) {
        throw new Error('歌单ID不能为空');
      }
      
      // 对其他字段做兼容处理
      const playlistName = playlistData.playlist_name || playlistData.name || '未知歌单';
      const description = playlistData.description || '';
      const cover = playlistData.cover || playlistData.coverImgUrl || '';
      // 获取播放量数据
      const playCount = playlistData.playCount || playlistData.play_count || 100;
      
      // 处理创建者信息
      let creatorName = '';
      if (playlistData.creator_name) {
        creatorName = playlistData.creator_name;
      } else if (playlistData.creator) {
        if (typeof playlistData.creator === 'string') {
          creatorName = playlistData.creator;
        } else if (typeof playlistData.creator === 'object' && playlistData.creator.nickname) {
          creatorName = playlistData.creator.nickname;
        }
      }
      
      const now = new Date();
      
      console.log('添加收藏歌单:', {
        userId,
        playlistId,
        playlistName,
        creatorName
      });
      
      // 检查是否已存在 - 使用精确匹配，防止类型不匹配问题
      const [existing] = await pool.query(
        'SELECT id FROM user_favorite_playlists WHERE user_id = ? AND playlist_id = ?',
        [userId, playlistId]
      );

      if (existing.length > 0) {
        console.log('歌单已收藏, 返回已存在ID:', existing[0].id);
        return existing[0].id;
      }
      
      // 插入新记录 - 使用事务确保操作的原子性
      const connection = await pool.getConnection();
      
      try {
        await connection.beginTransaction();
        
        // 尝试插入记录
        const [result] = await connection.query(
          'INSERT INTO user_favorite_playlists (user_id, playlist_id, playlist_name, description, cover, creator_name, play_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, playlistId, playlistName, description, cover, creatorName, playCount, now]
        );
        
        await connection.commit();
        
        console.log('收藏歌单成功, 新ID:', result.insertId);
        return result.insertId;
      } catch (transactionError) {
        await connection.rollback();
        console.error('添加收藏歌单事务失败:', transactionError);
        throw transactionError;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('添加收藏歌单失败:', error);
      throw error;
    }
  }

  // 批量添加收藏歌单
  async addFavoritePlaylistsBatch(userId, playlists) {
    try {
      if (!playlists || playlists.length === 0) {
        return { added: 0 };
      }

      let added = 0;
      const now = new Date();

      // 使用事务确保数据一致性
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        for (const playlist of playlists) {
          // 确保获取playlist_id，使用多种可能的字段名
          const playlistId = playlist.playlist_id || playlist.playlistId || playlist.id || '';
          
          if (!playlistId) {
            console.warn('跳过无效歌单: 缺少ID');
            continue;
          }
          
          // 检查是否已存在
          const [existing] = await connection.query(
            'SELECT id FROM user_favorite_playlists WHERE user_id = ? AND playlist_id = ?',
            [userId, playlistId]
          );

          if (existing.length === 0) {
            // 不存在则添加 - 统一处理各种可能的字段名
            const playlistName = playlist.name || playlist.playlist_name || playlist.playlistName || '未知歌单';
            const description = playlist.description || '';
            const cover = playlist.cover || playlist.coverImgUrl || playlist.coverUrl || '';
            // 获取播放量数据
            const playCount = playlist.playCount || playlist.play_count || 0;
            
            // 处理创建者信息
            let creatorName = '';
            if (playlist.creator_name || playlist.creatorName) {
              creatorName = playlist.creator_name || playlist.creatorName;
            } else if (playlist.creator) {
              if (typeof playlist.creator === 'string') {
                creatorName = playlist.creator;
              } else if (typeof playlist.creator === 'object' && playlist.creator.nickname) {
                creatorName = playlist.creator.nickname;
              }
            }
            
            const createdAt = playlist.created_at || playlist.createdAt || now;
            
            try {
              const [result] = await connection.query(
                'INSERT INTO user_favorite_playlists (user_id, playlist_id, playlist_name, description, cover, creator_name, play_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [userId, playlistId, playlistName, description, cover, creatorName, playCount, createdAt]
              );
              
              added++;
              console.log(`成功添加歌单: ${playlistName}, ID: ${playlistId}`);
            } catch (insertError) {
              // 记录具体的错误信息但继续处理其他记录
              console.error(`添加歌单失败: ${playlistId}`, insertError);
              continue;
            }
          } else {
            console.log(`歌单已存在，跳过: ${playlistId}`);
          }
        }

        await connection.commit();
        console.log(`批量添加收藏歌单完成: 成功添加${added}个`);
        return { added };
      } catch (error) {
        console.error('事务执行失败，回滚:', error);
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('批量添加收藏歌单失败:', error);
      throw error;
    }
  }

  // 删除收藏歌单
  async removeFavoritePlaylist(userId, playlistId) {
    try {
      // 参数验证
      if (!userId) {
        console.error('删除收藏歌单失败: 缺少用户ID');
        return false;
      }
      
      if (!playlistId) {
        console.error('删除收藏歌单失败: 缺少歌单ID');
        return false;
      }
      
      // 类型转换
      userId = parseInt(userId);
      playlistId = String(playlistId);
      
      if (isNaN(userId)) {
        console.error('删除收藏歌单失败: 用户ID必须是数字', { userId });
        return false;
      }
      
      console.log('开始删除收藏歌单:', { userId, playlistId });
      
      const [result] = await pool.query(
        'DELETE FROM user_favorite_playlists WHERE user_id = ? AND playlist_id = ?',
        [userId, playlistId]
      );
      
      const success = result.affectedRows > 0;
      console.log('删除收藏歌单结果:', { success, affectedRows: result.affectedRows });
      
      return success;
    } catch (error) {
      console.error('删除收藏歌单失败:', error, { userId, playlistId });
      return false;
    }
  }

  // 检查歌单是否已收藏
  async checkIsFavoritePlaylist(userId, playlistId) {
    try {
      // 参数验证
      if (!userId) {
        console.error('检查收藏状态失败: 缺少用户ID');
        return false;
      }
      
      if (!playlistId) {
        console.error('检查收藏状态失败: 缺少歌单ID');
        return false;
      }

      // 类型转换
      userId = parseInt(userId);
      playlistId = String(playlistId).trim(); // 确保playlistId是字符串且去除空白

      if (isNaN(userId)) {
        console.error('检查收藏状态失败: 用户ID必须是数字', { userId });
        return false;
      }
      
      if (!playlistId) {
        console.error('检查收藏状态失败: 歌单ID无效', { playlistId });
        return false;
      }

      console.log('检查收藏状态:', { userId, playlistId });

      // 查询数据库
      try {
        const [rows] = await pool.query(
          'SELECT id FROM user_favorite_playlists WHERE user_id = ? AND playlist_id = ?',
          [userId, playlistId]
        );

        const isFavorited = rows.length > 0;
        console.log('收藏状态检查结果:', { userId, playlistId, isFavorited });

        return isFavorited;
      } catch (dbError) {
        console.error('查询数据库失败:', dbError, { userId, playlistId });
        return false;
      }
    } catch (error) {
      console.error('检查收藏歌单状态失败:', error, { userId, playlistId });
      return false; // 发生错误时返回false而不是抛出错误
    }
  }
}

module.exports = new FavoritePlaylistModel(); 
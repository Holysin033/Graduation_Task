const { pool } = require('../config/db');

class FavoritesModel {
  // 获取用户的所有收藏
  async getUserFavorites(userId) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM user_favorite_songs WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      return rows;
    } catch (error) {
      console.error('获取用户收藏失败:', error);
      throw error;
    }
  }

  // 添加收藏
  async addFavorite(userId, songData) {
    try {
      // 类型转换
      userId = parseInt(userId);
      if (isNaN(userId)) {
        throw new Error('用户ID必须是数字');
      }
      
      const { song_id, song_name, artist, album, duration, cover, url } = songData;
      const now = new Date();
      
      // 检查是否已存在
      const [existing] = await pool.query(
        'SELECT id FROM user_favorite_songs WHERE user_id = ? AND song_id = ?',
        [userId, song_id]
      );

      if (existing.length > 0) {
        return existing[0].id;
      }
      
      const [result] = await pool.query(
        'INSERT INTO user_favorite_songs (user_id, song_id, song_name, artist, album, duration, cover, url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, song_id, song_name, artist, album || '', duration || 0, cover || '', url || '', now]
      );

      return result.insertId;
    } catch (error) {
      console.error('添加收藏失败:', error);
      throw error;
    }
  }

  // 批量添加收藏
  async addFavoritesBatch(userId, songs) {
    try {
      if (!songs || songs.length === 0) {
        return { added: 0 };
      }

      let added = 0;
      const now = new Date();

      // 使用事务确保数据一致性
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        for (const song of songs) {
          // 修复：确保获取song_id，使用多种可能的字段名
          const songId = song.song_id || song.songId || song.id || '';
          
          if (!songId) {
            continue;
          }
          
          // 检查是否已存在
          const [existing] = await connection.query(
            'SELECT id FROM user_favorite_songs WHERE user_id = ? AND song_id = ?',
            [userId, songId]
          );

          if (existing.length === 0) {
            // 不存在则添加
            const songName = song.name || song.songName || song.song_name || '';
            const artist = song.artist || song.artistName || '';
            const album = song.album || '';
            const duration = song.duration || 0;
            const cover = song.cover || song.coverUrl || '';
            const url = song.url || '';
            const createdAt = song.created_at || song.createdAt || song.added_at || now;
            
            try {
              const [result] = await connection.query(
                'INSERT INTO user_favorite_songs (user_id, song_id, song_name, artist, album, duration, cover, url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [userId, songId, songName, artist, album, duration, cover, url, createdAt]
              );
              
              added++;
            } catch (insertError) {
              // 继续处理其他记录而不回滚整个事务
              continue;
            }
          }
        }

        await connection.commit();
        return { added };
      } catch (error) {
        console.error('事务执行失败，回滚:', error);
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('批量添加收藏失败:', error);
      throw error;
    }
  }

  // 删除收藏
  async removeFavorite(userId, songId) {
    try {
      const [result] = await pool.query(
        'DELETE FROM user_favorite_songs WHERE user_id = ? AND song_id = ?',
        [userId, songId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('删除收藏失败:', error);
      throw error;
    }
  }

  // 检查歌曲是否已收藏
  async checkIsFavorite(userId, songId) {
    try {
      const [rows] = await pool.query(
        'SELECT id FROM user_favorite_songs WHERE user_id = ? AND song_id = ?',
        [userId, songId]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('检查收藏状态失败:', error);
      throw error;
    }
  }

  async addFavoriteSongs(userId, songs) {
    try {
      if (!songs || songs.length === 0) {
        return { added: 0 };
      }

      let added = 0;
      
      // 使用事务确保数据一致性
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        for (const song of songs) {
          // 修复：确保获取song_id，使用多种可能的字段名
          const songId = song.id || song.songId || song.song_id || '';
          
          if (!songId) {
            continue;
          }
          
          const songName = song.name || song.songName || song.song_name || '';
          const artist = song.artist || song.artistName || '';
          const album = song.album || '';
          const duration = song.duration || 0;
          const cover = song.cover || song.coverUrl || '';

          // 检查歌曲是否已被收藏
          const [existingSongs] = await connection.query(
            'SELECT * FROM user_favorite_songs WHERE user_id = ? AND song_id = ?',
            [userId, songId]
          );

          if (existingSongs.length === 0) {
            // 添加歌曲到收藏
            const [result] = await connection.query(
              'INSERT INTO user_favorite_songs (user_id, song_id, song_name, artist, album, duration, cover) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [userId, songId, songName, artist, album, duration, cover]
            );
            
            added++;
          }
        }

        await connection.commit();
        return { added };
      } catch (error) {
        console.error('添加收藏歌曲事务失败，回滚:', error);
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('添加收藏歌曲失败:', error);
      throw error;
    }
  }
}

module.exports = new FavoritesModel(); 
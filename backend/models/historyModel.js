const { pool } = require('../config/db');

class HistoryModel {
  // 获取用户的播放历史
  async getUserHistory(userId, limit = 100) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM play_history WHERE user_id = ? ORDER BY play_time DESC LIMIT ?',
        [userId, limit]
      );
      return rows;
    } catch (error) {
      console.error('获取用户播放历史失败:', error);
      throw error;
    }
  }

  // 添加播放记录
  async addPlayRecord(userId, songData) {
    try {
      const { song_id, song_name, artist, album, duration, cover, play_time } = songData;
      const playTime = play_time ? new Date(play_time) : new Date();

      const [result] = await pool.query(
        'INSERT INTO play_history (user_id, song_id, song_name, artist, album, duration, cover, play_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, song_id, song_name, artist, album || '', duration || 0, cover || '', playTime]
      );

      return result.insertId;
    } catch (error) {
      console.error('添加播放记录失败:', error);
      throw error;
    }
  }

  // 批量添加播放记录
  async addHistoryBatch(userId, songs) {
    try {
      console.log(`批量添加播放记录, userId: ${userId}, songs数量: ${songs.length}`);
      
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
          
          // 处理播放时间，确保是有效的日期
          let playTime;
          if (song.playTime) {
            playTime = new Date(song.playTime);
          } else if (song.play_time) {
            playTime = new Date(song.play_time);
          } else if (song.played_at) {
            playTime = new Date(song.played_at);
          } else {
            playTime = new Date();
          }
          
          // 确保playTime是有效的日期对象
          if (!(playTime instanceof Date && !isNaN(playTime))) {
            playTime = new Date();
          }
          
          try {
            // 添加播放记录
            const [result] = await connection.query(
              'INSERT INTO play_history (user_id, song_id, song_name, artist, album, duration, cover, play_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
              [userId, songId, songName, artist, album, duration, cover, playTime]
            );
            
            added++;
          } catch (insertError) {
            // 继续处理其他记录而不回滚整个事务
            continue;
          }
        }

        await connection.commit();
        console.log(`成功添加 ${added} 条播放记录`);
        return { added };
      } catch (error) {
        console.error('事务执行失败，回滚:', error);
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('批量添加播放记录失败:', error);
      throw error;
    }
  }

  // 清空播放历史
  async clearHistory(userId) {
    try {
      const [result] = await pool.query(
        'DELETE FROM play_history WHERE user_id = ?',
        [userId]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('清空播放历史失败:', error);
      throw error;
    }
  }

  async addPlayRecords(userId, records) {
    try {
      if (!records || records.length === 0) {
        return { added: 0 };
      }

      let added = 0;
      
      // 使用事务确保数据一致性
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        for (const record of records) {
          // 修复：确保获取song_id，使用多种可能的字段名
          const songId = record.id || record.songId || record.song_id || '';
          
          if (!songId) {
            continue;
          }
          
          const songName = record.name || record.songName || record.song_name || '';
          const artist = record.artist || record.artistName || '';
          const playedAt = record.playedAt || record.played_at || new Date();
          const duration = record.duration || 0;
          const cover = record.cover || record.coverUrl || '';

          // 添加播放记录
          const [result] = await connection.query(
            'INSERT INTO play_history (user_id, song_id, song_name, artist, played_at, duration, cover) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, songId, songName, artist, playedAt, duration, cover]
          );
          
          added++;
        }

        await connection.commit();
        return { added };
      } catch (error) {
        console.error('添加播放记录事务失败，回滚:', error);
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('添加播放记录失败:', error);
      throw error;
    }
  }
}

module.exports = new HistoryModel(); 
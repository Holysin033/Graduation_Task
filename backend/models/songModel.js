const { pool } = require('../config/db');

class SongModel {
  // 获取歌曲信息
  async getSongById(songId) {
    try {
      const [rows] = await pool.query('SELECT * FROM songs WHERE id = ?', [songId]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('获取歌曲信息失败:', error);
      throw error;
    }
  }

  // 根据网易云ID获取歌曲
  async getSongByNeteaseId(neteaseId) {
    try {
      const [rows] = await pool.query('SELECT * FROM songs WHERE netease_id = ?', [neteaseId]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('根据网易云ID获取歌曲失败:', error);
      throw error;
    }
  }

  // 添加歌曲
  async addSong(songData) {
    try {
      const {
        netease_id, name, artist, album, duration, cover_url, url, lyrics
      } = songData;
      
      const now = new Date();
      
      const [result] = await pool.query(
        `INSERT INTO songs (
          netease_id, name, artist, album, duration, cover_url, url, lyrics, play_count, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [netease_id, name, artist, album, duration, cover_url, url, lyrics, 0, now, now]
      );
      
      return result.insertId;
    } catch (error) {
      console.error('添加歌曲失败:', error);
      throw error;
    }
  }

  // 更新歌曲信息
  async updateSong(songId, songData) {
    try {
      const {
        name, artist, album, duration, cover_url, url, lyrics
      } = songData;
      
      const now = new Date();
      
      // 构建更新字段
      const updateFields = [];
      const values = [];
      
      if (name) {
        updateFields.push('name = ?');
        values.push(name);
      }
      
      if (artist) {
        updateFields.push('artist = ?');
        values.push(artist);
      }
      
      if (album) {
        updateFields.push('album = ?');
        values.push(album);
      }
      
      if (duration) {
        updateFields.push('duration = ?');
        values.push(duration);
      }
      
      if (cover_url) {
        updateFields.push('cover_url = ?');
        values.push(cover_url);
      }
      
      if (url) {
        updateFields.push('url = ?');
        values.push(url);
      }
      
      if (lyrics) {
        updateFields.push('lyrics = ?');
        values.push(lyrics);
      }
      
      updateFields.push('updated_at = ?');
      values.push(now);
      
      // 添加歌曲ID
      values.push(songId);
      
      if (updateFields.length <= 1) {
        return false; // 没有要更新的字段
      }
      
      const [result] = await pool.query(
        `UPDATE songs SET ${updateFields.join(', ')} WHERE id = ?`,
        values
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('更新歌曲信息失败:', error);
      throw error;
    }
  }

  // 增加播放次数
  async incrementPlayCount(songId) {
    try {
      const [result] = await pool.query(
        'UPDATE songs SET play_count = play_count + 1, updated_at = NOW() WHERE id = ?',
        [songId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('增加播放次数失败:', error);
      throw error;
    }
  }

  // 批量获取歌曲
  async getSongsByIds(songIds) {
    try {
      if (!songIds || songIds.length === 0) {
        return [];
      }
      
      const placeholders = songIds.map(() => '?').join(',');
      const [rows] = await pool.query(
        `SELECT * FROM songs WHERE id IN (${placeholders})`,
        songIds
      );
      
      return rows;
    } catch (error) {
      console.error('批量获取歌曲失败:', error);
      throw error;
    }
  }
}

module.exports = new SongModel(); 
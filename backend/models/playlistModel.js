const { pool } = require('../config/db');

class PlaylistModel {
  // 获取用户的所有歌单
  async getUserPlaylists(userId) {
    try {
      console.log('获取用户歌单, userId:', userId);
      const [rows] = await pool.query(
        'SELECT * FROM user_playlists WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      
      // 获取每个歌单的歌曲
      for (let playlist of rows) {
        playlist.songs = await this.getPlaylistSongs(playlist.id);
      }
      
      console.log(`查询到 ${rows.length} 个歌单`);
      return rows;
    } catch (error) {
      console.error('获取用户歌单失败:', error);
      throw error;
    }
  }

  // 获取歌单详情
  async getPlaylistById(playlistId) {
    try {
      console.log('获取歌单详情, playlistId:', playlistId);
      const [rows] = await pool.query(
        'SELECT * FROM user_playlists WHERE id = ?',
        [playlistId]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      const playlist = rows[0];
      
      // 获取歌单中的歌曲
      playlist.songs = await this.getPlaylistSongs(playlistId);
      
      return playlist;
    } catch (error) {
      console.error('获取歌单详情失败:', error);
      throw error;
    }
  }

  // 获取歌单中的歌曲
  async getPlaylistSongs(playlistId) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM user_playlist_songs WHERE playlist_id = ? ORDER BY added_at ASC',
        [playlistId]
      );
      return rows;
    } catch (error) {
      console.error('获取歌单歌曲失败:', error);
      throw error;
    }
  }

  // 创建新歌单
  async createPlaylist(userId, playlistData) {
    try {
      console.log('创建歌单, userId:', userId, 'playlistData:', playlistData);
      const { name, cover, description, is_default } = playlistData;
      const now = new Date();
      
      const [result] = await pool.query(
        'INSERT INTO user_playlists (user_id, name, cover, description, is_default, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, name, cover || '', description || '', is_default || 0, now, now]
      );
      
      const playlistId = result.insertId;
      console.log('歌单创建成功, id:', playlistId);
      
      // 如果提供了歌曲，添加到歌单中
      if (playlistData.songs && playlistData.songs.length > 0) {
        await this.addSongsToPlaylist(playlistId, playlistData.songs);
      }
      
      return playlistId;
    } catch (error) {
      console.error('创建歌单失败:', error);
      throw error;
    }
  }

  // 更新歌单
  async updatePlaylist(playlistId, playlistData) {
    try {
      console.log('更新歌单, playlistId:', playlistId, 'playlistData:', playlistData);
      const { name, cover, description } = playlistData;
      const now = new Date();
      
      // 更新歌单信息
      const [result] = await pool.query(
        'UPDATE user_playlists SET name = ?, cover = ?, description = ?, updated_at = ? WHERE id = ?',
        [name, cover || '', description || '', now, playlistId]
      );
      
      // 如果提供了歌曲，更新歌单歌曲
      if (playlistData.songs) {
        // 清空现有歌曲
        await pool.query('DELETE FROM user_playlist_songs WHERE playlist_id = ?', [playlistId]);
        
        // 添加新歌曲
        if (playlistData.songs.length > 0) {
          await this.addSongsToPlaylist(playlistId, playlistData.songs);
        }
      }
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('更新歌单失败:', error);
      throw error;
    }
  }

  // 删除歌单
  async deletePlaylist(playlistId) {
    try {
      console.log('删除歌单, playlistId:', playlistId);
      
      // 先删除歌单中的歌曲
      await pool.query('DELETE FROM user_playlist_songs WHERE playlist_id = ?', [playlistId]);
      
      // 再删除歌单
      const [result] = await pool.query(
        'DELETE FROM user_playlists WHERE id = ?',
        [playlistId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('删除歌单失败:', error);
      throw error;
    }
  }

  // 添加歌曲到歌单
  async addSongsToPlaylist(playlistId, songs) {
    try {
      console.log(`尝试向播放列表 ${playlistId} 添加 ${songs.length} 首歌曲`);
      console.log(`歌曲数据样例:`, JSON.stringify(songs.slice(0, 2)));
      
      if (!songs || songs.length === 0) {
        console.log('没有提供歌曲数据');
        return { added: 0 };
      }

      let added = 0;
      
      // 使用事务确保数据一致性
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        for (const song of songs) {
          console.log(`处理歌曲:`, JSON.stringify(song));
          
          // 修复：确保获取song_id，使用多种可能的字段名
          const songId = song.id || song.songId || song.song_id || '';
          console.log(`提取的songId: ${songId}`);
          
          if (!songId) {
            console.warn('跳过缺少song_id的记录:', song);
            continue;
          }
          
          const songName = song.name || song.songName || song.song_name || '';
          const artist = song.artist || song.artistName || '';
          const album = song.album || '';
          const duration = song.duration || 0;
          const cover = song.cover || song.coverUrl || '';
          
          console.log(`格式化后的歌曲:`, {
            songId, songName, artist, album, duration, cover
          });

          // 检查歌曲是否已存在于播放列表中
          const [existingSongs] = await connection.query(
            'SELECT * FROM user_playlist_songs WHERE playlist_id = ? AND song_id = ?',
            [playlistId, songId]
          );

          if (existingSongs.length === 0) {
            // 添加歌曲到播放列表
            const [result] = await connection.query(
              'INSERT INTO user_playlist_songs (playlist_id, song_id, song_name, artist, album, duration, cover) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [playlistId, songId, songName, artist, album, duration, cover]
            );
            
            console.log(`歌曲添加结果:`, result);
            added++;
          } else {
            console.log(`歌曲 ${songId} 已存在于播放列表 ${playlistId}`);
          }
        }

        await connection.commit();
        console.log(`成功添加 ${added} 首歌曲到播放列表 ${playlistId}`);
        return { added };
      } catch (error) {
        console.error('添加歌曲到播放列表事务失败，回滚:', error);
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('添加歌曲到播放列表失败:', error);
      throw error;
    }
  }

  // 从歌单中移除歌曲
  async removeSongFromPlaylist(playlistId, songId) {
    try {
      console.log('从歌单移除歌曲, playlistId:', playlistId, 'songId:', songId);
      
      const [result] = await pool.query(
        'DELETE FROM user_playlist_songs WHERE playlist_id = ? AND song_id = ?',
        [playlistId, songId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('从歌单移除歌曲失败:', error);
      throw error;
    }
  }

  // 批量保存用户歌单
  async saveUserPlaylists(userId, playlists) {
    try {
      console.log(`批量保存用户歌单, userId: ${userId}, playlists数量: ${playlists.length}`);
      if (!playlists || playlists.length === 0) {
        return { saved: 0 };
      }
      
      let created = 0;
      let updated = 0;
      
      // 获取用户现有歌单
      const [existingPlaylists] = await pool.query(
        'SELECT id FROM user_playlists WHERE user_id = ?',
        [userId]
      );
      
      // 创建ID到数据库ID的映射
      const playlistIdMap = {};
      existingPlaylists.forEach(p => {
        playlistIdMap[p.id] = p.id;
      });
      
      // 使用事务确保数据一致性
      const connection = await pool.getConnection();
      await connection.beginTransaction();
      
      try {
        for (const playlist of playlists) {
          const now = new Date();
          const createdAt = playlist.created_at || playlist.createdAt ? new Date(playlist.created_at || playlist.createdAt) : now;
          const updatedAt = playlist.updated_at || playlist.updatedAt ? new Date(playlist.updated_at || playlist.updatedAt) : now;
          
          if (playlistIdMap[playlist.id]) {
            // 更新现有歌单
            await connection.query(
              'UPDATE user_playlists SET name = ?, cover = ?, description = ?, updated_at = ? WHERE id = ?',
              [playlist.name, playlist.cover || '', playlist.description || '', updatedAt, playlistIdMap[playlist.id]]
            );
            updated++;
            
            // 清空现有歌曲
            await connection.query('DELETE FROM user_playlist_songs WHERE playlist_id = ?', [playlistIdMap[playlist.id]]);
            
            // 添加歌曲
            if (playlist.songs && playlist.songs.length > 0) {
              for (const song of playlist.songs) {
                const songId = song.id || song.songId || song.song_id;
                const songName = song.name || song.songName || song.song_name || '';
                const artist = song.artist || song.artistName || '';
                const album = song.album || '';
                const duration = song.duration || 0;
                const cover = song.cover || song.coverUrl || '';
                const url = song.url || '';
                const addedAt = song.added_at || song.addedAt || now;
                
                await connection.query(
                  'INSERT INTO user_playlist_songs (playlist_id, song_id, song_name, artist, album, duration, cover, url, added_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                  [playlistIdMap[playlist.id], songId, songName, artist, album, duration, cover, url, addedAt]
                );
              }
            }
          } else {
            // 创建新歌单
            const [result] = await connection.query(
              'INSERT INTO user_playlists (user_id, name, cover, description, is_default, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [userId, playlist.name, playlist.cover || '', playlist.description || '', playlist.is_default || 0, createdAt, updatedAt]
            );
            
            const newPlaylistId = result.insertId;
            created++;
            
            // 添加歌曲
            if (playlist.songs && playlist.songs.length > 0) {
              for (const song of playlist.songs) {
                const songId = song.id || song.songId || song.song_id;
                const songName = song.name || song.songName || song.song_name || '';
                const artist = song.artist || song.artistName || '';
                const album = song.album || '';
                const duration = song.duration || 0;
                const cover = song.cover || song.coverUrl || '';
                const url = song.url || '';
                const addedAt = song.added_at || song.addedAt || now;
                
                await connection.query(
                  'INSERT INTO user_playlist_songs (playlist_id, song_id, song_name, artist, album, duration, cover, url, added_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                  [newPlaylistId, songId, songName, artist, album, duration, cover, url, addedAt]
                );
              }
            }
          }
        }
        
        await connection.commit();
        console.log(`成功处理用户歌单: 创建 ${created} 个，更新 ${updated} 个`);
        return { created, updated };
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('批量保存用户歌单失败:', error);
      throw error;
    }
  }
}

module.exports = new PlaylistModel(); 
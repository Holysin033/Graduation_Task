const express = require('express');
const router = express.Router();
const playlistModel = require('../models/playlistModel');

// 获取用户的所有歌单
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '用户ID不能为空'
      });
    }
    
    const playlists = await playlistModel.getUserPlaylists(userId);
    
    res.json({
      code: 200,
      message: '获取歌单列表成功',
      data: playlists
    });
  } catch (error) {
    console.error('获取歌单列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取歌单列表失败',
      error: error.message
    });
  }
});

// 获取歌单详情
router.get('/detail/:playlistId', async (req, res) => {
  try {
    const { playlistId } = req.params;
    
    if (!playlistId) {
      return res.status(400).json({
        code: 400,
        message: '歌单ID不能为空'
      });
    }
    
    const playlist = await playlistModel.getPlaylistById(playlistId);
    
    if (!playlist) {
      return res.status(404).json({
        code: 404,
        message: '歌单不存在'
      });
    }
    
    res.json({
      code: 200,
      message: '获取歌单详情成功',
      data: playlist
    });
  } catch (error) {
    console.error('获取歌单详情失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取歌单详情失败',
      error: error.message
    });
  }
});

// 创建歌单
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const playlistData = req.body;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '用户ID不能为空'
      });
    }
    
    if (!playlistData || !playlistData.name) {
      return res.status(400).json({
        code: 400,
        message: '歌单名称不能为空'
      });
    }
    
    const playlistId = await playlistModel.createPlaylist(userId, playlistData);
    
    res.json({
      code: 200,
      message: '创建歌单成功',
      data: { id: playlistId }
    });
  } catch (error) {
    console.error('创建歌单失败:', error);
    res.status(500).json({
      code: 500,
      message: '创建歌单失败',
      error: error.message
    });
  }
});

// 更新歌单
router.put('/:playlistId', async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlistData = req.body;
    
    if (!playlistId) {
      return res.status(400).json({
        code: 400,
        message: '歌单ID不能为空'
      });
    }
    
    if (!playlistData || !playlistData.name) {
      return res.status(400).json({
        code: 400,
        message: '歌单名称不能为空'
      });
    }
    
    const success = await playlistModel.updatePlaylist(playlistId, playlistData);
    
    if (!success) {
      return res.status(404).json({
        code: 404,
        message: '歌单不存在'
      });
    }
    
    res.json({
      code: 200,
      message: '更新歌单成功'
    });
  } catch (error) {
    console.error('更新歌单失败:', error);
    res.status(500).json({
      code: 500,
      message: '更新歌单失败',
      error: error.message
    });
  }
});

// 删除歌单
router.delete('/:userId/:playlistId', async (req, res) => {
  try {
    const { userId, playlistId } = req.params;
    
    if (!userId || !playlistId) {
      return res.status(400).json({
        code: 400,
        message: '参数不完整'
      });
    }
    
    const success = await playlistModel.deletePlaylist(playlistId);
    
    if (!success) {
      return res.status(404).json({
        code: 404,
        message: '歌单不存在'
      });
    }
    
    res.json({
      code: 200,
      message: '删除歌单成功'
    });
  } catch (error) {
    console.error('删除歌单失败:', error);
    res.status(500).json({
      code: 500,
      message: '删除歌单失败',
      error: error.message
    });
  }
});

// 添加歌曲到歌单
router.post('/:playlistId/songs', async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { songs } = req.body;
    
    if (!playlistId) {
      return res.status(400).json({
        code: 400,
        message: '歌单ID不能为空'
      });
    }
    
    if (!songs || !Array.isArray(songs) || songs.length === 0) {
      return res.status(400).json({
        code: 400,
        message: '歌曲数据不正确'
      });
    }
    
    const result = await playlistModel.addSongsToPlaylist(playlistId, songs);
    
    res.json({
      code: 200,
      message: '添加歌曲成功',
      data: result
    });
  } catch (error) {
    console.error('添加歌曲到歌单失败:', error);
    res.status(500).json({
      code: 500,
      message: '添加歌曲到歌单失败',
      error: error.message
    });
  }
});

// 从歌单中删除歌曲
router.delete('/:playlistId/songs/:songId', async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    
    if (!playlistId || !songId) {
      return res.status(400).json({
        code: 400,
        message: '参数不完整'
      });
    }
    
    const success = await playlistModel.removeSongFromPlaylist(playlistId, songId);
    
    if (!success) {
      return res.status(404).json({
        code: 404,
        message: '歌曲不在歌单中或歌单不存在'
      });
    }
    
    res.json({
      code: 200,
      message: '从歌单中删除歌曲成功'
    });
  } catch (error) {
    console.error('从歌单中删除歌曲失败:', error);
    res.status(500).json({
      code: 500,
      message: '从歌单中删除歌曲失败',
      error: error.message
    });
  }
});

// 批量保存用户歌单
router.post('/:userId/batch', async (req, res) => {
  try {
    const { userId } = req.params;
    const { playlists } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '用户ID不能为空'
      });
    }
    
    if (!playlists || !Array.isArray(playlists)) {
      return res.status(400).json({
        code: 400,
        message: '歌单数据格式不正确'
      });
    }
    
    const result = await playlistModel.saveUserPlaylists(userId, playlists);
    
    res.json({
      code: 200,
      message: '批量保存歌单成功',
      data: result
    });
  } catch (error) {
    console.error('批量保存歌单失败:', error);
    res.status(500).json({
      code: 500,
      message: '批量保存歌单失败',
      error: error.message
    });
  }
});

module.exports = router; 
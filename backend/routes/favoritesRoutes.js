const express = require('express');
const router = express.Router();
const favoritesModel = require('../models/favoritesModel');

// 获取用户的收藏列表
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '用户ID不能为空'
      });
    }
    
    const favorites = await favoritesModel.getUserFavorites(userId);
    
    res.json({
      code: 200,
      message: '获取收藏列表成功',
      data: favorites
    });
  } catch (error) {
    console.error('获取收藏列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取收藏列表失败',
      error: error.message
    });
  }
});

// 添加收藏
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const songData = req.body;
    
    console.log('收到添加收藏请求:');
    console.log('用户ID:', userId);
    console.log('请求体:', JSON.stringify(req.body, null, 2));
    
    if (!userId) {
      console.log('错误: 用户ID不能为空');
      return res.status(400).json({
        code: 400,
        message: '用户ID不能为空'
      });
    }
    
    if (!songData || !songData.song_id || !songData.song_name) {
      console.log('错误: 歌曲数据不完整', songData);
      return res.status(400).json({
        code: 400,
        message: '歌曲数据不完整'
      });
    }
    
    console.log('准备添加收藏到数据库...');
    const favoriteId = await favoritesModel.addFavorite(userId, songData);
    console.log('收藏添加结果, ID:', favoriteId);
    
    res.json({
      code: 200,
      message: '添加收藏成功',
      data: { id: favoriteId }
    });
  } catch (error) {
    console.error('添加收藏失败，详细错误:', error);
    res.status(500).json({
      code: 500,
      message: '添加收藏失败',
      error: error.message
    });
  }
});

// 批量添加收藏
router.post('/:userId/batch', async (req, res) => {
  try {
    const { userId } = req.params;
    const { songs } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '用户ID不能为空'
      });
    }
    
    if (!songs || !Array.isArray(songs)) {
      return res.status(400).json({
        code: 400,
        message: '歌曲数据格式不正确'
      });
    }
    
    const result = await favoritesModel.addFavoritesBatch(userId, songs);
    
    res.json({
      code: 200,
      message: '批量添加收藏成功',
      data: result
    });
  } catch (error) {
    console.error('批量添加收藏失败:', error);
    res.status(500).json({
      code: 500,
      message: '批量添加收藏失败',
      error: error.message
    });
  }
});

// 删除收藏
router.delete('/:userId/:songId', async (req, res) => {
  try {
    const { userId, songId } = req.params;
    
    if (!userId || !songId) {
      return res.status(400).json({
        code: 400,
        message: '参数不完整'
      });
    }
    
    const success = await favoritesModel.removeFavorite(userId, songId);
    
    if (success) {
      res.json({
        code: 200,
        message: '删除收藏成功'
      });
    } else {
      res.status(404).json({
        code: 404,
        message: '未找到要删除的收藏'
      });
    }
  } catch (error) {
    console.error('删除收藏失败:', error);
    res.status(500).json({
      code: 500,
      message: '删除收藏失败',
      error: error.message
    });
  }
});

// 检查歌曲是否已收藏
router.get('/:userId/check/:songId', async (req, res) => {
  try {
    const { userId, songId } = req.params;
    
    if (!userId || !songId) {
      return res.status(400).json({
        code: 400,
        message: '参数不完整'
      });
    }
    
    const isFavorited = await favoritesModel.checkIsFavorite(userId, songId);
    
    res.json({
      code: 200,
      data: { isFavorited }
    });
  } catch (error) {
    console.error('检查收藏状态失败:', error);
    res.status(500).json({
      code: 500,
      message: '检查收藏状态失败',
      error: error.message
    });
  }
});

module.exports = router; 
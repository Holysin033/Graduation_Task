const express = require('express');
const router = express.Router();
const historyModel = require('../models/historyModel');
const songModel = require('../models/songModel');

// 获取用户的播放历史
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '用户ID不能为空'
      });
    }
    
    const history = await historyModel.getUserHistory(userId, limit);
    
    res.json({
      code: 200,
      message: '获取播放历史成功',
      data: history
    });
  } catch (error) {
    console.error('获取播放历史失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取播放历史失败',
      error: error.message
    });
  }
});

// 添加播放记录
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const songData = req.body;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '用户ID不能为空'
      });
    }
    
    if (!songData || !songData.song_id || !songData.song_name) {
      return res.status(400).json({
        code: 400,
        message: '歌曲数据不完整'
      });
    }
    
    const recordId = await historyModel.addPlayRecord(userId, songData);
    
    res.json({
      code: 200,
      message: '添加播放记录成功',
      data: { id: recordId }
    });
  } catch (error) {
    console.error('添加播放记录失败:', error);
    res.status(500).json({
      code: 500,
      message: '添加播放记录失败',
      error: error.message
    });
  }
});

// 批量添加播放记录
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
    
    const result = await historyModel.addHistoryBatch(userId, songs);
    
    res.json({
      code: 200,
      message: '批量添加播放记录成功',
      data: result
    });
  } catch (error) {
    console.error('批量添加播放记录失败:', error);
    res.status(500).json({
      code: 500,
      message: '批量添加播放记录失败',
      error: error.message
    });
  }
});

// 清空播放历史
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '用户ID不能为空'
      });
    }
    
    const count = await historyModel.clearHistory(userId);
    
    res.json({
      code: 200,
      message: '清空播放历史成功',
      data: { count }
    });
  } catch (error) {
    console.error('清空播放历史失败:', error);
    res.status(500).json({
      code: 500,
      message: '清空播放历史失败',
      error: error.message
    });
  }
});

module.exports = router; 
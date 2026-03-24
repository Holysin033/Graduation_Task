const express = require('express');
const router = express.Router();
const syncService = require('../services/syncService');
const { pool, query } = require('../config/db');  // 添加数据库连接池引用
const favoritePlaylistModel = require('../models/favoritePlaylistModel');  // 添加收藏歌单模型引用

// 基本路由 - 用于验证路由可访问性
router.get('/', (req, res) => {
  res.json({
    code: 200,
    message: '同步服务运行正常',
    endpoints: [
      '/status/:userId',
      '/user-data',
      '/favorites',
      '/favorite-playlists',
      '/play-history',
      '/playlists',
      '/songs'
    ]
  });
});

// 获取用户同步状态
router.get('/status/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '缺少用户ID'
      });
    }
    
    // 简单返回状态信息，不查询数据库
    res.json({
      code: 200,
      message: '获取同步状态成功',
      data: {
        userId: parseInt(userId),
        lastSyncTime: new Date().toISOString(),
        status: 'ready'
      }
    });
  } catch (error) {
    console.error('获取同步状态失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取同步状态失败',
      error: error.message
    });
  }
});

// 获取用户收藏列表
router.get('/favorites/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '缺少用户ID'
      });
    }
    
    const favorites = await syncService.getUserFavorites(userId);
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

// 获取用户播放历史
router.get('/play-history/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '缺少用户ID'
      });
    }
    
    const history = await syncService.getUserHistory(userId);
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

// 获取用户歌单
router.get('/playlists/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '缺少用户ID'
      });
    }
    
    const playlists = await syncService.getUserPlaylists(userId);
    res.json({
      code: 200,
      message: '获取歌单成功',
      data: playlists
    });
  } catch (error) {
    console.error('获取歌单失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取歌单失败',
      error: error.message
    });
  }
});

// 获取用户收藏歌单列表
router.get('/favorite-playlists/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '缺少用户ID'
      });
    }
    
    // 调用service获取收藏歌单
    const favoritePlaylists = await syncService.getFavoritePlaylists(userId);
    res.json({
      code: 200,
      message: '获取收藏歌单列表成功',
      data: favoritePlaylists
    });
  } catch (error) {
    console.error('获取收藏歌单列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取收藏歌单列表失败',
      error: error.message
    });
  }
});

// 同步用户数据
router.post('/user-data', async (req, res) => {
  try {
    const { userId, data } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '缺少用户ID'
      });
    }
    
    console.log('收到用户同步数据请求：', { userId, dataKeys: data ? Object.keys(data) : [] });
    // 添加更详细的请求数据日志
    if (data) {
      if (data.favorites) {
        console.log(`收藏数据:`, JSON.stringify(data.favorites.slice(0, 2)));
      }
      if (data.favoritePlaylists) {
        console.log(`收藏歌单数据:`, JSON.stringify(data.favoritePlaylists.slice(0, 2)));
      }
      if (data.playHistory) {
        console.log(`播放历史:`, JSON.stringify(data.playHistory.slice(0, 2)));
      }
      if (data.playlists) {
        console.log(`歌单数据:`, JSON.stringify(data.playlists.slice(0, 2)));
      }
    }
    
    // 分别处理不同类型的数据
    const results = {
      favorites: null,
      favoritePlaylists: null,
      playHistory: null,
      playlists: null
    };
    
    // 处理收藏数据
    if (data.favorites && Array.isArray(data.favorites)) {
      console.log(`处理收藏数据，数量: ${data.favorites.length}`);
      try {
        results.favorites = await syncService.syncFavorites(userId, data.favorites);
        console.log(`收藏同步结果:`, JSON.stringify(results.favorites));
      } catch (error) {
        console.error('收藏同步失败:', error);
        results.favorites = { error: error.message };
      }
    }
    
    // 处理收藏歌单数据
    if (data.favoritePlaylists && Array.isArray(data.favoritePlaylists)) {
      console.log(`处理收藏歌单数据，数量: ${data.favoritePlaylists.length}`);
      try {
        results.favoritePlaylists = await syncService.syncFavoritePlaylists(userId, data.favoritePlaylists);
        console.log(`收藏歌单同步结果:`, JSON.stringify(results.favoritePlaylists));
      } catch (error) {
        console.error('收藏歌单同步失败:', error);
        results.favoritePlaylists = { error: error.message };
      }
    }
    
    // 处理播放历史
    if (data.playHistory && Array.isArray(data.playHistory)) {
      console.log(`处理播放历史，数量: ${data.playHistory.length}`);
      try {
        results.playHistory = await syncService.syncPlayHistory(userId, data.playHistory);
        console.log(`播放历史同步结果:`, JSON.stringify(results.playHistory));
      } catch (error) {
        console.error('播放历史同步失败:', error);
        results.playHistory = { error: error.message };
      }
    }
    
    // 处理歌单数据
    if (data.playlists && Array.isArray(data.playlists)) {
      console.log(`处理歌单数据，数量: ${data.playlists.length}`);
      try {
        results.playlists = await syncService.syncPlaylists({
          userId: userId,
          localPlaylists: data.playlists
        });
        console.log(`歌单同步结果:`, JSON.stringify(results.playlists));
      } catch (error) {
        console.error('歌单同步失败:', error);
        results.playlists = { error: error.message };
      }
    }
    
    console.log('同步处理完成，返回结果');
    res.json({
      code: 200,
      message: '数据同步成功',
      data: results
    });
  } catch (error) {
    console.error('同步用户数据失败:', error);
    res.status(500).json({
      code: 500,
      message: '同步用户数据失败',
      error: error.message
    });
  }
});

// 同步收藏列表
router.post('/favorites', async (req, res) => {
  try {
    const { userId, favorites } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '缺少用户ID'
      });
    }
    
    const result = await syncService.syncFavorites(userId, favorites || []);
    res.json({
      code: 200,
      message: '收藏列表同步成功',
      data: result
    });
  } catch (error) {
    console.error('同步收藏列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '同步收藏列表失败',
      error: error.message
    });
  }
});

// 同步播放历史
router.post('/play-history', async (req, res) => {
  try {
    const { userId, history } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '缺少用户ID'
      });
    }
    
    const result = await syncService.syncPlayHistory(userId, history || []);
    res.json({
      code: 200,
      message: '播放历史同步成功',
      data: result
    });
  } catch (error) {
    console.error('同步播放历史失败:', error);
    res.status(500).json({
      code: 500,
      message: '同步播放历史失败',
      error: error.message
    });
  }
});

// 同步歌单
router.post('/playlists', async (req, res) => {
  try {
    const { userId, playlists } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: '缺少用户ID'
      });
    }
    
    const result = await syncService.syncPlaylists({
      userId: userId,
      localPlaylists: playlists || []
    });
    
    res.json({
      code: 200,
      message: '歌单同步成功',
      data: result
    });
  } catch (error) {
    console.error('同步歌单失败:', error);
    res.status(500).json({
      code: 500,
      message: '同步歌单失败',
      error: error.message
    });
  }
});

// 同步收藏歌单
router.post('/favorite-playlists', async (req, res) => {
  try {
    const { userId, favoritePlaylists } = req.body;
    
    console.log('收到收藏歌单请求:', {
      userId,
      playlistsCount: favoritePlaylists ? favoritePlaylists.length : 0,
      firstPlaylist: favoritePlaylists && favoritePlaylists.length > 0 ? JSON.stringify(favoritePlaylists[0]) : 'none'
    });
    
    if (!userId) {
      console.error('同步收藏歌单失败: 缺少用户ID');
      return res.status(400).json({
        code: 400,
        message: '缺少用户ID'
      });
    }
    
    // 确保userId是数字
    const userIdNum = parseInt(userId);
    if (isNaN(userIdNum) || userIdNum <= 0) {
      console.error('同步收藏歌单失败: 无效的用户ID', userId);
      return res.status(400).json({
        code: 400,
        message: '无效的用户ID'
      });
    }
    
    // 验证歌单数据
    if (!favoritePlaylists || !Array.isArray(favoritePlaylists) || favoritePlaylists.length === 0) {
      console.error('同步收藏歌单失败: 无效的歌单数据');
      return res.status(400).json({
        code: 400,
        message: '无效的歌单数据'
      });
    }
    
    // 直接使用addFavoritePlaylist而不是syncFavoritePlaylists，以确保单个歌单添加成功
    try {
      for (const playlist of favoritePlaylists) {
        const insertId = await favoritePlaylistModel.addFavoritePlaylist(userIdNum, playlist);
        console.log(`添加收藏歌单成功: ID ${insertId} - ${playlist.name || playlist.playlist_name || 'Unknown'}`);
      }
      
      // 添加成功后立即获取最新数据
      const updatedFavoritePlaylists = await favoritePlaylistModel.getUserFavoritePlaylists(userIdNum);
      console.log(`用户 ${userIdNum} 现在有 ${updatedFavoritePlaylists.length} 个收藏歌单`);
      
      res.json({
        code: 200,
        message: '收藏歌单同步成功',
        data: {
          added: favoritePlaylists.length,
          favoritePlaylists: updatedFavoritePlaylists
        }
      });
    } catch (dbError) {
      console.error('歌单添加到数据库失败:', dbError);
      res.status(500).json({
        code: 500,
        message: '歌单添加到数据库失败: ' + dbError.message,
        error: dbError.message
      });
    }
  } catch (error) {
    console.error('同步收藏歌单失败:', error);
    res.status(500).json({
      code: 500,
      message: '同步收藏歌单失败',
      error: error.message
    });
  }
});

// 检查歌单是否已收藏
router.get('/favorite-playlists/check/:userId/:playlistId', async (req, res) => {
  try {
    const { userId, playlistId } = req.params;
    
    // 参数验证
    if (!userId || !playlistId) {
      console.error('缺少必要参数:', { userId, playlistId });
      return res.status(400).json({
        code: 400,
        message: '缺少必要参数',
        data: { isFavorited: false }
      });
    }
    
    // 转换参数类型
    const parsedUserId = parseInt(userId);
    
    // 验证参数类型
    if (isNaN(parsedUserId)) {
      console.error('无效的用户ID:', userId);
      return res.status(400).json({
        code: 400,
        message: '无效的用户ID',
        data: { isFavorited: false }
      });
    }
    
    console.log('检查收藏状态:', { userId: parsedUserId, playlistId });
    
    // 调用模型方法检查是否收藏
    try {
      const isFavorited = await favoritePlaylistModel.checkIsFavoritePlaylist(parsedUserId, playlistId);
      
      console.log('收藏状态检查结果:', { userId: parsedUserId, playlistId, isFavorited });
      
      return res.json({
        code: 200,
        message: '检查收藏状态成功',
        data: {
          isFavorited
        }
      });
    } catch (dbError) {
      console.error('检查收藏状态数据库操作失败:', dbError);
      return res.status(500).json({
        code: 500,
        message: '检查收藏状态失败: 数据库错误',
        data: { isFavorited: false }
      });
    }
  } catch (error) {
    console.error('检查收藏状态失败:', error);
    return res.status(500).json({
      code: 500,
      message: '检查收藏状态失败',
      error: error.message,
      data: { isFavorited: false }
    });
  }
});

// 删除收藏歌单
router.delete('/favorite-playlists/:playlistId', async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { user_id } = req.body;
    
    if (!user_id || !playlistId) {
      return res.status(400).json({
        code: 400,
        message: '缺少必要参数'
      });
    }
    
    // 调用service删除收藏歌单
    const result = await favoritePlaylistModel.removeFavoritePlaylist(user_id, playlistId);
    
    if (result) {
      res.json({
        code: 200,
        message: '删除收藏歌单成功'
      });
    } else {
      res.status(404).json({
        code: 404,
        message: '未找到要删除的收藏歌单'
      });
    }
  } catch (error) {
    console.error('删除收藏歌单失败:', error);
    res.status(500).json({
      code: 500,
      message: '删除收藏歌单失败',
      error: error.message
    });
  }
});

// 检查并添加歌曲
router.post('/songs', async (req, res) => {
  try {
    const { songs } = req.body;
    
    if (!songs || !Array.isArray(songs) || songs.length === 0) {
      return res.status(400).json({
        code: 400,
        message: '无效的歌曲数据'
      });
    }
    
    const result = await syncService.checkAndAddSongs(songs);
    res.json({
      code: 200,
      message: '歌曲数据同步成功',
      data: result
    });
  } catch (error) {
    console.error('同步歌曲数据失败:', error);
    res.status(500).json({
      code: 500,
      message: '同步歌曲数据失败',
      error: error.message
    });
  }
});

module.exports = router; 
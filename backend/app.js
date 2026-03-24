const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const syncRoutes = require('./routes/syncRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const historyRoutes = require('./routes/historyRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const { checkConnection } = require('./config/db');

const app = express();
const port = process.env.PORT || 3002;

// 启用中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 检查数据库连接
app.use(async (req, res, next) => {
  try {
    const isConnected = await checkConnection();
    if (!isConnected) {
      console.error('数据库连接失败');
      return res.status(500).json({
        code: 500,
        message: '服务暂时不可用，请稍后再试'
      });
    }
    next();
  } catch (error) {
    console.error('数据库连接检查失败:', error);
    return res.status(500).json({
      code: 500,
      message: '服务暂时不可用，请稍后再试'
    });
  }
});

// 路由
app.use('/api/sync', syncRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/playlists', playlistRoutes);

// 根路由
app.get('/', (req, res) => {
  res.json({ 
    message: '音乐应用数据同步服务已启动',
    version: '1.0.0',
    status: 'running'
  });
});

// API状态检查
app.get('/api/status', (req, res) => {
  res.json({
    code: 200,
    message: 'API服务运行正常',
    timestamp: new Date().toISOString()
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`数据同步服务已启动，监听端口：${port}`);
});

module.exports = app; 
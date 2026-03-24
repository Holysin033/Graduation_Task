// 数据库配置
module.exports = {
  dbHost: process.env.DB_HOST || 'localhost',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '101713',
  dbName: process.env.DB_NAME || 'music_app',
  
  // 应用配置
  port: process.env.PORT || 3002,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtExpiration: process.env.JWT_EXPIRATION || '24h',
  
  // 版本信息
  version: '1.0.0'
}; 
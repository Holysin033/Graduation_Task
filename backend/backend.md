# uni-app 音乐应用数据同步服务开发文档

## 项目概述

这是一个为uni-app音乐应用提供的数据同步服务，实现了本地数据与MySQL数据库的双向同步，支持多端数据一致性。服务采用Node.js + Express + MySQL架构，提供RESTful API接口。

## 技术栈

- 运行环境: Node.js (v14+)
- Web框架: Express.js
- 数据库: MySQL
- ORM/查询构建器: MySQL2
- API格式: RESTful JSON
- 文件存储: Multer + 本地文件系统
- 认证方式: JWT (JSON Web Token)
- 密码加密: bcrypt

## 开发环境搭建

### 前置要求

- MySQL 5.7+
- Node.js 14.0+
- npm 6.0+

### 安装步骤

1. **克隆项目并安装依赖**
   ```bash
   git clone <repository-url>
   cd backend
   npm install
   ```

2. **数据库配置**
   - 创建MySQL数据库: `music_app`
   - 运行初始化脚本: `node initdb.js`
   - 或手动导入SQL: `update_table.sql`

3. **环境变量配置**
   创建`.env`文件:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=music_app
   PORT=3002
   JWT_SECRET=your_jwt_secret_key
   FILE_UPLOAD_PATH=./uploads
   MAX_FILE_SIZE=5242880
   ```

4. **启动服务**
   ```bash
   # 使用启动脚本
   start.bat
   ```

服务将默认在3002端口启动。

## 项目结构详解

```
backend/
  ├── config/             # 配置文件目录
  ├── controllers/        # 控制器目录
  ├── models/            # 数据模型目录
  ├── routes/            # 路由目录
  ├── services/          # 服务层目录
  ├── app.js             # 应用主文件
  ├── initdb.js          # 数据库初始化脚本
  ├── update_table.sql   # 数据库更新脚本
  ├── start.bat          # 启动脚本
  ├── package.json       # 项目依赖配置
  └── package-lock.json  # 依赖锁定文件
```

## 核心模块详解

### 1. 数据库初始化模块 (initdb.js)

提供数据库初始化和表结构创建功能：
```javascript
// 创建数据库和表结构
async function initDatabase() {
  // 创建数据库连接
  // 创建表结构
  // 初始化基础数据
}
```

### 2. 应用主文件 (app.js)

Express应用配置和路由注册：
```javascript
const express = require('express');
const app = express();

// 中间件配置
app.use(cors());
app.use(bodyParser.json());

// 路由注册
app.use('/api/sync', syncRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/playlists', playlistRoutes);
```

### 3. 启动脚本 (start.bat)

提供便捷的服务启动方式：
```batch
@echo off
chcp 65001
echo 音乐APP数据同步服务启动脚本

:: 检查Node.js环境
:: 检查依赖包
:: 选择是否初始化数据库
:: 启动服务
```

## API接口规范

### 接口响应格式

所有API返回统一的JSON格式:
```javascript
{
  "code": 200,       // 状态码，200成功，其他表示错误
  "message": "...",  // 提示信息
  "data": {}         // 返回的数据，可能是对象或数组
}
```

### 错误处理

错误响应格式:
```javascript
{
  "code": 400,       // HTTP状态码
  "message": "...",  // 错误描述
  "error": "..."     // 详细错误信息(开发环境)
}
```

## 数据库设计

### 主要表结构

#### users表
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### favorites表
```sql
CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  song_id VARCHAR(100) NOT NULL,
  song_data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY user_song (user_id, song_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### play_history表
```sql
CREATE TABLE play_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  song_id VARCHAR(100) NOT NULL,
  song_data JSON NOT NULL,
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 安全最佳实践

1. **密码加密**: 使用bcrypt加密存储用户密码
2. **参数验证**: 使用express-validator验证请求参数
3. **SQL注入防护**: 使用参数化查询
4. **CORS配置**: 限制跨域请求
5. **文件上传安全**: 
   - 限制上传文件大小和类型
   - 使用随机文件名存储
   - 验证文件内容安全性

## 性能优化策略

1. **数据库索引**: 为常用查询字段添加索引
2. **查询优化**: 减少不必要的JOIN操作
3. **连接池管理**: 合理设置连接池大小
4. **分页加载**: 大数据量接口实现分页

## 部署指南

### 本地开发环境
```bash
# 使用启动脚本
start.bat
```

### 生产环境部署
```bash
# 安装PM2
npm install -g pm2

# 使用PM2启动应用
pm2 start app.js --name "music-sync"
```

## 常见问题解答

1. **数据同步冲突如何处理？**
   - 系统使用时间戳和版本号机制解决冲突
   - 可在syncService.js中自定义冲突解决策略

2. **如何处理大量数据同步？**
   - 实现分页加载
   - 使用增量同步减少传输数据量

3. **文件上传问题如何处理？**
   - 文件大小限制在环境变量中配置
   - 上传失败重试机制
   - 不安全文件类型过滤

## 调试与监控

1. **日志系统**
   - 使用console记录关键日志
   - 生产环境配置日志文件

2. **性能监控**
   - 使用PM2监控应用状态
   - 监控关键接口响应时间 
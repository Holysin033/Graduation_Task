const mysql = require('mysql2/promise');

// 数据库配置
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '101713',
};

const DB_NAME = 'music_app';

async function initDatabase() {
  let connection;
  
  try {
    // 创建数据库连接（不指定数据库名）
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
    });
    
    console.log('连接到MySQL服务器成功');
    
    // 删除现有数据库（如果存在）
    await connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);
    console.log(`删除旧数据库 ${DB_NAME}`);
    
    // 创建数据库（如果不存在）
    await connection.query(`CREATE DATABASE ${DB_NAME}`);
    console.log(`创建新数据库 ${DB_NAME}`);
    
    // 使用数据库
    await connection.query(`USE ${DB_NAME}`);
    
    // 1. 创建用户表 - users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        phone VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        avatar TEXT,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL
      )
    `);
    console.log('创建用户表');
    
    // 2. 创建歌曲表 - songs
    await connection.query(`
      CREATE TABLE IF NOT EXISTS songs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        netease_id VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        artist VARCHAR(255),
        album VARCHAR(255),
        duration INT,
        cover_url VARCHAR(255),
        url VARCHAR(255),
        lyrics TEXT,
        play_count INT DEFAULT 0,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL
      )
    `);
    console.log('创建歌曲表');
    
    // 3. 创建用户播放列表表 - user_playlists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_playlists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        cover TEXT,
        description TEXT,
        is_default TINYINT(1) DEFAULT 0,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('创建用户播放列表表');
    
    // 4. 创建用户播放列表歌曲表 - user_playlist_songs
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_playlist_songs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        playlist_id INT NOT NULL,
        song_id VARCHAR(50) NOT NULL,
        song_name VARCHAR(255) NOT NULL,
        artist VARCHAR(255),
        album VARCHAR(255),
        duration INT,
        cover TEXT,
        url VARCHAR(255),
        added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (playlist_id) REFERENCES user_playlists(id) ON DELETE CASCADE
      )
    `);
    console.log('创建用户播放列表歌曲表');
    
    // 5. 创建用户收藏歌曲表 - user_favorite_songs
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_favorite_songs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        song_id VARCHAR(50) NOT NULL,
        song_name VARCHAR(255) NOT NULL,
        artist VARCHAR(255),
        album VARCHAR(255),
        duration INT,
        cover VARCHAR(255),
        url VARCHAR(255),
        created_at DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('创建用户收藏歌曲表');
    
    // 6. 创建用户收藏歌单表 - user_favorite_playlists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_favorite_playlists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        playlist_id VARCHAR(50) NOT NULL,
        playlist_name VARCHAR(255) NOT NULL,
        description TEXT,
        cover TEXT,
        creator_name VARCHAR(100),
        play_count INT DEFAULT 0,
        created_at DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('创建用户收藏歌单表');
    
    // 7. 创建播放历史表 - play_history
    await connection.query(`
      CREATE TABLE IF NOT EXISTS play_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        song_id VARCHAR(50) NOT NULL,
        song_name VARCHAR(255) NOT NULL,
        artist VARCHAR(255),
        album VARCHAR(255),
        duration INT,
        cover TEXT,
        play_time DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('创建播放历史表');
    
    console.log('数据库初始化完成');
    
  } catch (error) {
    console.error('数据库初始化失败:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('数据库连接已关闭');
    }
  }
}

// 执行初始化
initDatabase(); 
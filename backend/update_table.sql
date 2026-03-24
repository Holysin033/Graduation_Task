USE music_app;

-- 检查表是否存在
SELECT COUNT(*) INTO @table_exists FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'music_app' AND TABLE_NAME = 'user_favorite_playlists';

-- 如果表存在则添加列
-- 检查并添加playlist_id列
SELECT COUNT(*) INTO @col_exists FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'music_app' AND TABLE_NAME = 'user_favorite_playlists' AND COLUMN_NAME = 'playlist_id';
SET @query = IF(@col_exists = 0 AND @table_exists = 1, 'ALTER TABLE user_favorite_playlists ADD COLUMN playlist_id VARCHAR(100) NOT NULL;', 'SELECT 1');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 检查并添加playlist_name列
SELECT COUNT(*) INTO @col_exists FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'music_app' AND TABLE_NAME = 'user_favorite_playlists' AND COLUMN_NAME = 'playlist_name';
SET @query = IF(@col_exists = 0 AND @table_exists = 1, 'ALTER TABLE user_favorite_playlists ADD COLUMN playlist_name VARCHAR(255) NOT NULL;', 'SELECT 1');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 检查并添加description列
SELECT COUNT(*) INTO @col_exists FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'music_app' AND TABLE_NAME = 'user_favorite_playlists' AND COLUMN_NAME = 'description';
SET @query = IF(@col_exists = 0 AND @table_exists = 1, 'ALTER TABLE user_favorite_playlists ADD COLUMN description TEXT;', 'SELECT 1');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 检查并添加cover列
SELECT COUNT(*) INTO @col_exists FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'music_app' AND TABLE_NAME = 'user_favorite_playlists' AND COLUMN_NAME = 'cover';
SET @query = IF(@col_exists = 0 AND @table_exists = 1, 'ALTER TABLE user_favorite_playlists ADD COLUMN cover VARCHAR(255);', 'SELECT 1');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 检查并添加creator_name列
SELECT COUNT(*) INTO @col_exists FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'music_app' AND TABLE_NAME = 'user_favorite_playlists' AND COLUMN_NAME = 'creator_name';
SET @query = IF(@col_exists = 0 AND @table_exists = 1, 'ALTER TABLE user_favorite_playlists ADD COLUMN creator_name VARCHAR(100);', 'SELECT 1');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 检查并添加play_count列
SELECT COUNT(*) INTO @col_exists FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'music_app' AND TABLE_NAME = 'user_favorite_playlists' AND COLUMN_NAME = 'play_count';
SET @query = IF(@col_exists = 0 AND @table_exists = 1, 'ALTER TABLE user_favorite_playlists ADD COLUMN play_count INT DEFAULT 0;', 'SELECT 1');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 添加索引以加速查询
SELECT COUNT(*) INTO @index_exists FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = 'music_app' AND TABLE_NAME = 'user_favorite_playlists' AND INDEX_NAME = 'idx_playlist_id';
SET @query = IF(@index_exists = 0 AND @table_exists = 1, 'ALTER TABLE user_favorite_playlists ADD INDEX idx_playlist_id (playlist_id);', 'SELECT 1');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 显示表结构
DESCRIBE user_favorite_playlists; 
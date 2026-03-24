const mysql = require('mysql2/promise');
const config = require('./config');

// 创建数据库连接池
const pool = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * 检查数据库连接
 * @returns {Promise<boolean>} 连接状态
 */
async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('数据库连接成功');
    return true;
  } catch (error) {
    console.error('数据库连接失败:', error);
    return false;
  }
}

/**
 * 执行SQL查询
 * @param {string} sql SQL语句
 * @param {Array} params 查询参数
 * @returns {Promise<Array>} 查询结果
 */
async function query(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('查询执行失败:', error);
    throw error;
  }
}

module.exports = {
  pool,
  checkConnection,
  query
}; 
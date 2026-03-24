const { pool } = require('../config/db');

class UserModel {
  // 根据ID获取用户信息
  async getUserById(userId) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      throw error;
    }
  }

  // 根据用户名获取用户信息
  async getUserByUsername(username) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('根据用户名获取用户失败:', error);
      throw error;
    }
  }

  // 根据手机号获取用户信息
  async getUserByPhone(phone) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE phone = ?', [phone]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('根据手机号获取用户失败:', error);
      throw error;
    }
  }

  // 创建用户
  async createUser(userData) {
    try {
      const { phone, password, avatar } = userData;
      
      // 确保username字段不为空
      const username = userData.username || phone;
      console.log('创建用户数据:', { username, phone, password });
      
      const now = new Date();
      
      // 使用默认头像或提供的base64头像
      const defaultAvatar = '/static/default-avatar.png';
      const avatarData = avatar || defaultAvatar;
      
      const [result] = await pool.query(
        'INSERT INTO users (username, phone, password, avatar, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
        [username, phone, password, avatarData, now, now]
      );
      
      console.log('用户创建成功，ID:', result.insertId);
      return result.insertId;
    } catch (error) {
      console.error('创建用户失败，错误详情:', error);
      throw error;
    }
  }

  // 更新用户信息
  async updateUser(userId, userData) {
    try {
      console.log(`开始更新用户信息，用户ID: ${userId}，更新数据:`, userData);
      
      const { username, password, phone, avatar } = userData;
      const now = new Date();
      
      // 构建更新字段
      const updateFields = [];
      const values = [];
      
      if (username) {
        updateFields.push('username = ?');
        values.push(username);
        console.log(`将更新用户名为: ${username}`);
      }
      
      if (password) {
        updateFields.push('password = ?');
        values.push(password);
        console.log('将更新用户密码');
      }
      
      if (phone) {
        updateFields.push('phone = ?');
        values.push(phone);
        console.log(`将更新用户手机号为: ${phone}`);
      }
      
      if (avatar) {
        // 如果是base64格式的头像，直接存储
        updateFields.push('avatar = ?');
        values.push(avatar);
        console.log('将更新用户头像');
      }
      
      updateFields.push('updated_at = ?');
      values.push(now);
      
      // 添加用户ID
      values.push(userId);
      
      // 如果没有要更新的字段，直接返回
      if (updateFields.length <= 1) { // 只有updated_at字段
        console.log('没有要更新的字段，跳过数据库操作');
        return false;
      }
      
      const sqlQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
      console.log('执行SQL:', sqlQuery);
      console.log('SQL参数:', values);
      
      const [result] = await pool.query(sqlQuery, values);
      
      const success = result.affectedRows > 0;
      console.log(`用户信息更新${success ? '成功' : '失败'}，影响行数: ${result.affectedRows}`);
      
      return success;
    } catch (error) {
      console.error('更新用户信息失败:', error);
      throw error;
    }
  }
}

module.exports = new UserModel(); 
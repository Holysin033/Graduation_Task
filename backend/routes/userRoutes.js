const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// 用户登录
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    if (!phone || !password) {
      return res.status(400).json({
        code: 400,
        message: '用户名和密码不能为空'
      });
    }
    
    // 查询用户
    const user = await userModel.getUserByPhone(phone);
    
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: '用户不存在'
      });
    }
    
    // 验证密码（实际应用中应该使用加密比对）
    if (user.password !== password) {
      return res.status(401).json({
        code: 401,
        message: '密码错误'
      });
    }
    
    // 返回用户信息（不包含密码）
    const { password: _, ...userInfo } = user;
    
    res.json({
      code: 200,
      message: '登录成功',
      data: userInfo
    });
  } catch (error) {
    console.error('用户登录失败:', error);
    res.status(500).json({
      code: 500,
      message: '登录失败',
      error: error.message
    });
  }
});

// 用户注册
router.post('/register', async (req, res) => {
  try {
    console.log('收到注册请求，请求体:', req.body);
    const { username, phone, password } = req.body;
    
    // 记录接收到的参数
    console.log('解析后的注册参数:', { username, phone, password: '******' });
    
    if (!phone || !password) {
      return res.status(400).json({
        code: 400,
        message: '手机号和密码不能为空'
      });
    }
    
    // 如果username为空，使用phone作为默认值
    const finalUsername = username || phone;
    
    // 检查手机号是否已存在
    const existingPhone = await userModel.getUserByPhone(phone);
    if (existingPhone) {
      return res.status(409).json({
        code: 409,
        message: '手机号已被使用'
      });
    }
    
    // 创建用户
    const userData = {
      username: finalUsername,
      phone, 
      password,
      avatar: '/static/default-avatar.png'
    };
    
    console.log('准备创建用户:', userData);
    const userId = await userModel.createUser(userData);
    
    console.log('用户创建成功，ID:', userId);
    res.json({
      code: 200,
      message: '注册成功',
      data: { id: userId, username: finalUsername, phone }
    });
  } catch (error) {
    console.error('用户注册失败，详细错误:', error);
    res.status(500).json({
      code: 500,
      message: '注册失败',
      error: error.message
    });
  }
});

// 获取用户信息
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await userModel.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在'
      });
    }
    
    // 返回用户信息（不包含密码）
    const { password, ...userInfo } = user;
    
    res.json({
      code: 200,
      data: userInfo
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({
      code: 500,
      message: '获取用户信息失败',
      error: error.message
    });
  }
});

// 更新用户信息
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    
    console.log(`收到更新用户信息请求，用户ID: ${userId}，请求数据:`, userData);
    
    const user = await userModel.getUserById(userId);
    
    if (!user) {
      console.log(`用户ID ${userId} 不存在，无法更新信息`);
      return res.status(404).json({
        code: 404,
        message: '用户不存在'
      });
    }
    
    // 如果请求包含密码更新，验证旧密码
    if (userData.password && userData.oldPassword) {
      // 验证旧密码是否正确（实际应用中应该使用加密比对）
      if (user.password !== userData.oldPassword) {
        console.log(`用户ID ${userId} 提供的旧密码不正确`);
        return res.status(400).json({
          code: 400,
          message: '当前密码不正确'
        });
      }
      // 删除旧密码字段，不需要存储到数据库
      delete userData.oldPassword;
    }
    
    // 更新用户信息
    const success = await userModel.updateUser(userId, userData);
    
    if (!success) {
      console.log(`用户ID ${userId} 信息更新失败`);
      return res.status(400).json({
        code: 400,
        message: '更新用户信息失败'
      });
    }
    
    // 获取更新后的用户信息
    const updatedUser = await userModel.getUserById(userId);
    const { password, ...userInfo } = updatedUser;
    
    console.log(`用户ID ${userId} 信息更新成功，返回更新后的信息`);
    
    res.json({
      code: 200,
      message: '更新用户信息成功',
      data: userInfo
    });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    res.status(500).json({
      code: 500,
      message: '更新用户信息失败',
      error: error.message
    });
  }
});

module.exports = router;
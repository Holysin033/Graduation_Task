/**
 * 存储工具函数
 * 封装uni存储API，提供安全的存取、类型检查和错误处理
 */

/**
 * 安全地获取本地存储中的数据
 * @param {String} key 存储键名
 * @param {Any} defaultValue 默认值，当获取失败时返回
 * @returns {Any} 解析后的数据
 */
export const safeGetStorage = (key, defaultValue = []) => {
  try {
    if (!key) {
      console.error('存储键名不能为空');
      return defaultValue;
    }
    
    const data = uni.getStorageSync(key);
    
    // 如果数据为空，返回默认值
    if (data === undefined || data === null || data === '') {
      return defaultValue;
    }
    
    // 检查是否为字符串类型(可能是JSON字符串)
    if (typeof data === 'string') {
      try {
        // 尝试解析JSON字符串
        return JSON.parse(data) || defaultValue;
      } catch (e) {
        console.error(`解析${key}数据失败:`, e);
        return defaultValue;
      }
    }
    
    // 检查是否为对象类型且有data字段(统一存储格式)
    if (typeof data === 'object' && data !== null) {
      // 如果有data字段，返回data字段的值
      if (data.data !== undefined) {
        return Array.isArray(data.data) ? data.data : defaultValue;
      }
      // 如果本身就是数组，直接返回
      if (Array.isArray(data)) {
        return data;
      }
      // 其他对象类型直接返回
      return data;
    }
    
    // 其他类型直接返回
    return data;
  } catch (error) {
    console.error(`获取${key}数据失败:`, error);
    return defaultValue;
  }
};

/**
 * 安全设置本地存储
 * @param {String} key 存储键名
 * @param {Any} data 要存储的数据
 * @param {Boolean} needStringify 是否需要将数据转为JSON字符串
 * @returns {Boolean} 是否成功
 */
export const safeSetStorage = (key, data, needStringify = false) => {
  try {
    if (!key) {
      console.error('存储键名不能为空');
      return false;
    }
    
    // 对象数据是否需要转为字符串
    const valueToStore = needStringify && typeof data === 'object' 
      ? JSON.stringify(data) 
      : data;
    
    uni.setStorageSync(key, valueToStore);
    return true;
  } catch (error) {
    console.error(`保存数据到${key}失败:`, error);
    return false;
  }
};

/**
 * 安全删除本地存储
 * @param {String} key 存储键名
 * @returns {Boolean} 是否成功
 */
export const safeRemoveStorage = (key) => {
  try {
    if (!key) {
      console.error('存储键名不能为空');
      return false;
    }
    
    uni.removeStorageSync(key);
    return true;
  } catch (error) {
    console.error(`删除${key}数据失败:`, error);
    return false;
  }
};

/**
 * 清除所有本地存储
 * @returns {Boolean} 是否成功
 */
export const safeClearStorage = () => {
  try {
    uni.clearStorageSync();
    return true;
  } catch (error) {
    console.error('清除本地存储失败:', error);
    return false;
  }
};

/**
 * 获取指定前缀的所有存储键
 * @param {String} prefix 键前缀
 * @returns {Array} 符合前缀的键名数组
 */
export const getStorageKeysByPrefix = (prefix) => {
  try {
    if (!prefix) {
      return [];
    }
    
    const res = uni.getStorageInfoSync();
    if (res && res.keys) {
      return res.keys.filter(key => key.startsWith(prefix));
    }
    return [];
  } catch (error) {
    console.error('获取存储键列表失败:', error);
    return [];
  }
};

/**
 * 批量获取存储数据
 * @param {Array} keys 键名数组
 * @returns {Object} 键值对对象
 */
export const batchGetStorage = (keys) => {
  try {
    if (!Array.isArray(keys) || keys.length === 0) {
      return {};
    }
    
    const result = {};
    keys.forEach(key => {
      result[key] = safeGetStorage(key);
    });
    return result;
  } catch (error) {
    console.error('批量获取存储数据失败:', error);
    return {};
  }
};

/**
 * 批量设置存储数据
 * @param {Object} dataMap 键值对对象
 * @returns {Boolean} 是否全部成功
 */
export const batchSetStorage = (dataMap) => {
  try {
    if (!dataMap || typeof dataMap !== 'object') {
      return false;
    }
    
    let allSuccess = true;
    Object.keys(dataMap).forEach(key => {
      const success = safeSetStorage(key, dataMap[key]);
      if (!success) {
        allSuccess = false;
      }
    });
    return allSuccess;
  } catch (error) {
    console.error('批量设置存储数据失败:', error);
    return false;
  }
}; 
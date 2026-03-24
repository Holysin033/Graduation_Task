/**
 * 请求工具函数
 * 统一处理请求，添加token认证和错误处理
 */

// 默认请求配置
const defaultOptions = {
  timeout: 15000,
  header: {
    'Content-Type': 'application/json'
  }
};

/**
 * 发起请求
 * @param {String} url - 请求地址
 * @param {String} method - 请求方法 GET/POST/PUT/DELETE
 * @param {Object} data - 请求数据
 * @param {Object} options - 其他选项
 * @returns {Promise} 请求结果
 */
export default async function request(url, method = 'GET', data = {}, options = {}) {
	console.log(`[${method}] ${url}`, data);
	
	// 记录请求开始时间
	const startTime = Date.now();
	
	return new Promise((resolve, reject) => {
		// 请求配置
		const requestOptions = {
			url: url,
			method: method,
			timeout: options.timeout || 30000, // 默认30秒超时
			header: {
				'content-type': 'application/json',
				...options.header
			},
			success: (res) => {
				// 记录响应时间
				const responseTime = Date.now() - startTime;
				console.log(`[${method}] ${url} 响应时间: ${responseTime}ms, 状态码: ${res.statusCode}`);
				
				// 检查HTTP状态码
				if (res.statusCode >= 200 && res.statusCode < 300) {
					if (res.data) {
						// 成功响应，包含数据
						console.log(`[${method}] ${url} 响应数据:`, res.data);
						resolve(res.data);
					} else {
						// 成功但没有数据
						console.warn(`[${method}] ${url} 成功但无数据`);
						resolve({ code: res.statusCode, message: '请求成功但无数据' });
					}
				} else if (res.statusCode === 401) {
					// 未授权
					console.error(`[${method}] ${url} 授权失败: ${res.statusCode}`);
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					// 可以在这里处理用户登录跳转
					// uni.navigateTo({ url: '/pages/login/login' });
					resolve({ code: 401, message: '请先登录' });
				} else if (res.statusCode === 404) {
					// 资源不存在
					console.error(`[${method}] ${url} 资源不存在: ${res.statusCode}`);
					resolve({ code: 404, message: '请求的资源不存在' });
				} else {
					// 其他服务器错误
					console.error(`[${method}] ${url} 服务器响应错误: ${res.statusCode}`, res.data);
					resolve({ 
						code: res.statusCode, 
						message: res.data && res.data.message ? res.data.message : '服务器响应错误'
					});
				}
			},
			fail: (err) => {
				// 请求失败
				const responseTime = Date.now() - startTime;
				console.error(`[${method}] ${url} 请求失败, 耗时: ${responseTime}ms`, err);
				
				// 根据错误类型给出友好提示
				let errorMessage = '网络请求失败';
				
				if (err.errMsg) {
					if (err.errMsg.includes('timeout')) {
						errorMessage = '请求超时，请检查网络';
					} else if (err.errMsg.includes('Failed to connect')) {
						errorMessage = '无法连接到服务器，请检查网络';
					}
				}
				
				// 返回本地错误对象，确保应用可以继续运行
				resolve({
					code: -1,
					message: errorMessage,
					error: err.errMsg || err
				});
			},
			complete: () => {
				// 请求完成，可以在此处理通用逻辑，如关闭加载提示等
			}
		};
		
		// 添加token认证
		const token = uni.getStorageSync('token');
		if (token) {
			requestOptions.header = {
				...requestOptions.header,
				'Authorization': `Bearer ${token}`
			};
		}
		
		// 添加用户ID到header
		const userInfo = uni.getStorageSync('userInfo');
		if (userInfo && userInfo.id) {
			requestOptions.header = {
				...requestOptions.header,
				'X-User-ID': userInfo.id
			};
		}
		
		// 处理请求数据
		if (method.toUpperCase() !== 'GET' && data) {
			requestOptions.data = data;
		} else if (method.toUpperCase() === 'GET' && Object.keys(data).length > 0) {
			// 将GET请求的参数添加到URL
			const query = Object.keys(data)
				.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
				.join('&');
			
			// 添加查询参数到URL
			requestOptions.url = requestOptions.url + (requestOptions.url.includes('?') ? '&' : '?') + query;
		}
		
		// 发送请求
		uni.request(requestOptions);
	});
} 
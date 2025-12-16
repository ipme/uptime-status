// https://insectmk.cn/posts/236f327f/
export default {
  async fetch(request, env, ctx) {
    const cache = caches.default;
    const targetURL = 'https://api.uptimerobot.com/v2/getMonitors';

    // 处理 OPTIONS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204, // No Content
        headers: {
          'Access-Control-Allow-Origin': '*', // 允许所有来源
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // 允许的 HTTP 方法
          'Access-Control-Allow-Headers': 'Content-Type, Authorization', // 允许的请求头部
        },
      });
    }

    let requestBody = '';
    if (request.method === 'POST') {
      // 读取请求体
      requestBody = await request.text();
      try {
        // 尝试解析为 JSON，并进行标准化排序
        const json = JSON.parse(requestBody);
        requestBody = JSON.stringify(sortObject(json));
      } catch (error) {
        console.error('Failed to parse request body as JSON:', error);
      }
    }

    // 构造缓存键，包含 URL 和标准化的请求体
    const cacheKey = new Request(targetURL + '|' + requestBody);

    // 尝试从缓存中获取响应
    let response = await cache.match(cacheKey);
    if (response) {
      console.log('Cache hit!');
    } else {
      console.log('Cache miss. Fetching from target...');
      
      // 转发请求到目标接口
      const modifiedRequest = new Request(targetURL, {
        method: 'POST',
        headers: request.headers, // 传递请求头部
        body: requestBody, // 转发标准化后的请求体
      });

      const fetchResponse = await fetch(modifiedRequest);
      if (fetchResponse.ok) {
        response = new Response(fetchResponse.body, fetchResponse);
        response.headers.set('Cache-Control', 'max-age=60'); // 设置缓存 1 分钟
        ctx.waitUntil(cache.put(cacheKey, response.clone())); // 异步存入缓存
      } else {
        console.error(`Target returned status: ${fetchResponse.status}`);
        response = new Response(fetchResponse.body, fetchResponse);
      }
    }

    // 设置跨域头部
    response = new Response(response.body, response); // 克隆响应
    response.headers.set('Access-Control-Allow-Origin', '*'); // 允许所有来源
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的 HTTP 方法
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头部

    return response;
  },
};

// 辅助函数：递归排序对象键
function sortObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sortObject);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = sortObject(obj[key]);
        return result;
      }, {});
  }
  return obj;
}


# 服务状态监控面板

基于 UptimeRobot API 的现代化服务状态监控面板。

演示地址：https://lyhxx.github.io/uptime-status

## 特性

- 🚀 **现代技术栈** - Vite + React 18 + TypeScript + TailwindCSS
- 📊 **数据可视化** - 可用率趋势图、响应时间图表
- 🔔 **实时通知** - 浏览器通知、页面标题状态提示
- 🌓 **主题切换** - 支持深色/浅色/跟随系统
- 📱 **响应式设计** - 完美适配移动端
- 🔍 **搜索筛选** - 按名称搜索、状态筛选、多种排序
- 📅 **时间范围** - 支持 30/60/90 天切换
- 📋 **故障历史** - 展示最近故障事件列表
- 🖼️ **嵌入模式** - 支持 iframe 嵌入其他页面
- 📲 **PWA 支持** - 可添加到桌面

## 快速开始

### GitHub Pages 部署

1. Fork 本项目
2. 修改 `src/config/config.ts` 配置文件
3. 修改 `vite.config.ts` 中的 `base` 为你的仓库名
4. 推送代码，GitHub Actions 会自动构建部署
5. 在仓库 Settings → Pages 中启用 GitHub Pages，Source 选择 "GitHub Actions"

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 配置说明

编辑 `src/config/config.ts` 文件：

```typescript
const config: AppConfig = {
  // 网站地址（用于 SEO）
  siteUrl: 'https://lyhxx.github.io/uptime-status',

  // 网站标题
  siteName: '服务状态监控面板',

  // 网站描述（用于 SEO）
  siteDescription: '实时监控服务运行状态，查看历史可用性数据',

  // 网站关键词（用于 SEO）
  siteKeywords: '服务监控,状态页面,UptimeRobot,可用性监控',

  // UptimeRobot API Keys
  apiKeys: ['your-api-key'],

  // 自定义 API 代理地址（可选，用于解决跨域问题）
  apiUrl: '',

  // 默认显示天数 (30, 60, 90)
  countDays: 30,

  // 是否显示站点链接
  showLink: true,

  // 默认主题 ('light' | 'dark' | 'system')
  defaultTheme: 'system',

  // 默认排序方式 ('name' | 'status' | 'uptime')
  defaultSort: 'name',

  // 默认状态筛选 ('all' | 'ok' | 'down')
  defaultFilter: 'all',

  // 自动刷新间隔（秒）
  refetchInterval: 300,

  // 数据新鲜时间（秒）
  staleTime: 120,

  // 缓存保留时间（秒）
  cacheTime: 600,
};
```

## 嵌入模式

在 URL 后添加 `?embed=1` 参数可启用精简嵌入模式：

```html
<iframe src="https://lyhxx.github.io/uptime-status/?embed=1" width="100%" height="600"></iframe>
```

## API 代理

项目包含 Cloudflare Worker 代理脚本 `worker/uptimerobot-proxy.js`，可部署到 Cloudflare Workers 解决跨域问题。

也可以使用 Nginx 代理：

```nginx
location /api/uptimerobot/ {
  proxy_ssl_server_name on;
  proxy_pass https://api.uptimerobot.com/;
  proxy_hide_header Access-Control-Allow-Origin;
  add_header Access-Control-Allow-Origin * always;
}
```

## 技术栈

- [Vite](https://vitejs.dev/) - 构建工具
- [React 18](https://react.dev/) - UI 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [TailwindCSS](https://tailwindcss.com/) - 样式框架
- [TanStack Query](https://tanstack.com/query) - 数据请求
- [Zustand](https://zustand-demo.pmnd.rs/) - 状态管理
- [Recharts](https://recharts.org/) - 图表库

## License

MIT

/**
 * 站点基础配置
 * vite.config.ts 和 src/config/config.ts 都会读取这个文件
 */
export default {
  // 网站部署路径
  // GitHub Pages 子路径部署时填仓库名，如 '/uptime-status/'
  // 使用自定义域名或根路径部署时填 '/'
  base: '/uptime-status/',

  // 网站地址（用于 SEO）
  siteUrl: 'https://ipme.github.io/uptime-status',
};

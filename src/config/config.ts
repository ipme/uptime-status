import type { AppConfig } from './types';
import siteConfig from '../../site.config';

/**
 * 应用配置文件
 * 修改此文件后需要重新构建
 */
const config: AppConfig = {
  // ===== 基础配置 =====

  // 网站地址（用于 SEO，从 site.config.ts 读取）
  siteUrl: siteConfig.siteUrl,

  // 网站标题
  siteName: '服务状态监控面板',

  // 网站描述（用于 SEO）
  siteDescription: '实时监控服务运行状态，查看历史可用性数据',

  // 网站关键词（用于 SEO）
  siteKeywords: '服务监控,状态页面,UptimeRobot,可用性监控',

  // UptimeRobot API Keys
  // 支持 Monitor-Specific 和 Read-Only API Key
  // 可以配置多个 key，会合并显示所有监控项
  apiKeys: ['ur886956-433bba331c320333431cec26'],

  // 自定义 API 代理地址（可选，用于解决跨域问题）
  // 留空则使用官方 API: https://api.uptimerobot.com/v2/getMonitors
  //apiUrl: 'https://upx-status.debian.workers.dev/v2/getMonitors',
  //apiUrl: 'https://javai.cn/api/uptimerobot/v2/getMonitors',

  apiUrl: 'https://upx-status.ifca.eu.org/v2/getMonitors',

  // ===== 显示配置 =====

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

  // ===== 缓存配置（单位：秒）=====

  // 自动刷新间隔（默认 5 分钟）
  refetchInterval: 300,

  // 数据新鲜时间，此时间内不会重新请求（默认 2 分钟）
  staleTime: 120,

  // 缓存保留时间（默认 10 分钟）
  cacheTime: 600,
};

export default config;

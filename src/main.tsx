import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { getConfig } from './config';
import './index.css';

// 设置 SEO 信息
const config = getConfig();
document.title = config.siteName;
document.querySelector('meta[name="description"]')?.setAttribute('content', config.siteDescription);

// 动态添加 keywords meta 标签
const keywordsMeta = document.createElement('meta');
keywordsMeta.name = 'keywords';
keywordsMeta.content = config.siteKeywords;
document.head.appendChild(keywordsMeta);

// 添加 canonical URL
const canonicalLink = document.createElement('link');
canonicalLink.rel = 'canonical';
canonicalLink.href = config.siteUrl;
document.head.appendChild(canonicalLink);

// 添加 Open Graph 标签
const ogTags = [
  { property: 'og:title', content: config.siteName },
  { property: 'og:description', content: config.siteDescription },
  { property: 'og:url', content: config.siteUrl },
  { property: 'og:type', content: 'website' },
];
ogTags.forEach(tag => {
  const meta = document.createElement('meta');
  meta.setAttribute('property', tag.property);
  meta.content = tag.content;
  document.head.appendChild(meta);
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: config.refetchInterval * 1000,
      staleTime: config.staleTime * 1000,
      gcTime: config.cacheTime * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

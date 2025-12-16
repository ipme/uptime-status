# Service Status Monitor

[中文文档](./README.md) | English

A modern service status monitoring panel based on UptimeRobot API.

Demo: [EdgeOne Pages Deployment](https://edgeone.ai)

![Preview](docs/images/preview.png)

## Features

- 🚀 **Modern Tech Stack** - Vite + React 18 + TypeScript + TailwindCSS
- 📊 **Data Visualization** - Uptime trend charts, response time graphs (dynamic Y-axis, theme-adaptive tooltips)
- 🔔 **Real-time Notifications** - Browser notifications (toggleable), page title status
- 🌓 **Theme Switching** - Dark/Light/System modes
- 📱 **Responsive Design** - Perfect mobile adaptation
- 🔍 **Search & Filter** - Search by name, filter by status (including paused), multiple sorting options
- 📅 **Time Range** - Support 30/60/90 days
- 📋 **Incident History** - Recent incidents with reasons (responsive layout)
- 🖼️ **Embed Mode** - Support iframe embedding
- 📲 **PWA Support** - Add to home screen
- 🔤 **Font Adaptation** - Auto-adapt to platform fonts
- 📈 **Visit Statistics** - Integrated Busuanzi analytics
- ♿ **Accessibility** - Keyboard navigation, screen reader support, skip links
- 🔄 **Smart Refresh** - Last update time, loading state, auto retry

## Quick Start

### EdgeOne Pages Deployment (Recommended)

1. Visit [EdgeOne Pages](https://edgeone.ai)
2. Connect your GitHub account
3. Select this repository
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Configure environment variables
6. Start deployment

#### EdgeOne Edge Functions (API Proxy)

EdgeOne automatically enables edge function API proxy after deployment:
- Proxy path: `https://your-domain.com/api/uptimerobot/v2/getMonitors`
- Automatically solves CORS issues
- Faster access speed in China

To use the proxy, set environment variable:
```
VITE_API_PROXY_URL=/api/uptimerobot/v2/getMonitors
```

### Local Development

```bash
# Install dependencies
npm install

# Copy environment variables config
cp .env.example .env

# Edit .env file, fill in your API Key
# VITE_UPTIME_API_KEYS=your-api-key

# Start dev server
npm run dev

# Build for production
npm run build
```

## Get API Key

1. Register at [UptimeRobot](https://uptimerobot.com/)
2. Add websites/services to monitor
3. Go to **My Settings** page
4. Find **API Settings** section
5. Click **Create Read-only API Key**
6. Copy the generated key (starts with `ur`)

> Note: Use Read-only API Key, not Main API Key, to prevent malicious operations if leaked.




## Embed Mode

Add `?embed=1` parameter to URL for minimal embed mode:

```html
<iframe src="https://your-domain.com/?embed=1" width="100%" height="600"></iframe>
```

## API Proxy

Due to browser CORS restrictions, direct UptimeRobot API calls will fail. You need a proxy.

### EdgeOne Edge Functions (Recommended)

EdgeOne Pages automatically includes edge function proxy:

1. After deploying to EdgeOne Pages, edge functions work automatically
2. Set environment variable `VITE_API_PROXY_URL` to `/api/uptimerobot/v2/getMonitors`
3. Edge function code is located at `edgeone/functions/api/uptimerobot/[[path]].js`

**Advantages**:
- ✅ No additional server needed
- ✅ Automatic CORS handling
- ✅ Edge node acceleration
- ✅ Same domain as static assets

### Nginx Proxy

If using your own server:

```nginx
location /api/uptimerobot/ {
  proxy_pass https://api.uptimerobot.com/;
  proxy_ssl_server_name on;

  proxy_hide_header Access-Control-Allow-Origin;
  proxy_hide_header Access-Control-Allow-Methods;
  proxy_hide_header Access-Control-Allow-Headers;

  add_header Access-Control-Allow-Origin * always;
  add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS' always;
  add_header Access-Control-Allow-Headers 'Content-Type' always;

  if ($request_method = 'OPTIONS') {
    return 204;
  }
}
```

### Cloudflare Worker

If using Cloudflare (see `worker/uptimerobot-proxy.js` for reference)

## Tech Stack

- [Vite](https://vitejs.dev/) - Build tool
- [React 18](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Recharts](https://recharts.org/) - Charts

## Custom Domain

EdgeOne Pages supports custom domain binding:

1. Bind your domain in EdgeOne console
2. Configure DNS resolution (CNAME or A record)
3. Access your site after DNS takes effect

## FAQ

**Q: Page shows "Failed to load data"?**

A: Usually a CORS issue. Configure API proxy as described above.

**Q: Data not updating?**

A: Default refresh is 5 minutes. Adjust `refetchInterval` in config. UptimeRobot free tier also checks every 5 minutes.

**Q: How to monitor multiple accounts?**

A: Add multiple API Keys to `apiKeys` array. Data will be merged automatically.

**Q: How to hide certain monitors?**

A: Create Monitor-Specific API Key in UptimeRobot dashboard. It will only return that monitor's data.

**Q: How to disable browser notifications?**

A: Click the notification icon in toolbar to toggle. Settings are saved automatically.

**Q: Page shows "Please configure API Key"?**

A: For EdgeOne Pages deployment, configure `VITE_UPTIME_API_KEYS` in environment variables. For local development, configure in `src/config/config.ts`.

**Q: EdgeOne Pages deployment failed?**

A: Check if environment variables are correctly configured, especially `VITE_UPTIME_API_KEYS` must have a valid API Key.

**Q: API proxy not working?**

A: Ensure environment variable `VITE_API_PROXY_URL` is set to `/api/uptimerobot/v2/getMonitors`, EdgeOne will automatically use edge functions for proxy.

## License

MIT

import { useAppStore } from '../store';
import { getConfig } from '../config';

export function Footer() {
  const embedMode = useAppStore((s) => s.embedMode);
  const config = getConfig();

  if (embedMode) return null;

  return (
    <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
      <p>
        基于{' '}
        <a
          href="https://uptimerobot.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:underline"
        >
          UptimeRobot
        </a>
        {' '}接口，检测频率 {config.refetchInterval / 60} 分钟
      </p>
      <p className="mt-1">
        &copy; {new Date().getFullYear()}{' '}
        <a
          href="https://github.com/lyhxx/uptime-status"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:underline"
        >
          {config.siteName}
        </a>
      </p>
    </footer>
  );
}

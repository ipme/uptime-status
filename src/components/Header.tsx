import { useTheme } from '../hooks/useTheme';
import { useAppStore } from '../store';
import { getConfig } from '../config';

export function Header() {
  const { theme, setTheme } = useTheme();
  const embedMode = useAppStore((s) => s.embedMode);
  const config = getConfig();

  if (embedMode) return null;

  return (
    <header className="bg-slate-900 text-white relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-green-400">{config.siteName}</h1>

        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (t: 'light' | 'dark' | 'system') => void;
}) {
  const nextTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const icon = theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '💻';

  return (
    <button
      onClick={nextTheme}
      className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
      title={`当前: ${theme === 'system' ? '跟随系统' : theme === 'dark' ? '深色' : '浅色'}`}
    >
      <span className="text-lg">{icon}</span>
    </button>
  );
}

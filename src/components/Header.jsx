import { Moon, Sun, Globe } from 'lucide-react';
import { useStore } from '../store/store';

export default function Header() {
  const { theme, setTheme, language, setLanguage } = useStore();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const languages = [
    { code: 'uz', label: 'O\'z' },
    { code: 'ru', label: 'Ру' },
    { code: 'en', label: 'En' },
    { code: 'kk', label: 'Қа' },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 md:left-72 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 z-30">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-900 rounded-lg p-1">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  language === code
                    ? 'bg-emerald-400 text-zinc-950'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

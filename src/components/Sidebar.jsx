import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Users, BookOpen, Play, Trophy, Brain, GraduationCap, Newspaper, Settings, Users2, Send, LogIn } from 'lucide-react';
import { useStore } from '../store/store';
import { t } from '../lib/i18n';

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, language } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/users', label: t(language, 'sidebar.users'), icon: Users },
    { path: '/tasks', label: t(language, 'sidebar.tasks'), icon: BookOpen },
    { path: '/attempts', label: t(language, 'sidebar.attempts'), icon: Play },
    { path: '/olympiads', label: t(language, 'sidebar.olympiads'), icon: Trophy },
    { path: '/quizzes', label: t(language, 'sidebar.quizzes'), icon: Brain },
    { path: '/courses', label: t(language, 'sidebar.courses'), icon: GraduationCap },
    { path: '/blogs', label: t(language, 'sidebar.blogs'), icon: Newspaper },
    { path: '/system', label: t(language, 'sidebar.system'), icon: Settings },
    { path: '/team', label: t(language, 'sidebar.team'), icon: Users2 },
  ];

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-400 text-zinc-950 rounded-lg"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 w-64 md:w-72 transition-transform duration-300 z-40 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              RoboContest
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">v2.0</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-emerald-400 transition-colors group"
              >
                <Icon size={20} className="group-hover:text-emerald-400" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-zinc-800 space-y-2">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-emerald-400 transition-colors group"
            >
              <LogIn size={20} className="group-hover:text-emerald-400" />
              <span className="text-sm font-medium">{t(language, 'sidebar.login')}</span>
            </Link>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

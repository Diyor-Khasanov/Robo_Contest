import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Search, RotateCw } from 'lucide-react';
import axios from 'axios';
import { useStore } from '../store/store';
import { t } from '../lib/i18n';

const API_URL = 'https://jsonplaceholder.typicode.com/';

const statusColors = {
  accepted: 'badge-success',
  'wrong answer': 'badge-danger',
  'compilation error': 'badge-warning',
  pending: 'badge-info',
};

export default function Attempts() {
  const { language } = useStore();
  const [language_filter, setLanguageFilter] = useState('');
  const [status, setStatus] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data: submissions = [], isLoading, refetch } = useQuery({
    queryKey: ['posts', language_filter, status],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/posts`, {
        params: { language: language_filter, status },
      });
      return res.data;
    },
  });

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => refetch(), 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, refetch]);

  const paginatedSubmissions = submissions.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(submissions.length / pageSize);

  const languages = ['python3', 'cpp', 'java', 'javascript', 'go', 'rust'];
  const statuses = ['accepted', 'wrong answer', 'compilation error', 'pending'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t(language, 'pages.attempts')}
        </h1>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            autoRefresh
              ? 'btn-primary'
              : 'btn-secondary'
          }`}
        >
          <RotateCw size={18} className={autoRefresh ? 'animate-spin' : ''} />
          Auto-refresh (30s)
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={language_filter}
          onChange={(e) => {
            setLanguageFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {t(language, 'common.loading')}
          </div>
        ) : paginatedSubmissions.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {t(language, 'common.noData')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Task</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Language</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Memory</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSubmissions.map((sub) => (
                  <tr key={sub.id} className="table-row">
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      {sub.users?.full_name || sub.users?.username}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {sub.tasks?.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">
                      {sub.language}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${statusColors[sub.status] || 'badge-info'}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {sub.execution_time}ms
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {sub.memory_used}MB
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                      {new Date(sub.submitted_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: Math.min(totalPages, 10) }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-2 rounded-lg transition-all ${
                page === i + 1
                  ? 'bg-emerald-400 text-zinc-950 font-semibold'
                  : 'bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

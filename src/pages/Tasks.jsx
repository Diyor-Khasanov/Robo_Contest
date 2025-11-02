import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Search, Shuffle, Download } from 'lucide-react';
import axios from 'axios';
import { useStore } from '../store/store';
import { t } from '../lib/i18n';

const API_URL = 'https://jsonplaceholder.typicode.com/';

const difficultyColors = {
  easy: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  hard: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

export default function Tasks() {
  const { language } = useStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', search, category],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/todos`, {
        params: { search, category },
      });
      return res.data;
    },
  });

  const paginatedTasks = tasks.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(tasks.length / pageSize);

  const categories = [...new Set(tasks.map((t) => t.category))].filter(Boolean);

  const handleDownloadCSV = () => {
    const csv = [
      ['ID', 'Title', 'Difficulty', 'Category', 'Solution %', 'Solvers'].join(','),
      ...tasks.map((t) =>
        [t.task_id, t.title, t.difficulty, t.category, t.solution_percentage, t.solver_count].join(
          ','
        )
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
  };

  const handleRandomTask = () => {
    if (tasks.length > 0) {
      const random = tasks[Math.floor(Math.random() * tasks.length)];
      window.location.hash = `/tasks/${random.id}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t(language, 'pages.tasks')}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadCSV}
            className="btn-primary flex items-center gap-2"
          >
            <Download size={18} />
            CSV
          </button>
          <button
            onClick={handleRandomTask}
            className="btn-primary flex items-center gap-2"
          >
            <Shuffle size={18} />
            Random
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t(language, 'common.search')}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {t(language, 'common.loading')}
          </div>
        ) : paginatedTasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {t(language, 'common.noData')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Difficulty</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Solution %</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Solvers</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTasks.map((task) => (
                  <tr key={task.id} className="table-row cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">
                      {task.task_id}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      {task.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${difficultyColors[task.difficulty] || 'badge-info'}`}>
                        {task.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {task.category}
                    </td>
                    <td className="px-6 py-4 text-emerald-400 font-semibold">
                      {task.solution_percentage}%
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {task.solver_count}
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

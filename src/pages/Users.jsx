import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Medal, Search } from 'lucide-react';
import axios from 'axios';
import { useStore } from '../store/store';
import { t } from '../lib/i18n';

const API_URL = 'https://jsonplaceholder.typicode.com/';

export default function Users() {
  const { language } = useStore();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', search, sortBy],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/users`, {
        params: { search, sort: sortBy },
      });
      return res.data;
    },
  });

  const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(users.length / pageSize);

  const getMedalIcon = (index) => {
    if (index === 0) return <Medal className="w-5 h-5 text-yellow-400" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Medal className="w-5 h-5 text-orange-400" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t(language, 'pages.users')}
        </h1>
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
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="rating">{t(language, 'common.sort')} - Rating</option>
          <option value="robo_rating">RoboRating</option>
          <option value="solved_count">Solved</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {t(language, 'common.loading')}
          </div>
        ) : paginatedUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {t(language, 'common.noData')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Rank</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Ism Familiya</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">RoboRating</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Rating</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Solved</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, idx) => (
                  <tr key={user.id} className="table-row">
                    <td className="px-6 py-4 flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        #{(page - 1) * pageSize + idx + 1}
                      </span>
                      {idx < 3 && getMedalIcon(idx)}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      {user.full_name || user.username}
                    </td>
                    <td className="px-6 py-4 text-emerald-400 font-semibold">
                      {user.robo_rating || 0}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {user.rating || 0}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {user.solved_count || 0}
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
          {Array.from({ length: totalPages }).map((_, i) => (
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

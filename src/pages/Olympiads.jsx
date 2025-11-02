import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { useStore } from '../store/store';
import { t } from '../lib/i18n';
import { Calendar, Users } from 'lucide-react';

const API_URL = 'https://jsonplaceholder.typicode.com/';

export default function Olympiads() {
  const { language } = useStore();
  const [tab, setTab] = useState('official');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: olympiads = [], isLoading } = useQuery({
    queryKey: ['albums', tab],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/albums`, {
        params: { type: tab },
      });
      return res.data;
    },
  });

  const paginatedOlympiads = olympiads.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(olympiads.length / pageSize);

  const getStatus = (start_time, duration_minutes) => {
    const now = new Date();
    const start = new Date(start_time);
    const end = new Date(start.getTime() + duration_minutes * 60000);

    if (now < start) return { text: 'Upcoming', color: 'badge-info' };
    if (now > end) return { text: 'Finished', color: 'badge-danger' };
    return { text: 'Active', color: 'badge-success' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t(language, 'pages.olympiads')}
        </h1>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-zinc-800">
        {['official', 'practice'].map((type) => (
          <button
            key={type}
            onClick={() => {
              setTab(type);
              setPage(1);
            }}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              tab === type
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {t(language, 'common.loading')}
          </div>
        ) : paginatedOlympiads.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {t(language, 'common.noData')}
          </div>
        ) : (
          paginatedOlympiads.map((olympiad) => {
            const status = getStatus(olympiad.start_time, olympiad.duration_minutes);
            return (
              <div
                key={olympiad.id}
                className="card p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {olympiad.title}
                      </h3>
                      <span className={`badge ${status.color}`}>{status.text}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {olympiad.description}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <BookOpen size={16} />
                        {olympiad.problems_count} Problems
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={16} />
                        {olympiad.participants_count} Participants
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(olympiad.start_time).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
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

import { BookOpen } from 'lucide-react';

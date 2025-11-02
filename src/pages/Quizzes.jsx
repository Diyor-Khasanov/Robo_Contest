import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { useStore } from '../store/store';
import { t } from '../lib/i18n';
import { Calendar, Users } from 'lucide-react';

const API_URL = 'https://fakestoreapi.com/';

export default function Quizzes() {
  const { language } = useStore();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: quizzes = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/products`);
      return res.data;
    },
  });

  const paginatedQuizzes = quizzes.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(quizzes.length / pageSize);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t(language, 'pages.quizzes')}
      </h1>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {t(language, 'common.loading')}
          </div>
        ) : paginatedQuizzes.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {t(language, 'common.noData')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Questions</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Participants</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Start Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuizzes.map((quiz) => {
                  const status = new Date() > new Date(quiz.start_time) ? 'Finished' : 'Upcoming';
                  return (
                    <tr key={quiz.id} className="table-row">
                      <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                        {quiz.title}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {quiz.total_questions}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {quiz.participants_count}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                        {new Date(quiz.start_time).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge ${status === 'Finished' ? 'badge-danger' : 'badge-info'}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
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
                  : 'bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white'
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

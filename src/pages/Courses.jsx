import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { useStore } from '../store/store';
import { t } from '../lib/i18n';

const API_URL = 'https://api.escuelajs.co/api/v1/products';

export default function Courses() {
  const { language } = useStore();
  const [filter, setFilter] = useState('');

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['product', filter],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}`, {
        params: { is_free: filter ? filter === 'free' : undefined },
      });
      return res.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t(language, 'pages.courses')}
        </h1>
      </div>

      <div className="flex gap-4">
        {['all', 'free', 'paid'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f === 'all' ? '' : f)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              (!filter && f === 'all') || (filter === f && f !== 'all')
                ? 'btn-primary'
                : 'btn-secondary'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {t(language, 'common.loading')}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {t(language, 'common.noData')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="card overflow-hidden hover:shadow-xl transition-shadow">
              {course.image_url && (
                <div className="w-full h-48 bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1">
                    {course.title}
                  </h3>
                  <span className={`badge ${course.is_free ? 'badge-success' : 'badge-warning'}`}>
                    {course.is_free ? 'Bepul' : `$${course.price}`}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {course.author}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {course.description}
                </p>
                <button className="btn-primary w-full">Ochish</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

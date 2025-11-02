import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { useStore } from '../store/store';
import { t } from '../lib/i18n';
import { Heart, Eye } from 'lucide-react';

const API_URL = 'https://dummy-json.mock.beeceptor.com';

export default function Blogs() {
  const { language } = useStore();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['quotes', search],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/quotes`, {
        params: { search },
      });
      return res.data;
    },
  });

  const paginatedBlogs = blogs.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(blogs.length / pageSize);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t(language, 'pages.blogs')}
      </h1>

      <input
        type="text"
        placeholder={t(language, 'common.search')}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {t(language, 'common.loading')}
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {t(language, 'common.noData')}
          </div>
        ) : (
          paginatedBlogs.map((blog) => (
            <div key={blog.id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                {blog.thumbnail_url && (
                  <img
                    src={blog.thumbnail_url}
                    alt={blog.title}
                    className="w-24 h-24 rounded object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    By {blog.users?.full_name || blog.users?.username}
                  </p>
                  <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400">
                    {blog.read_time && <span>{blog.read_time} min read</span>}
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {blog.views || 0}
                    </span>
                    <span className="flex items-center gap-1 text-red-400">
                      <Heart size={14} />
                      {blog.likes || 0}
                    </span>
                  </div>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="badge badge-info"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
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

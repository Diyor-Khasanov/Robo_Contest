import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStore } from '../store/store';
import { t } from '../lib/i18n';

const API_URL = 'http://localhost:5000/api';

export default function System() {
  const { language } = useStore();

  const { data: compilers = [], isLoading } = useQuery({
    queryKey: ['compilers'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/compilers`);
      return res.data;
    },
  });

  const statuses = [
    { name: 'Accepted', color: 'badge-success' },
    { name: 'Wrong Answer', color: 'badge-danger' },
    { name: 'Compilation Error', color: 'badge-warning' },
    { name: 'Runtime Error', color: 'badge-danger' },
    { name: 'Time Limit Exceeded', color: 'badge-warning' },
    { name: 'Memory Limit Exceeded', color: 'badge-warning' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t(language, 'pages.system')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Supported Compilers
          </h2>
          {isLoading ? (
            <div className="text-gray-500 dark:text-gray-400">{t(language, 'common.loading')}</div>
          ) : (
            <div className="space-y-2">
              {compilers.map((compiler) => (
                <div
                  key={compiler.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {compiler.language}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {compiler.version}
                    </p>
                  </div>
                  <span className={`badge ${compiler.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                    {compiler.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Verdict Types
          </h2>
          <div className="space-y-2">
            {statuses.map((status) => (
              <div key={status.name} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <span className={`badge ${status.color}`}>{status.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Sample Code
        </h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`}
        </pre>
      </div>
    </div>
  );
}

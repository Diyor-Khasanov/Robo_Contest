import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStore } from './store/store';

import Layout from './components/Layout';
import Users from './pages/Users';
import Tasks from './pages/Tasks';
import Attempts from './pages/Attempts';
import Olympiads from './pages/Olympiads';
import Quizzes from './pages/Quizzes';
import Courses from './pages/Courses';
import Blogs from './pages/Blogs';
import System from './pages/System';
import Team from './pages/Team';
import Login from './pages/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
});

function App() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/tasks" replace />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/attempts" element={<Attempts />} />
                  <Route path="/olympiads" element={<Olympiads />} />
                  <Route path="/quizzes" element={<Quizzes />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/system" element={<System />} />
                  <Route path="/team" element={<Team />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

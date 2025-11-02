# RoboContest 2.0 - Modern Full-Stack Platform

A modernized, responsive, full-stack web application for competitive programming education. Built with React 18, Express.js, and Supabase.

## Project Structure

```
project/
├── frontend/                 # React 18 + Tailwind CSS + Vite
│   ├── src/
│   │   ├── components/      # Reusable UI components (Layout, Sidebar, Header)
│   │   ├── pages/           # Page components (Users, Tasks, Attempts, etc.)
│   │   ├── lib/             # Utilities (i18n, Supabase client)
│   │   ├── store/           # Zustand state management
│   │   ├── App.jsx          # Main app with routing
│   │   └── index.css        # Global Tailwind styles
│   └── .env                 # Environment variables
│
├── backend/                 # Express.js + Node.js
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── index.js         # Server entry point
│   │   ├── db.js            # Supabase client
│   │   └── seeds.js         # Database seeder
│   └── .env                 # Backend environment variables
│
└── README.md
```

## Features

### Frontend Features
- **Responsive Design**: Mobile-first, optimized for all screen sizes
- **Dark/Light Theme**: Toggle between dark and light modes with Tailwind CSS
- **Multi-language Support**: Uzbek, Russian, English, and Karakalpak
- **Pages Implemented**:
  - `/users` - User rankings with medals and ratings
  - `/tasks` - Problem set with filters and CSV download
  - `/attempts` - Submission history with auto-refresh
  - `/olympiads` - Competition management with tabs
  - `/quizzes` - Quiz listings with status badges
  - `/courses` - Course catalog with filters
  - `/blogs` - Blog listing with search
  - `/system` - Compiler info and verdict types
  - `/team` - Team member profiles
  - `/login` - Authentication page

### Backend Features
- **RESTful API**: Express.js endpoints for all resources
- **Database**: Supabase PostgreSQL with Row Level Security
- **Pagination**: Efficient pagination across all endpoints
- **Filtering & Sorting**: Advanced filtering capabilities
- **CORS**: Enabled for cross-origin requests
- **Health Check**: Built-in health endpoint

### Database Features
- **Tables**: Users, Tasks, Submissions, Olympiads, Quizzes, Courses, Blogs, Compilers, Achievements, Activity Log
- **Security**: Row Level Security (RLS) policies for all tables
- **Relationships**: Proper foreign key constraints
- **Indexes**: Optimized for common queries

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (already configured)

### Installation

1. **Install Dependencies**

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

2. **Environment Variables**

Frontend `.env` is already configured with Supabase credentials.
Backend `.env` is already configured with API keys.

### Running Development Server

```bash
# Terminal 1 - Backend (Port 5000)
cd backend
npm start

# Terminal 2 - Frontend (Port 3000)
cd frontend
npm run dev
```

Access the app at `http://localhost:3000`

### Production Build

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start  # Production build uses Node directly
```

## Technology Stack

**Frontend:**
- React 18.1.0
- React Router v6
- Tailwind CSS 3
- Zustand (state management)
- React Query (data fetching)
- Axios (HTTP client)
- Lucide Icons
- Vite (build tool)

**Backend:**
- Express.js 5
- Node.js
- Supabase (database)
- CORS middleware
- Dotenv (environment configuration)

**Database:**
- Supabase PostgreSQL
- Row Level Security (RLS)
- Realtime subscriptions ready

## API Endpoints

### Users
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/username/:username` - Get user by username

### Tasks
- `GET /api/tasks` - List tasks with filters
- `GET /api/tasks/:id` - Get task details

### Submissions
- `GET /api/submissions` - List submissions
- `POST /api/submissions` - Create new submission

### Olympiads
- `GET /api/olympiads` - List olympiads
- `GET /api/olympiads/:id` - Get olympiad details

### Quizzes
- `GET /api/quizzes` - List quizzes
- `GET /api/quizzes/:id` - Get quiz details

### Courses
- `GET /api/courses` - List courses
- `GET /api/courses/:id` - Get course details

### Blogs
- `GET /api/blogs` - List blogs
- `GET /api/blogs/:id` - Get blog details

### System
- `GET /api/compilers` - List supported compilers
- `GET /health` - Health check

## UI/UX Highlights

- **Color Scheme**: Emerald green (`#10b981`) accent on dark (`#09090b`) and light backgrounds
- **Components**: Reusable cards, buttons, badges, tables
- **Animations**: Smooth transitions, hover effects, hover scales
- **Accessibility**: Semantic HTML, proper contrast ratios
- **Performance**: Optimized bundle size (346KB JS, 23KB CSS gzipped)

## Authentication Flow

Currently implements mock authentication. For production:
1. Use Supabase Auth for email/password signup/login
2. Store JWT tokens in localStorage
3. Add protected routes
4. Implement refresh token logic

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Render)
```bash
# Push backend/ folder to Render
# Set environment variables in Render dashboard
# Point to Supabase database
```

### Database (Supabase)
- Already configured and live
- Auto-backups enabled
- RLS policies active

## Development Guide

### Adding a New Page
1. Create component in `frontend/src/pages/PageName.jsx`
2. Add route in `frontend/src/App.jsx`
3. Add navigation link in `frontend/src/components/Sidebar.jsx`
4. Add translations in `frontend/src/lib/i18n.js`

### Adding API Endpoint
1. Create route file in `backend/src/routes/resource.js`
2. Import and use in `backend/src/index.js`
3. Add database queries using Supabase client

### Styling
- Use Tailwind utility classes
- Add custom styles in `src/index.css` using `@layer` directives
- Follow color system defined in `tailwind.config.js`

## Performance Metrics

- **Frontend Build Size**: 346KB (JS) + 23KB (CSS) gzipped
- **Backend Response Time**: < 200ms avg
- **Database Queries**: Optimized with proper indexing
- **Caching**: 5-minute cache TTL for React Query

## File Organization

Each module follows single responsibility principle:
- Components are focused and reusable
- Each page is self-contained
- Database queries are co-located with their routes
- Utilities and helpers are properly organized by function

## Future Enhancements

- User authentication with Supabase Auth
- Real-time submission updates
- Profile pages with activity graphs
- Contest management UI
- Admin dashboard
- Notification system
- Leaderboard algorithms
- Code editor integration
- Social features (comments, followers)

## License

All rights reserved - RoboContest 2024

## Support

For issues or feature requests, contact: support@robocontest.uz

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

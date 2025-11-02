import { create } from 'zustand';

export const useStore = create((set) => ({
  theme: localStorage.getItem('theme') || 'dark',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },

  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

  language: localStorage.getItem('language') || 'uz',
  setLanguage: (language) => {
    localStorage.setItem('language', language);
    set({ language });
  },

  sidebarOpen: window.innerWidth > 768,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

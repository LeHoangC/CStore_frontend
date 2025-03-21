import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            tokens: null,
            login: (user, tokens) => set({ user, tokens }),
            logout: () => set({ user: null, tokens: null }),
        }),
        {
            name: 'auth-storage', // Tên key trong localStorage
        }
    )
);


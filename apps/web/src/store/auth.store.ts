import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    clearAccessToken: () => void;
}


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            setAccessToken: (token: string | null) => set({ accessToken: token }),
            clearAccessToken: () => set({ accessToken: null }),
        }),
        {
            name: 'auth-storage', // המפתח ב-localStorage
        }
    )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OPERATOR' | 'CUSTOMER';
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        if (email === 'romulogomescavalcante7@gmail.com' && password === '23782613') {
          set({ 
            isAuthenticated: true, 
            user: { id: 'usr-admin', name: 'Rômulo Cavalcante', email, role: 'ADMIN' } 
          });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

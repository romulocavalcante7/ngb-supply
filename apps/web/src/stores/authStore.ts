import { create } from 'zustand';

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

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    // Simulação de delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Autenticação fixa para o Super Admin
    if (email === 'romulogomescavalcante7@gmail.com' && password === '23782613') {
      set({ 
        isAuthenticated: true, 
        user: { id: 'usr-admin', name: 'Rômulo Cavalcante', email, role: 'ADMIN' } 
      });
      return true;
    }
    
    // Se não bater a senha
    return false;
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));

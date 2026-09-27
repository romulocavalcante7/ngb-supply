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
    
    // Autenticação mock (aceita qualquer coisa para fins de demonstração,
    // mas simula que logou como o Administrador)
    if (email && password) {
      set({ 
        isAuthenticated: true, 
        user: { id: 'usr-1111', name: 'Admin Geral', email, role: 'ADMIN' } 
      });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));

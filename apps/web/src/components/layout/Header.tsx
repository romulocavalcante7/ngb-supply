import { Bell, Menu, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="h-20 border-b border-[var(--color-card-border)] bg-[var(--color-bg-dark)]/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-400 hover:text-slate-200">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-full px-4 py-2 w-96 transition-all focus-within:border-primary/50 focus-within:shadow-[0_0_10px_rgba(59,130,246,0.1)]">
          <Search className="w-4 h-4 text-slate-500 mr-2" />
          <input 
            type="text" 
            placeholder="Buscar cargas, eventos..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-400">WebSocket Online</span>
        </div>
        
        <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full border border-[var(--color-bg-dark)]"></span>
        </button>
      </div>
    </header>
  );
}

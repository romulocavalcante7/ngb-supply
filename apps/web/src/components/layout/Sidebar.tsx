import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, Activity, ShieldAlert, Package, Compass, Car, Users, Map, Settings2, BarChart2, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export function Sidebar() {
  const { user, logout } = useAuthStore();
  
  const menus = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Gestão de Cargas', path: '/loads', icon: Truck },
    { name: 'Viagens', path: '/trips', icon: Map },
    { name: 'Veículos', path: '/vehicles', icon: Car },
    { name: 'Motoristas', path: '/drivers', icon: Users },
    { name: 'Mapa (Rastreamento)', path: '/tracking', icon: Compass },
    { name: 'Telemetria', path: '/telemetry', icon: BarChart2 },
    { name: 'Monitor de Dados', path: '/events', icon: Activity },
    { name: 'Regras de Risco', path: '/risk-rules', icon: Settings2 },
    { name: 'Alertas', path: '/alerts', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 bg-[var(--color-card-dark)] border-r border-[var(--color-card-border)] hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Package className="w-6 h-6 text-primary glow-text" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-100">NGB Supply</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-[var(--color-card-border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-slate-300">OP</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-slate-200 truncate">{user?.name || 'Operador'}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email || 'Central de Risco'}</p>
          </div>
          
          <button onClick={logout} className="p-2 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors ml-auto" title="Sair">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

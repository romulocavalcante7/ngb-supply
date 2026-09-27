import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, Activity, ShieldAlert, Package } from 'lucide-react';

export function Sidebar() {
  const menus = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Cargas', path: '/loads', icon: Truck },
    { name: 'Pub/Sub Monitor', path: '/events', icon: Activity },
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
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-300">OP</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">Operador</p>
            <p className="text-xs text-slate-500">Central de Risco</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

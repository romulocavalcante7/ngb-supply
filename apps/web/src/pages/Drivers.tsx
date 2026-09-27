import { Users, Search, Filter, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Drivers() {
  const mockDrivers = [
    { id: 'D-001', name: 'Carlos Silva', cnh: '999.888.777-66', category: 'E', status: 'ACTIVE', phone: '(11) 99999-8888' },
    { id: 'D-002', name: 'Roberto Santos', cnh: '111.222.333-44', category: 'E', status: 'IN_TRIP', phone: '(11) 97777-6666' },
    { id: 'D-003', name: 'Ana Souza', cnh: '555.444.333-22', category: 'D', status: 'VACATION', phone: '(11) 95555-4444' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Users className="text-accent w-6 h-6" />
            Gestão de Motoristas
          </h1>
          <p className="text-slate-400 text-sm">Cadastro de condutores, CNH e disponibilidade</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" /> Filtrar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Novo Motorista
          </Button>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou CNH..." 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Nome</th>
                <th className="px-6 py-4 font-medium">CNH (Cat)</th>
                <th className="px-6 py-4 font-medium">Contato</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300">
              {mockDrivers.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-200">{d.name}</div>
                    <div className="text-xs text-slate-500">{d.id}</div>
                  </td>
                  <td className="px-6 py-4">{d.cnh} ({d.category})</td>
                  <td className="px-6 py-4">{d.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      d.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      d.status === 'IN_TRIP' ? 'bg-primary/10 text-primary border-primary/20' : 
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

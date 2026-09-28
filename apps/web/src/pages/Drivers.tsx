import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Search, Filter, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Drawer } from '../components/ui/Drawer';
import { useToastStore } from '../stores/toastStore';

export function Drivers() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', cnh: '', category: 'C', status: 'ACTIVE', phone: '' });
  const addToast = useToastStore(state => state.addToast);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/drivers`);
      setDrivers(response.data);
    } catch (error) {
      addToast('Erro ao buscar motoristas', 'error');
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/drivers/${editingId}`, formData);
        addToast('Motorista atualizado com sucesso', 'success');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/drivers`, formData);
        addToast('Motorista cadastrado com sucesso', 'success');
      }
      setIsDrawerOpen(false);
      fetchDrivers();
    } catch (error) {
      addToast('Erro ao salvar motorista', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Deseja realmente excluir este motorista?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/drivers/${id}`);
        addToast('Motorista excluído', 'success');
        fetchDrivers();
      } catch (error) {
        addToast('Erro ao excluir motorista', 'error');
      }
    }
  };

  const openNew = () => {
    setEditingId(null);
    setFormData({ name: '', cnh: '', category: 'C', status: 'ACTIVE', phone: '' });
    setIsDrawerOpen(true);
  };

  const openEdit = (driver: any) => {
    setEditingId(driver.id);
    setFormData({
      name: driver.name,
      cnh: driver.cnh,
      category: driver.category,
      status: driver.status,
      phone: driver.phone || ''
    });
    setIsDrawerOpen(true);
  };

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
          <Button onClick={openNew}>
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
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhum motorista cadastrado ainda.
                  </td>
                </tr>
              ) : drivers.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-200">{d.name}</div>
                    <div className="text-xs text-slate-500">{d.id.substring(0,8)}</div>
                  </td>
                  <td className="px-6 py-4">{d.cnh} ({d.category})</td>
                  <td className="px-6 py-4">{d.phone || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      d.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      d.status === 'IN_TRIP' ? 'bg-primary/10 text-primary border-primary/20' : 
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(d)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(d.id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingId ? 'Editar Motorista' : 'Novo Motorista'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Nome Completo</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">CNH</label>
            <input
              required
              type="text"
              value={formData.cnh}
              onChange={e => setFormData({...formData, cnh: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Categoria</label>
            <select
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-primary outline-none"
            >
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-primary outline-none"
            >
              <option value="ACTIVE">Ativo</option>
              <option value="VACATION">Férias</option>
              <option value="IN_TRIP">Em Viagem</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Telefone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-primary outline-none"
            />
          </div>
          <div className="pt-4 flex gap-2">
            <Button type="submit" className="flex-1">Salvar</Button>
            <Button type="button" variant="secondary" onClick={() => setIsDrawerOpen(false)}>Cancelar</Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Car, Search, Plus, Trash2, Edit2, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import axios from 'axios';
import { useToastStore } from '../stores/toastStore';

export function Vehicles() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { addToast } = useToastStore();
  
  // Form state
  const [formData, setFormData] = useState({
    plate: '', model: '', brand: '', type: 'Carreta', capacity: '', year: new Date().getFullYear().toString(), status: 'AVAILABLE'
  });

  const loadVehicles = () => {
    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/vehicles`)
      .then(res => setVehicles(res.data))
      .catch(() => addToast('Erro ao carregar veículos', 'error'));
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/vehicles/${editingId}`, formData);
        addToast('Veículo atualizado com sucesso!', 'success');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/vehicles`, formData);
        addToast('Veículo cadastrado com sucesso!', 'success');
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ plate: '', model: '', brand: '', type: 'Carreta', capacity: '', year: '2024', status: 'AVAILABLE' });
      loadVehicles();
    } catch (error) {
      addToast('Erro ao salvar veículo.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este veículo?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/vehicles/${id}`);
      addToast('Veículo deletado com sucesso!', 'success');
      loadVehicles();
    } catch (error) {
      addToast('Erro ao deletar. O veículo pode estar em viagem.', 'error');
    }
  };

  const openEdit = (vehicle: any) => {
    setFormData({
      plate: vehicle.plate, model: vehicle.model, brand: vehicle.brand || '', 
      type: vehicle.type || 'Carreta', capacity: vehicle.capacity?.toString() || '', 
      year: vehicle.year?.toString() || '2024', status: vehicle.status
    });
    setEditingId(vehicle.id);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Car className="text-accent w-6 h-6" />
            Gestão de Veículos
          </h1>
          <p className="text-slate-400 text-sm">Controle completo (CRUD) da frota</p>
        </div>
        
        <Button onClick={() => { setEditingId(null); setFormData({ plate: '', model: '', brand: '', type: 'Carreta', capacity: '', year: '2024', status: 'AVAILABLE' }); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Novo Veículo
        </Button>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por placa..." 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Placa / ID</th>
                <th className="px-6 py-4 font-medium">Modelo</th>
                <th className="px-6 py-4 font-medium">Capacidade</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-200">{v.plate}</div>
                    <div className="text-xs text-slate-500">{v.id}</div>
                  </td>
                  <td className="px-6 py-4">{v.model} ({v.brand})</td>
                  <td className="px-6 py-4">{v.capacity} kg</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      v.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      v.status === 'IN_TRIP' ? 'bg-primary/10 text-primary border-primary/20' : 
                      'bg-warning/10 text-warning border-warning/20'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" size="sm" onClick={() => openEdit(v)}>
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <button onClick={() => handleDelete(v.id)} className="p-2 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Nenhum veículo cadastrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
            <div className="flex justify-between items-center p-6 border-b border-slate-800">
              <h2 className="text-lg font-bold text-slate-100">{editingId ? 'Editar Veículo' : 'Novo Veículo'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Placa *</label>
                  <input required value={formData.plate} onChange={e => setFormData({...formData, plate: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-primary" placeholder="ABC-1234" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Capacidade (kg) *</label>
                  <input required type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-primary" placeholder="25000" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Modelo *</label>
                  <input required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-primary" placeholder="FH 540" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Marca *</label>
                  <input required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-primary" placeholder="Volvo" />
                </div>
              </div>

              {editingId && (
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-primary">
                    <option value="AVAILABLE">Disponível</option>
                    <option value="IN_TRIP">Em Viagem</option>
                    <option value="MAINTENANCE">Em Manutenção</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-800">
                <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button type="submit">Salvar Veículo</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

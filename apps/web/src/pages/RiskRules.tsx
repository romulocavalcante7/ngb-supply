import { Settings2, Plus, Edit2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function RiskRules() {
  const mockRules = [
    { id: 'R-001', name: 'Temperatura Alta (Crítica)', metric: 'Temperatura', operator: '>', threshold: '10 °C', severity: 'HIGH', active: true },
    { id: 'R-002', name: 'Temperatura Alta (Atenção)', metric: 'Temperatura', operator: '>', threshold: '8 °C', severity: 'MEDIUM', active: true },
    { id: 'R-003', name: 'Excesso de Velocidade', metric: 'Velocidade', operator: '>', threshold: '100 km/h', severity: 'HIGH', active: true },
    { id: 'R-004', name: 'Bateria Baixa', metric: 'Bateria Sensor', operator: '<', threshold: '20 %', severity: 'HIGH', active: true },
    { id: 'R-005', name: 'Desvio de Rota (> 5km)', metric: 'GPS', operator: '!=', threshold: 'Rota Planejada', severity: 'MEDIUM', active: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Settings2 className="text-accent w-6 h-6" />
            Regras de Risco
          </h1>
          <p className="text-slate-400 text-sm">Configuração de parâmetros para disparos de alertas do Pub/Sub</p>
        </div>
        
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Nova Regra
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRules.map((rule) => (
          <div key={rule.id} className="glass-panel p-6 relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-400 transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${rule.active ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`} />
              <h3 className="font-semibold text-slate-200">{rule.name}</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Métrica</span>
                <span className="text-slate-300 font-medium">{rule.metric}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Condição</span>
                <span className="text-slate-300 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {rule.operator} {rule.threshold}
                </span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-slate-500">Severidade</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  rule.severity === 'HIGH' ? 'bg-danger/10 text-danger border border-danger/20' : 
                  'bg-warning/10 text-warning border border-warning/20'
                }`}>
                  {rule.severity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

const mockAlerts = [
  { id: 'ALT-101', loadId: 'CARGA-001', type: 'TEMPERATURA_ALTA', severity: 'ALTA', message: 'Temperatura acima do limite permitido (> 10°C) - 12.8°C', status: 'OPEN', time: '10:20' },
  { id: 'ALT-102', loadId: 'CARGA-003', type: 'PORTA_ABERTA', severity: 'MEDIA', message: 'A porta da carga foi aberta durante o trajeto', status: 'ACKNOWLEDGED', time: '09:14' },
  { id: 'ALT-103', loadId: 'CARGA-002', type: 'TEMPERATURA_ATENCAO', severity: 'BAIXA', message: 'Temperatura em nível de atenção (8°C - 10°C) - 8.5°C', status: 'RESOLVED', time: '07:30' },
];

export function Alerts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="text-danger w-6 h-6" />
            Central de Alertas
          </h1>
          <p className="text-slate-400 text-sm">Gerencie incidentes e desvios de padrão detectados pelos sensores.</p>
        </div>
        
        <div className="flex gap-2">
          <select className="glass-panel px-4 py-2 text-sm text-slate-300 outline-none appearance-none">
            <option value="ALL">Todos os Alertas</option>
            <option value="OPEN">Abertos</option>
            <option value="ACKNOWLEDGED">Em Análise</option>
            <option value="RESOLVED">Resolvidos</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {mockAlerts.map(alert => (
          <div key={alert.id} className={`glass-panel p-5 border-l-4 ${
            alert.severity === 'ALTA' ? 'border-l-danger bg-danger/5' :
            alert.severity === 'MEDIA' ? 'border-l-warning bg-warning/5' :
            'border-l-primary bg-primary/5'
          }`}>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex gap-4">
                <div className={`p-3 rounded-full h-fit ${
                  alert.severity === 'ALTA' ? 'bg-danger/20 text-danger' :
                  alert.severity === 'MEDIA' ? 'bg-warning/20 text-warning' :
                  'bg-primary/20 text-primary'
                }`}>
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-slate-200">{alert.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">{alert.loadId}</span>
                  </div>
                  <p className="text-sm text-slate-300">{alert.message}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {alert.time}</span>
                    <span className="font-medium">
                      Severidade: <span className={alert.severity === 'ALTA' ? 'text-danger' : alert.severity === 'MEDIA' ? 'text-warning' : 'text-primary'}>{alert.severity}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 md:flex-col justify-center">
                {alert.status === 'OPEN' && (
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors w-full">
                    Reconhecer
                  </button>
                )}
                {alert.status !== 'RESOLVED' && (
                  <button className="px-4 py-2 bg-success/20 hover:bg-success/30 text-emerald-400 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2 w-full">
                    <CheckCircle2 className="w-4 h-4" />
                    Resolver
                  </button>
                )}
                {alert.status === 'RESOLVED' && (
                  <span className="text-emerald-500 text-xs font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Resolvido
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

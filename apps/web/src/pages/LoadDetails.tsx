import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Thermometer, Truck, Navigation, Activity, CheckCircle, ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LoadDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/loads" className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{id || 'CARGA-001'}</h1>
          <p className="text-slate-400 text-sm">Goiânia - GO → Brasília - DF</p>
        </div>
        <div className="ml-auto">
          <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            EM TRÂNSITO
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Informações Gerais</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-slate-500">Cliente</div>
              <div className="text-sm font-medium text-slate-200">Cliente Alpha S/A</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Veículo / Motorista</div>
              <div className="text-sm font-medium text-slate-200">Volvo FH (ABC-1234) • Carlos Silva</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Tipo de Carga</div>
              <div className="text-sm font-medium text-slate-200">Refrigerada Sensível</div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Telemetria ao Vivo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <Thermometer className="w-5 h-5 text-primary mb-2" />
              <div className="text-xs text-slate-500">Temperatura</div>
              <div className="text-lg font-bold text-slate-200">8.4 °C</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <Navigation className="w-5 h-5 text-emerald-500 mb-2" />
              <div className="text-xs text-slate-500">Velocidade</div>
              <div className="text-lg font-bold text-slate-200">72 km/h</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <Truck className="w-5 h-5 text-accent mb-2" />
              <div className="text-xs text-slate-500">Status da Porta</div>
              <div className="text-lg font-bold text-slate-200">Fechada</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <Activity className="w-5 h-5 text-warning mb-2" />
              <div className="text-xs text-slate-500">Bateria do Sensor</div>
              <div className="text-lg font-bold text-slate-200">86%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Linha do Tempo (Supply Chain)</h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-emerald-500 bg-slate-900 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
              </div>
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-slate-200 text-sm">Carregamento Concluído</div>
                  <time className="text-xs font-medium text-emerald-500">08:00</time>
                </div>
                <div className="text-slate-400 text-xs">CD Goiânia</div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary bg-slate-900 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              </div>
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl bg-slate-900 border border-primary/30">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-slate-200 text-sm">Em Trânsito</div>
                  <time className="text-xs font-medium text-primary">Agora</time>
                </div>
                <div className="text-slate-400 text-xs">Aproximando-se do destino</div>
              </div>
            </div>

          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex justify-between">
            <span>Histórico de Eventos (Pub/Sub)</span>
            <Button size="sm" variant="secondary">Ver Logs Completos</Button>
          </h3>
          <div className="flex-1 space-y-3 overflow-y-auto">
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 flex gap-3 items-start">
              <Thermometer className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-slate-200 font-medium">Temperatura atualizada</p>
                <p className="text-xs text-slate-500">Payload: 8.4°C</p>
              </div>
              <span className="text-xs text-slate-500 ml-auto">Há 2 min</span>
            </div>
            <div className="p-3 rounded-lg border border-danger/30 bg-danger/10 flex gap-3 items-start">
              <ShieldAlert className="w-4 h-4 text-danger mt-0.5" />
              <div>
                <p className="text-sm text-danger font-medium">Alerta: Temperatura Alta</p>
                <p className="text-xs text-danger/70">Temperatura atingiu 11.2°C</p>
              </div>
              <span className="text-xs text-slate-500 ml-auto">Há 45 min</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 flex gap-3 items-start">
              <Navigation className="w-4 h-4 text-emerald-500 mt-0.5" />
              <div>
                <p className="text-sm text-slate-200 font-medium">GPS atualizado</p>
                <p className="text-xs text-slate-500">-16.6869, -49.2648</p>
              </div>
              <span className="text-xs text-slate-500 ml-auto">Há 1 hora</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

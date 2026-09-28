import { useState, useEffect, useRef } from 'react';
import { Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Declaração para o TS reconhecer a variável global L do Leaflet
declare global {
  interface Window {
    L: any;
  }
}

export function Tracking() {
  const [selectedLoad, setSelectedLoad] = useState('CARGA-001');
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);

  useEffect(() => {
    // Inicializa o mapa apenas quando o Leaflet estiver disponível e a div existir
    if (!leafletMap.current && window.L && mapRef.current) {
      // Cria o mapa centrado no Brasil
      leafletMap.current = window.L.map(mapRef.current).setView([-15.793889, -47.882778], 5);
      
      // Adiciona a camada OpenStreetMap padrão (100% Gratuita e sem API Key)
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(leafletMap.current);

      // Configura um ícone de caminhão customizado
      const truckIcon = window.L.divIcon({
        className: 'custom-truck-icon',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="animate-ping absolute -inset-2 rounded-full bg-emerald-500 opacity-40"></span>
            <div class="bg-emerald-500 text-white p-1.5 rounded-full shadow-lg shadow-emerald-500/50">
              <svg xmlns="http://www.w3.org/polaris/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-9l-2-2h-5v11h2"/><path d="M6.5 17a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3z"/><path d="M17.5 17a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3z"/></svg>
            </div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      // Adiciona os marcadores (simulados entre Goiânia e Brasília)
      const marker1 = window.L.marker([-16.6869, -49.2648], { icon: truckIcon }).addTo(leafletMap.current);
      marker1.bindPopup(`<b>CARGA-001</b><br>Goiânia → Brasília<br>72 km/h`);

      const marker2 = window.L.marker([-23.5505, -46.6333], { icon: truckIcon }).addTo(leafletMap.current);
      marker2.bindPopup(`<b>CARGA-002</b><br>Anápolis → São Paulo<br>Em trânsito`);
      
      // Centraliza na CARGA-001 inicialmente
      leafletMap.current.flyTo([-16.6869, -49.2648], 10);
    }

    return () => {
      // Limpeza na desmontagem
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  const flyToCarga = (id: string) => {
    setSelectedLoad(id);
    if (!leafletMap.current) return;
    
    if (id === 'CARGA-001') leafletMap.current.flyTo([-16.6869, -49.2648], 10);
    if (id === 'CARGA-002') leafletMap.current.flyTo([-23.5505, -46.6333], 10);
    if (id === 'CARGA-003') leafletMap.current.flyTo([-17.792, -50.923], 10);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Compass className="text-accent w-6 h-6" />
            Rastreamento de Frotas
          </h1>
          <p className="text-slate-400 text-sm">Monitoramento GPS integrado com Leaflet/OpenStreetMap</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Rotas Otimizadas</Button>
          <Button>Visualização por Satélite</Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Painel lateral */}
        <div className="glass-panel p-4 overflow-y-auto space-y-4 z-10">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Cargas Ativas</h3>
          
          {['CARGA-001', 'CARGA-002', 'CARGA-003'].map(id => (
            <div 
              key={id}
              onClick={() => flyToCarga(id)}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${selectedLoad === id ? 'bg-primary/20 border-primary' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-slate-200">{id}</span>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-1">
                {id === 'CARGA-001' ? 'Goiânia → Brasília' : id === 'CARGA-002' ? 'Anápolis → São Paulo' : 'Rio Verde → Campinas'}
              </p>
              <div className="flex gap-2 mt-3">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-md">72 km/h</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-md">8.4°C</span>
              </div>
            </div>
          ))}
        </div>

        {/* Simulador de Mapa (Leaflet Container) */}
        <div className="lg:col-span-3 glass-panel relative overflow-hidden rounded-xl border border-slate-800 z-0">
          {/* A div onde o Leaflet será injetado */}
          <div ref={mapRef} className="w-full h-full bg-[#0a0f1c]"></div>
          
          <style>{`
            /* Filtro CSS Mágico para transformar o mapa claro do OSM em Dark Mode Premium */
            .leaflet-tile-pane {
              filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
            }
            /* Ajustes finos do CSS do Leaflet para ficar premium */
            .leaflet-container { background: #020617; font-family: inherit; }
            .leaflet-popup-content-wrapper { background: #0f172a; color: #f1f5f9; border: 1px solid #1e293b; border-radius: 12px; }
            .leaflet-popup-tip { background: #0f172a; border: 1px solid #1e293b; border-top: none; border-left: none; }
            .leaflet-control-zoom { border: none !important; }
            .leaflet-control-zoom a { background: #0f172a !important; color: #94a3b8 !important; border: 1px solid #1e293b !important; }
            .leaflet-control-zoom a:hover { background: #1e293b !important; color: #f8fafc !important; }
            .leaflet-bottom.leaflet-right { display: none; /* Esconde atribuição p/ ficar limpo na demo */ }
          `}</style>
        </div>
      </div>
    </div>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { Dashboard } from './pages/Dashboard';
import { Loads } from './pages/Loads';
import { LoadDetails } from './pages/LoadDetails';
import { Events } from './pages/Events';
import { Alerts } from './pages/Alerts';
import { Tracking } from './pages/Tracking';
import { Vehicles } from './pages/Vehicles';
import { Drivers } from './pages/Drivers';
import { Trips } from './pages/Trips';
import { RiskRules } from './pages/RiskRules';
import { Telemetry } from './pages/Telemetry';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="loads" element={<Loads />} />
          <Route path="loads/:id" element={<LoadDetails />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="events" element={<Events />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="trips" element={<Trips />} />
          <Route path="risk-rules" element={<RiskRules />} />
          <Route path="telemetry" element={<Telemetry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

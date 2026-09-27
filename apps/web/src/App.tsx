import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { Dashboard } from './pages/Dashboard';
import { Loads } from './pages/Loads';
import { Events } from './pages/Events';
import { Alerts } from './pages/Alerts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="loads" element={<Loads />} />
          <Route path="events" element={<Events />} />
          <Route path="alerts" element={<Alerts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

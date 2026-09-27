import { Router } from 'express';
import { gpsSimulator } from '../simulators/gpsSimulator';
import { temperatureSimulator } from '../simulators/temperatureSimulator';
import { doorSimulator } from '../simulators/doorSimulator';

export const simulationRoutes = Router();

simulationRoutes.post('/gps', (req, res) => {
  const { cargaId, latitude, longitude, cidade } = req.body;
  if (!cargaId || latitude === undefined || longitude === undefined || !cidade) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  
  gpsSimulator.simulate(cargaId, latitude, longitude, cidade);
  res.json({ success: true, message: 'GPS event published' });
});

simulationRoutes.post('/temperature', (req, res) => {
  const { cargaId, temperatura } = req.body;
  if (!cargaId || temperatura === undefined) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  temperatureSimulator.simulate(cargaId, temperatura);
  res.json({ success: true, message: 'Temperature event published' });
});

simulationRoutes.post('/door', (req, res) => {
  const { cargaId, status } = req.body;
  if (!cargaId || !status) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  doorSimulator.simulate(cargaId, status);
  res.json({ success: true, message: 'Door event published' });
});

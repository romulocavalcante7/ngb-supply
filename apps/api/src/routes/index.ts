import { Router } from 'express';
import { simulationRoutes } from './simulation';
import { loadRoutes } from './loads';
import { eventRoutes } from './events';
import { alertRoutes } from './alerts';

export const router = Router();

router.use('/simulation', simulationRoutes);
router.use('/loads', loadRoutes);
router.use('/events', eventRoutes);
router.use('/alerts', alertRoutes);

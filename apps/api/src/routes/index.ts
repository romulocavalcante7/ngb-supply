import { Router } from 'express';
import { simulationRoutes } from './simulation';
import { loadRoutes } from './loads';
import { eventRoutes } from './events';
import { alertRoutes } from './alerts';
import { vehiclesRouter } from './vehicles';
import { driversRouter } from './drivers';
import { tripsRouter } from './trips';

export const router = Router();

router.use('/simulation', simulationRoutes);
router.use('/loads', loadRoutes);
router.use('/events', eventRoutes);
router.use('/alerts', alertRoutes);
router.use('/vehicles', vehiclesRouter);
router.use('/drivers', driversRouter);
router.use('/trips', tripsRouter);

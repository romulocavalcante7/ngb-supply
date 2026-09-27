import { Router } from 'express';
import { prisma } from '../database/prisma';

export const loadRoutes = Router();

loadRoutes.get('/', async (req, res) => {
  const loads = await prisma.load.findMany({
    include: {
      vehicle: true,
    },
  });
  res.json(loads);
});

loadRoutes.get('/:id', async (req, res) => {
  const load = await prisma.load.findUnique({
    where: { id: req.params.id },
    include: {
      vehicle: true,
      events: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      alerts: {
        where: { status: 'OPEN' },
      },
    },
  });
  
  if (!load) {
    return res.status(404).json({ error: 'Load not found' });
  }
  
  res.json(load);
});

loadRoutes.post('/', async (req, res) => {
  const { code, origin, destination, vehicleId } = req.body;
  
  const load = await prisma.load.create({
    data: {
      code,
      origin,
      destination,
      vehicleId,
    },
  });
  
  res.json(load);
});

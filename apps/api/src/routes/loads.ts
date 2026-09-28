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
  try {
    const { code, origin, destination, vehicleId, type, weight, volume, customerId } = req.body;
    
    const load = await prisma.load.create({
      data: {
        code,
        origin,
        destination,
        vehicleId,
        type,
        weight: weight ? Number(weight) : null,
        volume: volume ? Number(volume) : null,
        customerId
      },
    });
    
    res.json(load);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar carga' });
  }
});

loadRoutes.put('/:id', async (req, res) => {
  try {
    const { code, origin, destination, vehicleId, type, weight, volume, status } = req.body;
    const load = await prisma.load.update({
      where: { id: req.params.id },
      data: {
        code, origin, destination, vehicleId, type, status,
        weight: weight ? Number(weight) : null,
        volume: volume ? Number(volume) : null,
      }
    });
    res.json(load);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar carga' });
  }
});

loadRoutes.delete('/:id', async (req, res) => {
  try {
    await prisma.load.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar carga' });
  }
});

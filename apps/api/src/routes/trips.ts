import { Router } from 'express';
import { prisma } from '../database/prisma';

export const tripsRouter = Router();

tripsRouter.get('/', async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      include: {
        vehicle: true,
        driver: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar viagens' });
  }
});

tripsRouter.post('/', async (req, res) => {
  try {
    const { origin, destination, vehicleId, driverId, status } = req.body;
    const trip = await prisma.trip.create({
      data: { origin, destination, vehicleId, driverId, status }
    });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar viagem' });
  }
});

tripsRouter.put('/:id', async (req, res) => {
  try {
    const { origin, destination, vehicleId, driverId, status } = req.body;
    const trip = await prisma.trip.update({
      where: { id: req.params.id },
      data: { origin, destination, vehicleId, driverId, status }
    });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar viagem' });
  }
});

tripsRouter.delete('/:id', async (req, res) => {
  try {
    await prisma.trip.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar viagem' });
  }
});

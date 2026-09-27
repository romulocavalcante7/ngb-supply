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

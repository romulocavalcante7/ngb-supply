import { Router } from 'express';
import { prisma } from '../database/prisma';

export const eventRoutes = Router();

eventRoutes.get('/', async (req, res) => {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      load: {
        select: { code: true }
      }
    }
  });
  res.json(events);
});

eventRoutes.get('/:id', async (req, res) => {
  const event = await prisma.event.findUnique({
    where: { id: req.params.id },
  });
  
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
});

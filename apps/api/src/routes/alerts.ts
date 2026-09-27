import { Router } from 'express';
import { prisma } from '../database/prisma';

export const alertRoutes = Router();

alertRoutes.get('/', async (req, res) => {
  const alerts = await prisma.alert.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      load: {
        select: { code: true }
      }
    }
  });
  res.json(alerts);
});

alertRoutes.patch('/:id', async (req, res) => {
  const { status } = req.body;
  const alert = await prisma.alert.update({
    where: { id: req.params.id },
    data: { status, resolvedAt: status === 'RESOLVED' ? new Date() : null },
  });
  res.json(alert);
});

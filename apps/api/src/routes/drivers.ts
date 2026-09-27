import { Router } from 'express';
import { prisma } from '../database/prisma';

export const driversRouter = Router();

driversRouter.get('/', async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar motoristas' });
  }
});

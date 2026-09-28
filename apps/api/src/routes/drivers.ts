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

driversRouter.post('/', async (req, res) => {
  try {
    const driver = await prisma.driver.create({
      data: req.body
    });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar motorista' });
  }
});

driversRouter.put('/:id', async (req, res) => {
  try {
    const driver = await prisma.driver.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar motorista' });
  }
});

driversRouter.delete('/:id', async (req, res) => {
  try {
    await prisma.driver.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar motorista' });
  }
});

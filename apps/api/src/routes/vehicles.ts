import { Router } from 'express';
import { prisma } from '../database/prisma';

export const vehiclesRouter = Router();

// Listar todos
vehiclesRouter.get('/', async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar veículos' });
  }
});

// Criar
vehiclesRouter.post('/', async (req, res) => {
  try {
    const { plate, model, brand, type, capacity, year } = req.body;
    const newVehicle = await prisma.vehicle.create({
      data: { plate, model, brand, type, capacity: Number(capacity), year: Number(year) }
    });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar veículo. Verifique se a placa já existe.' });
  }
});

// Editar
vehiclesRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { plate, model, brand, type, capacity, status } = req.body;
    const updated = await prisma.vehicle.update({
      where: { id },
      data: { plate, model, brand, type, capacity: Number(capacity), status }
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar veículo.' });
  }
});

// Deletar
vehiclesRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.vehicle.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar veículo. Pode estar vinculado a uma viagem.' });
  }
});

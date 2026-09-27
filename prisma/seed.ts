import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar tabelas existentes
  await prisma.alert.deleteMany();
  await prisma.event.deleteMany();
  await prisma.sensorReading.deleteMany();
  await prisma.load.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // 1. Criar Usuários
  const user1 = await prisma.user.create({
    data: { name: 'Admin Geral', email: 'admin@ngb.com', role: 'ADMIN' }
  });
  const user2 = await prisma.user.create({
    data: { name: 'Operador Risco', email: 'operador@ngb.com', role: 'OPERATOR' }
  });
  console.log('✅ Usuários criados');

  // 2. Criar Veículos
  const vehicle1 = await prisma.vehicle.create({
    data: { plate: 'ABC-1234', model: 'Volvo FH', driver: 'Carlos Silva' }
  });
  const vehicle2 = await prisma.vehicle.create({
    data: { plate: 'XYZ-9876', model: 'Scania R450', driver: 'Roberto Santos' }
  });
  console.log('✅ Veículos criados');

  // 3. Criar Cargas
  const load1 = await prisma.load.create({
    data: { id: 'CARGA-001', code: 'C-001', origin: 'Goiânia - GO', destination: 'Brasília - DF', status: 'IN_TRANSIT', vehicleId: vehicle1.id }
  });
  const load2 = await prisma.load.create({
    data: { id: 'CARGA-002', code: 'C-002', origin: 'Anápolis - GO', destination: 'São Paulo - SP', status: 'DELIVERED', vehicleId: vehicle2.id }
  });
  const load3 = await prisma.load.create({
    data: { id: 'CARGA-003', code: 'C-003', origin: 'Rio Verde - GO', destination: 'Campinas - SP', status: 'PLANNED', vehicleId: vehicle1.id }
  });
  console.log('✅ Cargas criadas');

  // 4. Inserir alguns eventos e leituras simuladas para o dashboard não nascer vazio
  await prisma.event.create({
    data: { loadId: load1.id, topic: 'carga.temperatura', type: 'TEMPERATURE_UPDATED', payload: { temperature: 8.5 } }
  });
  await prisma.event.create({
    data: { loadId: load1.id, topic: 'carga.porta', type: 'DOOR_CLOSED', payload: { status: 'FECHADA' } }
  });

  await prisma.alert.create({
    data: { loadId: load1.id, type: 'TEMPERATURA_ALTA', severity: 'ALTA', message: 'Temperatura em 12.8°C (acima do limite de 10°C)', status: 'OPEN' }
  });

  console.log('🎉 Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

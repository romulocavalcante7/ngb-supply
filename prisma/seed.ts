import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar tabelas existentes
  await prisma.supplyChainStage.deleteMany();
  await prisma.alertRule.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.event.deleteMany();
  await prisma.sensorReading.deleteMany();
  await prisma.checkpoint.deleteMany();
  await prisma.route.deleteMany();
  await prisma.load.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  // 1. Criar Usuários
  await prisma.user.create({ data: { name: 'Admin Geral', email: 'admin@ngb.com', role: 'ADMIN' } });
  await prisma.user.create({ data: { name: 'Operador Risco', email: 'operador@ngb.com', role: 'OPERATOR' } });
  console.log('✅ Usuários criados');

  // 2. Criar Entidades Básicas
  const company = await prisma.company.create({ data: { name: 'NGB Transportes', cnpj: '12.345.678/0001-99' } });
  const customer = await prisma.customer.create({ data: { name: 'Cliente Alpha', companyId: company.id } });
  
  const driver = await prisma.driver.create({ data: { name: 'Carlos Silva', cpf: '111.111.111-11', cnh: '99999999999', category: 'E' } });
  const driver2 = await prisma.driver.create({ data: { name: 'Roberto Santos', cpf: '222.222.222-22', cnh: '88888888888', category: 'E' } });

  const vehicle1 = await prisma.vehicle.create({ data: { plate: 'ABC-1234', model: 'Volvo FH', brand: 'Volvo', capacity: 25000 } });
  const vehicle2 = await prisma.vehicle.create({ data: { plate: 'XYZ-9876', model: 'Scania R450', brand: 'Scania', capacity: 30000 } });

  console.log('✅ Motoristas, Veículos e Clientes criados');

  // 3. Criar Viagem
  const trip = await prisma.trip.create({
    data: {
      origin: 'Goiânia - GO',
      destination: 'Brasília - DF',
      status: 'IN_PROGRESS',
      vehicleId: vehicle1.id,
      driverId: driver.id
    }
  });

  // 4. Criar Cargas
  const load1 = await prisma.load.create({
    data: { id: 'CARGA-001', code: 'C-001', origin: 'Goiânia - GO', destination: 'Brasília - DF', status: 'IN_TRANSIT', vehicleId: vehicle1.id, customerId: customer.id, tripId: trip.id }
  });
  const load2 = await prisma.load.create({
    data: { id: 'CARGA-002', code: 'C-002', origin: 'Anápolis - GO', destination: 'São Paulo - SP', status: 'DELIVERED', vehicleId: vehicle2.id, customerId: customer.id }
  });
  const load3 = await prisma.load.create({
    data: { id: 'CARGA-003', code: 'C-003', origin: 'Rio Verde - GO', destination: 'Campinas - SP', status: 'PLANNED', vehicleId: vehicle1.id, customerId: customer.id }
  });
  console.log('✅ Cargas e Viagens criadas');

  // 5. Inserir alguns eventos e leituras simuladas
  await prisma.event.create({
    data: { loadId: load1.id, topic: 'carga.temperatura', type: 'TEMPERATURE_UPDATED', payload: { temperature: 8.5 } }
  });
  await prisma.event.create({
    data: { loadId: load1.id, topic: 'carga.porta', type: 'DOOR_CLOSED', payload: { status: 'FECHADA' } }
  });

  await prisma.alert.create({
    data: { loadId: load1.id, type: 'TEMPERATURA_ALTA', severity: 'HIGH', message: 'Temperatura em 12.8°C (acima do limite de 10°C)', status: 'OPEN' }
  });

  await prisma.alertRule.create({ data: { name: 'Alerta Temp Alta', metric: 'temperature', operator: '>', threshold: 10, severity: 'HIGH' } });

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

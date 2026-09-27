-- 02_insert_seed.sql
-- Rode este script depois de rodar o 01_create_tables.sql para popular os dados falsos.

-- 1. Usuários
INSERT INTO "User" ("id", "name", "email", "role") VALUES
('usr-1111-1111', 'Admin Geral', 'admin@ngb.com', 'ADMIN'),
('usr-2222-2222', 'Operador Risco', 'operador@ngb.com', 'OPERATOR');

-- 2. Entidades Básicas (Empresa e Cliente)
INSERT INTO "Company" ("id", "name", "cnpj") VALUES
('comp-1111', 'NGB Transportes', '12.345.678/0001-99');

INSERT INTO "Customer" ("id", "name", "companyId") VALUES
('cust-1111', 'Cliente Alpha', 'comp-1111');

-- 3. Motoristas e Veículos
INSERT INTO "Driver" ("id", "name", "cpf", "cnh", "category") VALUES
('drv-1111', 'Carlos Silva', '111.111.111-11', '99999999999', 'E'),
('drv-2222', 'Roberto Santos', '222.222.222-22', '88888888888', 'E');

INSERT INTO "Vehicle" ("id", "plate", "model", "brand", "capacity") VALUES
('veh-1111', 'ABC-1234', 'Volvo FH', 'Volvo', 25000),
('veh-2222', 'XYZ-9876', 'Scania R450', 'Scania', 30000);

-- 4. Viagem
INSERT INTO "Trip" ("id", "origin", "destination", "status", "vehicleId", "driverId") VALUES
('trp-1111', 'Goiânia - GO', 'Brasília - DF', 'IN_PROGRESS', 'veh-1111', 'drv-1111');

-- 5. Cargas
INSERT INTO "Load" ("id", "code", "origin", "destination", "status", "vehicleId", "customerId", "tripId") VALUES
('CARGA-001', 'C-001', 'Goiânia - GO', 'Brasília - DF', 'IN_TRANSIT', 'veh-1111', 'cust-1111', 'trp-1111'),
('CARGA-002', 'C-002', 'Anápolis - GO', 'São Paulo - SP', 'DELIVERED', 'veh-2222', 'cust-1111', NULL),
('CARGA-003', 'C-003', 'Rio Verde - GO', 'Campinas - SP', 'PLANNED', 'veh-1111', 'cust-1111', NULL);

-- 6. Eventos
INSERT INTO "Event" ("id", "loadId", "topic", "type", "payload") VALUES
('evt-1111', 'CARGA-001', 'carga.temperatura', 'TEMPERATURE_UPDATED', '{"temperature": 8.5}'),
('evt-2222', 'CARGA-001', 'carga.porta', 'DOOR_CLOSED', '{"status": "FECHADA"}');

-- 7. Alertas e Regras
INSERT INTO "Alert" ("id", "loadId", "type", "severity", "message", "status") VALUES
('alt-1111', 'CARGA-001', 'TEMPERATURA_ALTA', 'HIGH', 'Temperatura em 12.8°C (acima do limite de 10°C)', 'OPEN');

INSERT INTO "AlertRule" ("id", "name", "metric", "operator", "threshold", "severity") VALUES
('rl-1111', 'Alerta Temp Alta', 'temperature', '>', 10, 'HIGH');

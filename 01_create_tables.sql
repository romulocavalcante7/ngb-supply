-- 01_create_tables.sql
-- Rode este script primeiro no SQL Editor do Supabase

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OPERATOR', 'CUSTOMER');
CREATE TYPE "LoadStatus" AS ENUM ('PLANNED', 'PREPARING', 'LOADED', 'IN_TRANSIT', 'AT_DESTINATION', 'DELIVERED', 'DELAYED', 'CANCELLED');
CREATE TYPE "TripStatus" AS ENUM ('PLANNED', 'STARTED', 'IN_PROGRESS', 'PAUSED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "AlertSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE "AlertStatus" AS ENUM ('OPEN', 'ACKNOWLEDGED', 'RESOLVED');

-- Tabelas
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "Company" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

CREATE TABLE "Customer" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Driver" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Driver_cpf_key" ON "Driver"("cpf");
CREATE UNIQUE INDEX "Driver_cnh_key" ON "Driver"("cnh");

CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "plate" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT,
    "year" INTEGER,
    "type" TEXT,
    "capacity" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");

CREATE TABLE "Trip" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "status" "TripStatus" NOT NULL DEFAULT 'PLANNED',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "vehicleId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Load" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "code" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "status" "LoadStatus" NOT NULL DEFAULT 'PLANNED',
    "type" TEXT,
    "weight" DOUBLE PRECISION,
    "volume" DOUBLE PRECISION,
    "customerId" TEXT,
    "vehicleId" TEXT,
    "tripId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Load_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Load_code_key" ON "Load"("code");

CREATE TABLE "Route" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "tripId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Checkpoint" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "routeId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "reachedAt" TIMESTAMP(3),
    CONSTRAINT "Checkpoint_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SensorReading" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "loadId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "unit" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SensorReading_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Event" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "loadId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Alert" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "loadId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" "AlertSeverity" NOT NULL DEFAULT 'MEDIUM',
    "message" TEXT NOT NULL,
    "status" "AlertStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AlertRule" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "threshold" DOUBLE PRECISION NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "AlertRule_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SupplyChainStage" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4()::text,
    "loadId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "order" INTEGER NOT NULL,
    CONSTRAINT "SupplyChainStage_pkey" PRIMARY KEY ("id")
);

-- Relacionamentos (Chaves Estrangeiras)
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Load" ADD CONSTRAINT "Load_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Load" ADD CONSTRAINT "Load_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Load" ADD CONSTRAINT "Load_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Route" ADD CONSTRAINT "Route_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Checkpoint" ADD CONSTRAINT "Checkpoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SensorReading" ADD CONSTRAINT "SensorReading_loadId_fkey" FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Event" ADD CONSTRAINT "Event_loadId_fkey" FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_loadId_fkey" FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SupplyChainStage" ADD CONSTRAINT "SupplyChainStage_loadId_fkey" FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

#!/bin/zsh
source ~/.zshrc
set -e

mkdir -p apps packages

# Setup frontend
cd apps
echo "Setting up web app..."
pnpm create vite web --template react-ts --no-interactive
cd web
pnpm add axios react-router-dom zustand recharts lucide-react socket.io-client date-fns
pnpm add -D tailwindcss postcss autoprefixer @types/node
pnpm dlx tailwindcss init -p
cd ../../

# Setup backend
echo "Setting up api app..."
mkdir -p apps/api/src
cd apps/api
pnpm init
pnpm add express cors dotenv socket.io pg @prisma/client zod axios
pnpm add -D prisma typescript @types/node @types/express @types/cors ts-node nodemon vitest
pnpm dlx tsc --init
cd ../../

# Setup shared package
echo "Setting up shared package..."
mkdir -p packages/shared/src
cd packages/shared
pnpm init
pnpm add zod
pnpm add -D typescript
pnpm dlx tsc --init
cd ../../

echo "Done scaffolding!"

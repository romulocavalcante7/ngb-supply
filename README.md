# NGB Supply (SmartCargo)

Sistema avançado de Logística e Gestão de Cadeia de Suprimentos, focado no monitoramento em tempo real de sensores e telemetria através de uma arquitetura Pub/Sub nativa.

## 📦 O Projeto
O NGB Supply é uma plataforma Full Stack projetada para simular o controle rigoroso de frotas e cargas sensíveis. 
A arquitetura se baseia em uma implementação de **Broker Pub/Sub em TypeScript**, que atua como o coração do sistema, desacoplando os Sensores (Produtores) das Regras de Negócio e Telemetria (Consumidores).

## 🚀 Tecnologias

- **Frontend:** React, TypeScript, Vite, Tailwind CSS (Glassmorphism UI), Zustand, React Router, Recharts, PWA.
- **Backend:** Node.js, Express, Socket.IO, Prisma ORM.
- **Banco de Dados:** PostgreSQL (via Supabase).

## 🏗 Arquitetura
Consulte a documentação completa da arquitetura na pasta `docs/`:
- [Arquitetura Geral](docs/architecture.md)
- [Arquitetura Pub/Sub](docs/pub-sub.md)

## 🔧 Como rodar localmente

1. Renomeie o arquivo `.env.example` para `.env` e configure sua `DATABASE_URL` (PostgreSQL).
2. Instale as dependências executando:
   `npm install`
3. Crie o banco de dados e as tabelas:
   `npx prisma db push`
4. Preencha o banco com dados simulados:
   `npx prisma db seed`
5. Inicie toda a aplicação (Backend + Frontend em paralelo):
   `npm run dev`

O Frontend abrirá em `http://localhost:5173`.
O Backend WebSocket rodará na porta `3001`.

## 🔄 Demonstração do Pub/Sub
O sistema inclui endpoints de simulação para você testar a arquitetura ao vivo. 
Ao clicar no "Simulador de Sensores" dentro do Dashboard, a seguinte cadeia ocorre:

1. O botão chama o backend via REST.
2. O backend dispara o simulador (ex: GPS, Temperatura).
3. O simulador aciona o **Publisher**, que empurra a leitura para o **Broker**.
4. O Broker avisa os **Subscribers** cadastrados.
5. A *Central de Risco* (Subscriber) intercepta o evento, avalia regras, salva no DB e propaga um Alerta.
6. O *WebSocket* entrega a atualização ao Frontend de forma reativa.

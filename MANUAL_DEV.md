# 🚀 Manual do Desenvolvedor - NGB Supply

Bem-vindo à equipe do **NGB Supply**.
Siga os passos abaixo para configurar o projeto na sua máquina em menos de 5 minutos.

## 1. Clonar e Instalar
Abra seu terminal e clone o projeto:
```bash
git clone https://github.com/romulocavalcante7/ngb-supply.git
cd "ngb-supply"
npm install
```

## 2. Configurar o Banco de Dados (.env)
O nosso banco de dados roda **na nuvem (Supabase)**. Você não precisa instalar PostgreSQL na sua máquina, apenas se conectar a ele.

Crie um arquivo chamado `.env` na raiz do projeto (onde fica o `package.json`) e cole o seguinte código:

```env
# URL de conexão com o banco de dados do Supabase
# Fale com o líder técnico para ele te passar a [SENHA_DO_BANCO]
DATABASE_URL="postgresql://postgres.yqvptwjdgbqygknmivjk:[SENHA_DO_BANCO]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"

# Portas
PORT=3001
NODE_ENV="development"
```

## 3. Sicronizar o Prisma
Depois de configurar a senha no `.env`, você precisa gerar o cliente do Prisma no seu computador para que o TypeScript reconheça as tabelas:
```bash
npx prisma generate
```

## 4. O Atalho Mágico (ngb.sh)
Criamos um script facilitador para você não precisar ficar digitando comandos toda hora.
Basta digitar no seu terminal:

```bash
bash ngb.sh
```

Aparecerá um menu interativo:
- **Opção 1:** Para atualizar seu projeto com o código do GitHub.
- **Opção 2:** Para rodar o servidor local (Front-end + Back-end juntos).
- **Opção 3:** Para commitar e subir suas alterações pro GitHub automaticamente.

**E é isso!** Boa codificação.

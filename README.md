# NGB Supply - Plataforma de Logística e Telemetria (Padrão Pub/Sub)

**Disciplina:** Arquitetura de Software / Sistemas Distribuídos
**Professor:** [Nome do Professor]
**Integrantes do Grupo:**
1. Rômulo Cavalcante
2. [Integrante 2]
3. [Integrante 3]
4. [Integrante 4]

---

## 🎯 O Problema e Cenário Escolhido
O nosso projeto aborda a **Logística e Gestão de Cadeia de Suprimentos (Supply Chain)**, focando especificamente no **rastreamento de frotas e cargas sensíveis em trânsito**.

Em transportes de medicamentos ou alimentos refrigerados, qualquer oscilação de temperatura ou abertura indevida do baú pode resultar na perda total da carga. Para resolver isso, implementamos uma solução baseada no **Padrão de Projeto Pub/Sub** (Publish/Subscribe), garantindo o total desacoplamento e a comunicação assíncrona baseada em eventos.

### Como o Pub/Sub foi aplicado:
- **Tópicos:** `TEMPERATURE`, `LOCATION` e `STATUS`.
- **Publishers:** Nossos sensores IoT simulados de GPS, Termômetro e Sensor de Porta de Baú. Eles captam os eventos físicos e publicam (grita) as mensagens para o nosso *Broker*, sem saber quem vai receber.
- **Subscribers:**
  1. **Central de Gerenciamento de Risco:** Disparada automaticamente se a temperatura da carga sair da meta definida ou se a porta for violada.
  2. **Sistema de Telemetria da Frota:** Salva a coordenada (GPS) no banco de dados para gerar o histórico da viagem.
  3. **Cliente Final:** Notificado de que a sua encomenda atualizou a rota.

Esta arquitetura garante que novos *Subscribers* possam ser adicionados no futuro (ex: disparo de SMS) sem precisar alterar em nada o código-fonte dos nossos sensores no caminhão (*Publishers*).

---

## 🚀 Como Executar o Código

### Opção 1: Acessar Diretamente (Produção)
O sistema está hospedado na nuvem (Banco de Dados no Supabase e Servidor na Vercel). Você pode interagir com o Pub/Sub ao vivo sem precisar instalar nada:
👉 **URL:** [Seu link da Vercel aqui]
**Login de Teste:**
- Email: `romulogomescavalcante7@gmail.com`
- Senha: `23782613`

*Para testar o Pub/Sub, navegue até a aba "Dashboard" e utilize os botões vermelhos "Simular Aquecimento" e "Abrir Porta".*

### Opção 2: Rodar Localmente (Desenvolvimento)
Para rodar a simulação e o código-fonte localmente em sua máquina, certifique-se de ter o Node.js v18+ instalado.

1. Clone o repositório:
```bash
git clone https://github.com/romulocavalcante7/ngb-supply.git
cd ngb-supply
```

2. Instale as dependências de todas as pastas (Monorepo):
```bash
npm install
```

3. Execute o ambiente de desenvolvimento (Frontend Vite + Backend Express API):
```bash
npm run dev
```

4. Acesse a interface web através do navegador:
`http://localhost:5173`

*(O Broker está instanciado no Backend, rodando por padrão na porta `3001`, que se comunica via WebSocket para atualizar os gráficos do Frontend em tempo real).*

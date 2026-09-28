# NGB Supply - Apresentação do Sistema (Padrão Pub/Sub)

Este documento foi criado para guiar a apresentação do grupo (4 pessoas). Ele divide o roteiro para que todos tenham um tempo de fala equilibrado (15 minutos totais) e abordem os critérios de avaliação exigidos pela disciplina.

---

## 👥 Divisão da Apresentação (4 Pessoas)

### 🧑‍🏫 Apresentador 1: Introdução e O Problema (3 min)
**Missão:** Contextualizar o cenário escolhido e introduzir a solução de alto nível.
- **O que falar:**
  - Dar as boas vindas e apresentar os membros do grupo.
  - Explicar a escolha do cenário: **Logística e Gestão de Cadeia de Suprimentos (Rastreamento de Cargas Sensíveis)**.
  - Qual é o problema real? (Ex: "Cargas de medicamentos ou alimentos congelados são perdidas se a temperatura oscilar ou se o baú abrir no meio da estrada. Precisávamos de um sistema que reagisse a essas mudanças em tempo real").
  - Introduzir que o Padrão *Pub/Sub* foi a escolha perfeita porque os sensores IoT do caminhão (Publishers) não precisam conhecer quem vai receber o alerta (Subscribers), garantindo **desacoplamento total**.

### 🧑‍💻 Apresentador 2: Arquitetura Técnica e o Broker (4 min)
**Missão:** Mostrar como o código implementa o padrão Pub/Sub e explicar a infraestrutura.
- **O que falar:**
  - Explicar as tecnologias usadas: TypeScript, Node.js, Prisma, PostgreSQL na nuvem, Websockets e a Vercel.
  - Mostrar rapidamente o arquivo principal do Broker (`broker.ts`). Explicar como criamos a classe central com os métodos de ouro: `subscribe`, `unsubscribe` e `publish`.
  - Explicar como os Tópicos funcionam (Ex: Tópico `TEMPERATURE`, Tópico `STATUS`).
  - Mostrar que a nossa arquitetura é de um *Monorepo* moderno (API e Frontend no mesmo projeto).

### 🚛 Apresentador 3: Publishers e Subscribers na Prática (4 min)
**Missão:** Aprofundar nos atores da arquitetura e começar a demonstração visual.
- **O que falar:**
  - Explicar quem são os **Publishers** (Nossos sensores virtuais de GPS, Termômetro e Sensor de Porta do baú). 
  - Explicar quem são os **Subscribers**:
    1. A **Central de Gerenciamento de Risco** (Que aciona um alerta se a temperatura passar do limite).
    2. O **Sistema de Telemetria** (Que salva o log no banco de dados).
    3. O **Cliente Final** (Recebendo notificação da rota).
  - Abrir a aba **Dashboard** do sistema logado. 

### 🚀 Apresentador 4: Demonstração e Conclusão (4 min)
**Missão:** Fazer o "Showtime". Operar o sistema ao vivo e finalizar.
- **O que falar:**
  - Explicar que a interface React que estão vendo se comunica com o Broker em tempo real via *WebSockets*.
  - **Ação 1:** Clicar nos botões do Dashboard de "Simular Aquecimento" e "Simular Abertura de Porta".
  - Mostrar a tela reagindo em tempo real com alertas vermelhos e o gráfico se movendo (provando que o *publish* chegou nos *subscribers* com sucesso).
  - **Ação 2:** Mostrar a tela de **Veículos**, cadastrando um veículo novo para mostrar o CRUD operando na nuvem com o banco de dados.
  - Concluir a apresentação agradecendo ao professor e abrindo para dúvidas (3 min finais).

---

## 🎯 Por que vamos tirar Nota Máxima?
(Dicas extras para o grupo)
- **Desacoplamento comprovado:** Foquem em explicar que, se a empresa adicionar um *novo Subscriber* amanhã (ex: um sistema que envia SMS), o código do sensor (Publisher) não precisa ser alterado em 1 linha de código! Esse é o grande poder do Pub/Sub.
- **Interface Gráfica:** A esmagadora maioria da sala vai mostrar apenas textos no "Terminal" rodando `console.log`. O nosso grupo vai mostrar uma Plataforma SaaS real, com gráficos interativos e comunicação via *Socket.io*.

Boa sorte, equipe! O código está pronto e escalável.

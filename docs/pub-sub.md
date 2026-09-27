# O Motor Pub/Sub

O núcleo técnico desta aplicação não é a tradicional API REST orientada a banco de dados (CRUD), mas sim um **Message Broker** implementado de forma nativa e em memória.

## 1. Por que Pub/Sub?
Na logística, uma única leitura de temperatura de uma carga precisa ser interpretada por vários departamentos:
- A auditoria precisa salvar o histórico.
- O cliente quer ver no mapa.
- A central de risco quer saber se excedeu o limite.

Se o sensor falasse diretamente com esses três departamentos, teríamos alto acoplamento. Usando o Pub/Sub, o sensor apenas "grita" o evento e não precisa conhecer quem está ouvindo.

## 2. Componentes

### Broker (`apps/api/src/pubsub/broker.ts`)
Responsável por manter a lista de inscritos (`subscribers`) mapeada por Tópico, fornecendo a interface:
- `publish(topic, message)`
- `subscribe(topic, subscriber)`
- `unsubscribe(topic, subscriber)`

### Publishers
Eles produzem as mensagens e enviam ao Broker.
Temos Publishers isolados em `apps/api/src/publishers/` para cada contexto (GPS, Termômetro, Bateria).

### Subscribers
Recebem e dão função às mensagens.
O `RiskSubscriber` escuta temperatura e bateria. Caso passe dos limites, ele executa a regra de negócio, salva um alerta no banco usando Prisma e publica novamente no tópico de alerta, fechando o ciclo.

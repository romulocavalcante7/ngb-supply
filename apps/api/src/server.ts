import { createServer } from 'http';
import { Server } from 'socket.io';
import { app } from './app';
import { broker } from './pubsub/broker';
import { Topics, Topic } from './pubsub/topics';

const port = process.env.PORT || 3001;

const httpServer = createServer(app);

// WebSocket setup
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`[WebSocket] Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[WebSocket] Client disconnected: ${socket.id}`);
  });
});

// Subscriber that forwards messages to WebSockets
class WebSocketSubscriber {
  id = 'WebSocketSubscriber';

  constructor() {
    Object.values(Topics).forEach((topic) => {
      broker.subscribe(topic as Topic, this);
    });
  }

  onMessage(topic: string, message: any) {
    io.emit(topic, message);
  }
}

// Instantiate to start forwarding
new WebSocketSubscriber();

httpServer.listen(port, () => {
  console.log(`[Server] NGB Supply API and WebSocket running on port ${port}`);
});

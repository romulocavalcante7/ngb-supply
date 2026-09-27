import express from 'express';
import cors from 'cors';
import { router as apiRoutes } from './routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'NGB Supply API (Online)',
    docs: '/api',
    status: 'Running'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default app;

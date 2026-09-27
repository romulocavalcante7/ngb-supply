import express from 'express';
import cors from 'cors';
import { router as apiRoutes } from './routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

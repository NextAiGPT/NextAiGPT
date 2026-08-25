import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import aiRoutes from './routes/aiRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import webhookRoutes from './routes/webhookRoutes.js';

const app = express();

app.use((req, res, next) => {
  console.log('🔥 REQUEST:', req.method, req.originalUrl);
  console.log('🌍 ORIGIN:', req.headers.origin);
  next();
});

const allowedOrigins = [
  'https://nextaigpt.github.io',
  'https://ai-crm-sage.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(cors({
  origin: 'https://nextaigpt.github.io',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'healthy' });
});

app.use((req, res, next) => {
  console.log('METHOD:', req.method);
  console.log('PATH:', req.path);
  console.log('ORIGIN:', req.headers.origin);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/webhooks', webhookRoutes);

app.use(errorMiddleware);

app.use('/api/webhooks', webhookRoutes);

export default app;

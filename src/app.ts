import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import  authRouter  from '@/routes/auth-routes';
import  userRouter  from '@/routes/users-routes';

const app = express();

// --- CORS ---
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ limit : '50mb'}))

// --- Routes ---

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);



export default app;

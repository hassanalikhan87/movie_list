import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import movieRoutes from './routes/movieRoutes';
import { connectDB } from './config/db'; // Import the DB connection
import { PORT } from '@env';
import authRoutes from '@routes/authRoutes';
import cors from 'cors';
import path from 'path';

const app = express();

// Connect to MongoDB
connectDB();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(bodyParser.json());

// Serve static files from the `/uploads` directory
app.use('/uploads', express.static(path.join(__dirname, './assets')));

app.use('/api', movieRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

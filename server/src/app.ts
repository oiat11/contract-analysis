import dotenv from 'dotenv'; // Fixed typo: was 'dontev'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI as string).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

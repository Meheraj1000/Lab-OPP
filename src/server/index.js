import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router.js';

dotenv.config();

const app = express();
console.log('Starting backend server...');
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});

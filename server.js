import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userProfileRoutes from './routes/userProfileRoutes.js';
import path from 'path';

const app = express();
dotenv.config()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/v1/api/users', userRoutes);
app.use('/v1/api/users/profile', userProfileRoutes);
app.use('/v1/api/jobs', jobRoutes);
app.use('/v1/api/uploads', uploadRoutes);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
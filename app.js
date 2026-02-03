import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import todoRouter from './routes/todo.js';

dotenv.config();

connectDB();
const app= express();
const PORT= process.env.PORT || 5000;

app.use(express.json());
app.use('/todo', todoRouter);

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import todoRouter from './routes/todo.js';
import productRoutes from './routes/product.js';

dotenv.config();

connectDB();
const app= express();
const PORT= process.env.PORT || 5000;

app.use(express.json());
app.use('/todo', todoRouter);
app.use("/products", productRoutes);

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import productRoutes from './routes/product.js';
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';

dotenv.config();

connectDB();
const app= express();
const PORT= 5000;

app.use(express.json());
app.use("/products", productRoutes);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Online Shop API');
});

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/MongoDb.js';
import ImportData from './DataImport.js';
import productRoute from './Routes/ProductRoutes.js';
import { errorHandler, notFound } from './Middleware/Errors.js';
import userRouter from './Routes/UserRoutes.js';
import orderRouter from './Routes/orderRoutes.js';

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// API
app.use('https://lit-depths-09322.herokuapp.com//api/import', ImportData);
app.use('https://lit-depths-09322.herokuapp.com//api/products', productRoute);
app.use('https://lit-depths-09322.herokuapp.com//api/users', userRouter);
app.use('https://lit-depths-09322.herokuapp.com//api/orders', orderRouter);
app.get(
  'https://lit-depths-09322.herokuapp.com/ /api/config/paypal',
  (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
  }
);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server run in port ${PORT}`));

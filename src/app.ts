import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/indexRoute';
import cors from 'cors';


const app = express();
//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
//settings
app.set('port', process.env.PORT || 3000);
//Rutas
app.use('/majorRestApi', indexRoutes);

export default app;

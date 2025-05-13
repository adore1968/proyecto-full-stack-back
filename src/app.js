import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import contactsRoute from './routes/contacts.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));

app.use('/api/auth', authRoute);
app.use('/api/contacts', contactsRoute);

export default app;

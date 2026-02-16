import express, { urlencoded } from 'express';
import connectDB from './config/db.js';
import authenticateJWT from './middlewares/authenticate.js';
import cors from 'cors';
import org from './routes/orgRoutes.js';
import user from './routes/userRoutes.js';
const app = express();

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', async (request, response) => {
    response.json("hello")
})

app.use('/users', user);

app.use('/api', authenticateJWT, org);

export default app;
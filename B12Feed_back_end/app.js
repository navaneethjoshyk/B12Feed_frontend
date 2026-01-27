import express from 'express';
import connectDB from './config/db.js';
import argon2d from 'argon2';
import authenticateJWT from './middlewares/authenticate.js';

import user from './routes/userRoutes.js';
const app = express();

connectDB();

app.use('/users', user);

app.get('/', async (request, response) => {
    response.json("hello")
})

export default app;
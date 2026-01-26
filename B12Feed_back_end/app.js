import express from 'express';
import connectDB from './config/db.js';

const app = express();

connectDB();

app.get('/', (request, response) => {
    response.json("hello")
})

export default app;
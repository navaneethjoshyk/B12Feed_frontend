import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config.js';

const authenticateJWT = async (request, response, next) => {
    const authHeader = request.headers.authorization;

    if(!authHeader) return response.redirect('/');

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET)
        console.log(decoded);
        request.user = decoded;
    } catch (err) {
        console.log(err.message);
    }
    next(); 
}

export default authenticateJWT;
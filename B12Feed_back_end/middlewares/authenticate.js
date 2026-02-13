import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config.js';

const authenticateJWT = async (request, response, next) => {
    const authHeader = request.headers.cookie;
    if(!authHeader) {
        response.status(400).json({
        message: "No JWT token"
        })
    } else {
        const token = authHeader.split("=")[1];

        try {
            const decoded = jwt.verify(token, SECRET)
            if(decoded !== "invalid token") {
                response.status(200).json({
                    message: "Verified User"
                })
            } else {
                response.status(400).json({
                    message: "Not Verified"
                })
            }
            
        } catch (err) {
            console.log(err.message);
        }
    }
    next(); 
}

export default authenticateJWT;
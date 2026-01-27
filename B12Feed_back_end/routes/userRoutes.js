import express from 'express';
import { userSignUp, loginUser} from '../controllers/user.js'

const router = express.Router();

router.post('/signup', userSignUp);

router.get('/login', loginUser);

export default router
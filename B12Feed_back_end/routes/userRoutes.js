import express from 'express';
import { userSignUp, loginUser} from '../controllers/userController.js'

const router = express.Router();

router.post('/signup', userSignUp);

router.post('/auth', loginUser);


export default router
import express from 'express';
import { userSignUp, loginUser, test} from '../controllers/user.js'

const router = express.Router();

router.get('/signup', userSignUp);

router.get('/auth', loginUser);


export default router
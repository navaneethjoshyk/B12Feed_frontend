import express from 'express';
import { onboarding } from '../controllers/orgController.js';

const router = express.Router();

router.post('/', onboarding);

export default router;
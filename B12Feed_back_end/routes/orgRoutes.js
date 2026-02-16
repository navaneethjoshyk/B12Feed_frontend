import express from 'express';
import { userOrg, postResource } from '../controllers/orgController.js';

const router = express.Router();

router.get('/', userOrg);
router.post('/resourcePost', postResource);

export default router;
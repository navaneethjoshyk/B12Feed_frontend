import express from 'express';
import { userOrg, postResource, postClaimStatus } from '../controllers/orgController.js';

const router = express.Router();

router.get('/', userOrg);
router.post('/resourcePost', postResource);
router.post('/claimResource', postClaimStatus);

export default router;
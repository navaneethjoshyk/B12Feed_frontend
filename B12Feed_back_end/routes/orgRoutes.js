import express from 'express';
import { userOrg, postResource, postClaimStatus, resourceList, resourceDetail } from '../controllers/orgController.js';

const router = express.Router();

router.get('/', userOrg);
router.post('/resourcePost', postResource);
router.post('/claimResource', postClaimStatus);

router.get('/discover', resourceList);
router.get('/detail/:id', resourceDetail);

export default router;
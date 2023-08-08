import { Router } from 'express';
import { findAll, findById } from '../controllers/status.controller.js';

const router = Router();

router.get('/status', findAll);

router.get('/status/:id', findById);

export default router;

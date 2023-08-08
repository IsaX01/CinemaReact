import { Router } from 'express';
import { findAll, findById } from '../controllers/restriction.controller.js';

const router = Router();

router.get('/restriction', findAll);

router.get('/restriction/:id', findById);

export default router;

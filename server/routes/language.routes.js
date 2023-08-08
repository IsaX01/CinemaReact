import { Router } from 'express';
import { findAll, findById } from '../controllers/language.controller.js';

const router = Router();

router.get('/language', findAll);

router.get('/language/:id', findById);

export default router;

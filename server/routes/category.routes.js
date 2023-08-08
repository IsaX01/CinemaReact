import { Router } from 'express';
import { findAll, findById } from '../controllers/category.controller.js';

const router = Router();

router.get('/category', findAll);

router.get('/category/:id', findById);

export default router;

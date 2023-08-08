import { Router } from 'express';
import { findAll, findById } from '../controllers/genre.controller.js';

const router = Router();

router.get('/genre', findAll);

router.get('/genre/:id', findById);

export default router;

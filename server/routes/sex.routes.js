import { Router } from 'express';
import { findAll, findById } from '../controllers/sex.controller';

const router = Router();

router.get('/sex', findAll);

router.get('/sex/:id', findById);

export default router;

import { Router } from 'express';
import { findAll, findById } from '../controllers/country.controller.js';

const router = Router();

router.get('/country', findAll);

router.get('/country/:id', findById);

export default router;

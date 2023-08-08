import { Router } from 'express';
import { findInvoiceFullInformation, store } from '../controllers/order.controller.js';

const router = Router();

router.get('/invoice-full-information', findInvoiceFullInformation);

router.post('/order', store);

export default router;

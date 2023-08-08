import { Router } from 'express';
import {
  createPaymentIntent,
  savePaymentMethod,
  cancelPaymentIntent,
} from '../controllers/payment.controller.js';

const router = Router();

router.post('/create-payment-intent', createPaymentIntent);

router.post('/cancel-payment-intent/:id', cancelPaymentIntent);

router.post('/save-payment-method/:id', savePaymentMethod);

export default router;

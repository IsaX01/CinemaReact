import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import {
  deletePromotion,
  findAll,
  findById,
  store,
  update,
} from '../controllers/promotion.controller.js';

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get('/promotion', findAll);

router.get('/promotion/:id', findById);

router.post('/promotion', upload.single('image'), store);

router.put('/promotion/:id', upload.single('image'), update);

router.delete('/promotion/:id', deletePromotion);

export default router;

import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import {
  deleteFood,
  findAll,
  findAllFullInformation,
  findById,
  store,
  update,
} from '../controllers/foods.controller';

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get('/food', findAll);

router.get('/food-full-information', findAllFullInformation);

router.get('/food/:id', findById);

router.post('/food', upload.single('image'), store);

router.put('/food/:id', upload.single('image'), update);

router.delete('/food/:id', deleteFood);

export default router;

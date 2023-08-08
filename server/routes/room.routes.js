import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import { deleteRoom, findAll, findById, store, update } from '../controllers/room.controller';

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get('/room', findAll);

router.get('/room/:id', findById);

router.post('/room', upload.single('image'), store);

router.put('/room/:id', upload.single('image'), update);

router.delete('/room/:id', deleteRoom);

export default router;

import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import { deleteMovie, findAll, findById, store, update } from '../controllers/movie.controller.js';

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get('/movie', findAll);

router.get('/movie/:id', findById);

router.post('/movie', upload.single('image'), store);

router.put('/movie/:id', upload.single('image'), update);

router.delete('/movie/:id', deleteMovie);

export default router;

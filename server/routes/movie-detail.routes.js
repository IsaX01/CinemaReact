import { Router } from 'express';
import {
  findAllGenre,
  findAllRoom,
  findByIdGenre,
  findByIdRoom,
} from '../controllers/movie-detail.controller';

const router = Router();

router.get('/genre', findAllGenre);

router.get('/genre/:id', findByIdGenre);

router.get('/room', findAllRoom);

router.get('/room/:id', findByIdRoom);

export default router;

import { Router } from 'express';
import { pool } from '../db.js';
import authRoutes from './auth.routes.js';
import categoryRoutes from './category.routes.js';
import countryRoutes from './country.routes.js';
import foodRoutes from './food.routes';
import genreRoutes from './genre.routes.js';
import languageRoutes from './language.routes.js';
import movieRouters from './movie.routes.js';
import promotionRoutes from './promotion.routes';
import restrictionRoutes from './restriction.routes.js';
import roomRoutes from './room.routes.js';
import scheduleRoutes from './schedule.routes';
import sexRoutes from './sex.routes.js';
import statusRoutes from './status.routes.js';
import taskRoutes from './tasks.routes.js';
import userRoutes from './users.routes.js';
import resetPasswordRoutes from './resetPassword.routes';
import forgotPasswordRoutes from './forgotPassword.routes';
import orderRoutes from './order.routes.js';
import paymentRoutes from './payment.routes';

const router = Router();

router.get('/ping', async (req, res) => {
  const [rows] = await pool.query('SELECT 1 + 1 as result');
  console.log(rows[0]);
  res.json(rows[0]);
});

router.use(authRoutes);
router.use(userRoutes);
router.use(movieRouters);
router.use(taskRoutes);
router.use(roomRoutes);
router.use(foodRoutes);
router.use(scheduleRoutes);
router.use(promotionRoutes);
router.use(genreRoutes);
router.use(languageRoutes);
router.use(countryRoutes);
router.use(restrictionRoutes);
router.use(categoryRoutes);
router.use(statusRoutes);
router.use(sexRoutes);
router.use(resetPasswordRoutes);
router.use(forgotPasswordRoutes);
router.use(orderRoutes);
router.use(paymentRoutes);

export default router;

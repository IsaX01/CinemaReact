import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

  if (users.length !== 0) {
    const [user] = users;
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.TOKEN_SECRET_KEY
      );

      res.json({
        success: true,
        token,
        email: user.email,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          birthday: user.birthday,
          phone: user.phone,
          stripeId: user.stripe_id,
          sexId: user.sex_id,
          userName: user.user_name,
        },
      });
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication failed. Invalid password.',
      });
    }
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid username or password.',
    });
  }
};

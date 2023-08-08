import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { pool } from '../db';

/**
 * Route authentication middleware to verify a token
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: 'You are not authorized to perform this operation!' });
      } else {
        pool
          .query('SELECT email, id from users where id = ?', [decoded.id])
          .fetch()
          .then((user) => {
            if (!user) {
              res.status(HttpStatus.NOT_FOUND).json({ error: 'No such user' });
            } else {
              req.currentUser = user;
              next();
            }
          });
      }
    });
  } else {
    res.status(HttpStatus.FORBIDDEN).json({
      error: 'No token provided',
    });
  }
};

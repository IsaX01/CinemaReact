/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';

import { pool } from '../db';

export const findAll = async (req, res) => {
  try {
    const [genres] = await pool.query(
      'SELECT id "value", genre "label" FROM genres ORDER BY genre ASC'
    );
    res.json({
      error: false,
      data: genres,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const [genres] = await pool.query('SELECT * FROM genres WHERE id = ?', [req.params.id]);

    if (genres.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: genres[0],
      });
    }
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

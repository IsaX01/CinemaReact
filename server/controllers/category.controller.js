/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';

import { pool } from '../db';

export const findAll = async (req, res) => {
  try {
    const [categories] = await pool.query(
      'SELECT id "value", category "label" FROM categories ORDER BY category ASC'
    );
    res.json({
      error: false,
      data: categories,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM category WHERE id = ?', [req.params.id]);

    if (categories.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: categories[0],
      });
    }
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

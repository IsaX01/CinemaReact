/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';

import { pool } from '../db';

export const findAll = async (req, res) => {
  try {
    const [countries] = await pool.query(
      'SELECT id "value", country "label" FROM countries ORDER BY country ASC'
    );
    res.json({
      error: false,
      data: countries,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const [countries] = await pool.query('SELECT * FROM country WHERE id = ?', [req.params.id]);

    if (countries.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: countries[0],
      });
    }
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

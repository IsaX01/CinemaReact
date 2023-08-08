/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';

import { pool } from '../db';

export const findAll = async (req, res) => {
  try {
    const [languages] = await pool.query(
      'SELECT id "value", language "label" FROM languages ORDER BY language ASC'
    );
    res.json({
      error: false,
      data: languages,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const [languages] = await pool.query('SELECT * FROM languages WHERE id = ?', [req.params.id]);

    if (languages.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: languages[0],
      });
    }
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

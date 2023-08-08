/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';
import { pool } from '../db';

export const findAll = async (req, res) => {
  try {
    const [sex] = await pool.query('SELECT id "value", label FROM sex ORDER BY created_at ASC ');
    res.json({
      error: false,
      data: sex,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const [sex] = await pool.query('SELECT * FROM sex WHERE id = ?', [req.params.id]);

    if (sex.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: sex[0],
      });
    }
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

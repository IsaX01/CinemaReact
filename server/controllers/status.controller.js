/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';

import { pool } from '../db';

export const findAll = async (req, res) => {
  try {
    const [status] = await pool.query(
      'SELECT id "value", status "label" FROM status ORDER BY status ASC'
    );
    res.json({
      error: false,
      data: status,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const [status] = await pool.query('SELECT * FROM status WHERE id = ?', [req.params.id]);

    if (status.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: status[0],
      });
    }
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

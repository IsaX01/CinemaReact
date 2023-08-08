import HttpStatus from 'http-status-codes';
import { pool } from '../db.js';

export const findAllGenre = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT id "value", gender "label" FROM genders ORDER BY gender ASC'
    );
    res.json({
      error: false,
      data: result,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const findByIdGenre = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM genders WHERE id = ?', [req.params.id]);
    if (result.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: result[0],
      });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const findAllRoom = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT id "value", name "label" FROM room ORDER BY name ASC'
    );
    console.log(result);
    res.json({
      error: false,
      data: result,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const findByIdRoom = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM room WHERE id = ?', [req.params.id]);
    if (result.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: result[0],
      });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

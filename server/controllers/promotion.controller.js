/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db';
import { parseFormData } from '../utils/parseFormData';

export const findAll = async (req, res) => {
  try {
    const [promotions] = await pool.query(
      'SELECT * FROM promotion WHERE status_id = 1 ORDER BY created_at ASC '
    );
    res.json({
      error: false,
      data: promotions,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const [promotions] = await pool.query('SELECT * FROM promotion WHERE id = ?', [req.params.id]);

    if (promotions.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: promotions[0],
      });
    }
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const store = async (req, res) => {
  try {
    const { name, description, status_prom, date_ini, date_end, url_image } = await parseFormData({
      req,
      directory: 'promotions',
    });
    const id = uuidv4();
    const [result] = await pool.query(`SELECT COUNT(*) AS total from promotion where id = '${id}'`);
    const isPromotionRegistered = result[0].total > 0;

    if (isPromotionRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Invalid name promotion.' }],
      });
    } else {
      const insert = `INSERT INTO promotion (id, name, description, status_prom, url_image, date_ini, date_end, status_id)
              VALUES ('${id}', '${name}', '${description}', '${status_prom}','${url_image}','${date_ini}','${date_end}','1');`;
      const [data] = await pool.query(insert);
      res.json({
        success: true,
        data,
      });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, description, status_prom, date_ini, date_end, url_image } = await parseFormData({
      req,
      directory: 'promotions',
    });
    const [result] = await pool.query('UPDATE promotion SET ? where id = ?', [
      {
        name,
        description,
        status_prom,
        url_image,
        date_ini,
        date_end,
      },
      req.params.id,
    ]);

    res.json({
      error: false,
      data: result,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deletePromotion = async (req, res) => {
  console.log(req.params.id);
  try {
    await pool.query(`UPDATE promotion SET status_id = 0 WHERE id = '${req.params.id}';`);
    res.json({
      error: false,
      data: { message: 'Promotion deleted successfully.' },
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

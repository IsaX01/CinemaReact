/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db';
import { parseFormData } from '../utils/parseFormData';

export const findAll = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM foods WHERE status_id = 1 ORDER BY created_at ASC'
    );
    res.json({
      error: false,
      data: result,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const findAllFullInformation = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM view_foods_full_information');
    res.json({
      error: false,
      data: result,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM foods WHERE id = ?', [req.params.id]);
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

export const store = async (req, res) => {
  try {
    const { food, price, description, categories_id, url_image } = await parseFormData({
      req,
      directory: 'foods',
    });
    const id = uuidv4();
    const [result] = await pool.query(`SELECT COUNT(*) AS total from foods where food = '${food}'`);
    const isFoodRegistered = result[0].total > 0;

    if (isFoodRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Invalid food.' }],
      });
    } else {
      const insert = `INSERT INTO foods (id, food, price, url_image, description, categories_id, status_id)
              VALUES ('${id}', '${food}', ${price} , '${url_image}', '${description}', '${categories_id}', '1');`;
      const [data] = await pool.query(insert);
      res.json({
        success: true,
        data,
        insert,
      });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { food, price, description, categories_id, url_image } = await parseFormData({
      req,
      directory: 'foods',
    });
    const [result] = await pool.query('UPDATE foods SET ? where id = ?', [
      {
        food,
        price,
        url_image,
        description,
        categories_id,
        status_id: '1',
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

export const deleteFood = async (req, res) => {
  try {
    await pool.query(`UPDATE foods SET status_id = 0 where id = '${req.params.id}';`);
    res.json({
      error: false,
      data: { message: 'Food deleted successfully.' },
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

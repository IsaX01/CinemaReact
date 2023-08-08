/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db';
import { parseFormData } from '../utils/parseFormData';

export const findAll = async (req, res) => {
  try {
    const [rooms] = await pool.query(
      'SELECT * FROM room WHERE status_id = 1 ORDER BY created_at ASC '
    );
    res.json({
      error: false,
      data: rooms,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const [rooms] = await pool.query('SELECT * FROM room WHERE id = ?', [req.params.id]);

    if (rooms.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: rooms[0],
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
    const { name, location, is_vip, url_image, seats } = await parseFormData({
      req,
      directory: 'rooms',
    });
    const id = uuidv4();
    const [result] = await pool.query(`SELECT COUNT(*) AS total from room where name = '${name}'`);
    const isRoomRegistered = result[0].total > 0;

    if (isRoomRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Invalid name room.' }],
      });
    } else {
      const insert = `INSERT INTO room (id, name, location, is_vip, url_image, seats, status_id)
              VALUES ('${id}', '${name}', '${location}', '${is_vip}','${url_image}','${seats}', '1');`;
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
    const { name, location, is_vip, url_image, seats } = await parseFormData({
      req,
      directory: 'rooms',
    });
    const [result] = await pool.query('UPDATE room SET ? where id = ?', [
      {
        name,
        location,
        is_vip,
        url_image,
        seats,
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

export const deleteRoom = async (req, res) => {
  try {
    await pool.query(`UPDATE room SET status_id = 0 WHERE id = '${req.params.id}';`);
    res.json({
      error: false,
      data: { message: 'room deleted successfully.' },
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

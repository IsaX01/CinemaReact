import HttpStatus from 'http-status-codes';

import { pool } from '../db.js';

// Example with Async/Await

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM tasks ORDER BY createAt ASC');
    res.json(result);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await pool.query('INSERT INTO tasks(title, description) VALUES (?, ?)', [
      title,
      description,
    ]);
    res.json({
      id: result.insertId,
      title,
      description,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query('UPDATE tasks SET ? WHERE id = ?', [req.body, req.params.id]);
    res.json(result);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Task not found' });
    }

    return res.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

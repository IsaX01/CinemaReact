/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import { pool } from '../db';
import { parseFormData } from '../utils/parseFormData';

export const findAll = async (req, res) => {
  try {
    const [movies] = await pool.query('SELECT * FROM view_movie_genres');
    res.json({
      error: false,
      data: movies,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const [movies] = await pool.query('SELECT * FROM view_movie_genres WHERE id = ?', [
      req.params.id,
    ]);

    if (movies.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: movies[0],
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
    const {
      name,
      duration,
      release_date,
      description,
      url_image,
      url_trailer,
      restriction_id,
      languages_id,
      countries_id,
      cast,
      director,
      genres_id,
    } = await parseFormData({ req, directory: 'movie' });
    const id = uuidv4();
    const [result] = await pool.query(`SELECT COUNT(*) AS total from movie where name = '${name}'`);
    const isMovieRegistered = result[0].total > 0;

    if (isMovieRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Invalid name movie.' }],
      });
    } else {
      const insert = `INSERT INTO movie (id, name, duration, release_date, description, url_image, url_trailer, status_id, restriction_id, languages_id, countries_id, cast, director) VALUES ('${id}', '${name}', ${duration}, '${release_date}', '${description}', '${url_image}', '${url_trailer}', '1', '${restriction_id}', '${languages_id}', '${countries_id}', '${cast}', '${director}');`;
      const [data] = await pool.query(insert);

      const insertMovieGenreTable = `INSERT INTO movie_genres (genres_id, movie_id) VALUES ('${genres_id}', '${id}');`;
      await pool.query(insertMovieGenreTable);
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
    const movieId = req.params.id;
    const {
      name,
      duration,
      release_date,
      description,
      url_image,
      url_trailer,
      restriction_id,
      languages_id,
      countries_id,
      cast,
      director,
      genres_id,
    } = await parseFormData({ req, directory: 'movie' });

    const [result] = await pool.query('UPDATE movie SET ? where ID = ?', [
      {
        name,
        duration,
        release_date,
        description,
        url_image,
        url_trailer,
        restriction_id,
        languages_id,
        countries_id,
        cast,
        director,
      },
      movieId,
    ]);
    await pool.query(
      `UPDATE movie_genres SET genres_id = '${genres_id}' where movie_id = '${movieId}'`
    );
    res.json({
      error: false,
      data: result,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await pool.query(`UPDATE movie SET status_id = 0 WHERE id = '${req.params.id}';`);
    res.json({
      error: false,
      data: { message: 'movie deleted successfully.' },
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

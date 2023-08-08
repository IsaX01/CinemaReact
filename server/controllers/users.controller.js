/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import HttpStatus from 'http-status-codes';
import { regExPassword } from '../../shared/utils';
import { pool } from '../db';

export function findAll(req, res) {
  pool
    .query('SELECT * FROM users WHERE status_id = 1 ORDER BY created_at ASC')
    .then(([users]) =>
      res.json({
        error: false,
        data: users,
      })
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err.message,
      })
    );
}

export function findById(req, res) {
  pool
    .query('SELECT * FROM users WHERE id = ?', [req.params.id])
    .then(([users]) => {
      if (users.length === 0) {
        res.status(HttpStatus.NOT_FOUND).json({
          error: true,
          data: {},
        });
      } else {
        res.json({
          error: false,
          data: users[0],
        });
      }
    })
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err.message,
      })
    );
}

export const store = async (req, res) => {
  try {
    const { first_name, last_name, email, birthday, phone, sex_id, roles_id, user_name } = req.body;
    const id = uuidv4();
    const password = bcrypt.hashSync(req.body.password, 10);
    const [result] = await pool.query(
      `SELECT COUNT(*) AS total from users where email = '${email}'`
    );
    const isUserRegistered = result[0].total > 0;

    if (isUserRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Invalid email.' }],
      });
    } else {
      const insert = `INSERT INTO users (id, first_name, last_name, user_name, birthday, email, phone, password, sex_id, roles_id, status_id)
              VALUES ('${id}', '${first_name}', '${last_name}', '${user_name}', '${birthday}', '${email}', '${phone}', '${password}', '${sex_id}', '${roles_id}', '1');`;
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

export function update(req, res) {
  pool
    .query('UPDATE users SET ? where ID = ?', [
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        birthday: req.body.birthday,
        phone: req.body.phone,
        sex_id: req.body.sex_id,
        roles_id: req.body.roles_id,
        user_name: req.body.user_name,
      },
      req.params.id,
    ])
    .then((result) =>
      res.json({
        error: false,
        data: result,
      })
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: true,
        data: { message: err.message },
      })
    );
}

export function deleteUser(req, res) {
  pool
    .query(`UPDATE users SET status_id = 0 WHERE id = '${req.params.id}';`)
    .then(() =>
      res.json({
        error: false,
        data: { message: 'User deleted successfully.' },
      })
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: true,
        data: { message: err.message },
      })
    );
}

export const resetPassword = async (req, res) => {
  if (!regExPassword.test(req.body.password)) {
    res.send({
      message:
        'La contraseña debe contener mínimo seis caracteres y máximo dieciséis caracteres, al menos una letra y un número',
    });
  }

  const { oldPassword } = req.body;
  const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [req.body.id]);

  if (users.length !== 0) {
    const [user] = users;
    if (bcrypt.compareSync(oldPassword, user.password)) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const resetPassword = await pool
          .query('UPDATE users SET ? where id = ?', [
            {
              password: req.body.password,
            },
            req.body.id,
          ])
          .then(() => {
            res.status(HttpStatus.CREATED).send({
              message: 'Password change success',
            });
          })
          .catch((error) => {
            console.error('Something goes wrong:', error);
            res.status(HttpStatus.CREATED).send({
              message: 'Something goes wrong',
              error,
            });
          });
        console.log('password', resetPassword);
      } catch (error) {
        console.error('Something goes wrong at the final:', error);
        res.status(HttpStatus.CREATED).send({
          message: 'Something goes wrong',
          error,
        });
      }
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication failed. Invalid password.',
      });
    }
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid username or password.',
    });
  }
};

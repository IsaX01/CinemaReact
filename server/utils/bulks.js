import { pool } from '../db';

export const bulkInsert = async (tableName, columns, data) => {
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES ?`;

  const [result] = await pool.query(sql, [data], true);
  const affectedRows = result ? result.affectedRows : 0;

  return affectedRows;
};

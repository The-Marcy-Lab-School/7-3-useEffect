const pool = require('../db/pool');

module.exports.list = async () => {
  const { rows } = await pool.query('SELECT * FROM todos ORDER BY id');
  return rows;
};

module.exports.create = async (title) => {
  const { rows } = await pool.query(
    'INSERT INTO todos (title) VALUES ($1) RETURNING *',
    [title]
  );
  return rows[0];
};

module.exports.update = async (id, is_complete) => {
  const { rows } = await pool.query(
    'UPDATE todos SET is_complete = $1 WHERE id = $2 RETURNING *',
    [is_complete, id]
  );
  return rows[0] || null;
};

module.exports.destroy = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM todos WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0] || null;
};

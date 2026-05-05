const pool = require('./pool');

const seed = async () => {
  await pool.query('DROP TABLE IF EXISTS todos');

  await pool.query(`
    CREATE TABLE todos (
      todo_id          SERIAL PRIMARY KEY,
      title       TEXT NOT NULL,
      is_complete BOOLEAN NOT NULL DEFAULT false
    )
  `);

  await pool.query(`
    INSERT INTO todos (title) VALUES
      ('Take out the trash'),
      ('Wash the dishes'),
      ('Walk the dog')
  `);

  console.log('Database seeded.');
};

seed()
  .catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
  })
  .finally(() => pool.end());

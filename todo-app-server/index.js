require('dotenv').config();

const express = require('express');
const logRoutes = require('./middleware/logRoutes');
const { listTodos, createTodo, updateTodo, deleteTodo } = require('./controllers/todoControllers');

const app = express();
const PORT = process.env.PORT || 8080;

// ====================================
// Middleware
// ====================================

app.use(logRoutes);
app.use(express.json());

// ====================================
// Todo routes
// ====================================

app.get('/api/todos', listTodos);
app.post('/api/todos', createTodo);
app.patch('/api/todos/:todo_id', updateTodo);
app.delete('/api/todos/:todo_id', deleteTodo);

// ====================================
// Error handling
// ====================================

const handleError = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
};

app.use(handleError);

// ====================================
// Listen
// ====================================

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

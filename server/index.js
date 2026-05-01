require('dotenv').config();

const path = require('path');
const express = require('express');
const logRoutes = require('./middleware/logRoutes');
const { listTodos, createTodo, updateTodo, deleteTodo } = require('./controllers/todoControllers');

const app = express();
const PORT = process.env.PORT || 8080;
const pathToFrontend = process.env.NODE_ENV === 'production' ? '../frontend/dist' : '../frontend';

// ====================================
// Middleware
// ====================================

app.use(logRoutes);
app.use(express.json());
app.use(express.static(path.join(__dirname, pathToFrontend)));

// ====================================
// Todo routes
// ====================================

app.get('/api/todos', listTodos);
app.post('/api/todos', createTodo);
app.patch('/api/todos/:id', updateTodo);
app.delete('/api/todos/:id', deleteTodo);

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

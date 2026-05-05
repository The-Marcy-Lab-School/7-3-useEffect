const todoModel = require('../models/todoModel');

// GET /api/todos
const listTodos = async (req, res, next) => {
  try {
    const todos = await todoModel.list();
    res.send(todos);
  } catch (err) {
    next(err);
  }
};

// POST /api/todos  { title }
const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    const todo = await todoModel.create(title);
    res.status(201).send(todo);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/todos/:todo_id  { is_complete }
const updateTodo = async (req, res, next) => {
  try {
    const { is_complete } = req.body;
    const todo = await todoModel.update(req.params.todo_id, is_complete);
    if (!todo) return res.status(404).send({ message: 'Todo not found' });
    res.send(todo);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/todos/:todo_id
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await todoModel.destroy(req.params.todo_id);
    if (!todo) return res.status(404).send({ message: 'Todo not found' });
    res.send(todo);
  } catch (err) {
    next(err);
  }
};

module.exports = { listTodos, createTodo, updateTodo, deleteTodo };

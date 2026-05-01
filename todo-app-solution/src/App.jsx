import { useState, useEffect } from 'react';
import { fetchAllTodos, createTodo } from './fetch-helpers';
import './App.css';

const TodoItem = ({ todo }) => {
  return (
    <li className="todo-item">
      <span>{todo.title}</span>
    </li>
  );
};

const TodoList = ({ todos }) => {
  return (
    <ul id="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

const AddTodoForm = ({ addTodo }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.elements.title.value;
    await addTodo(title);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Todo:</label>
      <input type="text" name="title" id="title-input" />
      <button>Add</button>
    </form>
  );
};

function App() {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    const { data, error } = await fetchAllTodos();
    if (error) return console.error(error);
    setTodos(data);
  };

  // Pass in an anonymous "wrapper" that invokes loadTodos
  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (title) => {
    const { error } = await createTodo(title);
    if (error) return console.error(error);
    await loadTodos();
  };

  return (
    <main>
      <h1>My Todos</h1>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todos={todos} />
    </main>
  );
}

export default App;

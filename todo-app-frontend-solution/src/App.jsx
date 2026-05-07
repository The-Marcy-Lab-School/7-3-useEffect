import { useState, useEffect } from 'react';
import { fetchAllTodos, createTodo, toggleTodo, deleteTodo } from './fetch-helpers';
import './App.css';

const TodoItem = ({ todo, loadTodos }) => {
  const handleChange = async (e) => {
    // 1. Send PATCH request
    const { error } = await toggleTodo(todo.todo_id, e.target.checked);
    if (error) return console.error(error);

    // 2. Refetch
    await loadTodos();
  }
  const handleClick = async (e) => {
    // 1. Send DELETE request
    const { error } = await deleteTodo(todo.todo_id);
    if (error) return console.error(error);

    // 2. send GET request
    await loadTodos();
  }

  return (
    <li className="todo-item">
      <span>{todo.title}</span>
      <div className="todo-item-controls">
        <input type="checkbox" checked={todo.is_complete} onChange={handleChange} />
        <button onClick={handleClick}>Delete</button>
      </div>
    </li>
  );
};

const TodoList = ({ todos, loadTodos }) => {
  // pass along a `todo` and `loadTodos` to each TodoItem
  return (
    <ul id="todo-list">
      {todos.map((todo) => <TodoItem key={todo.todo_id} todo={todo} loadTodos={loadTodos} />)}
    </ul>
  )
}

const AddTodoForm = ({ loadTodos }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.elements.title.value;
    if (!title) return;

    // 1. Send POST request
    const { error } = await createTodo(title);
    if (error) return console.error(error);

    // 2. Refetch
    await loadTodos(); // send GET request

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

  // the only place where todos is ever set
  const loadTodos = async () => {
    const { data, error } = await fetchAllTodos(); // Send GET request
    if (error) return console.error(error);
    setTodos(data);
  };

  // Pass in an anonymous "wrapper" that invokes loadTodos
  useEffect(() => {
    loadTodos();
  }, []);

  // Pass along `todos` and `loadTodos` as props
  return (
    <main>
      <h1>My Todos</h1>
      <AddTodoForm loadTodos={loadTodos} />
      <TodoList todos={todos} loadTodos={loadTodos} />
    </main>
  );
}

export default App;

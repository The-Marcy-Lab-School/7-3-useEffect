import { useState } from 'react';
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
      {todos.map((todo) => <TodoItem key={todo.todo_id} todo={todo} />)}
    </ul>
  )
}

const AddTodoForm = () => {

  // Standard form handling logic
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.elements.title.value;
    if (!title) return;

    console.log('posting todo...');

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

  return (
    <main>
      <h1>My Todos</h1>
      <AddTodoForm />
      <TodoList todos={todos} />
    </main>
  );
}

export default App;

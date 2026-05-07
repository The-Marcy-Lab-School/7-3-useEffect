import { useState } from 'react';
import './App.css';

const TodoItem = ({ todo }) => {
  const handleToggleCheckbox = () => {

  }
  return (
    <li className="todo-item">
      <span>{todo.title}</span>
      <div className="todo-item-controls">
        <input type="checkbox" checked={todo.is_complete} onChange={handleToggleCheckbox} />
        <button>Delete</button>
      </div>
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

const AddTodoForm = ({ setTodos }) => {

  // Standard form handling logic
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.elements.title.value;
    if (!title) return;

    // TODO: Replace with database fetching logic
    setTodos((todos) => {
      const newTodo = {
        todo_id: todos.length + 1,
        is_complete: false,
        title,
      }
      console.log('posting todo...', newTodo);
      return [...todos, newTodo];
    });

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
  // Todos state needs to live in the App so it can be shared by child components
  const [todos, setTodos] = useState([
    { "todo_id": 1, "title": "Buy groceries", "is_complete": false },
    { "todo_id": 2, "title": "Finish homework", "is_complete": false },
    { "todo_id": 3, "title": "Walk the dog", "is_complete": true },
  ]);

  return (
    <main>
      <h1>My Todos</h1>
      <AddTodoForm setTodos={setTodos} />
      <TodoList todos={todos} />
    </main>
  );
}

export default App;

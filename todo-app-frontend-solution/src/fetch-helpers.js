export const fetchAllTodos = async () => {
  try {
    const response = await fetch('/api/todos');
    if (!response.ok) return Error(`Error ${response.status} - ${response.statusText}`)
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const createTodo = async (title) => {
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) return Error(`Error ${response.status} - ${response.statusText}`)
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const toggleTodo = async (todo_id, is_complete) => {
  try {
    const response = await fetch(`/api/todos/${todo_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_complete }),
    });
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const deleteTodo = async (todo_id) => {
  try {
    const response = await fetch(`/api/todos/${todo_id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

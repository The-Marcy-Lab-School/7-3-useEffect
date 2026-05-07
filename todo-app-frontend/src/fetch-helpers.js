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

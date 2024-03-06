// Example Create API endpoint
const createTodo = async (todoData) => {
  try {
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating Todo:", error);
  }
};

const fetchTodos = async ({ page, limit = 10 }) => {
  try {
    const response = await fetch(`/api/todo?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Todos:", error);
  }
};

const updateTodo = async (todoId, updatedData) => {
  try {
    const response = await fetch(`/api/todo/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating Todo:", error);
  }
};

// Example Delete API endpoint
const deleteTodo = async (todoId) => {
  try {
    const response = await fetch(`/api/todo/${todoId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting Todo:", error);
  }
};

export { createTodo, fetchTodos, updateTodo, deleteTodo };

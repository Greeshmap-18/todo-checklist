import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const backendURL = "http://127.0.0.1:8000/todos";

  // Fetch tasks from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get(backendURL);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new task
  const addTodo = async () => {
    if (!task.trim()) return;

    const newTodo = { id: Date.now(), task };

    try {
      await axios.post(backendURL, newTodo);
      setTodos((prev) => [...prev, newTodo]); // update frontend instantly
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a task
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${backendURL}/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Todo List</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
          style={{ display: "flex", gap: "10px", marginBottom: "15px" }}
        >
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task"
            style={{ flex: 1, padding: "5px" }}
          />
          <button type="submit" style={{ padding: "5px 10px" }}>
            Add
          </button>
        </form>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.length === 0 && <li>No tasks yet</li>}
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#e0f7fa",
              }}
            >
              {todo.task}
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: "2px 8px",
                  background: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

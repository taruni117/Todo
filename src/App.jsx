import React, { useState } from "react";

const S = {
  body: {
    minHeight: "100vh",
    background: "#f0f4ff",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 16px",
    fontFamily: "'Segoe UI', sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(99,102,241,0.12)",
    padding: "32px 28px",
    border: "1px solid #e0e7ff",
  },

  header: { marginBottom: "28px" },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e1b4b",
    margin: 0,
  },
  subtitle: {
    fontSize: "0.82rem",
    color: "#94a3b8",
    marginTop: "4px",
  },

  statsRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  statBox: {
    flex: 1,
    minWidth: "80px",
    background: "#f8f9ff",
    border: "1px solid #e0e7ff",
    borderRadius: "10px",
    padding: "10px 14px",
    textAlign: "center",
  },
  statNum: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#6366f1",
  },
  statLabel: {
    fontSize: "0.7rem",
    color: "#94a3b8",
    fontWeight: "500",
  },

  formRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "140px",
    padding: "11px 14px",
    border: "1.5px solid #e0e7ff",
    borderRadius: "10px",
    fontSize: "0.9rem",
    color: "#1e1b4b",
    background: "#f8f9ff",
    outline: "none",
    fontFamily: "inherit",
  },
  select: {
    padding: "11px 10px",
    border: "1.5px solid #e0e7ff",
    borderRadius: "10px",
    fontSize: "0.82rem",
    color: "#6366f1",
    background: "#f8f9ff",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  addBtn: {
    padding: "11px 20px",
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },

  filters: {
    display: "flex",
    gap: "6px",
    marginBottom: "18px",
    background: "#f0f4ff",
    padding: "4px",
    borderRadius: "10px",
  },
  filterBtn: (active) => ({
    flex: 1,
    padding: "7px 0",
    border: "none",
    borderRadius: "7px",
    background: active ? "#6366f1" : "transparent",
    color: active ? "#fff" : "#94a3b8",
    fontWeight: "600",
    cursor: "pointer",
  }),

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  item: (done) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 15px",
    background: done ? "#f8fffe" : "#fff",
    border: `1.5px solid ${done ? "#a7f3d0" : "#e0e7ff"}`,
    borderRadius: "12px",
  }),

  chk: (done) => ({
    width: "20px",
    height: "20px",
    borderRadius: "6px",
    border: `2px solid ${done ? "#10b981" : "#c7d2fe"}`,
    background: done ? "#10b981" : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#fff",
  }),

  todoText: (done) => ({
    flex: 1,
    fontSize: "0.88rem",
    color: done ? "#94a3b8" : "#1e1b4b",
    textDecoration: done ? "line-through" : "none",
  }),

  badge: (p) => {
    const map = {
      high: { bg: "#fee2e2", color: "#dc2626" },
      medium: { bg: "#fef3c7", color: "#d97706" },
      low: { bg: "#d1fae5", color: "#059669" },
    };
    return {
      fontSize: "0.68rem",
      fontWeight: "700",
      padding: "3px 8px",
      borderRadius: "999px",
      ...map[p],
    };
  },

  delBtn: {
    background: "transparent",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: "14px",
  },

  empty: {
    textAlign: "center",
    padding: "36px 0",
    color: "#94a3b8",
  },

  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    paddingTop: "16px",
    borderTop: "1px solid #e0e7ff",
  },

  clearBtn: {
    fontSize: "0.76rem",
    color: "#94a3b8",
    background: "transparent",
    border: "1px solid #e0e7ff",
    borderRadius: "7px",
    padding: "5px 12px",
    cursor: "pointer",
  },
};

const PRIORITIES = ["high", "medium", "low"];

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [prio, setPrio] = useState("medium");
  const [filter, setFilter] = useState("all");

  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  const active = total - done;

  function addTodo() {
    if (!text.trim()) return;
    setTodos([
      { id: Date.now(), text, priority: prio, done: false },
      ...todos,
    ]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTodos(todos.filter((t) => !t.done));
  }

  const visible = todos.filter((t) =>
    filter === "all"
      ? true
      : filter === "active"
      ? !t.done
      : t.done
  );

  return (
    <div style={S.body}>
      <div style={S.card}>
        <div style={S.header}>
          <h1 style={S.title}>📝 Todo App</h1>
          <p style={S.subtitle}>Stay organised. Get things done.</p>
        </div>

        <div style={S.statsRow}>
          {[["Total", total], ["Active", active], ["Done", done]].map(
            ([label, val]) => (
              <div style={S.statBox} key={label}>
                <div style={S.statNum}>{val}</div>
                <div style={S.statLabel}>{label}</div>
              </div>
            )
          )}
        </div>

        <div style={S.formRow}>
          <input
            style={S.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="What needs to be done?"
          />

          <select
            style={S.select}
            value={prio}
            onChange={(e) => setPrio(e.target.value)}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <button style={S.addBtn} onClick={addTodo}>
            + Add
          </button>
        </div>

        <div style={S.filters}>
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              style={S.filterBtn(filter === f)}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={S.list}>
          {visible.length === 0 ? (
            <div style={S.empty}>No tasks here — add one!</div>
          ) : (
            visible.map((todo) => (
              <div key={todo.id} style={S.item(todo.done)}>
                <div
                  style={S.chk(todo.done)}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.done && "✓"}
                </div>

                <span style={S.todoText(todo.done)}>
                  {todo.text}
                </span>

                <span style={S.badge(todo.priority)}>
                  {todo.priority}
                </span>

                <button
                  style={S.delBtn}
                  onClick={() => deleteTodo(todo.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div style={S.bottomRow}>
          <span>{active} tasks remaining</span>

          <button style={S.clearBtn} onClick={clearDone}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}
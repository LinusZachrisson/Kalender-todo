//import { eventTupleToStore } from "@fullcalendar/react";
import React, { useState } from "react";
import "./addTodo.css";

// const AddTodo = () => {
//   const [todos, setTodos] = useState([
//     { title: "todo 1", date: "2021-09-01" },
//     { title: "todo 2", date: "2021-09-02" },
//   ]);

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     setTodos(...todos);
//   };

//   return prompt(
//     <form onSubmit={handleOnSubmit}>
//       <input
//         type="text"
//         value={todos.title}
//         placeholder="Add todo"
//         onChange={(evt) => setTodos({ todos, title: evt.target.value })}
//       />
//       <button>Submit todo</button>
//     </form>
//   );
// };

const AddTodo = ({ closeAddTodo }) => {
  const [todos, setTodos] = useState([
    { title: "", date: "" },
    { title: "", date: "" },
  ]);

  const submitTodo = () => {
    console.log(todos);
  };

  return (
    <div className="popup-background">
      <div className="todo-container">
        <div className="close-btn">
          <button onClick={() => closeAddTodo(false)}> X </button>
        </div>
        <div className="title">
          <h1>Add a todo</h1>
        </div>
        <div className="body">
          <h2>Date</h2>
          <input
            type="text"
            placeholder="Add todo"
            value={todos}
            onChange={(evt) => setTodos(evt.target.value)}
          />
        </div>
        <div className="footer">
          <button onClick={submitTodo}>Submit todo</button>
          <button onClick={() => closeAddTodo(false)} id="cancelBtn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;

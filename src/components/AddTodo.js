//import { eventTupleToStore } from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import "./addTodo.css";

const AddTodo = ({ closeAddTodo, date, addTodo }) => {
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);

  const submitTodo = () => {
    addTodo(value);
    closeAddTodo(false);
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
          <h2>{`${date}`}</h2>
          <input
            type="text"
            placeholder="Add todo"
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
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

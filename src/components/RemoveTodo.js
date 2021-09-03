//import { eventTupleToStore } from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import "./addTodo.css";
import "./removeTodo.css";

const RemoveTodo = ({ closeRemoveTodo, date, todos }) => {
  const deleteTodo = () => {
    closeRemoveTodo(false);
  };

  return (
    <div className="popup-background">
      <div className="remove-todo-container">
        <div className="close-btn">
          <button onClick={() => closeRemoveTodo(false)}> X </button>
        </div>
        <div className="title">
          <h1>{`Todo: ${todos[0].title}`}</h1>
        </div>
        <div className="body">
          <h2>{`Deadline: ${date}`}</h2>
        </div>
        <div className="footer">
          <button onClick={deleteTodo} id="doneBtn">
            Done &#x2713;
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveTodo;

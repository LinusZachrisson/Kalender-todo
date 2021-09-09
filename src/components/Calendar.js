import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import React, { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import RemoveTodo from "./RemoveTodo";

import { v4 as uuidv4 } from "uuid";
import FetchApi from "./FetchApi";

function Calendar() {
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [todos, setTodos] = useState([
    {
      title: "fotboll",
      date: "2021-09-15",
      complete: false,
      id: uuidv4(),
    },
    {
      title: "diska",
      date: "2021-09-16",
      complete: true,
      id: uuidv4(),
    },
  ]);
  const [todo, setTodo] = useState({});
  const [date, setDate] = useState("");
  const [openRemoveTodo, setOpenRemoveTodo] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");

  useEffect(() => {
    getSavedTodosFromLocalStorage();
  }, []);

  useEffect(() => {
    saveTodosToLocalStorage();
  });

  const renderEventContent = (eventInfo) => {
    const todo = todos.find((t) => t.id === eventInfo.event._def.publicId);
    todo.complete
      ? (eventInfo.backgroundColor = "green")
      : (eventInfo.backgroundColor = "blue");
  };

  const saveTodosToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getSavedTodosFromLocalStorage = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([{}]));
    } else {
      let savedTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(savedTodos);
    }
  };

  const addTodo = (e) => {
    const newTodos = [
      ...todos,
      { title: e, date: date, complete: false, id: uuidv4() },
    ];
    setTodos(newTodos);
    console.log("added todo:", newTodos);
  };

  const removeTodo = (e) => {
    const newTodos = todos.filter((t) => t.id !== e.id);
    setTodos(newTodos);
    console.log(e);
  };

  const toggleCompleteTodo = (e) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === e.id) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    console.log(updatedTodos);
    console.log(e);
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-border">
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
            dateClick={(e) => {
              setOpenAddTodo(true);
              setDate(e.dateStr);
            }}
            eventClick={(e) => {
              const td = todos.find((t) => t.id === e.event._def.publicId);
              setTodo(td);
              setOpenRemoveTodo(true);
            }}
            eventContent={renderEventContent}
            dayMaxEventRows={true}
            selectable="true"
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev, next today",
              center: "title",
              right: "dayGridMonth, dayGridWeek, dayGridDay, listYear",
            }}
            events={todos.map((t) => t)}
          />
        </div>
      </div>
      {openAddTodo && date && (
        <AddTodo date={date} addTodo={addTodo} closeAddTodo={setOpenAddTodo} />
      )}
      {openRemoveTodo && date && (
        <RemoveTodo
          todoTitle={todoTitle}
          date={todo.date}
          todo={todo}
          closeRemoveTodo={setOpenRemoveTodo}
          removeTodo={removeTodo}
          toggleCompleteTodo={toggleCompleteTodo}
        />
      )}
      <FetchApi />
    </div>
  );
}

export default Calendar;

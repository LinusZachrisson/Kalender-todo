import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import React, { useState } from "react";
import AddTodo from "./AddTodo";
import RemoveTodo from "./RemoveTodo";

function Calendar() {
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [todos, setTodos] = useState([
    { title: "fotboll", date: "2021-09-15", complete: false },
    { title: "diska", date: "2021-09-16", complete: true },
  ]);
  const [todo, setTodo] = useState({});
  const [date, setDate] = useState("");
  const [openRemoveTodo, setOpenRemoveTodo] = useState(false);
  const [id, setId] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoTitle, setTodoTitle] = useState("");

  const renderEventContent = (eventInfo) => {
    const todo = todos.find((t) => t.title === eventInfo.event.title);
    todo.complete
      ? (eventInfo.backgroundColor = "green")
      : (eventInfo.backgroundColor = "blue");

    console.log(eventInfo);
    console.log(todo);
  };

  const addTodo = (e) => {
    const newTodos = [...todos, { title: e, date: date, id: id }];
    setTodos(newTodos);
    console.log(newTodos);
  };

  const removeTodo = (e) => {
    const newTodos = todos.filter((todo) => e.title !== todo.title);
    setTodos(newTodos);
    console.log(e);
  };

  const toggleCompleteTodo = (e) => {
    const newTodos = todos.map((t) => {
      if (t.title === e.title) {
        t.complete = !t.complete;
      }
      return t;
    });
    setTodos(newTodos);
    console.log(newTodos);
    console.log(e);
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          dateClick={(e) => {
            setOpenAddTodo(true);
            setDate(e.dateStr);
            setId(Math.floor(Math.random() * 10000));
          }}
          eventClick={(e) => {
            const td = todos.filter((t) => t.title === e.el.textContent);
            setTodo(td[0]);
            setTodoTitle(td[0].title);
            setTodoDate(td[0].date);
            setOpenRemoveTodo(true);
          }}
          eventContent={renderEventContent}
          dayMaxEventRows="true"
          selectable="true"
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev, next today",
            center: "title",
            right: "dayGridMonth, dayGridWeek, dayGridDay, listYear",
          }}
          events={todos}
        />
      </div>
      {openAddTodo && date && (
        <AddTodo date={date} addTodo={addTodo} closeAddTodo={setOpenAddTodo} />
      )}
      {openRemoveTodo && date && (
        <RemoveTodo
          todoTitle={todoTitle}
          date={todoDate}
          todo={todo}
          closeRemoveTodo={setOpenRemoveTodo}
          id={id}
          removeTodo={removeTodo}
          toggleCompleteTodo={toggleCompleteTodo}
        />
      )}
    </div>
  );
}

export default Calendar;

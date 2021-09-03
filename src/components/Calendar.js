import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import React, { useState } from "react";
import AddTodo from "./AddTodo";
import RemoveTodo from "./RemoveTodo";

function Calendar() {
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState("");
  const [openRemoveTodo, setOpenRemoveTodo] = useState(false);

  const addTodo = (e) => {
    const newTodos = [...todos, { title: e, date: date }];
    setTodos(newTodos);
  };

  const handleEventClick = () => {
    alert(
      `Todo: ${todos[0].title} Deadline: ${todos[0].date} <button>Delete todo</button>`
    );
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          dateClick={(e) => {
            setOpenAddTodo(true);
            setDate(e.dateStr);
          }}
          eventClick={() => {
            setOpenRemoveTodo(true);
          }}
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
          date={date}
          todos={todos}
          closeRemoveTodo={setOpenRemoveTodo}
        />
      )}
    </div>
  );
}

export default Calendar;

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import React, { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import RemoveTodo from "./RemoveTodo";

import { v4 as uuidv4 } from "uuid";

function Calendar() {
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todo, setTodo] = useState({});
  const [date, setDate] = useState("");
  const [openRemoveTodo, setOpenRemoveTodo] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const renderEventContent = (eventInfo) => {
    const todo = todos.find((t) => t.id === eventInfo.event._def.publicId);
    todo.complete
      ? (eventInfo.backgroundColor = "green")
      : (eventInfo.backgroundColor = "blue");
  };

  const addTodo = (e) => {
    const newTodos = [
      ...todos,
      { title: e, date: date, complete: false, id: uuidv4() },
    ];
    setTodos(newTodos);
  };

  const removeTodo = (e) => {
    const newTodos = todos.filter((t) => t.id !== e.id);
    setTodos(newTodos);
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
  };

  const fetchHolidays = () => {
    fetch(`https://sholiday.faboul.se/dagar/v2.1/2021`)
      .then((response) => response.json())
      .then((data) => {
        holiday(data.dagar);
      });
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const holiday = (dag) => {
    const holidays = dag.filter((dag) => dag.helgdag);

    const specialDays = [];

    holidays.map((x) =>
      specialDays.push({
        title: x.helgdag,
        date: x.datum,
        id: uuidv4(),
        display: "background",
      })
    );

    const specialEventsDisplay = [...todos, ...specialDays];

    setTodos(specialEventsDisplay);
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
            events={todos}
          />
        </div>
      </div>
      {openAddTodo && date && (
        <AddTodo date={date} addTodo={addTodo} closeAddTodo={setOpenAddTodo} />
      )}
      {openRemoveTodo && date && (
        <RemoveTodo
          date={todo.date}
          todo={todo}
          closeRemoveTodo={setOpenRemoveTodo}
          removeTodo={removeTodo}
          toggleCompleteTodo={toggleCompleteTodo}
        />
      )}
    </div>
  );
}

export default Calendar;

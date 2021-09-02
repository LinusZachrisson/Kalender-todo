import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import React, { useState } from "react";
import AddTodo from "./AddTodo";

function Calendar({ todos }) {
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [date, setDate] = useState("");

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          dateClick={(e) => {
            setOpenAddTodo(true);
            setDate(e.dateStr);
          }}
          selectable="true"
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev, next today",
            center: "title",
            right: "dayGridMonth, dayGridWeek, dayGridDay, listWeek",
          }}
          events={todos}
        />
      </div>
      {openAddTodo && date && (
        <AddTodo date={date} closeAddTodo={setOpenAddTodo} />
      )}
    </div>
  );
}

export default Calendar;

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import React, { useState } from "react";
import AddTodo from "./AddTodo";

function Calendar({ setNewTodos }) {
  const [openAddTodo, setOpenAddTodo] = useState(false);

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          dateClick={() => {
            setOpenAddTodo(true);
          }}
          selectable="true"
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev, next today",
            center: "title",
            right: "dayGridMonth, dayGridWeek, dayGridDay, listWeek",
          }}
          //events={todos}
        />
      </div>
      {openAddTodo && <AddTodo closeAddTodo={setOpenAddTodo} />}
    </div>
  );
}

export default Calendar;

// const [todos, setTodos] = useState([
//   { title: "todo 1", date: "2021-09-01" },
//   { title: "todo 2", date: "2021-09-02" },
// ]);

//   const [todos, setTodos] = useState([
//     { title: "todo 1", date: "2021-09-01" },
//     { title: "todo 2", date: "2021-09-02" },
//   ]);

//   const handleOnSubmit = (e) => {
//     setTodos(...todos, {date: `${e.dateStr}`});
//   };
// const handleDateClick = () => {

//     <div>
//       prompt(
//       <input
//         type="text"
//         value={todos.title}
//         placeholder="Add todo"
//         onChange={(evt) => setTodos({ todos, title: evt.target.value })}
//       />
//       <button>Submit todo</button>
//       );
//       </div>

// };
// }

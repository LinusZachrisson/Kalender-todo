import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

const handleDateClick = () => {};

function Calendar() {
  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev, next today",
            center: "title",
            right: "dayGridMonth, dayGridWeek, dayGridDay, listWeek",
          }}
        />
      </div>
    </div>
  );
}

export default Calendar;

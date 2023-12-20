import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => (
  <div className="height600">
    <Calendar
      localizer={localizer}
      // events={events}
      startAccessor="start"
      endAccessor="end"
      views={["month"]}
      showMultiDayTimes
    />
  </div>
);

export default MyCalendar;

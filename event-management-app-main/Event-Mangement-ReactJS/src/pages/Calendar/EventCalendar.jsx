import React, { useState } from 'react';
import Calendar from 'react-calendar';  // This is the react-calendar component
import 'react-calendar/dist/Calendar.css'; // Styles for react-calendar
import "bootstrap/dist/css/bootstrap.min.css";

// Rename your component to avoid conflict with the imported Calendar
const EventCalendar = ({ events }) => {
  const [date, setDate] = useState(new Date());

  // Filter events for the selected date
  const filteredEvents = events.filter(event =>
    new Date(event.date).toLocaleDateString() === date.toLocaleDateString()
  );

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h6 className="text-purple fw-bold">Event Calendar</h6>
        <h2 className="fw-bold">Select a Date</h2>
        <p className="text-muted">Click a date on the calendar to see events for that day!</p>
      </div>

      {/* React Calendar component */}
      <div className="row">
        <div className="col-md-6">
          <Calendar
            onChange={setDate}
            value={date}
            className="shadow p-3 rounded-3"
          />
        </div>

        {/* Display filtered events for the selected date */}
        <div className="col-md-6">
          <h4>Events on {date.toLocaleDateString()}</h4>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div key={index} className="card mb-3 p-3">
                <h5>{event.heading}</h5>
                <p>{event.location}</p>
                <p>{event.time}</p>
              </div>
            ))
          ) : (
            <p>No events for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;

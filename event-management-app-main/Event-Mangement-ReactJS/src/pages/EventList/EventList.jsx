import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Ticket from "../Ticket/Ticket";
import EventCalendar from "../Calendar/EventCalendar";

export default function EventList() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleShow = (eventHeading) => {
    setSelectedEvent(eventHeading);
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setSelectedEvent("");
  };

  const eventList = [
    {
      id: 1,
      date: "2025-01-23",
      time: "10:00 AM - 11:30 AM",
      heading: "Innovate 2025: Unleashing the Power of Change",
      location: "Ballroom Extra Hotel",
      img: "https://media.istockphoto.com/id/1633281467/photo/asian-multiethnic-business-people-talk-during-a-coffee-break-in-seminar-business-conference.webp?a=1&b=1&s=612x612&w=0&k=20&c=e_7Uzhn_xm6w9ASR5jkMQqTGUlkRUL9_g9Y-YzVZPcM="
    },
    {
      id: 2,
      date: "2025-03-17",
      time: "10:00 AM - 11:30 AM",
      heading: "GreenTech: Engineering Sustainable Futures",
      location: "Grand Central Hotel",
      img: "https://media.istockphoto.com/id/1482845206/photo/male-asking-a-question-to-a-speaker-during-a-q-and-a-session-at-an-international-tech.webp?a=1&b=1&s=612x612&w=0&k=20&c=3QYZvwo2gqIpfH5hU5cfXPQHNCm36ANYY8gKy7pNHVw="
    },
    {
      id: 3,
      date: "2025-04-11",
      time: "10:00 AM - 11:30 AM",
      heading: "Pioneering New Frontiers in Medicine",
      location: "Ballroom Extra Hotel",
      img: "https://media.istockphoto.com/id/493958679/photo/audience-at-the-conference-hall.webp?a=1&b=1&s=612x612&w=0&k=20&c=s7ByGuoqeuq0UU10knH_o4Jh9iVXWNb6bM73e7W5Azc="
    },
    {
      id: 4,
      date: "2025-05-06",
      time: "2:00 PM - 3:30 PM",
      heading: "Future of AI in Healthcare",
      location: "Tech Arena Center",
      img: "https://media.istockphoto.com/id/821463698/photo/microphone-over-the-abstract-blurred-photo-of-conference-hall-or-seminar-room-with-attendee.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ag7G6V2-kgPiM9tCx3ay40hU6ccri261HUeWahGfSkQ="
    },
    {
      id: 5,
      date: "2025-06-02",
      time: "11:00 AM - 12:30 PM",
      heading: "Blockchain: Securing Tomorrow",
      location: "Grand Central Hotel",
      img: "https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.webp?a=1&b=1&s=612x612&w=0&k=20&c=GANexorEVO7mDrp8JUHZKwoFbER0hfgrhu9pMkGfAq8="
    },
    {
      id: 6,
      date: "2025-07-18",
      time: "9:00 AM - 10:30 AM",
      heading: "Virtual Reality: The Next Frontier",
      location: "Expo Hall West",
      img: "https://images.unsplash.com/photo-1535041195258-607127544040?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnRzfGVufDB8fDB8fHww"
    }
  ];

  return (
    <>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h6 className="text-purple fw-bold">Schedule Details</h6>
          <h2 className="fw-bold">Event Schedule</h2>
          <p className="text-muted">Explore what’s coming up and get your tickets now!</p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 g-4">
          {eventList.length > 0 ? (
            eventList.map(({ id, date, time, heading, location, img }) => (
              <div key={id} className="col">
                <div className="card border-0 shadow rounded-4 p-3 h-100">
                  <div className="row g-3 align-items-center">
                    <div className="col-4">
                      <img src={img} alt="Event" className="img-fluid rounded-3" style={{ height: '150px', objectFit: 'cover' }} />
                    </div>
                    <div className="col-8">
                      <div className="d-flex flex-wrap gap-3 text-muted mb-2 small">
                        <span>📅 {date}</span>
                        <span>🕘 {time}</span>
                        <span>📍 {location}</span>
                      </div>
                      <h5 className="text-purple fw-semibold mb-2">{heading}</h5>
                      <p className="text-muted mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id tortor ultricies.</p>
                      
                      <button 
                        className="btn btn-dark"
                        onClick={() => handleShow(heading)}
                      >
                        GET A TICKET
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <Ticket show={modalShow} handleClose={handleClose} selectedEvent={selectedEvent} />

      {/* Calendar Component */}
      <EventCalendar events={eventList} />
    </>
  );
}

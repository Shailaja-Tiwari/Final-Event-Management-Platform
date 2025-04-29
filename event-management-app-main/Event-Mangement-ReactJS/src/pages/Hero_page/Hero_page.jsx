import React, { useState } from "react";  // <-- ADD THIS (you forgot useState)
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../../components/Navigation/Navigation";
import EventList from "../EventList/EventList";
import Ticket from "../Ticket/Ticket";

export default function EventHero() {
  const [modalShow, setModalShow] = useState(false);  // <-- Add this
  const handleShow = () => setModalShow(true);        // <-- Add this
  const handleClose = () => setModalShow(false);       // <-- Add this

  return (
    <>
      <Navigation />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6"
                alt="Hero"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-md-6">
              <h6 className="text-purple fw-bold mb-2">TechXperience 2025</h6>
              <h1 className="display-5 fw-bold mb-3">
                Fuel <span className="text-purple">Innovation</span>,<br />
                Spark Connection
              </h1>
              <p className="text-muted mb-4">
                Discover breakthrough ideas, connect with experts, and unlock the future of technology.
              </p>
              <div className="p-4 rounded-4 mb-3" style={{ background: "linear-gradient(90deg, #e4d0ff, #f1d4f8)" }}>
                <h6 className="mb-1 fw-bold text-dark">Unleashing the Power of Change</h6>
                <p className="mb-0 text-muted small">
                  📅 April 24, 2025 &nbsp;&nbsp; 📍 Ballroom Extra Hotel
                </p>
              </div>
              
              {/* THIS is your button */}
              <div>
                <button 
                  className="btn btn-dark px-4 py-2 rounded-pill"
                  onClick={handleShow}
                >
                  GET A TICKET
                </button>

                {/* Modal Component */}
                <Ticket show={modalShow} handleClose={handleClose} />
              </div>

            </div>
          </div>
        </div>
      </section>

      <EventList />
    </>
  );
}

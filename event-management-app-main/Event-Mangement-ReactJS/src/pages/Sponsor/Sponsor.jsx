import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../../components/Navigation/Navigation";

export default function Sponsors() {
  return (
    <>
      <Navigation />

      <section className="py-5 bg-light text-center">
        <div className="container">
          <h6 className="text-purple fw-bold mb-2">Proud Partners</h6>
          <h1 className="display-5 fw-bold mb-4">Our <span className="text-purple">Sponsors</span></h1>
          <p className="text-muted mb-5">
            We are backed by incredible organizations that believe in our mission of fueling innovation and connection.
          </p>

          <div className="row justify-content-center mb-5">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div className="col-6 col-md-4 col-lg-2 mb-4" key={num}>
                <div className="bg-white p-3 rounded-4 shadow-sm h-100 d-flex align-items-center justify-content-center">
                  <img
                    src={`https://via.placeholder.com/120x60?text=Logo+${num}`}
                    alt={`Sponsor ${num}`}
                    className="img-fluid"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-4 shadow bg-white mx-auto" style={{ maxWidth: "700px" }}>
            <h4 className="fw-bold mb-3">Become a Sponsor</h4>
            <p className="text-muted mb-4">
              Want to elevate your brand and connect with thousands of attendees? Join us as a sponsor and be part of
              something impactful.
            </p>
            <a href="mailto:sponsorship@techxperience.com" className="btn btn-dark px-4 py-2 rounded-pill">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

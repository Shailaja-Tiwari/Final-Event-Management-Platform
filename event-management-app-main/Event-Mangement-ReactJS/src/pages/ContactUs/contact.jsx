import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../../components/Navigation/Navigation";

export default function ContactUs() {
  return (
    <>
      <Navigation />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h6 className="text-purple fw-bold mb-2 text-center">Get In Touch</h6>
              <h1 className="display-5 fw-bold text-center mb-4">Contact Us</h1>
              <p className="text-muted text-center mb-5">
                We'd love to hear from you! Whether you have a question about events, features, pricing, or anything else,
                our team is ready to answer all your questions.
              </p>

              <form className="bg-white p-5 rounded-4 shadow-sm">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">Full Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Your Name" />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                  <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label fw-bold">Subject</label>
                  <input type="text" className="form-control" id="subject" placeholder="What's this about?" />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-bold">Message</label>
                  <textarea className="form-control" id="message" rows="4" placeholder="Write your message here..."></textarea>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-outline-dark px-4 py-2 rounded-pill">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

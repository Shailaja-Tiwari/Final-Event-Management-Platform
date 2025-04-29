import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../../components/Navigation/Navigation";

export default function AboutUs() {
  return (
    <>
      <Navigation />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6"
                alt="Teamwork"
                className="img-fluid rounded-4 shadow"
              />
            </div>
            <div className="col-md-6">
              <h6 className="text-purple fw-bold mb-2">Who We Are</h6>
              <h1 className="display-5 fw-bold mb-3">
                Passion Meets <span className="text-purple">Purpose</span>
              </h1>
              <p className="text-muted mb-4">
                We are a community of creators, innovators, and visionaries on a mission to shape the future through
                groundbreaking events and unforgettable experiences. Our mission is to ignite creativity and build lasting connections.
              </p>
              <div className="p-4 rounded-4 mb-3" style={{ background: "linear-gradient(90deg, #ffe1f0, #e4d0ff)" }}>
                <h6 className="mb-1 fw-bold text-dark">Why We Exist</h6>
                <p className="mb-0 text-muted small">
                  💡 To bridge ideas and action <br />
                  🌍 To create impact that lasts <br />
                  🤝 To bring communities together
                </p>
              </div>
              <button className="btn btn-outline-dark px-4 py-2 rounded-pill">Join Our Journey</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Our Core Values</h2>
          <div className="row">
            {[
              { icon: "🚀", title: "Innovation", desc: "We push boundaries to explore new ideas and technologies." },
              { icon: "🤝", title: "Collaboration", desc: "Together we are stronger, smarter, and more impactful." },
              { icon: "🎯", title: "Purpose", desc: "Every event we create has meaning and intent behind it." },
            ].map((value, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="p-4 border rounded-4 h-100 shadow-sm bg-light">
                  <div className="fs-2 mb-3">{value.icon}</div>
                  <h5 className="fw-bold">{value.title}</h5>
                  <p className="text-muted">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { Link } from "react-router-dom";
import "./EventCard.css";

const EventCard = ({ id, heading, date, location, img }) => {
  const { year, month } = date;

  const fallbackImg = "https://source.unsplash.com/400x300/?event,planner"; // Default image

  return (
    <Link to={`/events/${id}`} className="card-link">
      <div className="card">
        <div className="card-img-wrapper">
          <img src={img || fallbackImg} alt={heading} onError={(e) => (e.target.src = fallbackImg)} />
        </div>
        <div className="card-content">
          <h3>{heading}</h3>
          <p className="event-date">
            📅 {month} {year}
          </p>
          <p className="event-location">📍 {location}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

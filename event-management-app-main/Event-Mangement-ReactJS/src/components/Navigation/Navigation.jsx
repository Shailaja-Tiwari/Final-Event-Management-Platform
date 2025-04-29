import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
    <div className="container">
      <a className="navbar-brand fw-bold text-dark" href="#">
        <img  className="me-2 text-white" />  🎉EventVerse
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item mx-2">
  <Link className="nav-link text-white" to="/">Home</Link>
</li>
         
          <li className="nav-item mx-2">
  <Link className="nav-link text-white" to="/aboutus">About Us</Link>
</li>
    
          <li className="nav-item mx-2">
  <Link className="nav-link text-white" to="/sponsor">Sponsors</Link>
</li>
       
          <li className="nav-item mx-2">
            <a className="nav-link text-white" href="#">Blogs</a>
          </li>
          <li className="nav-item mx-2">
  <Link className="nav-link text-white" to="/contact">Contact Us</Link>
</li>
          
        </ul>
        <li className="nav-item mx-2">
  <Link className="btn btn-dark ms-4" to="/register">Register</Link>
</li>
      
      </div>
    </div>
  </nav>
  );
};

export default Navigation;

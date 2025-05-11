import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css";
import Swal from 'sweetalert2';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [hours, setHours] = useState("");
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const toggleStationDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  // Mock functions for booking functionality
  const bookSlot = (slotId) => {
    setSelectedSlot(slotId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setVehicleNumber("");
    setHours("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire("Success!", `Slot ${selectedSlot} booked for ${hours} hours.`, "success");
    closeModal();
  };

  // Station data for dropdown
  const stations = [
    { name: "Lodhi Fort", path: "/Lodhi" },
  
    { name: "Haibowal", path: "/Haibowal" },
    { name: "Durga Puri", path: "/Durga" }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="text-primary">Drivo</span>Park
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-expanded={navbarOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="/#features"
                activeClassName="active"
              >
                Features
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link" 
                href="/#how-it-works"
                activeClassName="active"
              >
                How It Works
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="/#testimonials"
                activeClassName="active"
              >
                Testimonials
              </a>
            </li>

            <li className="nav-item dropdown" onMouseLeave={closeDropdown}>
              <div 
                className="nav-link dropdown-toggle" 
                onClick={toggleStationDropdown}
                role="button"
                aria-expanded={showDropdown}
                style={{ cursor: "pointer" }}
              >
                Stations
              </div>
              <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                {stations.map((station, index) => (
                  <li key={index}>
                    <Link 
                      className="dropdown-item" 
                      to={station.path}
                      onClick={() => {
                        closeDropdown();
                        setNavbarOpen(false);
                      }}
                    >
                      {station.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <a 
                className="nav-link" 
                href="/#faq"
                activeClassName="active"
              >
                FAQ
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="/#contact"
                activeClassName="active"
              >
                Contact
              </a>
            </li>
            <li className="nav-item">
              <Link 
                className="btn btn-primary ms-lg-3" 
                to="/loginPage"
                onClick={() => setNavbarOpen(false)}
              >
                Login/Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Booking Modal - You might want to move this to a separate component */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Book Slot {selectedSlot}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Vehicle Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Hours</label>
                <input
                  type="number"
                  className="form-control"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  required
                  min="1"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
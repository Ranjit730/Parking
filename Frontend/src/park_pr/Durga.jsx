import React, { useState, useEffect } from 'react';
import './parking.css';
import { FaCar, FaParking, FaClock, FaTimes, FaCheck } from 'react-icons/fa';

const Durga = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [duration, setDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchParkingSlots = async () => {
      try {
        const response = await fetch('https://parking-zizn.onrender.com/api/parking/slots');
        if (!response.ok) throw new Error('Failed to fetch parking slots');
        const data = await response.json();
        setParkingSlots(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchParkingSlots();
    const interval = setInterval(fetchParkingSlots, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSlotClick = (slot) => {
    if (slot.isOccupied) return;
    setSelectedSlot(slot._id);
    setShowModal(true);
  };

  const handleBookSlot = async () => {
    if (!selectedSlot || !vehicleNumber) {
      alert('Please enter vehicle number');
      return;
    }

    try {
      const response = await fetch('https://parking-zizn.onrender.com/api/parking/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: selectedSlot,
          vehicleNumber,
          duration,
        }),
      });

      if (!response.ok) throw new Error('Booking failed');
      
      const updatedSlot = await response.json();
      setParkingSlots(parkingSlots.map(slot => 
        slot._id === updatedSlot._id ? updatedSlot : slot
      ));
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setSelectedSlot(null);
    setVehicleNumber('');
    setDuration(1);
    setShowModal(false);
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="parking-app">
      <header className="app-header">
        <h1><FaParking />Car Parking Slots - Durga Puri</h1>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card available">
          <div className="stat-icon"><FaCar /></div>
          <div className="stat-info">
            <h3>Available</h3>
            <p>{parkingSlots.filter(slot => !slot.isOccupied).length}</p>
          </div>
        </div>
        
        <div className="stat-card occupied">
          <div className="stat-icon"><FaCar /></div>
          <div className="stat-info">
            <h3>Occupied</h3>
            <p>{parkingSlots.filter(slot => slot.isOccupied).length}</p>
          </div>
        </div>
        
        <div className="stat-card total">
          <div className="stat-icon"><FaParking /></div>
          <div className="stat-info">
            <h3>Total Slots</h3>
            <p>{parkingSlots.length}</p>
          </div>
        </div>
      </div>

      <div className="parking-grid">
        {parkingSlots.map((slot) => (
          <div
            key={slot._id}
            className={`parking-slot ${slot.isOccupied ? 'occupied' : 'available'}`}
            onClick={() => handleSlotClick(slot)}
          >
            <div className="slot-number">#{slot.slotNumber}</div>
            {slot.isOccupied ? (
              <div className="occupied-details">
                <div className="vehicle-info">
                  <FaCar className="vehicle-icon" />
                  <span>{slot.vehicleNumber}</span>
                </div>
                <div className="time-info">
                  <FaClock className="time-icon" />
                  <span>{formatTime(slot.bookedUntil)}</span>
                </div>
              </div>
            ) : (
              <div className="available-label">AVAILABLE</div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="booking-modal">
          <div className="modal-content">
            <h2>Book Slot #{parkingSlots.find(s => s._id === selectedSlot)?.slotNumber}</h2>
            
            <div className="form-group">
              <label>Vehicle Number:</label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="Enter vehicle number"
              />
            </div>
            
            <div className="form-group">
              <label>Duration (hours):</label>
              <input
                type="number"
                min="1"
                max="24"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
              />
            </div>
            
            <div className="modal-actions">
              <button className="cancel-btn" onClick={resetForm}>
                <FaTimes /> Cancel
              </button>
              <button className="confirm-btn" onClick={handleBookSlot}>
                <FaCheck /> Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Durga;
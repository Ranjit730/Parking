import React, { useState, useEffect } from 'react';
import "./Booking.css"

function Bookings() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch('https://parking-tntt.onrender.com/api/parking/slots');
        if (!response.ok) {
          throw new Error('Failed to fetch parking slots');
        }
        const data = await response.json();
        setSlots(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  if (loading) return <div className="loading">Loading parking slots...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="bookings-container">
      <h1>Parking Slot Status</h1>
      <div className="slots-grid">
        {slots.map(slot => (
          <div 
            key={slot._id} 
            className={`parking-slot ${slot.isOccupied ? 'occupied' : 'available'}`}
          >
            <div className="slot-number">Slot {slot.slotNumber}</div>
            <div className="slot-status">
              {slot.isOccupied ? 'Occupied' : 'Available'}
            </div>
            
            {slot.isOccupied && (
              <>
                <div className="vehicle-number">
                  <span>🚗</span> {slot.vehicleNumber}
                </div>
                <div className="booking-time">
                  <div>Booked: {new Date(slot.bookedAt).toLocaleTimeString()}</div>
                  <div>Until: {new Date(slot.bookedUntil).toLocaleTimeString()}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
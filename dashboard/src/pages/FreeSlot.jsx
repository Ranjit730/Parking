import React, { useState, useEffect } from 'react';
import "./parking.css"

const FreeSlot = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchParkingSlots = async () => {
      try {
        const response = await fetch('https://parking-tntt.onrender.com/api/parking/slots');
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
  }, []);

  const handleFreeSlot = async (slotId) => {
    if (!window.confirm('Are you sure you want to free this slot?')) return;

    try {
      const response = await fetch('https://parking-tntt.onrender.com/api/parking/free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId }),
      });

      if (!response.ok) throw new Error('Freeing slot failed');
      
      const updatedSlot = await response.json();
      setParkingSlots(parkingSlots.map(slot => 
        slot._id === updatedSlot._id ? updatedSlot : slot
      ));
      setSuccessMsg(`Slot ${updatedSlot.slotNumber} freed successfully!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  if (isLoading) return <div className="loading">Loading parking slots...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="admin-container">
      <h1>Admin Panel - Free Parking Slots</h1>
      {successMsg && <div className="success-message">{successMsg}</div>}
      
      <div className="parking-grid">
        {parkingSlots.map((slot) => (
          <div
            key={slot._id}
            className={`parking-slot ${slot.isOccupied ? 'occupied' : 'available'}`}
          >
            <div className="slot-number">Slot {slot.slotNumber}</div>
            {slot.isOccupied ? (
              <>
                <div className="slot-details">
                  <div className="vehicle-number">{slot.vehicleNumber}</div>
                  <div className="booking-time">
                    Booked until: {formatTime(slot.bookedUntil)}
                  </div>
                </div>
                <button 
                  className="free-button"
                  onClick={() => handleFreeSlot(slot._id)}
                >
                  Free Slot
                </button>
              </>
            ) : (
              <div className="slot-status">Available</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeSlot;
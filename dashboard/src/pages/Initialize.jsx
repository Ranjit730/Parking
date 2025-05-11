import React, { useState } from 'react';
import "./parking.css"


const Initialize = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInitialize = async () => {
    if (!window.confirm('This will create 20 new parking slots. Continue?')) return;

    setIsInitializing(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('https://parking-tntt.onrender.com/api/parking/initialize', {
        method: 'POST',
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Initialization failed');
      
      setMessage(data.message || '20 parking slots initialized successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel - Initialize Parking</h1>
      <div className="initialize-card">
        <h2>Parking Slot Initialization</h2>
        <p>This will create 20 new parking slots in the system.</p>
        <p className="warning">Warning: This action cannot be undone!</p>
        
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        
        <button 
          onClick={handleInitialize}
          disabled={isInitializing}
          className={isInitializing ? 'loading' : ''}
        >
          {isInitializing ? 'Initializing...' : 'Initialize Parking Slots'}
        </button>
      </div>
    </div>
  );
};

export default Initialize;
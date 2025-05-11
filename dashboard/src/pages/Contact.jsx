import React, { useState, useEffect } from 'react';
import "./Contact.css"

function Contact() {
  const [contactData, setContactData] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('https://parking-zizn.onrender.com/api/contact');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setContactData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) {
    return <div>Loading contact information...</div>;
  }

  if (error) {
    return <div>Error loading contact information: {error}</div>;
  }

  return (
    <div className="contact-container">
      <h1>Query Information</h1>
      
      {contactData.length > 0 ? (
        <div className="contact-list">
          {contactData.map((contact, index) => (
            <div key={index} className="contact-details">
              <h2>{contact.name}</h2>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <p><strong>Purpose:</strong> {contact.purpose}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No contact data available</p>
      )}
    </div>
  );
}

export default Contact;
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate=useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    alert("logout sucessfully")
    navigate("/login")


  }

  return (
    <div
      style={{
        width: '100%',
        height: '64px',
        background: 'linear-gradient(135deg, #1e3c72, #2a5298)', // Gradient bg
        color: 'white',
        display: 'flex',position: 'fixed',zIndex:'150',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        
        
      }}
    >
      {/* Left: Logo */}
      <div style={{ fontSize: '18px', fontWeight: '600' }}>Logo</div>
      {/* Right: Logout Button */}
      <button onClick={handleLogout}
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          fontSize: '14px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#111')}
        onMouseOut={(e) => (e.target.style.backgroundColor = 'black')}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
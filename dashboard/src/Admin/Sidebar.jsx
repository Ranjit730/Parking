import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCalendarCheck,

} from 'react-icons/fa';
import { IoIosContact } from 'react-icons/io';
import { CiTrash } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";



function Sidebar() {
  const location = useLocation();

  return (
    <div
      style={{
        height: '100vh',
        minWidth: '256px', 
        background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
        color: 'white',position: 'fixed',marginTop: "63px", 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.3)',
        padding: '10px',
      }}>
      <nav style={{ flex: 1 }}>
        <SidebarLink
          to="/"
          icon={<FaTachometerAlt size={25} />}
          label="Dashboard"
          isActive={location.pathname === '/'}
        />
        <SidebarLink
          to="/bookings"
          icon={<FaCalendarCheck size={25} />}
          label="Bookings"
          isActive={location.pathname === '/bookings'}
        />

        <SidebarLink
          to="/freeslot"
          icon={< CiTrash size={25} />}
          label="Freeslot"
          isActive={location.pathname === '/freeslot'}
        />

         <SidebarLink
          to="/initialize"
          icon={<IoAddSharp size={25} />}
          label="Add Slots"
          isActive={location.pathname === '/initilize'}
        />

        <SidebarLink
          to="/contact"
          icon={<IoIosContact size={25} />}
          label="Query"
          isActive={location.pathname === '/contact'}
        />
      </nav>
    </div>
  );
}

function SidebarLink({ to, icon, label, isActive }) {
  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 25px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    textDecoration: 'none',
    color: isActive ? '#ffcc00' : 'white',
    backgroundColor: isActive ? '#2a5298' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
  };

  return (
    <Link to={to} style={linkStyle}>
      <span>{icon}</span>
      <span style={{ fontSize: '16px' }}>{label}</span>
    </Link>
  );
}

export default Sidebar;
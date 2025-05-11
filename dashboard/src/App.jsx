import React from 'react';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from './Admin/Navbar';
import Sidebar from './Admin/Sidebar';
import DashboardPage from './pages/DashboardPage';

import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import Login from './pages/Login';
import FreeSlot from './pages/FreeSlot';
import Initialize from './pages/Initialize';

// Admin Layout Component
const AdminLayout = () => (
  <>
    <Navbar />
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main className="flex-1 min-h-screen " style={{marginBlockStart:'63px',marginLeft:'260px'}}>
        <Outlet /> {/* This renders the nested routes */}
      </main>
    </div>
  </>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const email = localStorage.getItem("email");
  const admins = ["ranjit89314@gmail.com","test2@gmail.com"]; // Add your admin emails here
  const isAdmin = admins.includes(email);

  return isAdmin ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected admin routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="contact" element={<Contact />} />
        <Route path="freeslot" element={<FreeSlot />} />
        <Route path="initialize" element={<Initialize />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
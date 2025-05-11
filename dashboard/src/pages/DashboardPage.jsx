import React, { useState, useEffect } from 'react';
import { FaBell,FaCog,FaUser,FaClipboardList,FaUsers,FaUtensils,FaHome,FaParking,FaChartLine,FaCar,FaSignOutAlt} from 'react-icons/fa';
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer} from 'recharts';

const DashboardPage = () => {
  const [parkingData, setParkingData] = useState({
    totalSlots: 0,
    availableSlots: 0,
    occupiedSlots: 0,
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        // Fetch parking data from your API
        const response = await fetch('https://parking-tntt.onrender.com/api/parking/slots');
        if (!response.ok) throw new Error('Failed to fetch parking data');
        const data = await response.json();
        
        // Process the data
        const totalSlots = data.length;
        const availableSlots = data.filter(slot => !slot.isOccupied).length;
        const occupiedSlots = totalSlots - availableSlots;
        
        // Get recent activity (last 5 bookings)
        const recentActivity = data
          .filter(slot => slot.isOccupied)
          .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
          .slice(0, 5)
          .map(slot => ({
            slotNumber: slot.slotNumber,
            vehicleNumber: slot.vehicleNumber,
            time: new Date(slot.bookedAt).toLocaleTimeString()
          }));
        
        setParkingData({
          totalSlots,
          availableSlots,
          occupiedSlots,
          recentActivity
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching parking data:', error);
        setIsLoading(false);
      }
    };

    fetchParkingData();
  }, []);

  const styles = {
    wrapper: {
      width: '80vw',
      minHeight: '100vh',
      backgroundColor: '#f2f4f8',
      fontFamily: 'Arial, sans-serif',
      overflowX: 'hidden',
      boxSizing: 'border-box',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 30px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    navLeft: {
      display: 'flex',
      gap: '30px',
      fontSize: '16px',
      color: '#333',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
    },
    navRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    iconBtn: {
      background: '#fff',
      border: 'none',
      padding: '10px',
      borderRadius: '50%',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      cursor: 'pointer',
    },
    profile: {
      width: '40px',
      height: '40px',
      backgroundColor: '#ccc',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      padding: '20px 30px',
      boxSizing: 'border-box',
    },
    header: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '30px',
    },
    cardsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    },
    cardTitle: {
      fontSize: '16px',
      color: '#555',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    cardValue: {
      fontSize: '28px',
      fontWeight: 'bold',
    },
    chartCard: {
      backgroundColor: '#fff',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      width: '100%',
    },
    activityCard: {
      backgroundColor: '#fff',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginTop: '20px',
    },
    activityItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #eee',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      fontSize: '18px',
      color: '#666',
    },
  };

  // Prepare chart data for weekly activity
  const prepareChartData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map(day => ({
      name: day,
      bookings: Math.floor(Math.random() * 10) + 1 // Replace with actual data if available
    }));
  };

  const chartData = prepareChartData();

  if (isLoading) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.loading}>Loading parking data...</div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <div style={styles.navItem}>
            <FaParking /> Parking Admin
          </div>
        </div>
        <div style={styles.navRight}>
          <button style={styles.iconBtn}>
            <FaBell />
          </button>
          <button style={styles.iconBtn}>
            <FaCog />
          </button>
          <div style={styles.profile}>
            <FaUser />
          </div>
        </div>
      </nav>

      {/* Content */}
      <main style={styles.content}>
        <h1 style={styles.header}>Parking Management Dashboard</h1>

        {/* Stats Cards */}
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <p style={styles.cardTitle}><FaParking /> Total Slots</p>
            <p style={{ ...styles.cardValue, color: '#007bff' }}>{parkingData.totalSlots}</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardTitle}><FaCar /> Available</p>
            <p style={{ ...styles.cardValue, color: '#28a745' }}>{parkingData.availableSlots}</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardTitle}><FaCar style={{ color: '#dc3545' }} /> Occupied</p>
            <p style={{ ...styles.cardValue, color: '#dc3545' }}>{parkingData.occupiedSlots}</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardTitle}><FaClipboardList /> Utilization</p>
            <p style={{ ...styles.cardValue, color: '#ffc107' }}>
              {parkingData.totalSlots > 0 
                ? Math.round((parkingData.occupiedSlots / parkingData.totalSlots) * 100) 
                : 0}%
            </p>
          </div>
        </div>

        {/* Chart */}
        <div style={styles.chartCard}>
          <p style={{ fontSize: '16px', marginBottom: '20px', color: '#333' }}>
            <FaChartLine /> Booking Activity (Weekly)
          </p>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#007bff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.activityCard}>
          <p style={{ fontSize: '16px', marginBottom: '20px', color: '#333' }}>
            <FaClipboardList /> Recent Bookings
          </p>
          {parkingData.recentActivity.length > 0 ? (
            parkingData.recentActivity.map((activity, index) => (
              <div key={index} style={styles.activityItem}>
                <span>Slot #{activity.slotNumber}</span>
                <span>{activity.vehicleNumber}</span>
                <span>{activity.time}</span>
              </div>
            ))
          ) : (
            <p style={{ color: '#666', textAlign: 'center' }}>No recent bookings</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
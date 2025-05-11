import React from 'react';
import {
  FaBell,
  FaCog,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaUtensils,
  FaHome,
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', users: 30 },
  { name: 'Tue', users: 45 },
  { name: 'Wed', users: 60 },
  { name: 'Thu', users: 80 },
  { name: 'Fri', users: 70 },
  { name: 'Sat', users: 50 },
  { name: 'Sun', users: 90 },
];

const DashboardPage = () => {
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
  };

  return (
    <div style={styles.wrapper}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <div style={styles.navItem}><FaHome /> Dashboard</div>
          <div style={styles.navItem}><FaClipboardList /> Orders</div>
          <div style={styles.navItem}><FaUtensils /> Menu</div>
          <div style={styles.navItem}><FaUsers /> Users</div>
        </div>
        <div style={styles.navRight}>
          <button style={styles.iconBtn}><FaBell /></button>
          <button style={styles.iconBtn}><FaCog /></button>
          <div style={styles.profile}><FaUser /></div>
        </div>
      </nav>

      {/* Content */}
      <main style={styles.content}>
        <h1 style={styles.header}>Welcome Back, Admin</h1>

        {/* Stats Cards */}
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <p style={styles.cardTitle}>Total Orders</p>
            <p style={{ ...styles.cardValue, color: '#007bff' }}>1,245</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardTitle}>Revenue</p>
            <p style={{ ...styles.cardValue, color: '#28a745' }}>$24,500</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardTitle}>New Users</p>
            <p style={{ ...styles.cardValue, color: '#6f42c1' }}>321</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardTitle}>Pending Orders</p>
            <p style={{ ...styles.cardValue, color: '#ffc107' }}>37</p>
          </div>
        </div>

        {/* Chart */}
        <div style={styles.chartCard}>
          <p style={{ fontSize: '16px', marginBottom: '20px', color: '#333' }}>User Activity (Weekly)</p>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#007bff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
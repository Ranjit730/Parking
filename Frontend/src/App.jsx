import React, { useState } from 'react';
import { Route,Routes, } from "react-router-dom";
import PageNotFound from "./park_pr/PageNotFound";
import Home from "./park_pr/Home";
import Navbar from './component/Navbar';
import LoginPage from "./park_pr/loginPage"
import Footer from './component/Footer';
import Lodhi from './park_pr/Lodhi';
import Haibowal from './park_pr/Haibowal';
import Durga from './park_pr/Durga';
import Signup from './park_pr/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
   
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/loginPage" element={<LoginPage/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
     
        <Route path='/Lodhi' element={<Lodhi/>}></Route>
        <Route path='/Haibowal' element={<Haibowal></Haibowal>}></Route>
        <Route path='/Durga' element={<Durga/>}></Route>
       
        <Route path='/pagenotfound' element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
      
      <ToastContainer/>

      <Footer/>
      
     
    </>
  )
}

export default App

// import React, { useEffect } from 'react';

// const App = () => {
//   useEffect(() => {
//     // Check if script already loaded
//     const isGoogleMapsLoaded = window.google && window.google.maps;

//     if (!isGoogleMapsLoaded) {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB2bXKNDezDf6YNVc-SauobynNHPo4RJb8`; // NO callback here
//       script.async = true;
//       script.defer = true;

//       script.onload = () => {
//         initMap(); // manually call map init when script finishes loading
//       };

//       document.body.appendChild(script);
//     } else {
//       initMap();
//     }

//     function initMap() {
//       const map = new window.google.maps.Map(document.getElementById('map'), {
//         zoom: 12,
//         center: { lat: 30.90902, lng: 75.85160 },
//       });

//       const markers = [
//         { position: { lat: 30.863883, lng: 75.835975 }, title: 'Dugri, Phase 2', total: 50, booked: 50, available: 50 },
//         { position: { lat: 30.903643, lng: 75.906005 }, title: 'Jamalpur', total: 100, booked: 30, available: 70 },
//         { position: { lat: 30.933553, lng: 75.815932 }, title: 'Haibowal Kalan', total: 100, booked: 20, available: 80 },
//         { position: { lat: 30.915634717552546, lng: 75.82285840004793 }, title: 'Basti Jodhewal', total: 100, booked: 11, available: 89 },
//       ];

//       markers.forEach(markerInfo => {
//         const marker = new window.google.maps.Marker({
//           position: markerInfo.position,
//           map,
//           title: markerInfo.title,
//         });

//         const infowindow = new window.google.maps.InfoWindow({
//           content: `
//             <div>
//               <strong>${markerInfo.title}</strong><br/>
//               <b>Total</b>: ${markerInfo.total}<br/>
//               <b>Booked</b>: ${markerInfo.booked}<br/>
//               <b>Available</b>: ${markerInfo.available}
//             </div>
//           `,
//         });

//         marker.addListener('click', () => {
//           infowindow.open(map, marker);
//         });
//       });
//     }
//   }, []);

//   return (
//     <section className="py-5 bg-light">
//       <div className="container text-center mb-4">
//         <h2>Coverage Area</h2>
//         <p>Our parking systems are deployed around the whole city</p>
//       </div>
//       <div className="container">
//         <div id="map" style={{ height: '600px', width: '100%' }}></div>
//       </div>
//     </section>
//   );
// };

// export default App;

import React from 'react'
import "./Footer.css"


function Footer() {
  return (
   <>
   <footer id="footer" className="footer">
  <div className="container">
    <div className="row gy-4">
      <div className="col-lg-5 col-md-12 footer-info">
        <a href="#" className="logo d-flex align-items-center">
          <span>DrivoPark</span>
        </a>
        <p>Smart parking management solutions for businesses of all sizes. Streamline your parking operations with our comprehensive system.</p>
        <div className="social-links mt-3">
        <a href="#" className="twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" className="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" className="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" className="linkedin"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
      <div className="col-lg-2 col-6 footer-links">
        <h4>Useful Links</h4>
        <ul>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Home</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#features">Features</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#pricing">Pricing</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#faq">FAQ</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div className="col-lg-2 col-6 footer-links">
        <h4>Our Services</h4>
        <ul>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Parking Management</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Payment Processing</a></li>
          <li><i class="bi bi-chevron-right"></i> <a href="#">Analytics &amp; Reporting</a></li>
        </ul>
      </div>
      <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
        <h4>Contact Us</h4>
        <p> Plot No. 5, Industrial Area Phase I <br /> Ludhiana, Punjab 141002<br /> India <br /><br />
          <strong>Phone:</strong> +91 86000 01100<br />
          <strong>Email:</strong> info@parkingpals.com<br />
        </p>
      </div>
    </div>
  </div>
  <div className="container mt-4">
    <div className="copyright"> © Copyright <strong><span>ImrancodingSchool</span></strong>. All Rights Reserved </div>
  </div>
</footer>

   </>
  )
}

export default Footer
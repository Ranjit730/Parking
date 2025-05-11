import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCar, faCreditCard, faMobileScreen, faChartLine, faQuoteLeft, faQuoteRight, faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const faqs = [
  {
    question: 'How long does it take to implement the system?',
    answer: 'Implementation typically takes 2-4 weeks depending on the size of your facility and specific customizations required. Our team will guide you through every step of the process.',
  },
  {
    question: 'Is training provided for my staff?',
    answer: 'Yes, all plans include comprehensive training for your staff. We offer both online and in-person training options to ensure your team is comfortable with the system.',
  },
  {
    question: 'Can I integrate this with my existing systems?',
    answer: 'Absolutely! ParkingPals is designed to integrate with many existing systems including payment processors, access control systems, and facility management software. Our team can provide a compatibility assessment.',
  },
  {
    question: 'What hardware is required?',
    answer: 'The basic system can run on standard computers and mobile devices. For advanced features like automated entry/exit, we offer compatible hardware solutions that can be purchased separately.',
  },
  {
    question: 'Is there a contract or can I pay month-to-month?',
    answer: 'We offer both options. Month-to-month subscriptions are available at the prices listed, or you can save 20% by choosing an annual contract.',
  },
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    purpose: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Basic validation
    if (!formData.name || !formData.phone || !formData.email || !formData.message || !formData.purpose) {
      setSubmitStatus({ success: false, message: "Please fill in all required fields" });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitStatus({ success: false, message: "Please enter a valid email address" });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://parking-zizn.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: "Thank you for your message! We will get back to you soon." });
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          purpose: ''
        });
      } else {
        setSubmitStatus({ success: false, message: data.error || "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ success: false, message: "An error occurred while submitting the form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero d-flex align-items-center mx-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center">
              <h1>Simplify Your Parking Operations</h1>
              <h2>Smart, efficient, and user-friendly parking management system</h2>
              <div className="text-center text-lg-start">
                <a href="#contact" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                  <span>Get Started</span> <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                </a>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 hero-img">
              <img src="/parking.jpg" alt="Parking Management" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      {/* Live Stations Section */}
    <section id="live-stations" className="section-bg">
  <div className="container">
    <div className="section-title text-center mb-4">
      <h2>Live Parking Status</h2>
      <p>Real-time updates from our parking stations around the city</p>
    </div>
    <div className="parking-marquee-container">
      <div className="parking-marquee">
        <div className="parking-station">
          <div className="station-name">Central Station</div>
          <div className="station-slots">
            <span className="available">42 Available</span> | 
            <span className="occupied">18 Occupied</span>
          </div>
        </div>
        <div className="parking-station">
          <div className="station-name">Airport Terminal</div>
          <div className="station-slots">
            <span className="available">23 Available</span> | 
            <span className="occupied">77 Occupied</span>
          </div>
        </div>
        <div className="parking-station">
          <div className="station-name">Downtown Plaza</div>
          <div className="station-slots">
            <span className="available">5 Available</span> | 
            <span className="occupied">95 Occupied</span>
          </div>
        </div>
        <div className="parking-station">
          <div className="station-name">Mall Parking</div>
          <div className="station-slots">
            <span className="available">126 Available</span> | 
            <span className="occupied">74 Occupied</span>
          </div>
        </div>
        <div className="parking-station">
          <div className="station-name">University Campus</div>
          <div className="station-slots">
            <span className="available">38 Available</span> | 
            <span className="occupied">62 Occupied</span>
          </div>
        </div>
      </div>
      {/* Duplicate for continuous marquee effect */}
      <div className="parking-marquee">
        <div className="parking-station">
          <div className="station-name">Central Station</div>
          <div className="station-slots">
            <span className="available">42 Available</span> | 
            <span className="occupied">18 Occupied</span>
          </div>
        </div>
        <div className="parking-station">
          <div className="station-name">Airport Terminal</div>
          <div className="station-slots">
            <span className="available">23 Available</span> | 
            <span className="occupied">77 Occupied</span>
          </div>
        </div>
        <div className="parking-station">
          <div className="station-name">Downtown Plaza</div>
          <div className="station-slots">
            <span className="available">5 Available</span> | 
            <span className="occupied">95 Occupied</span>
          </div>
        </div>
        <div className="parking-station">
          <div className="station-name">Mall Parking</div>
          <div className="station-slots">
            <span className="available">126 Available</span> | 
            <span className="occupied">74 Occupied</span>
          </div>
        </div>
        <div className="parking-station">
          <div className="station-name">University Campus</div>
          <div className="station-slots">
            <span className="available">38 Available</span> | 
            <span className="occupied">62 Occupied</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Coverage Area Section */}
      <section id="global-coverage" className="py-5">
        <div className="container">
          <div className="section-title text-center mb-4">
            <h2>Coverage Area</h2>
            <p>Our parking systems are deployed around the whole city</p>
          </div>
          <div className="world-map-container">
            <div className="world-map">
            <iframe src="https://www.google.com/maps/d/embed?mid=1PETMyaICy5-glV4dAsM5yNpKP2dV0xM&ehbc=2E312F" width="100%" height="480"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-title text-center">
            <h2>Features</h2>
            <p>Our comprehensive parking management solution offers everything you need</p>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="feature-box">
                <FontAwesomeIcon icon={faCar} className="feature-icon" />
                <h3>Real-Time Monitoring</h3>
                <p>Track parking space availability in real-time with our intuitive dashboard.</p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="feature-box">
                <FontAwesomeIcon icon={faCreditCard} className="feature-icon" />
                <h3>Online Slot Booking</h3>
                <p>Accept booking online with our secure system.</p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="feature-box">
                <FontAwesomeIcon icon={faMobileScreen} className="feature-icon" />
                <h3>24 hours, customer support</h3>
                <p>Users can have assistance with out 24 hour active customer service agents.</p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="feature-box">
                <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
                <h3>Analytics Dashboard</h3>
                <p>Gain insights with comprehensive analytics and reporting tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works section-bg">
        <div className="container">
          <div className="section-title text-center">
            <h2>How It Works</h2>
            <p>Our simple 3-step process makes parking management effortless</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="step-box">
                <div className="step-number">1</div>
                <h3>Register Your Facility</h3>
                <p>Create an account and set up your parking facility in our system.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-box">
                <div className="step-number">2</div>
                <h3>Customize Settings</h3>
                <p>Set your rates, operating hours, and configure automated features.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-box">
                <div className="step-number">3</div>
                <h3>Go Live</h3>
                <p>Launch your smart parking system and start accepting reservations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-title text-center">
            <h2>Testimonials</h2>
            <p>What our clients say about us</p>
          </div>
          <div className="row">
            {[
              {
                img: "https://randomuser.me/api/portraits/men/32.jpg",
                name: "John Davidson",
                title: "Shopping Mall Manager",
                quote: "Since implementing ParkingPals, our customer complaints about parking have decreased by 75%. The system pays for itself with the increased efficiency."
              },
              {
                img: "https://randomuser.me/api/portraits/women/44.jpg",
                name: "Sarah Johnson",
                title: "Airport Operations Director",
                quote: "The real-time monitoring has transformed how we manage our parking facilities. I can't imagine going back to our old system."
              },
              {
                img: "https://randomuser.me/api/portraits/men/67.jpg",
                name: "Robert Chen",
                title: "City Parking Administrator",
                quote: "The analytics provided by ParkingPals helped us optimize our pricing strategy, resulting in a 30% increase in revenue within just 3 months."
              }
            ].map((testimonial, index) => (
              <div className="col-lg-4 mb-4" key={index}>
                <div className="testimonial-item">
                  <img src={testimonial.img} className="testimonial-img" alt={testimonial.name} />
                  <h3>{testimonial.name}</h3>
                  <h4>{testimonial.title}</h4>
                  <p>
                    <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon-left" />
                    {testimonial.quote}
                    <FontAwesomeIcon icon={faQuoteRight} className="quote-icon-right" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-title text-center">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our parking management system</p>
          </div>
          <div className="faq-container" style={{ maxWidth: '1200px', margin: 'auto' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ marginBottom: '30px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <button
                  onClick={() => toggle(index)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '16px',
                    background: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                  <span>{faq.question}</span>
                  <span>{openIndex === index ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</span>
                </button>
                {openIndex === index && (
                  <div style={{ background: 'white', padding: '16px', borderTop: 'none' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-title text-center">
            <h2>Contact Us</h2>
            <p>Get in touch with our team to learn more about how ParkingPals can help your business</p>
          </div>
          <div className="row">
            <div className="col-lg-5 d-flex align-items-stretch">
              <div className="info">
                <div className="contact-item mt-5">
                  <div className="icon-wrapper location">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div>
                    <h4>Location:</h4>
                    <p>Plot No. 5, Industrial Area Phase I, Ludhiana, Punjab 141002</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="icon-wrapper email mt-1">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div>
                    <h4>Email:</h4>
                    <p>info@parkingpals.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="icon-wrapper call">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div>
                    <h4>Call:</h4>
                    <p>+91 86000 01100</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="mb-1 p-5">
                  <input 
                    type="text" 
                    className="form-control mb-4 fs-5" 
                    name="name" 
                    placeholder="Name *" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                  />
                  <input 
                    type="tel" 
                    className="form-control mb-4 fs-5" 
                    name="phone" 
                    placeholder="Phone *" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required
                  />
                  <input 
                    type="email" 
                    className="form-control mb-4 fs-5" 
                    name="email" 
                    placeholder="E-mail *" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                  />
                  <textarea 
                    className="form-control mb-4 fs-5" 
                    name="message" 
                    rows={2} 
                    placeholder="Message *" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required
                  />
                  <select 
                    name="purpose" 
                    className="form-control mb-4 fs-5" 
                    value={formData.purpose} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Purpose *</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                  </select>
                  
                  {submitStatus && (
                    <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary bg-gradient text-light d-flex justify-content-center mt-4 mx-auto fs-5"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Global Styles & Animations
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@400;700&display=swap');

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  body {
    background-color: #00050a;
    color: #f0f0f0;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    scroll-behavior: smooth;
  }
`;

// Mock Data
const mockTestimonials = [
    {
        name: "Local Veteran Group",
        role: "Community Partner",
        quote: "Podfinity gave our stories a platform and a voice. Their commitment to the veteran community is real and deeply appreciated. The quality is second to none.",
        image: "/non-profit-logo.jpg"
    },
    {
        name: "Boca Chamber of Commerce",
        role: "Business Partner",
        quote: "A world-class production studio right here in Boca. Pete and his team are true professionals who are invested in local success.",
        image: "/boca-chamber-logo.jpg"
    }
];

// Helper to scroll to the right section
const ScrollToSection = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 95; // Height of the fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
        window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
};

// Components
const Header = () => {
  const { pathname } = useLocation();

  const getLinkStyle = (path) => ({
    color: '#f0f0f0',
    textDecoration: 'none',
    margin: '0 15px',
    fontFamily: "'Orbitron', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '1rem',
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    ...(pathname === path && { color: '#ff6600', textShadow: '0 0 8px rgba(255, 102, 0, 0.7)' })
  });

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: 'rgba(0, 5, 10, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 102, 0, 0.2)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '65px' // Set a fixed height
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/PodfinityLogo.png" alt="Podfinity Logo" style={{ height: '50px', marginRight: '20px' }} />
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#f0f0f0',
          letterSpacing: '2px'
        }}>PODFINITY</span>
      </div>
      <nav style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <Link to="/#home" style={getLinkStyle('/')}>Home</Link>
        <Link to="/#about" style={getLinkStyle('/about')}>About</Link>
        <Link to="/#studios" style={getLinkStyle('/studios')}>Studios</Link>
        <Link to="/#podcasts" style={getLinkStyle('/podcasts')}>Podcasts</Link>
        <Link to="/#services" style={getLinkStyle('/services')}>Services</Link>
        <Link to="/#team" style={getLinkStyle('/team')}>Team</Link>
        <Link to="/#contact" style={getLinkStyle('/contact')}>Contact</Link>
      </nav>
    </header>
  );
};

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#00050a',
    color: '#ccc',
    padding: '40px 20px',
    borderTop: '1px solid rgba(255, 102, 0, 0.2)',
    fontFamily: "'Roboto', sans-serif",
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  };

  const h4Style = {
    fontFamily: "'Orbitron', sans-serif",
    color: '#ff6600',
    marginBottom: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const linkStyle = {
    color: '#ccc',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '8px',
    transition: 'color 0.3s ease',
  };

  const bottomBarStyle = {
    textAlign: 'center',
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #333',
    fontSize: '0.9em',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={{ padding: '0 15px' }}>
          <h4 style={h4Style}>Podfinity</h4>
          <p>Your premier podcasting partner in Boca Raton, FL. We provide the tools, space, and expertise to bring your voice to the world.</p>
        </div>
        <div style={{ padding: '0 15px' }}>
          <h4 style={h4Style}>Quick Links</h4>
          <Link to="/#about" style={linkStyle}>About Us</Link>
          <Link to="/#services" style={linkStyle}>Services</Link>
          <Link to="/#studios" style={linkStyle}>Our Studios</Link>
          <Link to="/#contact" style={linkStyle}>Contact</Link>
        </div>
        <div style={{ padding: '0 15px' }}>
          <h4 style={h4Style}>Connect With Us</h4>
          <p>123 Podcaster Lane<br />Boca Raton, FL 33431</p>
          <p>Email: <a href="mailto:contact@podfinity.com" style={{...linkStyle, display: 'inline'}}>contact@podfinity.com</a></p>
        </div>
      </div>
      <div style={bottomBarStyle}>
        &copy; {new Date().getFullYear()} Podfinity. All Rights Reserved.
      </div>
    </footer>
  );
};

const TestimonialCarousel = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const currentTestimonial = testimonials[current];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #001a33 0%, #002b54 100%)',
      padding: 'clamp(4rem, 8vw, 6rem) 2rem',
      textAlign: 'center',
      borderRadius: '10px',
      margin: '2rem 0'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', transition: 'opacity 0.5s ease' }}>
        <img 
          src={currentTestimonial.image} 
          alt={currentTestimonial.name}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '1.5rem',
            border: '4px solid #ff6600',
            boxShadow: '0 8px 25px rgba(255, 102, 0, 0.4)'
          }}
        />
        <blockquote style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', lineHeight: 1.7, margin: '0 0 2rem 0', color: '#f0f0f0' }}>
          "{currentTestimonial.quote}"
        </blockquote>
        <cite style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', fontWeight: '700', color: '#ff9933', letterSpacing: '1px', fontStyle: 'normal' }}>
          {currentTestimonial.name}, {currentTestimonial.role}
        </cite>
      </div>
    </div>
  );
};

const HomePageContent = () => {
  const heroStyle = {
    position: 'relative',
    minHeight: '100vh', // Ensure it takes at least the full viewport height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    overflow: 'hidden',
    background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/hero-background.jpg") no-repeat center center/cover',
    paddingTop: '95px' // Offset for the fixed header
  };

  const statsSectionStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#00050a',
    padding: 'clamp(2rem, 5vw, 4rem) 1rem',
    borderBottom: '1px solid rgba(255, 102, 0, 0.2)',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const welcomeSectionStyle = {
    padding: 'clamp(4rem, 8vw, 6rem) 2rem',
    backgroundColor: '#001122',
    color: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  };

  return (
    <>
      <section id="home" style={heroStyle}>
        <div style={{ zIndex: 2, padding: '20px', animation: 'fadeInUp 1s ease-out' }}>
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(255, 102, 0, 0.7), 0 0 25px rgba(255, 102, 0, 0.5)',
          }}>Your Voice, Amplified.</h1>
          <div style={{
            marginTop: '20px',
            padding: '20px 30px',
            backgroundColor: 'rgba(0, 20, 40, 0.75)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 102, 0, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            animation: 'float 6s ease-in-out infinite',
          }}>
            <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', margin: 0, lineHeight: 1.6, color: '#f0f0f0' }}>
              Boca Raton's Premier Podcast Studio for Veterans, Professionals, and Visionaries.
            </p>
          </div>
        </div>
      </section>

      <section style={statsSectionStyle}>
        <div style={{ textAlign: 'center', minWidth: '200px', flex: '1' }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ff6600', fontWeight: 'bold' }}>100+</div>
          <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#f0f0f0', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Veterans Supported</div>
        </div>
        <div style={{ textAlign: 'center', minWidth: '200px', flex: '1' }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ff6600', fontWeight: 'bold' }}>5K+</div>
          <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#f0f0f0', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Hours Recorded</div>
        </div>
        <div style={{ textAlign: 'center', minWidth: '200px', flex: '1' }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ff6600', fontWeight: 'bold' }}>#1</div>
          <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#f0f0f0', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Community</div>
        </div>
      </section>

      <section id="about" style={welcomeSectionStyle}>
        <div style={{ flex: '1 1 300px', textAlign: 'center', animation: 'fadeInLeft 1s ease-out' }}>
          <img src="/PodfinityDecor.jpg" alt="Podfinity Studio Wall Art" style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
        </div>
        <div style={{ flex: '2 1 500px', animation: 'fadeInRight 1s ease-out' }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#ff6600',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>WELCOME TO PODFINITY</h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, maxWidth: '700px', color: '#f0f0f0' }}>
            From our state-of-the-art studios in Boca Raton, we empower creators, brands, and visionaries to produce world-class audio content. Whether you're a seasoned pro or just starting, Podfinity is your partner in sound.
          </p>
        </div>
      </section>

      <section id="studios" style={{ padding: 'clamp(4rem, 8vw, 6rem) 2rem', backgroundColor: '#00050a' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ff6600', textTransform: 'uppercase', marginBottom: '3rem' }}>Our Studios</h2>
        {/* Studios content here */}
        <p style={{textAlign: 'center'}}>Studio details coming soon.</p>
      </section>

      <section id="podcasts" style={{ padding: 'clamp(4rem, 8vw, 6rem) 2rem', backgroundColor: '#001122' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ff6600', textTransform: 'uppercase', marginBottom: '3rem' }}>Featured Podcasts</h2>
        {/* Podcasts content here */}
        <p style={{textAlign: 'center'}}>Podcast showcases coming soon.</p>
      </section>

      <section id="services" style={{ padding: 'clamp(4rem, 8vw, 6rem) 2rem', backgroundColor: '#00050a' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ff6600', textTransform: 'uppercase', marginBottom: '3rem' }}>Our Services</h2>
        {/* Services content here */}
        <p style={{textAlign: 'center'}}>Service details coming soon.</p>
      </section>

      <section id="team" style={{ padding: 'clamp(4rem, 8vw, 6rem) 2rem', backgroundColor: '#001122' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ff6600', textTransform: 'uppercase', marginBottom: '3rem' }}>Meet The Team</h2>
        {/* Team content here */}
        <p style={{textAlign: 'center'}}>Team bios coming soon.</p>
      </section>

      <section id="contact" style={{ padding: 'clamp(4rem, 8vw, 6rem) 2rem', backgroundColor: '#00050a' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ff6600', textTransform: 'uppercase', marginBottom: '3rem' }}>Get In Touch</h2>
        {/* Contact form here */}
        <p style={{textAlign: 'center'}}>Contact form coming soon.</p>
      </section>

      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 2rem', backgroundColor: '#001122' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#ff6600',
          textTransform: 'uppercase',
          marginBottom: '3rem',
        }}>What Our Partners Say</h2>
        <TestimonialCarousel testimonials={mockTestimonials} />
      </section>
    </>
  );
};

const App = () => {
  useEffect(() => {
    document.title = 'Podfinity - Your Voice, Amplified | Boca Raton Podcast Studio';
  }, []);

  return (
    <Router>
      <style>{globalStyles}</style>
      <ScrollToSection />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="*" element={<HomePageContent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@400;700&display=swap');

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  body {
    background-color: #00050a;
    color: #f0f0f0;
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }
`;

// Mock Data
const mockTestimonials = [
    {
        name: "Local Veteran Group",
        role: "Community Partner",
        quote: "Podfinity gave our stories a platform and a voice. Their commitment to the veteran community is real and deeply appreciated. The quality is second to none.",
        image: "/non-profit-logo.jpg"
    },
    {
        name: "Boca Chamber of Commerce",
        role: "Business Partner",
        quote: "A world-class production studio right here in Boca. Pete and his team are true professionals who are invested in local success.",
        image: "/boca-chamber-logo.jpg"
    }
];

// Components
const Header = () => {
  const navLinkStyle = {
    color: '#f0f0f0',
    textDecoration: 'none',
    margin: '0 15px',
    fontFamily: "'Orbitron', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '1rem',
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: 'rgba(0, 5, 10, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 102, 0, 0.2)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/PodfinityLogo.png" alt="Podfinity Logo" style={{ height: '50px', marginRight: '20px' }} />
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#f0f0f0',
          letterSpacing: '2px'
        }}>PODFINITY</span>
      </div>
      <nav style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/about" style={navLinkStyle}>About</Link>
        <Link to="/studios" style={navLinkStyle}>Studios</Link>
        <Link to="/podcasts" style={navLinkStyle}>Podcasts</Link>
        <Link to="/services" style={navLinkStyle}>Services</Link>
        <Link to="/team" style={navLinkStyle}>Team</Link>
        <Link to="/contact" style={navLinkStyle}>Contact</Link>
      </nav>
    </header>
  );
};

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#00050a',
    color: '#ccc',
    padding: '40px 20px',
    borderTop: '1px solid rgba(255, 102, 0, 0.2)',
    fontFamily: "'Roboto', sans-serif",
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  };

  const h4Style = {
    fontFamily: "'Orbitron', sans-serif",
    color: '#ff6600',
    marginBottom: '15px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const linkStyle = {
    color: '#ccc',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '8px',
    transition: 'color 0.3s ease',
  };

  const bottomBarStyle = {
    textAlign: 'center',
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #333',
    fontSize: '0.9em',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={{ padding: '0 15px' }}>
          <h4 style={h4Style}>Podfinity</h4>
          <p>Your premier podcasting partner in Boca Raton, FL. We provide the tools, space, and expertise to bring your voice to the world.</p>
        </div>
        <div style={{ padding: '0 15px' }}>
          <h4 style={h4Style}>Quick Links</h4>
          <Link to="/about" style={linkStyle}>About Us</Link>
          <Link to="/services" style={linkStyle}>Services</Link>
          <Link to="/studios" style={linkStyle}>Our Studios</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
        </div>
        <div style={{ padding: '0 15px' }}>
          <h4 style={h4Style}>Connect With Us</h4>
          <p>123 Podcaster Lane<br />Boca Raton, FL 33431</p>
          <p>Email: <a href="mailto:contact@podfinity.com" style={{...linkStyle, display: 'inline'}}>contact@podfinity.com</a></p>
        </div>
      </div>
      <div style={bottomBarStyle}>
        &copy; {new Date().getFullYear()} Podfinity. All Rights Reserved.
      </div>
    </footer>
  );
};

const TestimonialCarousel = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const currentTestimonial = testimonials[current];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #001a33 0%, #002b54 100%)',
      padding: 'clamp(4rem, 8vw, 6rem) 2rem',
      textAlign: 'center',
      borderRadius: '10px',
      margin: '2rem 0'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', transition: 'opacity 0.5s ease' }}>
        <img 
          src={currentTestimonial.image} 
          alt={currentTestimonial.name}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '1.5rem',
            border: '4px solid #ff6600',
            boxShadow: '0 8px 25px rgba(255, 102, 0, 0.4)'
          }}
        />
        <blockquote style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', lineHeight: 1.7, margin: '0 0 2rem 0', color: '#f0f0f0' }}>
          "{currentTestimonial.quote}"
        </blockquote>
        <cite style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', fontWeight: '700', color: '#ff9933', letterSpacing: '1px', fontStyle: 'normal' }}>
          {currentTestimonial.name}, {currentTestimonial.role}
        </cite>
      </div>
    </div>
  );
};

const HomePage = () => {
  useEffect(() => {
    document.title = 'Podfinity - Your Voice, Amplified | Boca Raton Podcast Studio';
  }, []);

  const heroStyle = {
    position: 'relative',
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    overflow: 'hidden',
    background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/hero-background.jpg") no-repeat center center/cover',
  };

  const statsSectionStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#00050a',
    padding: 'clamp(2rem, 5vw, 4rem) 1rem',
    borderBottom: '1px solid rgba(255, 102, 0, 0.2)',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const welcomeSectionStyle = {
    padding: 'clamp(4rem, 8vw, 6rem) 2rem',
    backgroundColor: '#001122',
    color: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  };

  return (
    <div>
      <section style={heroStyle}>
        <div style={{ zIndex: 2, padding: '20px', animation: 'fadeInUp 1s ease-out' }}>
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(255, 102, 0, 0.7), 0 0 25px rgba(255, 102, 0, 0.5)',
          }}>Your Voice, Amplified.</h1>
          <div style={{
            marginTop: '20px',
            padding: '20px 30px',
            backgroundColor: 'rgba(0, 20, 40, 0.75)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 102, 0, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            animation: 'float 6s ease-in-out infinite',
          }}>
            <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', margin: 0, lineHeight: 1.6, color: '#f0f0f0' }}>
              Boca Raton's Premier Podcast Studio for Veterans, Professionals, and Visionaries.
            </p>
          </div>
        </div>
      </section>

      <section style={statsSectionStyle}>
        <div style={{ textAlign: 'center', minWidth: '200px', flex: '1' }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ff6600', fontWeight: 'bold' }}>100+</div>
          <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#f0f0f0', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Veterans Supported</div>
        </div>
        <div style={{ textAlign: 'center', minWidth: '200px', flex: '1' }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ff6600', fontWeight: 'bold' }}>5K+</div>
          <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#f0f0f0', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Hours Recorded</div>
        </div>
        <div style={{ textAlign: 'center', minWidth: '200px', flex: '1' }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ff6600', fontWeight: 'bold' }}>#1</div>
          <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#f0f0f0', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Community</div>
        </div>
      </section>

      <section style={welcomeSectionStyle}>
        <div style={{ flex: '1 1 300px', textAlign: 'center', animation: 'fadeInLeft 1s ease-out' }}>
          <img src="/PodfinityDecor.jpg" alt="Podfinity Studio Wall Art" style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
        </div>
        <div style={{ flex: '2 1 500px', animation: 'fadeInRight 1s ease-out' }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#ff6600',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>WELCOME TO PODFINITY</h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, maxWidth: '700px', color: '#f0f0f0' }}>
            From our state-of-the-art studios in Boca Raton, we empower creators, brands, and visionaries to produce world-class audio content. Whether you're a seasoned pro or just starting, Podfinity is your partner in sound.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 2rem', backgroundColor: '#00050a' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#ff6600',
          textTransform: 'uppercase',
          marginBottom: '3rem',
        }}>What Our Partners Say</h2>
        <TestimonialCarousel testimonials={mockTestimonials} />
      </section>

    </div>
  );
};

const AboutPage = () => {
  useEffect(() => { document.title = 'About Podfinity - Our Story & Mission | Boca Raton'; }, []);
  return <div style={{padding: '2rem', paddingTop: '100px'}}>About Page Content</div>;
};

const ServicesPage = () => {
  useEffect(() => { document.title = 'Services - Full-Service Podcast Production | Podfinity'; }, []);
  return <div style={{padding: '2rem', paddingTop: '100px'}}>Services Page Content</div>;
};

const TeamPage = () => {
  useEffect(() => { document.title = 'Team - Meet the Podfinity Crew | Boca Raton'; }, []);
  return <div style={{padding: '2rem', paddingTop: '100px'}}>Team Page Content</div>;
};

const ContactPage = () => {
  useEffect(() => { document.title = 'Contact - Get in Touch | Podfinity Boca Raton'; }, []);
  return <div style={{padding: '2rem', paddingTop: '100px'}}>Contact Page Content</div>;
};

const PodcastsPage = () => {
  useEffect(() => { document.title = 'Podcasts - Featured Shows | Podfinity'; }, []);
  return <div style={{padding: '2rem', paddingTop: '100px'}}>Podcasts Page Content</div>;
};

const StudiosPage = () => {
  useEffect(() => { document.title = 'Studios - Professional Podcast Recording | Podfinity'; }, []);
  return <div style={{padding: '2rem', paddingTop: '100px'}}>Studios Page Content</div>;
};


const App = () => {
  return (
    <Router>
      <style>{globalStyles}</style>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        
        <main style={{ flex: 1, paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/studios" element={<StudiosPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(255, 102, 0, 0.7), 0 0 25px rgba(255, 102, 0, 0.5)',
          }}>Your Voice, Amplified.</h1>
          <div style={{
            marginTop: '20px',
            padding: '20px 30px',
            backgroundColor: 'rgba(0, 20, 40, 0.75)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 102, 0, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            animation: 'float 6s ease-in-out infinite',
          }}>
            <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', margin: 0, lineHeight: 1.6, color: '#f0f0f0' }}>
              Boca Raton's Premier Podcast Studio for Veterans, Professionals, and Visionaries.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/studios" 
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px) scale(1.05)';
                e.target.style.boxShadow = '0 15px 35px rgba(255, 102, 0, 0.6)';
                e.target.style.background = 'linear-gradient(135deg, #ff8533 0%, #ffaa66 100%)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 102, 0, 0.4)';
                e.target.style.background = 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)';
              }}
            >
              🎙️ BOOK YOUR SESSION
            </Link>
            <Link 
              to="/about" 
              style={{
                ...buttonStyle,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px) scale(1.05)';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.borderColor = 'rgba(255, 102, 0, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              🏆 OUR MISSION
            </Link>
          </div>
        </div>
      </section>

      <section style={welcomeSectionStyle}>
        <div style={{ flex: 1, textAlign: 'center', animation: 'fadeInLeft 1s ease-out' }}>
          <img src="/PodfinityDecor.jpg" alt="Podfinity Studio Wall Art" style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
        </div>
        <div style={{ flex: 2, animation: 'fadeInRight 1s ease-out' }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#ff6600',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>WELCOME TO PODFINITY</h2>
          <p style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: '1.7',
            maxWidth: '700px',
            color: '#f0f0f0'
          }}>
            From our state-of-the-art studios in Boca Raton, we empower creators, brands, and visionaries to produce world-class audio content. Whether you're a seasoned pro or just starting, Podfinity is your partner in sound.
          </p>
        </div>
      </section>
      </section>

      <section style={{
        background: 'linear-gradient(135deg, #00050a 0%, #000e1c 25%, #002b54 50%, #000e1c 75%, #00050a 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 20s ease infinite',
        padding: 'clamp(3rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        color: '#f0f0f0' // Ensure default text color is light
      }}>
        {[
          { number: '150+', label: 'SHOWS PRODUCED', icon: '🎧' },
          { number: '10+', label: 'YEARS EXPERIENCE', icon: '⚡' },
          { number: '5-STAR', label: 'RATED STUDIO', icon: '🏆' },
          { number: '24/7', label: 'SUPPORT READY', icon: '🛡️' }
        ].map((stat, index) => (
          <div 
            key={index}
            style={{
              ...statItemStyle,
              animationDelay: `${index * 0.2}s`
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px) scale(1.05)';
              e.target.style.boxShadow = '0 20px 40px rgba(255, 102, 0, 0.3)';
              e.target.style.borderColor = 'rgba(255, 102, 0, 0.6)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
              e.target.style.borderColor = 'rgba(255, 102, 0, 0.3)';
              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              animation: 'float 3s ease-in-out infinite',
              animationDelay: `${index * 0.5}s`
            }}>{stat.icon}</div>
            <div style={statNumberStyle}>{stat.number}</div>
            <div style={{
              ...statLabelStyle,
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>{stat.label}</div>
          </div>
        ))}
        <div style={{
          ...statItemStyle,
          animationDelay: '0.8s',
          minWidth: 'max-content',
          width: 'auto',
          flexShrink: 0,
          padding: '2rem 2.5rem'
        }}>
          <div style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            animation: 'float 3s ease-in-out infinite',
            animationDelay: '2s'
          }}>🤝</div>
          <div style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #ff6600 0%, #ffaa66 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            animation: 'pulse 2s ease-in-out infinite',
            lineHeight: '1.2',
            whiteSpace: 'nowrap',
            overflow: 'visible',
            width: 'max-content',
            textAlign: 'center',
            margin: '0 auto 0.5rem'
          }}>COMMUNITY</div>
          <div style={{
            ...statLabelStyle,
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>FOCUSED</div>
        </div>
      </section>

      <section style={{
        ...sectionStyle,
        background: 'linear-gradient(135deg, #fffaf5 0%, #ffffff 50%, #fff8f0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ff6600" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            ...sectionTitleStyle,
            background: 'linear-gradient(135deg, #003366 0%, #ff6600 50%, #003366 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '3rem',
            animation: 'slideInLeft 1s ease-out'
          }}>🎖️ WELCOME TO PODFINITY 🎖️</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
    </div>
  );
};

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Podfinity - Our Story & Mission | Boca Raton';
  }, []);

  return <div style={{padding: '2rem'}}>About Page Content</div>;
};

const ServicesPage = () => {
  useEffect(() => {
    document.title = 'Services - Full-Service Podcast Production | Podfinity';
  }, []);

  return <div style={{padding: '2rem'}}>Services Page Content</div>;
};

const TeamPage = () => {
  useEffect(() => {
    document.title = 'Team - Meet the Podfinity Crew | Boca Raton';
  }, []);

  return <div style={{padding: '2rem'}}>Team Page Content</div>;
};

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Contact - Get in Touch | Podfinity Boca Raton';
  }, []);

  return <div style={{padding: '2rem'}}>Contact Page Content</div>;
};

const PodcastsPage = () => {
  useEffect(() => {
    document.title = 'Podcasts - Featured Shows | Podfinity';
  }, []);

  return <div style={{padding: '2rem'}}>Podcasts Page Content</div>;
};

const StudiosPage = () => {
  useEffect(() => {
    document.title = 'Studios - Professional Podcast Recording | Podfinity';
  }, []);

  return <div style={{padding: '2rem'}}>Studios Page Content</div>;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <style>{globalStyles}</style>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <main style={{ flex: 1, paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/studios" element={<StudiosPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

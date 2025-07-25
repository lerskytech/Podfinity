import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

// Global Styles and Animations
const globalStyles = `
  /* Base Styles */
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@400;700&display=swap');

  body {
    background-color: #00050a; /* Deep space blue */
    color: #f0f0f0;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    scroll-behavior: smooth;
  }

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

  /* Responsive Design */
  .nav-links {
    display: flex;
    align-items: center;
  }
  .nav-toggle {
    display: none;
  }

  /* Tablet and smaller */
  @media (max-width: 992px) {
    .nav-links {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 80px;
      right: 0;
      background-color: rgba(0, 5, 10, 0.95);
      width: 100%;
      padding: 20px 0;
    }
    .nav-links.active {
      display: flex;
    }
    .nav-links a {
      margin: 10px 0;
      text-align: center;
    }
    .nav-toggle {
      display: block;
      background: none;
      border: none;
      color: #f0f0f0;
      font-size: 2rem;
      cursor: pointer;
    }
    #about {
      grid-template-columns: 1fr !important;
    }
    .contact-grid,
    .studios-grid,
    .services-grid,
    .team-grid,
    .podcasts-grid {
        grid-template-columns: 1fr;
    }
    .testimonial-card {
        flex-direction: column;
        text-align: center;
    }
    .footer-grid {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .footer-grid > div {
        margin-bottom: 20px;
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem !important;
    }
    .hero-subtitle {
      font-size: 1.2rem !important;
    }
    .stats-section {
      flex-direction: column;
      gap: 30px;
    }
  }
`;

// Helper component for smooth scrolling to sections
const ScrollToSection = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 95; // Height of fixed header + desired space
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // Scroll to top on initial load or when hash is empty
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
};

// Mock Data
const podcastsData = [
    {
        title: "Veteran Voices",
        host: "with Marty Strong",
        image: "/Veteran-Voices.jpg",
        description: "In-depth conversations with veterans from all walks of life, sharing their stories of service, sacrifice, and success after the uniform."
    },
    {
        name: "Boca Business Spotlight",
        host: "with Pete Rodriguez",
        image: "/Boca-Business-Spotlight.jpg",
        description: "Pete sits down with local entrepreneurs and business leaders in Boca Raton to discuss their journey, challenges, and keys to success."
    }
];

const teamData = [
    {
        name: "Marty Strong",
        role: "CEO",
        image: "/MartyStrong.jpg",
        bio: "A seasoned leader and military veteran, Marty drives the strategic vision of Podfinity, ensuring excellence and operational discipline."
    },
    {
        name: "Pete Rodriguez",
        role: "Founder & Owner",
        image: "/PeteRodriguez.jpg",
        bio: "The heart of Podfinity. Pete's passion for audio and his veteran roots inspired the mission to give every voice a platform."
    },
    {
        name: "Jessica Chen",
        role: "Head of Production",
        image: "/jessica-chen.jpg",
        bio: "With a decade of experience in audio engineering, Jessica leads our production team, guaranteeing broadcast-quality sound."
    },
    {
        name: "David Carter",
        role: "Marketing Director",
        image: "/david-carter.jpg",
        bio: "David is a digital marketing guru who helps our clients grow their audience and monetize their content effectively."
    }
];

const servicesData = [
    {
        title: "Audio & Video Recording",
        description: "Capture crystal-clear audio and 4K video in our sound-treated, professional studios.",
        icon: "🎤"
    },
    {
        title: "Post-Production",
        description: "Expert editing, mixing, and mastering to make your podcast sound polished and professional.",
        icon: "🎧"
    },
    {
        title: "Distribution & Hosting",
        description: "Seamless publishing to all major podcast platforms, including Spotify, Apple, and Google Podcasts.",
        icon: "🚀"
    },
    {
        title: "Show Notes & Transcription",
        description: "We create detailed show notes and accurate transcriptions to improve SEO and accessibility.",
        icon: "📝"
    },
    {
        title: "Marketing & Promotion",
        description: "Strategic guidance and asset creation to help you grow your audience and build a community.",
        icon: "📈"
    },
    {
        title: "Consulting & Strategy",
        description: "From concept to launch, our experts provide the guidance you need to create a successful show.",
        icon: "💡"
    }
];

const studioData = [
    {
        name: "Studio A: The Flagship",
        image: "/studio-a.jpg",
        description: "Our premier recording suite, equipped with industry-leading technology for up to 4 hosts. Perfect for flagship shows and roundtable discussions.",
        specs: ["4+ Person Setup", "4K Video Capability", "Live-Streaming Ready"]
    },
    {
        name: "Studio B: The Workhorse",
        image: "/studio-b.jpg",
        description: "A versatile and professional space designed for solo creators or 2-person interviews. All the quality, in a more intimate setting.",
        specs: ["1-2 Person Setup", "Pristine Audio", "Comfort-Focused"]
    },
    {
        name: "Studio C: The Content Creator",
        image: "/studio-c.jpg",
        description: "Optimized for solo remote recordings, voice-overs, and audiobook narration. Your dedicated space for focused content creation.",
        specs: ["Solo Recording", "Sound-Treated Booth", "Remote Guest Integration"]
    }
];

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children; 
  }
}

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
const AnimatedSection = ({ children, threshold = 0.1 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  });

  return (
    <div
      ref={ref}
      style={{
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      {children}
    </div>
  );
};

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const currentPath = hash || pathname;

  const getLinkStyle = (path) => ({
    color: '#f0f0f0',
    textDecoration: 'none',
    margin: '0 15px',
    fontFamily: "'Orbitron', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '1rem',
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    ...(currentPath === path && { color: '#ff6600', textShadow: '0 0 8px rgba(255, 102, 0, 0.7)' })
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
      height: '65px'
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
            <nav>
        <div className={`nav-links ${isNavOpen ? 'active' : ''}`}>
          <Link to="/#home" style={getLinkStyle('#home')} onClick={() => setIsNavOpen(false)}>Home</Link>
          <Link to="/#about" style={getLinkStyle('#about')} onClick={() => setIsNavOpen(false)}>About</Link>
          <Link to="/#studios" style={getLinkStyle('#studios')} onClick={() => setIsNavOpen(false)}>Studios</Link>
          <Link to="/#podcasts" style={getLinkStyle('#podcasts')} onClick={() => setIsNavOpen(false)}>Podcasts</Link>
          <Link to="/#services" style={getLinkStyle('#services')} onClick={() => setIsNavOpen(false)}>Services</Link>
          <Link to="/#team" style={getLinkStyle('#team')} onClick={() => setIsNavOpen(false)}>Team</Link>
          <Link to="/#contact" style={getLinkStyle('#contact')} onClick={() => setIsNavOpen(false)}>Contact</Link>
        </div>
        <button className="nav-toggle" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? '✕' : '☰'}
        </button>
      </nav>
    </header>
  );
};

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#00050a',
    color: '#f0f0f0',
    padding: '40px',
    borderTop: '1px solid rgba(255, 102, 0, 0.2)'
  };
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  };
  const linkStyle = { color: '#ff6600', textDecoration: 'none', margin: '0 10px' };

  return (
    <footer style={footerStyle}>
      <div className="footer-grid" style={gridStyle}>
        <div>
          <h4 style={{fontFamily: "'Orbitron', sans-serif", color: '#ff6600'}}>PODFINITY</h4>
          <p>Boca Raton's Premier Veteran-Owned Podcast Studio.</p>
        </div>
        <div>
          <h4 style={{fontFamily: "'Orbitron', sans-serif", color: '#ff6600'}}>Quick Links</h4>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li><a href="#about" style={{color: '#f0f0f0', textDecoration: 'none'}}>About</a></li>
            <li><a href="#services" style={{color: '#f0f0f0', textDecoration: 'none'}}>Services</a></li>
            <li><a href="#team" style={{color: '#f0f0f0', textDecoration: 'none'}}>Team</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{fontFamily: "'Orbitron', sans-serif", color: '#ff6600'}}>Contact</h4>
          <p>contact@podfinity.com</p>
          <p>(561) 555-1234</p>
        </div>
      </div>
      <div style={{textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255, 102, 0, 0.1)'}}>
        <p>&copy; 2024 Podfinity. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const Contact = () => {
  const sectionStyle = { 
    paddingTop: '95px', 
    paddingBottom: '60px', 
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
  };
  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 40px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px',
    alignItems: 'flex-start'
  };
  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    backgroundColor: 'rgba(0, 5, 10, 0.7)',
    border: '1px solid rgba(255, 102, 0, 0.3)',
    borderRadius: '5px',
    color: '#f0f0f0',
    boxSizing: 'border-box'
  };
  const buttonStyle = {
    backgroundColor: '#ff6600',
    color: '#00050a',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Orbitron', sans-serif",
    width: '100%',
    fontSize: '1rem',
    textTransform: 'uppercase'
  };

  return (
    <section id="contact" style={sectionStyle}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600', textAlign: 'center', marginBottom: '40px' }}>GET IN TOUCH</h2>
      <div className="contact-grid" style={containerStyle}>
        <div>
          <h3 style={{fontFamily: "'Orbitron', sans-serif"}}>Send Us a Message</h3>
          <form onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Your Name" style={inputStyle} />
            <input type="email" placeholder="Your Email" style={inputStyle} />
            <textarea placeholder="Your Message" rows="6" style={{...inputStyle, resize: 'vertical'}}></textarea>
            <button type="submit" style={buttonStyle}>Send Message</button>
          </form>
        </div>
        <div>
          <h3 style={{fontFamily: "'Orbitron', sans-serif"}}>Contact Information</h3>
          <p style={{lineHeight: 1.8}}>
            <strong>Address:</strong><br/>
            123 Victory Lane<br/>
            Boca Raton, FL 33431
          </p>
          <p style={{lineHeight: 1.8}}>
            <strong>Email:</strong><br/>
            <a href="mailto:contact@podfinity.com" style={{color: '#ff6600', textDecoration: 'none'}}>contact@podfinity.com</a>
          </p>
          <p style={{lineHeight: 1.8}}>
            <strong>Phone:</strong><br/>
            (561) 555-1234
          </p>
        </div>
      </div>
    </section>
  );
};

const Podcasts = () => {
  const sectionStyle = { paddingTop: '95px', paddingBottom: '60px', textAlign: 'center', backgroundColor: '#00050a' };
  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 400px))',
    gap: '40px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center'
  };
  const cardStyle = {
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    borderRadius: '10px',
    padding: '0',
    textAlign: 'center',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <section id="podcasts" style={sectionStyle}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>FEATURED PODCASTS</h2>
      <div className="podcasts-grid" style={cardContainerStyle}>
        {podcastsData.map((podcast, index) => (
          <div key={index} style={cardStyle}>
            <img src={podcast.image} alt={podcast.title} style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff6600' }}>{podcast.title || podcast.name}</h3>
              <p style={{ fontWeight: 'bold', color: 'rgba(240, 240, 240, 0.8)', marginTop: '-10px' }}>{podcast.host}</p>
              <p style={{ lineHeight: '1.6' }}>{podcast.description}</p>
              <button style={{
                backgroundColor: 'transparent',
                color: '#ff6600',
                border: '2px solid #ff6600',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Orbitron', sans-serif",
                marginTop: '15px',
                transition: 'background-color 0.3s, color 0.3s'
              }}>Listen Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Team = () => {
  const sectionStyle = { paddingTop: '95px', paddingBottom: '60px', textAlign: 'center' };
  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 350px))',
    gap: '30px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center'
  };
  const cardStyle = {
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
  };

  return (
    <section id="team" style={sectionStyle}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>MEET THE TEAM</h2>
      <div className="team-grid" style={cardContainerStyle}>
        {teamData.map((member, index) => (
          <div key={index} style={cardStyle}>
            <img src={member.image} alt={member.name} style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '15px', border: '3px solid #ff6600', objectFit: 'cover' }} />
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff6600' }}>{member.name}</h3>
            <p style={{ fontWeight: 'bold', color: 'rgba(240, 240, 240, 0.8)' }}>{member.role}</p>
            <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  const sectionStyle = { paddingTop: '95px', paddingBottom: '60px', textAlign: 'center', backgroundColor: '#00050a' };
  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))',
    gap: '30px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center'
  };
  const cardStyle = {
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    borderRadius: '10px',
    padding: '30px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <section id="services" style={sectionStyle}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>OUR SERVICES</h2>
      <div className="services-grid" style={cardContainerStyle}>
        {servicesData.map((service, index) => (
          <div key={index} style={cardStyle}
               onMouseEnter={e => {
                 e.currentTarget.style.transform = 'translateY(-10px)';
                 e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 102, 0, 0.2)';
               }}
               onMouseLeave={e => {
                 e.currentTarget.style.transform = 'translateY(0px)';
                 e.currentTarget.style.boxShadow = 'none';
               }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{service.icon}</div>
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff6600' }}>{service.title}</h3>
            <p style={{ lineHeight: '1.6' }}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Studios = () => {
  const sectionStyle = { paddingTop: '95px', paddingBottom: '60px', textAlign: 'center' };
  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 400px))',
    gap: '30px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center'
  };
  const cardStyle = {
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    borderRadius: '10px',
    overflow: 'hidden',
    textAlign: 'left',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
  };
  const buttonStyle = {
    backgroundColor: 'transparent',
    color: '#ff6600',
    border: '2px solid #ff6600',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Orbitron', sans-serif",
    marginTop: 'auto',
    transition: 'background-color 0.3s, color 0.3s'
  };

  return (
    <section id="studios" style={sectionStyle}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>OUR STUDIOS</h2>
      <div className="studios-grid" style={cardContainerStyle}>
        {studioData.map((studio, index) => (
          <div key={index} style={cardStyle} 
               onMouseEnter={e => {
                 e.currentTarget.style.transform = 'translateY(-10px)';
                 e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 102, 0, 0.2)';
               }}
               onMouseLeave={e => {
                 e.currentTarget.style.transform = 'translateY(0px)';
                 e.currentTarget.style.boxShadow = 'none';
               }}>
            <img src={studio.image} alt={studio.name} style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff6600', marginTop: '0' }}>{studio.name}</h3>
              <p>{studio.description}</p>
              <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                {studio.specs.map((spec, i) => <li key={i}>{spec}</li>)}
              </ul>
              <button style={buttonStyle} 
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#ff6600'; e.currentTarget.style.color = '#00050a'; }} 
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ff6600'; }}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
  const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current === mockTestimonials.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? mockTestimonials.length - 1 : current - 1));
  };

  const carouselStyle = {
    position: 'relative',
    maxWidth: '800px',
    margin: '95px auto',
    overflow: 'hidden',
    borderRadius: '10px',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    padding: '40px 60px'
  };

  const slideStyle = {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: '1.2rem',
    lineHeight: '1.6'
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: '#ff6600',
    fontSize: '2rem',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    zIndex: 1000
  };

  return (
    <section id="testimonials" style={{ paddingTop: '95px', paddingBottom: '60px' }}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600', textAlign: 'center' }}>WHAT OUR CLIENTS SAY</h2>
      <div style={carouselStyle}>
        <div style={slideStyle}>
          <p>"{mockTestimonials[activeIndex].quote}"</p>
          <div>
            <p style={{ fontWeight: 'bold', color: '#ff6600' }}>- {mockTestimonials[activeIndex].name}, {mockTestimonials[activeIndex].role}</p>
          </div>
        </div>
        <button onClick={prevSlide} style={{ ...arrowStyle, left: '10px' }}>&#10094;</button>
        <button onClick={nextSlide} style={{ ...arrowStyle, right: '10px' }}>&#10095;</button>
      </div>
    </section>
  );
};

const Hero = () => {
  const heroStyle = {
    height: 'calc(100vh - 95px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px',
    background: 'url(/PodfinityHero.jpg) no-repeat center center/cover',
    marginTop: '95px' // Offset for fixed header
  };

  return (
    <section id="home" style={heroStyle}>
      <div style={{
        backgroundColor: 'rgba(0, 5, 10, 0.7)',
        padding: '20px 40px',
        borderRadius: '10px',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 102, 0, 0.3)',
        animation: 'fadeInUp 1s 0.5s backwards'
      }}>
        <h1 className="hero-title" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '4rem', margin: 0, color: '#ff6600' }}>FIND YOUR VOICE</h1>
        <p className="hero-subtitle" style={{ fontSize: '1.5rem' }}>Boca Raton's Premier Veteran-Owned Podcast Studio</p>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const statsSectionStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '40px',
    backgroundColor: 'rgba(0, 5, 10, 0.5)',
    borderTop: '1px solid rgba(255, 102, 0, 0.2)',
    borderBottom: '1px solid rgba(255, 102, 0, 0.2)',
  };

  return (
    <section className="stats-section" style={statsSectionStyle}>
      <div style={{ textAlign: 'center', animation: 'fadeInUp 1s 0.2s backwards' }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>100+</h3>
        <p>Shows Produced</p>
      </div>
      <div style={{ textAlign: 'center', animation: 'fadeInUp 1s 0.4s backwards' }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>5M+</h3>
        <p>Total Downloads</p>
      </div>
      <div style={{ textAlign: 'center', animation: 'fadeInUp 1s 0.6s backwards' }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>100%</h3>
        <p>Veteran Owned</p>
      </div>
    </section>
  );
};

const About = () => {
  const welcomeSectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '50px',
    alignItems: 'center',
    padding: '80px 40px',
    maxWidth: '1200px',
    margin: '95px auto 0 auto'
  };

  return (
    <section id="about" style={welcomeSectionStyle}>
      <div style={{ animation: 'fadeInLeft 1s' }}>
        <img src="/PodfinityDecor.jpg" alt="Podfinity Studio Wall Art" style={{ width: '100%', maxWidth: '550px', borderRadius: '10px', display: 'block', margin: '0 auto' }} />
      </div>
      <div style={{ animation: 'fadeInRight 1s' }}>
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>WELCOME TO PODFINITY</h2>
        <p style={{ lineHeight: '1.8' }}>From our state-of-the-art studios in Boca Raton, we provide a seamless, professional podcasting experience. We are a veteran-owned business dedicated to helping you find your voice and share your story. Whether you're a seasoned creator or just starting, our team is here to support you every step of the way.</p>
      </div>
    </section>
  );
};

function App() {
  return (
    <Router>
      <style>{globalStyles}</style>
      <ScrollToSection />
      <Header />
      <ErrorBoundary>
        <main style={{ flex: 1 }}>
          <AnimatedSection><Hero /></AnimatedSection>
          <AnimatedSection><StatsSection /></AnimatedSection>
          <AnimatedSection><About /></AnimatedSection>
          <AnimatedSection><Studios /></AnimatedSection>
          <AnimatedSection><Podcasts /></AnimatedSection>
          <AnimatedSection><Services /></AnimatedSection>
          <AnimatedSection><Team /></AnimatedSection>
          <AnimatedSection><TestimonialCarousel /></AnimatedSection>
          <AnimatedSection><Contact /></AnimatedSection>
        </main>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

// Global Styles and Animations
const globalStyles = `
  /* Base Styles */
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@400;700&display=swap');

  body {
    background-color: #00050a; /* Deep space blue */
    color: #f0f0f0;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    scroll-behavior: smooth;
  }

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

  /* Responsive Design */
  .nav-links {
    display: flex;
    align-items: center;
  }
  .nav-toggle {
    display: none;
  }

  /* Tablet and smaller */
  @media (max-width: 992px) {
    .nav-links {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 80px;
      right: 0;
      background-color: rgba(0, 5, 10, 0.95);
      width: 100%;
      padding: 20px 0;
    }
    .nav-links.active {
      display: flex;
    }
    .nav-links a {
      margin: 10px 0;
      text-align: center;
    }
    .nav-toggle {
      display: block;
      background: none;
      border: none;
      color: #f0f0f0;
      font-size: 2rem;
      cursor: pointer;
    }
    #about {
      grid-template-columns: 1fr !important;
    }
    .contact-grid,
    .studios-grid,
    .services-grid,
    .team-grid,
    .podcasts-grid {
        grid-template-columns: 1fr;
    }
    .testimonial-card {
        flex-direction: column;
        text-align: center;
    }
    .footer-grid {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .footer-grid > div {
        margin-bottom: 20px;
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem !important;
    }
    .hero-subtitle {
      font-size: 1.2rem !important;
    }
    .stats-section {
      flex-direction: column;
      gap: 30px;
    }
  }
`;

// Helper component for smooth scrolling to sections
const ScrollToSection = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 95; // Height of fixed header + desired space
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // Scroll to top on initial load or when hash is empty
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
};

// Mock Data
const podcastsData = [
    {
        title: "Veteran Voices",
        host: "with Marty Strong",
        image: "/Veteran-Voices.jpg",
        description: "In-depth conversations with veterans from all walks of life, sharing their stories of service, sacrifice, and success after the uniform."
    },
    {
        name: "Boca Business Spotlight",
        host: "with Pete Rodriguez",
        image: "/Boca-Business-Spotlight.jpg",
        description: "Pete sits down with local entrepreneurs and business leaders in Boca Raton to discuss their journey, challenges, and keys to success."
    }
];

const teamData = [
    {
        name: "Marty Strong",
        role: "CEO",
        image: "/MartyStrong.jpg",
        bio: "A seasoned leader and military veteran, Marty drives the strategic vision of Podfinity, ensuring excellence and operational discipline."
    },
    {
        name: "Pete Rodriguez",
        role: "Founder & Owner",
        image: "/PeteRodriguez.jpg",
        bio: "The heart of Podfinity. Pete's passion for audio and his veteran roots inspired the mission to give every voice a platform."
    },
    {
        name: "Jessica Chen",
        role: "Head of Production",
        image: "/jessica-chen.jpg",
        bio: "With a decade of experience in audio engineering, Jessica leads our production team, guaranteeing broadcast-quality sound."
    },
    {
        name: "David Carter",
        role: "Marketing Director",
        image: "/david-carter.jpg",
        bio: "David is a digital marketing guru who helps our clients grow their audience and monetize their content effectively."
    }
];

const servicesData = [
    {
        title: "Audio & Video Recording",
        description: "Capture crystal-clear audio and 4K video in our sound-treated, professional studios.",
        icon: "🎤"
    },
    {
        title: "Post-Production",
        description: "Expert editing, mixing, and mastering to make your podcast sound polished and professional.",
        icon: "🎧"
    },
    {
        title: "Distribution & Hosting",
        description: "Seamless publishing to all major podcast platforms, including Spotify, Apple, and Google Podcasts.",
        icon: "🚀"
    },
    {
        title: "Show Notes & Transcription",
        description: "We create detailed show notes and accurate transcriptions to improve SEO and accessibility.",
        icon: "📝"
    },
    {
        title: "Marketing & Promotion",
        description: "Strategic guidance and asset creation to help you grow your audience and build a community.",
        icon: "📈"
    },
    {
        title: "Consulting & Strategy",
        description: "From concept to launch, our experts provide the guidance you need to create a successful show.",
        icon: "💡"
    }
];

const studioData = [
    {
        name: "Studio A: The Flagship",
        image: "/studio-a.jpg",
        description: "Our premier recording suite, equipped with industry-leading technology for up to 4 hosts. Perfect for flagship shows and roundtable discussions.",
        specs: ["4+ Person Setup", "4K Video Capability", "Live-Streaming Ready"]
    },
    {
        name: "Studio B: The Workhorse",
        image: "/studio-b.jpg",
        description: "A versatile and professional space designed for solo creators or 2-person interviews. All the quality, in a more intimate setting.",
        specs: ["1-2 Person Setup", "Pristine Audio", "Comfort-Focused"]
    },
    {
        name: "Studio C: The Content Creator",
        image: "/studio-c.jpg",
        description: "Optimized for solo remote recordings, voice-overs, and audiobook narration. Your dedicated space for focused content creation.",
        specs: ["Solo Recording", "Sound-Treated Booth", "Remote Guest Integration"]
    }
];

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children; 
  }
}

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
const AnimatedSection = ({ children, threshold = 0.1 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  });

  return (
    <div
      ref={ref}
      style={{
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      {children}
    </div>
  );
};

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const currentPath = hash || pathname;

  const getLinkStyle = (path) => ({
    color: '#f0f0f0',
    textDecoration: 'none',
    margin: '0 15px',
    fontFamily: "'Orbitron', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '1rem',
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    ...(currentPath === path && { color: '#ff6600', textShadow: '0 0 8px rgba(255, 102, 0, 0.7)' })
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
      height: '65px'
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
            <nav>
        <div className={`nav-links ${isNavOpen ? 'active' : ''}`}>
          <Link to="/#home" style={getLinkStyle('#home')} onClick={() => setIsNavOpen(false)}>Home</Link>
          <Link to="/#about" style={getLinkStyle('#about')} onClick={() => setIsNavOpen(false)}>About</Link>
          <Link to="/#studios" style={getLinkStyle('#studios')} onClick={() => setIsNavOpen(false)}>Studios</Link>
          <Link to="/#podcasts" style={getLinkStyle('#podcasts')} onClick={() => setIsNavOpen(false)}>Podcasts</Link>
          <Link to="/#services" style={getLinkStyle('#services')} onClick={() => setIsNavOpen(false)}>Services</Link>
          <Link to="/#team" style={getLinkStyle('#team')} onClick={() => setIsNavOpen(false)}>Team</Link>
          <Link to="/#contact" style={getLinkStyle('#contact')} onClick={() => setIsNavOpen(false)}>Contact</Link>
        </div>
        <button className="nav-toggle" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? '✕' : '☰'}
        </button>
      </nav>
    </header>
  );
};

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#00050a',
    color: '#f0f0f0',
    padding: '40px',
    borderTop: '1px solid rgba(255, 102, 0, 0.2)'
  };
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  };
  const linkStyle = { color: '#ff6600', textDecoration: 'none', margin: '0 10px' };

  return (
    <footer style={footerStyle}>
      <div className="footer-grid" style={gridStyle}>
        <div>
          <h4 style={{fontFamily: "'Orbitron', sans-serif", color: '#ff6600'}}>PODFINITY</h4>
          <p>Boca Raton's Premier Veteran-Owned Podcast Studio.</p>
        </div>
        <div>
          <h4 style={{fontFamily: "'Orbitron', sans-serif", color: '#ff6600'}}>Quick Links</h4>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li><a href="#about" style={{color: '#f0f0f0', textDecoration: 'none'}}>About</a></li>
            <li><a href="#services" style={{color: '#f0f0f0', textDecoration: 'none'}}>Services</a></li>
            <li><a href="#team" style={{color: '#f0f0f0', textDecoration: 'none'}}>Team</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{fontFamily: "'Orbitron', sans-serif", color: '#ff6600'}}>Contact</h4>
          <p>contact@podfinity.com</p>
          <p>(561) 555-1234</p>
        </div>
      </div>
      <div style={{textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255, 102, 0, 0.1)'}}>
        <p>&copy; 2024 Podfinity. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const Contact = () => {
  const sectionStyle = { 
    paddingTop: '95px', 
    paddingBottom: '60px', 
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
  };
  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 40px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px',
    alignItems: 'flex-start'
  };
  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    backgroundColor: 'rgba(0, 5, 10, 0.7)',
    border: '1px solid rgba(255, 102, 0, 0.3)',
    borderRadius: '5px',
    color: '#f0f0f0',
    boxSizing: 'border-box'
  };
  const buttonStyle = {
    backgroundColor: '#ff6600',
    color: '#00050a',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Orbitron', sans-serif",
    width: '100%',
    fontSize: '1rem',
    textTransform: 'uppercase'
  };

  return (
    <section id="contact" style={sectionStyle}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600', textAlign: 'center', marginBottom: '40px' }}>GET IN TOUCH</h2>
      <div className="contact-grid" style={containerStyle}>
        <div>
          <h3 style={{fontFamily: "'Orbitron', sans-serif"}}>Send Us a Message</h3>
          <form onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Your Name" style={inputStyle} />
            <input type="email" placeholder="Your Email" style={inputStyle} />
            <textarea placeholder="Your Message" rows="6" style={{...inputStyle, resize: 'vertical'}}></textarea>
            <button type="submit" style={buttonStyle}>Send Message</button>
          </form>
        </div>
        <div>
          <h3 style={{fontFamily: "'Orbitron', sans-serif"}}>Contact Information</h3>
          <p style={{lineHeight: 1.8}}>
            <strong>Address:</strong><br/>
            123 Victory Lane<br/>
            Boca Raton, FL 33431
          </p>
          <p style={{lineHeight: 1.8}}>
            <strong>Email:</strong><br/>
            <a href="mailto:contact@podfinity.com" style={{color: '#ff6600', textDecoration: 'none'}}>contact@podfinity.com</a>
          </p>
          <p style={{lineHeight: 1.8}}>
            <strong>Phone:</strong><br/>
            (561) 555-1234
          </p>
        </div>
      </div>
    </section>
  );
};

const Podcasts = () => {
  const sectionStyle = { paddingTop: '95px', paddingBottom: '60px', textAlign: 'center', backgroundColor: '#00050a' };
  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 400px))',
    gap: '40px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center'
  };
  const cardStyle = {
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    borderRadius: '10px',
    padding: '0',
    textAlign: 'center',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <section id="podcasts" style={sectionStyle}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>FEATURED PODCASTS</h2>
      <div className="podcasts-grid" style={cardContainerStyle}>
        {podcastsData.map((podcast, index) => (
          <div key={index} style={cardStyle}>
            <img src={podcast.image} alt={podcast.title} style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff6600' }}>{podcast.title || podcast.name}</h3>
              <p style={{ fontWeight: 'bold', color: 'rgba(240, 240, 240, 0.8)', marginTop: '-10px' }}>{podcast.host}</p>
              <p style={{ lineHeight: '1.6' }}>{podcast.description}</p>
              <button style={{
                backgroundColor: 'transparent',
                color: '#ff6600',
                border: '2px solid #ff6600',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Orbitron', sans-serif",
                marginTop: '15px',
                transition: 'background-color 0.3s, color 0.3s'
              }}>Listen Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Team = () => {
  const sectionStyle = { paddingTop: '95px', paddingBottom: '60px', textAlign: 'center' };
  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 350px))',
    gap: '30px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center'
  };
  const cardStyle = {
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
  };

  return (
    <section id="team" style={sectionStyle}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>MEET THE TEAM</h2>
      <div className="team-grid" style={cardContainerStyle}>
        {teamData.map((member, index) => (
          <div key={index} style={cardStyle}>
            <img src={member.image} alt={member.name} style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '15px', border: '3px solid #ff6600', objectFit: 'cover' }} />
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff6600' }}>{member.name}</h3>
            <p style={{ fontWeight: 'bold', color: 'rgba(240, 240, 240, 0.8)' }}>{member.role}</p>
            <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  const sectionStyle = { paddingTop: '95px', paddingBottom: '60px', textAlign: 'center', backgroundColor: '#00050a' };
  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))',
    gap: '30px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center'
  };
  const cardStyle = {
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    borderRadius: '10px',
    padding: '30px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <section id="services" style={sectionStyle}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>OUR SERVICES</h2>
      <div className="services-grid" style={cardContainerStyle}>
        {servicesData.map((service, index) => (
          <div key={index} style={cardStyle}
               onMouseEnter={e => {
                 e.currentTarget.style.transform = 'translateY(-10px)';
                 e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 102, 0, 0.2)';
               }}
               onMouseLeave={e => {
                 e.currentTarget.style.transform = 'translateY(0px)';
                 e.currentTarget.style.boxShadow = 'none';
               }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{service.icon}</div>
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff6600' }}>{service.title}</h3>
            <p style={{ lineHeight: '1.6' }}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Studios = () => {
  const sectionStyle = { paddingTop: '95px', paddingBottom: '60px', textAlign: 'center' };
  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 400px))',
    gap: '30px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    justifyContent: 'center'
  };
  const cardStyle = {
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    borderRadius: '10px',
    overflow: 'hidden',
    textAlign: 'left',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
  };
  const buttonStyle = {
    backgroundColor: 'transparent',
    color: '#ff6600',
    border: '2px solid #ff6600',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Orbitron', sans-serif",
    marginTop: 'auto',
    transition: 'background-color 0.3s, color 0.3s'
  };

  return (
    <section id="studios" style={sectionStyle}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>OUR STUDIOS</h2>
      <div className="studios-grid" style={cardContainerStyle}>
        {studioData.map((studio, index) => (
          <div key={index} style={cardStyle} 
               onMouseEnter={e => {
                 e.currentTarget.style.transform = 'translateY(-10px)';
                 e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 102, 0, 0.2)';
               }}
               onMouseLeave={e => {
                 e.currentTarget.style.transform = 'translateY(0px)';
                 e.currentTarget.style.boxShadow = 'none';
               }}>
            <img src={studio.image} alt={studio.name} style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", color: '#ff6600', marginTop: '0' }}>{studio.name}</h3>
              <p>{studio.description}</p>
              <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                {studio.specs.map((spec, i) => <li key={i}>{spec}</li>)}
              </ul>
              <button style={buttonStyle} 
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#ff6600'; e.currentTarget.style.color = '#00050a'; }} 
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ff6600'; }}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
  const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current === mockTestimonials.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? mockTestimonials.length - 1 : current - 1));
  };

  const carouselStyle = {
    position: 'relative',
    maxWidth: '800px',
    margin: '95px auto',
    overflow: 'hidden',
    borderRadius: '10px',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    backgroundColor: 'rgba(10, 25, 47, 0.4)',
    padding: '40px 60px'
  };

  const slideStyle = {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: '1.2rem',
    lineHeight: '1.6'
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: '#ff6600',
    fontSize: '2rem',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    zIndex: 1000
  };

  return (
    <section id="testimonials" style={{ paddingTop: '95px', paddingBottom: '60px' }}>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600', textAlign: 'center' }}>WHAT OUR CLIENTS SAY</h2>
      <div style={carouselStyle}>
        <div style={slideStyle}>
          <p>"{mockTestimonials[activeIndex].quote}"</p>
          <div>
            <p style={{ fontWeight: 'bold', color: '#ff6600' }}>- {mockTestimonials[activeIndex].name}, {mockTestimonials[activeIndex].role}</p>
          </div>
        </div>
        <button onClick={prevSlide} style={{ ...arrowStyle, left: '10px' }}>&#10094;</button>
        <button onClick={nextSlide} style={{ ...arrowStyle, right: '10px' }}>&#10095;</button>
      </div>
    </section>
  );
};

const Hero = () => {
  const heroStyle = {
    height: 'calc(100vh - 95px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px',
    background: 'url(/PodfinityHero.jpg) no-repeat center center/cover',
    marginTop: '95px' // Offset for fixed header
  };

  return (
    <section id="home" style={heroStyle}>
      <div style={{
        backgroundColor: 'rgba(0, 5, 10, 0.7)',
        padding: '20px 40px',
        borderRadius: '10px',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 102, 0, 0.3)',
        animation: 'fadeInUp 1s 0.5s backwards'
      }}>
        <h1 className="hero-title" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '4rem', margin: 0, color: '#ff6600' }}>FIND YOUR VOICE</h1>
        <p className="hero-subtitle" style={{ fontSize: '1.5rem' }}>Boca Raton's Premier Veteran-Owned Podcast Studio</p>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const statsSectionStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '40px',
    backgroundColor: 'rgba(0, 5, 10, 0.5)',
    borderTop: '1px solid rgba(255, 102, 0, 0.2)',
    borderBottom: '1px solid rgba(255, 102, 0, 0.2)',
  };

  return (
    <section className="stats-section" style={statsSectionStyle}>
      <div style={{ textAlign: 'center', animation: 'fadeInUp 1s 0.2s backwards' }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>100+</h3>
        <p>Shows Produced</p>
      </div>
      <div style={{ textAlign: 'center', animation: 'fadeInUp 1s 0.4s backwards' }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>5M+</h3>
        <p>Total Downloads</p>
      </div>
      <div style={{ textAlign: 'center', animation: 'fadeInUp 1s 0.6s backwards' }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>100%</h3>
        <p>Veteran Owned</p>
      </div>
    </section>
  );
};

const About = () => {
  const welcomeSectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '50px',
    alignItems: 'center',
    padding: '80px 40px',
    maxWidth: '1200px',
    margin: '95px auto 0 auto'
  };

  return (
    <section id="about" style={welcomeSectionStyle}>
      <div style={{ animation: 'fadeInLeft 1s' }}>
        <img src="/PodfinityDecor.jpg" alt="Podfinity Studio Wall Art" style={{ width: '100%', maxWidth: '550px', borderRadius: '10px', display: 'block', margin: '0 auto' }} />
      </div>
      <div style={{ animation: 'fadeInRight 1s' }}>
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', color: '#ff6600' }}>WELCOME TO PODFINITY</h2>
        <p style={{ lineHeight: '1.8' }}>From our state-of-the-art studios in Boca Raton, we provide a seamless, professional podcasting experience. We are a veteran-owned business dedicated to helping you find your voice and share your story. Whether you're a seasoned creator or just starting, our team is here to support you every step of the way.</p>
      </div>
    </section>
  );
};

function App() {
  return (
    <Router>
      <style>{globalStyles}</style>
      <ScrollToSection />
      <Header />
      <ErrorBoundary>
        <main style={{ flex: 1 }}>
          <AnimatedSection><Hero /></AnimatedSection>
          <AnimatedSection><StatsSection /></AnimatedSection>
          <AnimatedSection><About /></AnimatedSection>
          <AnimatedSection><Studios /></AnimatedSection>
          <AnimatedSection><Podcasts /></AnimatedSection>
          <AnimatedSection><Services /></AnimatedSection>
          <AnimatedSection><Team /></AnimatedSection>
          <AnimatedSection><TestimonialCarousel /></AnimatedSection>
          <AnimatedSection><Contact /></AnimatedSection>
        </main>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}

export default App;

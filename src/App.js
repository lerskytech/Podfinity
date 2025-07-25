import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Add CSS animations
const globalStyles = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes titleGlow {
    0% { text-shadow: 0 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(255, 102, 0, 0.3); }
    100% { text-shadow: 0 4px 8px rgba(0,0,0,0.5), 0 0 40px rgba(255, 102, 0, 0.6); }
  }
  
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes slideInLeft {
    0% { opacity: 0; transform: translateX(-50px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideInRight {
    0% { opacity: 0; transform: translateX(50px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}

// Mock Data
const mockPodcasts = [
  {
    id: 1,
    title: "Veteran Voices",
    hosts: ["Pete Rodriguez"],
    description: "Stories from the frontlines to the home front, featuring conversations with veterans and their families.",
    image: "/20250724_2100_Podcasting at Sunset_remix_01k0zhe2d7eh28w9t3zmcrkk86.png",
    episodes: [
      { id: 87, title: "From Combat to Community", date: "2025-01-22", spotifyId: "4uLU6hMCjMI75M1A2tKUQC" },
      { id: 86, title: "Warriors Haven Farm Story", date: "2025-01-19", spotifyId: "4uLU6hMCjMI75M1A2tKUQC" },
      { id: 85, title: "Mental Health Matters", date: "2025-01-15", spotifyId: "4uLU6hMCjMI75M1A2tKUQC" }
    ]
  },
  {
    id: 2,
    title: "Boca Business Spotlight",
    hosts: ["Local Business Leaders"],
    description: "Highlighting the entrepreneurial spirit and business excellence in Boca Raton and South Florida.",
    image: "/20250724_2141_Podcast Studio Ambiance_simple_compose_01k0zkrpcvekr8j420kvze66kp.png",
    episodes: []
  }
];

const mockTeam = [
  {
    id: 1,
    name: "Pete Rodriguez",
    role: "Founder & CEO",
    bio: "Former Marine turned podcast entrepreneur. Pete brings military discipline and authentic leadership to Podfinity's mission.",
    image: "/20250724_2113_Visionary Leader Portrait_simple_compose_01k0zj6pnhe9qah6aq6a0k9qbd.png",
    military: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Head of Production",
    bio: "Award-winning audio engineer with 10+ years in broadcast media. Sarah ensures every podcast sounds crystal clear.",
    image: "/20250724_2105_Serene Warriors' Retreat_simple_compose_01k0zhpf2venpt8hbvzsgvdrkw.png",
    military: false
  }
];

const mockStudios = [
  {
    id: 1,
    name: "The Rogan Experience",
    capacity: "Up to 4 people",
    description: "Our flagship studio designed for dynamic conversations. Features top-tier microphones and a relaxed atmosphere perfect for long-form discussions.",
    image: "/20250724_2141_Podcast Studio Ambiance_simple_compose_01k0zkrpcvekr8j420kvze66kp.png",
    price: "$150/hour"
  },
  {
    id: 2,
    name: "The Fireside Chat",
    capacity: "1-2 people",
    description: "Intimate setting perfect for deep conversations and interviews. Cozy atmosphere with professional acoustics.",
    image: "/20250724_2136_Cozy Fireside Chat_simple_compose_01k0zkfyzxfp7bq2qavhmca12z.png",
    price: "$100/hour"
  },
  {
    id: 3,
    name: "The Solo Booth",
    capacity: "1 person",
    description: "Compact, professional booth ideal for solo content, voice-overs, and remote guest recordings.",
    image: "/20250724_2144_Homey Podcast Set_simple_compose_01k0zkz86wfa9s6q8s20t2wrpx.png",
    price: "$75/hour"
  }
];

const mockTestimonials = [
  {
    id: 1,
    name: "Mickey Gall",
    role: "UFC Fighter & Host",
    quote: "Podfinity gave me the platform to share my story authentically. The team's military precision meets creative freedom perfectly.",
    image: "https://via.placeholder.com/100x100/003366/ff6600?text=MG"
  },
  {
    id: 2,
    name: "Gerard Michaels",
    role: "Comedian & Host",
    quote: "The studio quality is unmatched, and the team understands what it takes to create compelling content that resonates.",
    image: "https://via.placeholder.com/100x100/003366/ff6600?text=GM"
  }
];



// Utility Functions
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Components
const Header = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const headerStyle = {
    background: 'linear-gradient(135deg, #001122 0%, #003366 50%, #004080 100%)',
    padding: '1.5rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(10px)',
    borderBottom: '2px solid rgba(255, 102, 0, 0.3)',
    transition: 'all 0.3s ease'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const logoImageStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: '#ff6600',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  };

  const navStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    fontWeight: '500'
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const searchInputStyle = {
    padding: '0.5rem',
    borderRadius: '5px',
    border: 'none',
    outline: 'none'
  };

  const bookButtonStyle = {
    backgroundColor: '#ff6600',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/podcasts?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header style={headerStyle}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem'
      }}>
        <div style={{
          ...logoStyle,
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          ':hover': { transform: 'scale(1.05)' }
        }} onClick={() => navigate('/')}>
          <div style={{
            ...logoImageStyle,
            background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
            boxShadow: '0 4px 15px rgba(255, 102, 0, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            fontSize: '1.4rem',
            fontWeight: '900',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>⚡</div>
          <h1 style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '1px'
          }}>PODFINITY</h1>
        </div>
        
        <nav style={{
          ...navStyle,
          gap: '2.5rem'
        }}>
          {[
            { path: '/', label: 'HOME' },
            { path: '/about', label: 'ABOUT' },
            { path: '/studios', label: 'STUDIOS' },
            { path: '/podcasts', label: 'PODCASTS' },
            { path: '/services', label: 'SERVICES' },
            { path: '/team', label: 'TEAM' },
            { path: '/contact', label: 'CONTACT' }
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                ...navLinkStyle,
                fontSize: '0.9rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                position: 'relative',
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ff6600';
                e.target.style.borderBottomColor = '#ff6600';
                e.target.style.textShadow = '0 0 8px rgba(255, 102, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'white';
                e.target.style.borderBottomColor = 'transparent';
                e.target.style.textShadow = 'none';
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
        
        <div style={{
          ...searchContainerStyle,
          gap: '1.5rem'
        }}>
          <form onSubmit={handleSearch} style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search podcasts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                ...searchInputStyle,
                padding: '0.75rem 1rem',
                borderRadius: '25px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                fontSize: '0.9rem',
                width: '200px',
                transition: 'all 0.3s ease',
                '::placeholder': { color: 'rgba(255, 255, 255, 0.7)' }
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff6600';
                e.target.style.boxShadow = '0 0 15px rgba(255, 102, 0, 0.3)';
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            />
          </form>
          <Link
            to="/contact"
            style={{
              ...bookButtonStyle,
              background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
              padding: '0.75rem 2rem',
              borderRadius: '25px',
              fontWeight: '700',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 15px rgba(255, 102, 0, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 102, 0, 0.6)';
              e.target.style.background = 'linear-gradient(135deg, #ff8533 0%, #ffaa66 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 102, 0, 0.4)';
              e.target.style.background = 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)';
            }}
          >
            🎙️ BOOK STUDIO
          </Link>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#003366',
    color: 'white',
    padding: '3rem 2rem 1rem',
    textAlign: 'center'
  };

  const footerContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const footerSectionStyle = {
    textAlign: 'left'
  };

  const footerTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#ff6600'
  };

  const footerLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem',
    transition: 'color 0.3s ease'
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <div style={footerSectionStyle}>
          <h3 style={footerTitleStyle}>Podfinity</h3>
          <p>Boca Raton's Premier Podcast Studio</p>
          <p>Royal Palm Place, Boca Raton, FL</p>
        </div>
        
        <div style={footerSectionStyle}>
          <h3 style={footerTitleStyle}>Quick Links</h3>
          <Link to="/about" style={footerLinkStyle}>About Us</Link>
          <Link to="/studios" style={footerLinkStyle}>Studios</Link>
          <Link to="/services" style={footerLinkStyle}>Services</Link>
          <Link to="/contact" style={footerLinkStyle}>Contact</Link>
        </div>
        
        <div style={footerSectionStyle}>
          <h3 style={footerTitleStyle}>Warriors Haven Farm</h3>
          <Link to="/non-profit" style={footerLinkStyle}>Our Mission</Link>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            Supporting veteran mental health through 10% of our profits
          </p>
        </div>
      </div>
      
      <div style={{ borderTop: '1px solid #444', paddingTop: '1rem', marginTop: '2rem' }}>
        <p>&copy; 2025 Podfinity. All rights reserved.</p>
      </div>
    </footer>
  );
};

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = mockTestimonials[currentIndex];

  const carouselStyle = {
    backgroundColor: '#f8f9fa',
    padding: '3rem 2rem',
    textAlign: 'center',
    borderRadius: '10px',
    margin: '2rem 0'
  };

  const testimonialContentStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    transition: 'opacity 0.5s ease'
  };

  return (
    <div style={carouselStyle}>
      <div style={testimonialContentStyle}>
        <img 
          src={currentTestimonial.image} 
          alt={currentTestimonial.name}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            marginBottom: '1rem',
            objectFit: 'cover'
          }}
        />
        <blockquote style={{
          fontSize: '1.2rem',
          fontStyle: 'italic',
          marginBottom: '1rem',
          color: '#333'
        }}>
          "{currentTestimonial.quote}"
        </blockquote>
        <cite style={{
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#003366'
        }}>
          {currentTestimonial.name}, {currentTestimonial.role}
        </cite>
      </div>
    </div>
  );
};

// Page Components
const HomePage = () => {
  useEffect(() => {
    document.title = 'Podfinity - Your Voice, Amplified | Boca Raton Podcast Studio';
  }, []);

  const heroStyle = {
    position: 'relative',
    height: '100vh',
    background: 'linear-gradient(135deg, #000000 0%, #001122 25%, #003366 50%, #004080 75%, #0066cc 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 8s ease infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden'
  };

  const heroContentStyle = {
    maxWidth: '1000px',
    padding: '3rem',
    position: 'relative',
    zIndex: 2
  };

  const heroTitleStyle = {
    fontSize: '4.5rem',
    fontWeight: '900',
    marginBottom: '1.5rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #ff6600 50%, #ffffff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 8px rgba(0,0,0,0.5)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    animation: 'titleGlow 3s ease-in-out infinite alternate'
  };

  const heroSubtitleStyle = {
    fontSize: '1.8rem',
    marginBottom: '3rem',
    fontWeight: '300',
    letterSpacing: '1px',
    textShadow: '0 2px 4px rgba(0,0,0,0.7)',
    animation: 'fadeInUp 1s ease-out 0.5s both'
  };

  const statsBarStyle = {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    padding: '4rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const statItemStyle = {
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 102, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    animation: 'fadeInUp 0.8s ease-out'
  };

  const statNumberStyle = {
    fontSize: '3.5rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #ff6600 0%, #ffaa66 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    animation: 'pulse 2s ease-in-out infinite'
  };

  const statLabelStyle = {
    fontSize: '1rem',
    color: '#666'
  };

  const sectionStyle = {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
    color: 'white',
    padding: '1.2rem 3rem',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    marginTop: '2rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 8px 25px rgba(255, 102, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    animation: 'float 3s ease-in-out infinite'
  };

  return (
    <div>
      <section style={heroStyle}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 102, 0, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 102, 0, 0.05)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite'
        }}></div>
        
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>YOUR VOICE, AMPLIFIED</h1>
          <p style={heroSubtitleStyle}>
            🎖️ BOCA RATON'S PREMIER PODCAST STUDIO 🎖️<br/>
            <strong>Military Precision. Veteran Excellence. Uncompromising Quality.</strong><br/>
            We Handle the Tech, You Share Your Story.
          </p>
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

      <section style={statsBarStyle}>
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
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 102, 0, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(255, 102, 0, 0.6)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(255, 102, 0, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
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
        <div style={statItemStyle}>
          <div style={statNumberStyle}>Community</div>
          <div style={statLabelStyle}>Focused</div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Welcome to Podfinity</h2>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>
          Located in the heart of Boca Raton at Royal Palm Place, Podfinity is where military discipline meets creative authenticity. 
          Our vibrant South Florida setting, with its beautiful beaches and rich military heritage, provides the perfect backdrop 
          for authentic conversations that resonate globally.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#003366', marginBottom: '1rem' }}>Authenticity</h3>
            <p>Real conversations, real stories. We believe in the power of genuine human connection.</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#003366', marginBottom: '1rem' }}>Discipline</h3>
            <p>Military-grade precision in production quality and professional service delivery.</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#003366', marginBottom: '1rem' }}>Impact</h3>
            <p>Every show matters. 10% of profits support veteran mental health through Warriors Haven Farm.</p>
          </div>
        </div>
      </section>

      <TestimonialCarousel />
    </div>
  );
};

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Podfinity - Our Story & Mission | Boca Raton';
  }, []);

  const sectionStyle = {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: '3rem'
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <section style={sectionStyle}>
        <h1 style={sectionTitleStyle}>About Podfinity</h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <div>
            <h2 style={{ color: '#003366', marginBottom: '1rem' }}>Our Story</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Launched in 2024 in the heart of Boca Raton at Royal Palm Place, Podfinity was born from a vision 
              to create an authentic platform for diverse voices. Founded by Pete Rodriguez, a former Marine 
              turned marketing entrepreneur, our studio combines military discipline with creative freedom.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Pete's journey from the Marines to the marketing world taught him the power of authentic storytelling 
              and the importance of giving back to the veteran community. This experience shaped Podfinity's mission 
              to not just produce great content, but to make a meaningful impact.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
              Today, we're home to shows like "Veteran Voices" featuring authentic military stories and "Boca Business Spotlight" showcasing local entrepreneurship, 
              and we're rapidly expanding our roster with diverse, authentic voices from across South Florida and beyond.
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <img 
              src="https://via.placeholder.com/400x600/003366/ff6600?text=Pete+Rodriguez+Portrait"
              alt="Pete Rodriguez, Founder of Podfinity"
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            />
            <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#666' }}>
              Pete Rodriguez, Founder & CEO
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#003366', marginBottom: '1rem' }}>Our Mission</h2>
          <blockquote style={{
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: '#003366',
            borderLeft: '4px solid #ff6600',
            paddingLeft: '2rem',
            margin: '2rem 0'
          }}>
            "Podfinity is the Podcast Network of the people! Featuring an ever-expanding roster of dynamic and 
            diverse opinions, Podfinity endeavors to usher in an 'Age of Authenticity' to the global conversation."
          </blockquote>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#003366', marginBottom: '1rem' }}>Our Location</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Located at Royal Palm Place in Boca Raton, Florida, our studio sits in the heart of one of South Florida's 
            most vibrant communities. The energy of Boca's beaches, combined with the area's rich military heritage, 
            creates the perfect environment for authentic conversations and creative collaboration.
          </p>
          
          <div style={{
            width: '100%',
            height: '400px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.8!2d-80.0831!3d26.3598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDIxJzM1LjMiTiA4MMKwMDQnNTkuMiJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Podfinity Location - Royal Palm Place, Boca Raton"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = () => {
  useEffect(() => {
    document.title = 'Services - Full-Service Podcast Production | Podfinity';
  }, []);

  const services = [
    {
      id: 1,
      name: 'Podcast Recording',
      icon: '🎙️',
      description: 'State-of-the-art recording studios with professional-grade equipment and acoustic treatment.',
      features: ['Professional microphones', 'Acoustic treatment', 'Multi-track recording', 'Live monitoring'],
      pricing: 'Starting at $75/hour'
    },
    {
      id: 2,
      name: 'Audio Engineering',
      icon: '🔊',
      description: 'Crystal-clear audio production with noise reduction, EQ, and mastering for broadcast quality.',
      features: ['Noise reduction', 'Audio enhancement', 'Mastering', 'Format optimization'],
      pricing: 'Starting at $50/hour'
    },
    {
      id: 3,
      name: 'Video Production',
      icon: '📹',
      description: '4K video recording with multiple camera angles and professional lighting for visual podcasts.',
      features: ['4K recording', 'Multiple angles', 'Professional lighting', 'Color correction'],
      pricing: 'Starting at $150/hour'
    },
    {
      id: 4,
      name: 'Post-Production',
      icon: '✂️',
      description: 'Complete editing services including cuts, transitions, intro/outro, and final delivery.',
      features: ['Professional editing', 'Intro/outro creation', 'Show notes', 'Multiple formats'],
      pricing: 'Starting at $100/episode'
    },
    {
      id: 5,
      name: 'Distribution',
      icon: '📡',
      description: 'Get your podcast on all major platforms including Apple Podcasts, Spotify, and YouTube.',
      features: ['Platform submission', 'RSS feed management', 'Analytics tracking', 'Optimization'],
      pricing: 'Starting at $25/month'
    },
    {
      id: 6,
      name: 'Consulting',
      icon: '💡',
      description: 'Strategic guidance on content, marketing, audience growth, and monetization strategies.',
      features: ['Content strategy', 'Marketing guidance', 'Audience growth', 'Monetization advice'],
      pricing: 'Starting at $125/hour'
    }
  ];

  const sectionStyle = {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: '3rem'
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <section style={sectionStyle}>
        <h1 style={sectionTitleStyle}>Our Services</h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '3rem', color: '#666' }}>
          Full-service podcast production from concept to distribution. We handle the tech, you share your story.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {services.map((service) => (
            <div
              key={service.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                {service.icon}
              </div>
              <h3 style={{ color: '#003366', marginBottom: '1rem', fontSize: '1.5rem' }}>
                {service.name}
              </h3>
              <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1rem' }}>
                {service.description}
              </p>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ color: '#ff6600', marginBottom: '0.5rem', fontSize: '1rem' }}>Features:</h4>
                <ul style={{ color: '#666', textAlign: 'left', paddingLeft: '1.5rem' }}>
                  {service.features.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '0.25rem' }}>{feature}</li>
                  ))}
                </ul>
              </div>
              <p style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '1.1rem' }}>
                {service.pricing}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: '#003366',
          color: 'white',
          padding: '3rem',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#ff6600', marginBottom: '1rem' }}>Ready to Start Your Podcast?</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
            Contact us today for a free consultation and let's bring your vision to life.
          </p>
          <Link
            to="/contact"
            style={{
              backgroundColor: '#ff6600',
              color: 'white',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background-color 0.3s ease'
            }}
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

const TeamPage = () => {
  useEffect(() => {
    document.title = 'Team - Meet the Podfinity Crew | Boca Raton';
  }, []);

  const sectionStyle = {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: '3rem'
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <section style={sectionStyle}>
        <h1 style={sectionTitleStyle}>Meet Our Team</h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '3rem', color: '#666' }}>
          The passionate professionals behind Podfinity's mission to amplify authentic voices.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {mockTeam.map((member) => (
            <div
              key={member.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: '200px',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
              />
              <h3 style={{ color: '#003366', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                {member.name}
                {member.military && (
                  <span style={{ color: '#ff6600', fontSize: '1rem', marginLeft: '0.5rem' }}>🇺🇸</span>
                )}
              </h3>
              <p style={{ color: '#ff6600', fontWeight: 'bold', marginBottom: '1rem' }}>
                {member.role}
              </p>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '3rem',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#003366', marginBottom: '1rem' }}>Join Our Team</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            We're always looking for talented individuals who share our passion for authentic storytelling and veteran advocacy.
          </p>
          <Link
            to="/careers"
            style={{
              backgroundColor: '#ff6600',
              color: 'white',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background-color 0.3s ease'
            }}
          >
            View Open Positions
          </Link>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Contact - Get in Touch | Podfinity Boca Raton';
  }, []);

  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const sectionStyle = {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!contactForm.name.trim()) errors.name = 'Name is required';
    if (!validateEmail(contactForm.email)) errors.email = 'Valid email is required';
    if (!contactForm.subject.trim()) errors.subject = 'Subject is required';
    if (!contactForm.message.trim()) errors.message = 'Message is required';
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      alert('Message sent! We\'ll get back to you within 24 hours.');
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <section style={sectionStyle}>
        <h1 style={sectionTitleStyle}>Contact Us</h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '3rem', color: '#666' }}>
          Ready to amplify your voice? Let's start the conversation.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div>
            <h2 style={{ color: '#003366', marginBottom: '2rem' }}>Get in Touch</h2>
            <form onSubmit={handleContactSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div>
                <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Name *</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: formErrors.name ? '2px solid #dc3545' : '2px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                {formErrors.name && <span style={{ color: '#dc3545', fontSize: '0.9rem' }}>{formErrors.name}</span>}
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Email *</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: formErrors.email ? '2px solid #dc3545' : '2px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                {formErrors.email && <span style={{ color: '#dc3545', fontSize: '0.9rem' }}>{formErrors.email}</span>}
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Phone</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Subject *</label>
                <select
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: formErrors.subject ? '2px solid #dc3545' : '2px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="studio-booking">Studio Booking</option>
                  <option value="podcast-submission">Podcast Submission</option>
                  <option value="services-inquiry">Services Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="media-inquiry">Media Inquiry</option>
                  <option value="other">Other</option>
                </select>
                {formErrors.subject && <span style={{ color: '#dc3545', fontSize: '0.9rem' }}>{formErrors.subject}</span>}
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Message *</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: formErrors.message ? '2px solid #dc3545' : '2px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Tell us about your project, questions, or how we can help..."
                />
                {formErrors.message && <span style={{ color: '#dc3545', fontSize: '0.9rem' }}>{formErrors.message}</span>}
              </div>
              
              <button
                type="submit"
                style={{
                  backgroundColor: '#ff6600',
                  color: 'white',
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div>
            <h2 style={{ color: '#003366', marginBottom: '2rem' }}>Visit Our Studio</h2>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#ff6600', marginBottom: '1rem' }}>Location</h3>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>Royal Palm Place</p>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>Boca Raton, FL 33432</p>
              <p style={{ color: '#666', marginBottom: '2rem' }}>United States</p>
              
              <h3 style={{ color: '#ff6600', marginBottom: '1rem' }}>Contact Info</h3>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>📧 hello@podfinity.com</p>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>📞 (561) 555-PODS</p>
              <p style={{ color: '#666', marginBottom: '2rem' }}>🌐 www.podfinity.com</p>
              
              <h3 style={{ color: '#ff6600', marginBottom: '1rem' }}>Hours</h3>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>Saturday: 10:00 AM - 6:00 PM</p>
              <p style={{ color: '#666', marginBottom: '2rem' }}>Sunday: By appointment</p>
            </div>
            
            <div style={{
              width: '100%',
              height: '300px',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.8!2d-80.0831!3d26.3598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDIxJzM1LjMiTiA4MMKwMDQnNTkuMiJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Podfinity Location - Royal Palm Place, Boca Raton"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PodcastsPage = () => {
  useEffect(() => {
    document.title = 'Podcasts - Featured Shows | Podfinity';
  }, []);

  const [searchFilter, setSearchFilter] = useState('');
  const [submissionForm, setSubmissionForm] = useState({
    showName: '', hostName: '', email: '', description: '', frequency: ''
  });

  const sectionStyle = {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const filteredPodcasts = mockPodcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    podcast.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSubmissionSubmit = (e) => {
    e.preventDefault();
    alert('Show submission received! We\'ll review your proposal and get back to you within 5 business days.');
    setSubmissionForm({ showName: '', hostName: '', email: '', description: '', frequency: '' });
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <section style={sectionStyle}>
        <h1 style={sectionTitleStyle}>Our Podcasts</h1>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              border: '2px solid #ddd',
              borderRadius: '25px',
              outline: 'none',
              width: '300px',
              maxWidth: '100%'
            }}
          />
        </div>

        {/* Featured Show: Veteran Voices */}
        <div style={{
          backgroundColor: '#003366',
          color: 'white',
          padding: '3rem',
          borderRadius: '15px',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <img
              src={mockPodcasts[0].image}
              alt="Veteran Voices Podcast"
              style={{
                width: '100%',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
            />
            <div>
              <h2 style={{ color: '#ff6600', marginBottom: '1rem', fontSize: '2rem' }}>Featured Show</h2>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Veteran Voices</h3>
              <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                {mockPodcasts[0].description}
              </p>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ color: '#ff6600', marginBottom: '0.5rem' }}>Host:</h4>
                <p><strong>Pete Rodriguez</strong> - Former Marine and Podfinity founder, sharing authentic military stories and veteran experiences</p>
              </div>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>New episodes every Wednesday and Sunday</p>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: '#ff6600', marginBottom: '1rem' }}>Recent Episodes:</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {mockPodcasts[0].episodes.map((episode) => (
                <div
                  key={episode.id}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '1rem',
                    borderRadius: '8px'
                  }}
                >
                  <h5 style={{ marginBottom: '0.5rem' }}>Episode {episode.id}: {episode.title}</h5>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                    {formatDate(episode.date)}
                  </p>
                  <div style={{
                    backgroundColor: '#1db954',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}>
                    🎵 Listen on Spotify
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Podcasts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {filteredPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }}
            >
              <img
                src={podcast.image}
                alt={podcast.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ color: '#003366', marginBottom: '0.5rem' }}>{podcast.title}</h3>
              <p style={{ color: '#ff6600', fontWeight: 'bold', marginBottom: '1rem' }}>
                Hosted by {podcast.hosts.join(', ')}
              </p>
              <p style={{ color: '#666', lineHeight: 1.6 }}>{podcast.description}</p>
            </div>
          ))}
        </div>

        {/* Submit Your Show */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '3rem',
          borderRadius: '10px'
        }}>
          <h2 style={{ color: '#003366', textAlign: 'center', marginBottom: '2rem' }}>Submit Your Show</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
            Have a podcast idea? We're always looking for authentic voices to join the Podfinity family.
          </p>
          
          <form onSubmit={handleSubmissionSubmit} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Show Name</label>
              <input
                type="text"
                value={submissionForm.showName}
                onChange={(e) => setSubmissionForm({...submissionForm, showName: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Host Name</label>
              <input
                type="text"
                value={submissionForm.hostName}
                onChange={(e) => setSubmissionForm({...submissionForm, hostName: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input
                type="email"
                value={submissionForm.email}
                onChange={(e) => setSubmissionForm({...submissionForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Frequency</label>
              <select
                value={submissionForm.frequency}
                onChange={(e) => setSubmissionForm({...submissionForm, frequency: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                required
              >
                <option value="">Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                <option value="seasonal">Seasonal</option>
              </select>
            </div>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Show Description</label>
              <textarea
                value={submissionForm.description}
                onChange={(e) => setSubmissionForm({...submissionForm, description: e.target.value})}
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
                placeholder="Describe your show concept, target audience, and what makes it unique..."
                required
              />
            </div>
            
            <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#ff6600',
                  color: 'white',
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Submit Show Proposal
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

const StudiosPage = () => {
  useEffect(() => {
    document.title = 'Studios - Professional Podcast Recording | Podfinity';
  }, []);

  const [selectedStudio, setSelectedStudio] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phone: '', date: '', studio: '', duration: '1', message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const sectionStyle = {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!bookingForm.name.trim()) errors.name = 'Name is required';
    if (!validateEmail(bookingForm.email)) errors.email = 'Valid email is required';
    if (!bookingForm.phone.trim()) errors.phone = 'Phone is required';
    if (!bookingForm.date) errors.date = 'Date is required';
    if (!bookingForm.studio) errors.studio = 'Studio selection is required';
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      alert('Booking request submitted! We\'ll contact you within 24 hours.');
      setBookingForm({ name: '', email: '', phone: '', date: '', studio: '', duration: '1', message: '' });
    }
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <section style={sectionStyle}>
        <h1 style={sectionTitleStyle}>Our Studios</h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '3rem', color: '#666' }}>
          State-of-the-art recording facilities designed for every type of podcast production.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {mockStudios.map((studio) => (
            <div
              key={studio.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '2rem',
                boxShadow: selectedStudio === studio.id ? '0 8px 25px rgba(255,102,0,0.3)' : '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: selectedStudio === studio.id ? '2px solid #ff6600' : '2px solid transparent'
              }}
              onClick={() => setSelectedStudio(selectedStudio === studio.id ? null : studio.id)}
            >
              <img
                src={studio.image}
                alt={studio.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ color: '#003366', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                {studio.name}
              </h3>
              <p style={{ color: '#ff6600', fontWeight: 'bold', marginBottom: '1rem' }}>
                {studio.capacity} • {studio.price}
              </p>
              <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1rem' }}>
                {studio.description}
              </p>
              {selectedStudio === studio.id && (
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                  <h4 style={{ color: '#003366', marginBottom: '0.5rem' }}>Features:</h4>
                  <ul style={{ color: '#666', paddingLeft: '1.5rem' }}>
                    <li>Professional-grade microphones</li>
                    <li>Acoustic treatment and soundproofing</li>
                    <li>High-quality audio interfaces</li>
                    <li>Video recording capabilities</li>
                    <li>Comfortable seating and atmosphere</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '3rem',
          borderRadius: '10px',
          marginTop: '3rem'
        }}>
          <h2 style={{ color: '#003366', textAlign: 'center', marginBottom: '2rem' }}>Book Your Session</h2>
          <form onSubmit={handleBookingSubmit} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Name *</label>
              <input
                type="text"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: formErrors.name ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              {formErrors.name && <span style={{ color: '#dc3545', fontSize: '0.9rem' }}>{formErrors.name}</span>}
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Email *</label>
              <input
                type="email"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: formErrors.email ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              {formErrors.email && <span style={{ color: '#dc3545', fontSize: '0.9rem' }}>{formErrors.email}</span>}
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Phone *</label>
              <input
                type="tel"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: formErrors.phone ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              {formErrors.phone && <span style={{ color: '#dc3545', fontSize: '0.9rem' }}>{formErrors.phone}</span>}
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Preferred Date *</label>
              <input
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: formErrors.date ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              {formErrors.date && <span style={{ color: '#dc3545', fontSize: '0.9rem' }}>{formErrors.date}</span>}
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Studio *</label>
              <select
                value={bookingForm.studio}
                onChange={(e) => setBookingForm({...bookingForm, studio: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: formErrors.studio ? '2px solid #dc3545' : '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              >
                <option value="">Select a studio</option>
                {mockStudios.map((studio) => (
                  <option key={studio.id} value={studio.name}>
                    {studio.name} - {studio.price}
                  </option>
                ))}
              </select>
              {formErrors.studio && <span style={{ color: '#dc3545', fontSize: '0.9rem' }}>{formErrors.studio}</span>}
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Duration (hours)</label>
              <select
                value={bookingForm.duration}
                onChange={(e) => setBookingForm({...bookingForm, duration: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              >
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
                <option value="8">Full day (8 hours)</option>
              </select>
            </div>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontWeight: 'bold', color: '#003366', display: 'block', marginBottom: '0.5rem' }}>Additional Message</label>
              <textarea
                value={bookingForm.message}
                onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
                placeholder="Tell us about your podcast, special requirements, or any questions..."
              />
            </div>
            
            <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#ff6600',
                  color: 'white',
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

// Main App Component
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Apply global styles
    document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.lineHeight = '1.6';
    document.body.style.color = '#333';
    document.body.style.backgroundColor = '#ffffff';
  }, []);

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/studios" element={<StudiosPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;

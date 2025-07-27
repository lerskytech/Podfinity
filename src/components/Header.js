import React, { useState } from 'react';
import MobileMenu from './MobileMenu'; // Import the new component

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavLinkClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="header">
            <div className="logo-container">
                <a href="#home" className="logo-link" onClick={handleNavLinkClick}>
                    <img src="/PodfinityFav.png" alt="Podfinity Logo" className='logo' />
                </a>
                <a href="#home" className="nav-link title" onClick={handleNavLinkClick}>PODFINITY</a>
            </div>
            <nav className="desktop-nav">
                <a href="#home" className="nav-link" onClick={handleNavLinkClick}>HOME</a>
                <a href="#about" className="nav-link" onClick={handleNavLinkClick}>ABOUT</a>
                <a href="#studios" className="nav-link" onClick={handleNavLinkClick}>STUDIOS</a>
                <a href="#podcasts" className="nav-link" onClick={handleNavLinkClick}>PODCASTS</a>
                <a href="#services" className="nav-link" onClick={handleNavLinkClick}>SERVICES</a>
                <a href="#team" className="nav-link" onClick={handleNavLinkClick}>TEAM</a>
                <a href="#contact" className="nav-link" onClick={handleNavLinkClick}>CONTACT</a>
            </nav>
            <div className="mobile-menu-container">
                <button className="mobile-menu-icon" onClick={() => setIsMenuOpen(true)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
            </div>

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <style jsx>{`
                .header { position: fixed; top: 0; left: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 2rem; background: rgba(10, 10, 10, 0.7); backdrop-filter: blur(12px); z-index: 1000; border-bottom: 1px solid var(--glass-border); }
                .logo-container { display: flex; align-items: center; gap: 1rem; }
                .logo {
                    height: 60px;
                    transition: transform 0.3s ease;
                }
                .logo:hover {
                    transform: scale(1.1);
                }
                .nav-link { text-decoration: none; color: var(--text-color); font-family: var(--font-display); font-weight: 700; transition: color 0.3s, text-shadow 0.3s; }
                .nav-link.title { font-size: 1.8rem; }
                .nav-link:hover { color: var(--accent-color); text-shadow: 0 0 10px var(--accent-color); }
                .desktop-nav { display: flex; gap: 1.5rem; }
                .mobile-menu-container { display: none; }

                @media (max-width: 1024px) { /* Adjusted breakpoint for tablets */
                    .desktop-nav { display: none; }
                    .mobile-menu-container { display: block; }
                    .mobile-menu-icon {
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        width: 30px;
                        height: 22px;
                    }
                    .bar {
                        width: 100%;
                        height: 3px;
                        background-color: var(--text-color);
                        border-radius: 2px;
                        transition: all 0.3s ease-in-out;
                    }
                }
            `}</style>
        </header>
    );
};

export default Header;

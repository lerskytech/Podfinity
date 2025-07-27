import React, { useState } from 'react';
import MobileMenu from './MobileMenu';

const Header = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    

    const handleNavLinkClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    const handleIconClick = (e) => {
        setIsFlipped(prev => !prev);
    };

    return (
        <header className="header">
            <div className="logo-container">
                <a href="#home" className="logo-link" onClick={handleNavLinkClick}>
                    <img src="/PodfinityFav.png" alt="Podfinity Logo" className={`logo ${isFlipped ? 'flipped' : ''}`} onClick={handleIconClick} />
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
                <button className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                </button>
                <MobileMenu isOpen={isMenuOpen} onLinkClick={handleNavLinkClick} />
            </div>
            <style jsx>{`
                .header { position: fixed; top: 0; left: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 2rem; background: rgba(10, 10, 10, 0.7); backdrop-filter: blur(12px); z-index: 1000; border-bottom: 1px solid var(--glass-border); }
                .logo-container { display: flex; align-items: center; gap: 1rem; }
                .logo {
                    height: 60px;
                    cursor: pointer;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .logo:hover {
                    transform: scale(1.15);
                }
                .nav-link { text-decoration: none; color: var(--text-color); font-family: var(--font-display); font-weight: 700; transition: color 0.3s, text-shadow 0.3s; }
                .nav-link.title { font-size: 1.8rem; }
                .nav-link:hover { color: var(--accent-color); text-shadow: 0 0 10px var(--accent-color); }
                h1 { font-size: 1.8rem; margin: 0; }
                .desktop-nav { display: flex; gap: 1.5rem; }
                .mobile-menu-container { display: none; }

                @media (max-width: 768px) {
                    .desktop-nav { display: none; }
                    .mobile-menu-container { display: block; }
                    .mobile-menu-icon { background: none; border: none; z-index: 1002; position: relative; width: 30px; height: 22px; cursor: pointer; }
                    .bar { width: 100%; height: 3px; background-color: var(--text-color); border-radius: 2px; transition: all 0.3s ease-in-out; position: absolute; left: 0; }
                    .bar:nth-child(1) { top: 0; }
                    .bar:nth-child(2) { top: 50%; transform: translateY(-50%); }
                    .bar:nth-child(3) { bottom: 0; }
                    .bar.open:nth-child(1) { top: 50%; transform: translateY(-50%) rotate(45deg); }
                    .bar.open:nth-child(2) { opacity: 0; }
                    .bar.open:nth-child(3) { top: 50%; transform: translateY(-50%) rotate(-45deg); }
                    
                }
            `}</style>
        </header>
    );
};

export default Header;

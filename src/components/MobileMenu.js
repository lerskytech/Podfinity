import React from 'react';

const MobileMenu = ({ isOpen, onLinkClick, onClose }) => {
    const navLinks = ['HOME', 'ABOUT', 'STUDIOS', 'PODCASTS', 'SERVICES', 'TEAM', 'CONTACT'];

    return (
        <>
            <div className={`mobile-nav-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <nav className={`mobile-nav-links ${isOpen ? 'open' : ''}`} style={{ background: '#0a0a0a' }}>
                {navLinks.map((link, index) => (
                    <a 
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        onClick={onLinkClick}
                        style={{ borderBottom: index === navLinks.length - 1 ? 'none' : '1px solid var(--glass-border)' }}
                    >
                        {link}
                    </a>
                ))}
            </nav>
            <style jsx>{`
                .mobile-nav-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.4s ease, visibility 0.4s ease;
                    z-index: 998;
                }
                .mobile-nav-overlay.open {
                    opacity: 1;
                    visibility: visible;
                }
                .mobile-nav-links {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 280px;
                    height: 100%;
                    
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    gap: 0;
                    padding: 2rem;
                    z-index: 999;
                    transform: translateX(100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out, visibility 0.4s;
                }
                .mobile-nav-links.open {
                    transform: translateX(0);
                    opacity: 1;
                    visibility: visible;
                }
                .mobile-nav-links a {
                    font-size: 1.3rem;
                    color: var(--text-color);
                    text-decoration: none;
                    font-family: var(--font-display);
                    font-weight: 700;
                    padding: 1rem 1.5rem;
                    width: 100%;
                    text-align: left;
                    transition: background-color 0.3s, color 0.3s;
                }
                .mobile-nav-links a:hover, .mobile-nav-links a:active {
                    background-color: rgba(147, 199, 217, 0.1);
                    color: var(--accent-color);
                }
            `}</style>
        </>
    );
};

export default MobileMenu;

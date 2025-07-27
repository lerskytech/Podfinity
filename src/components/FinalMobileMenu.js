import React from 'react';

const FinalMobileMenu = ({ isOpen, onLinkClick, onClose }) => {
    const navLinks = ['HOME', 'ABOUT', 'STUDIOS', 'PODCASTS', 'SERVICES', 'TEAM', 'CONTACT'];

    if (!isOpen) return null;

    // Aggressive inline styles to guarantee solid background and override any conflicting stylesheets.
    const menuStyle = {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '280px',
        height: '100%',
        background: '#0a0a0a', /* Solid black background */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        zIndex: 1001,
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
    };

    return (
        <>
            <div style={overlayStyle} onClick={onClose}></div>
            <nav style={menuStyle}>
                {navLinks.map((link) => (
                    <a 
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        onClick={onLinkClick}
                        className="final-menu-link" // New class name to bust cache
                    >
                        {link}
                    </a>
                ))}
            </nav>
            <style jsx>{`
                .final-menu-link {
                    color: #f0f0f0;
                    text-decoration: none;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.2rem;
                    font-weight: 700;
                    padding: 1rem;
                    width: 100%;
                    text-align: center;
                    border-bottom: 1px solid #2a2a2a;
                    transition: background-color 0.2s;
                }
                .final-menu-link:last-child {
                    border-bottom: none;
                }
                .final-menu-link:hover {
                    background-color: #1a1a1a;
                }
            `}</style>
        </>
    );
};

export default FinalMobileMenu;

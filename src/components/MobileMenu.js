import React from 'react';

const MobileMenu = ({ isOpen, onLinkClick, onClose }) => {
    const navLinks = ['HOME', 'ABOUT', 'STUDIOS', 'PODCASTS', 'SERVICES', 'TEAM', 'CONTACT'];

    if (!isOpen) return null;

    // Using direct, aggressive inline styles to guarantee a solid, non-transparent background.
    const menuStyle = {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '280px',
        height: '100%',
        background: '#0a0a0a', // Solid, non-transparent background.
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        zIndex: 1001,
        borderLeft: '1px solid #2a2a2a'
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
                        className="mobile-menu-link"
                    >
                        {link}
                    </a>
                ))}
            </nav>
            {/* Using a new, unique class name to avoid any potential style cache conflicts */}
            <style jsx>{`
                .mobile-menu-link {
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
                .mobile-menu-link:last-child {
                    border-bottom: none;
                }
                .mobile-menu-link:hover {
                    background-color: #1a1a1a;
                }
            `}</style>
        </>
    );
};

export default MobileMenu;

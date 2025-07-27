import React from 'react';

const NewMobileMenu = ({ isOpen, onLinkClick, onClose }) => {
    const navLinks = ['HOME', 'ABOUT', 'STUDIOS', 'PODCASTS', 'SERVICES', 'TEAM', 'CONTACT'];

    if (!isOpen) return null;

    return (
        <>
            <div className="new-menu-overlay" onClick={onClose}></div>
            <nav className="new-menu-container">
                {navLinks.map((link) => (
                    <a 
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        onClick={onLinkClick}
                        className="new-menu-link"
                    >
                        {link}
                    </a>
                ))}
            </nav>
            <style jsx>{`
                .new-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 1000;
                }
                .new-menu-container {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 280px;
                    height: 100%;
                    background: #0a0a0a; /* Solid background from the start */
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 2rem;
                    z-index: 1001;
                    transform: ${isOpen ? 'translateX(0)' : 'translateX(100%)'};
                    transition: transform 0.3s ease-in-out;
                }
                .new-menu-link {
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
                .new-menu-link:last-child {
                    border-bottom: none;
                }
                .new-menu-link:hover {
                    background-color: #1a1a1a;
                }
            `}</style>
        </>
    );
};

export default NewMobileMenu;

import React from 'react';

const MobileMenu = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const navLinks = ['Home', 'About', 'Studios', 'Podcasts', 'Services', 'Team', 'Contact'];

    const styles = `
        .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(10, 25, 47, 0.98);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: opacity 0.3s ease-in-out;
            opacity: ${isOpen ? '1' : '0'};
            backdrop-filter: blur(10px);
        }
        .close-button {
            position: absolute;
            top: 2rem;
            right: 2rem;
            background: none;
            border: none;
            color: #fff;
            font-size: 2.5rem;
            cursor: pointer;
        }
        .mobile-nav-links {
            list-style: none;
            padding: 0;
            margin: 0;
            text-align: center;
        }
        .mobile-nav-links li {
            margin: 2rem 0;
        }
        .mobile-nav-links a {
            color: #fff;
            font-family: var(--font-display);
            font-size: 2rem;
            font-weight: 700;
            text-decoration: none;
            text-transform: uppercase;
            transition: color 0.3s ease;
        }
        .mobile-nav-links a:hover {
            color: var(--accent-color);
        }
    `;

    return (
        <div className="mobile-menu-overlay">
            <style>{styles}</style>
            <button className="close-button" onClick={onClose}>&times;</button>
            <ul className="mobile-nav-links">
                {navLinks.map(link => (
                    <li key={link}>
                        <a href={`#${link.toLowerCase()}`} onClick={onClose}>{link}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MobileMenu;

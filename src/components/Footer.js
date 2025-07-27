import React from 'react';

const Footer = () => (
    <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Podfinity. All Rights Reserved.</p>
        <style jsx>{`
            .footer { text-align: center; padding: 2rem; background: var(--primary-color); border-top: 1px solid var(--glass-border); color: var(--text-color-secondary); }
        `}</style>
    </footer>
);

export default Footer;

import React from 'react';
import AnimatedSection from './AnimatedSection';

const ContactSection = () => (
    <AnimatedSection id="contact" className="contact-section">
        <h2 className="section-title">Connect With Us</h2>
        <div className="contact-container">
            <div className="contact-info">
                <h3>Start Your Podcast Journey</h3>
                <p>Ready to share your story? Have a question? Reach out and a member of our team will get back to you within 24 hours.</p>
                <p><strong>Email:</strong> contact@podfinity.com</p>
                <p><strong>Phone:</strong> (561) 555-0123</p>
                <p><strong>Location:</strong> Boca Raton, FL</p>
            </div>
            <form className="contact-form">
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" rows="6" required></textarea>
                <button type="submit" className="submit-btn">Send Message</button>
            </form>
        </div>
        <style jsx>{`
            .contact-container { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; max-width: 1000px; margin: 0 auto; background: var(--glass-bg); padding: 3rem; border-radius: 15px; border: 1px solid var(--glass-border); }
            .contact-info h3 { font-size: 2rem; margin-bottom: 1rem; color: var(--accent-color); }
            .contact-info p { margin-bottom: 1rem; line-height: 1.7; color: var(--text-color-secondary); }
            .contact-form { display: flex; flex-direction: column; }
            .contact-form input, .contact-form textarea { background: var(--primary-color); border: 1px solid var(--glass-border); color: var(--text-color); padding: 1rem; margin-bottom: 1rem; border-radius: 5px; font-family: inherit; }
            .contact-form textarea { resize: vertical; min-height: 120px; max-height: 300px; }
            .submit-btn { background: var(--accent-color); color: var(--primary-color); border: none; padding: 1rem; border-radius: 5px; font-weight: 700; cursor: pointer; transition: all 0.3s; }
            .submit-btn:hover { transform: scale(1.05); box-shadow: 0 0 15px var(--accent-color); }
            @media (max-width: 768px) { .contact-container { grid-template-columns: 1fr; } }
        `}</style>
    </AnimatedSection>
);

export default ContactSection;

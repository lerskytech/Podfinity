import React from 'react';
import AnimatedSection from './AnimatedSection';

const AboutSection = () => (
    <AnimatedSection id="about" className="about-section">
        <div className="about-container">
            <div className="about-text">
                <h3>Our Mission</h3>
                <h2>More Than a Studio. It's a Statement.</h2>
                <p>Podfinity was born from a simple idea: to give a powerful voice to those who serve and shape our community. We are a veteran-owned business dedicated to providing a world-class platform for military members, entrepreneurs, and local leaders in Boca Raton to share their stories. Our state-of-the-art facility isn't just about pristine audio; it's about amplifying messages that matter.</p>
            </div>
            <div className="about-image-container">
                <img src="/NewVetpic.jpg" alt="Veteran at podcast microphone" />
            </div>
        </div>
        <style jsx>{`
            .about-container { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 4rem; max-width: 1200px; margin: 0 auto; }
            .about-text h3 { color: var(--accent-color); font-size: 1.2rem; margin-bottom: 0.5rem; }
            .about-text h2 { font-size: 2.8rem; margin-bottom: 1.5rem; }
            .about-text p { font-size: 1.1rem; line-height: 1.7; color: var(--text-color-secondary); }
            .about-image-container img { width: 100%; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

            /* Mobile-specific stacking fix */
            @media (max-width: 768px) {
                .about-container {
                    display: flex; 
                    flex-direction: column;
                    gap: 2rem;
                }
                .about-image-container {
                    order: -1; /* This moves the image to the top */
                    width: 100%;
                    margin-bottom: 0;
                }
            }
        `}</style>
    </AnimatedSection>
);

export default AboutSection;

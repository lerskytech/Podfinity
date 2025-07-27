import React from 'react';
import AnimatedSection from './AnimatedSection';

const studios = [
    {
        name: 'The Rogan Room',
        description: 'A premium space designed for 2-3 people, featuring velvet red walls, a dark backdrop, and comfortable leather chairs—ideal for immersive, long-form conversations and intimate interviews.',
        image: '/RoganRoom.jpg'
    },
    {
        name: 'The Fireside Studio',
        description: 'An inviting setup for 2-3 chairs around a cozy faux fireplace, perfect for relaxed storytelling, personal chats, and deep dives in a warm, fireside atmosphere.',
        image: '/Fireside.jpg'
    },
    {
        name: 'The Barstool Studio',
        description: 'A casual counter-top area with 4 barstools, mimicking a kitchen bar for lively group debates, comedy sessions, or energetic discussions in a fun, social vibe.',
        image: '/Barstool.jpg'
    }
];

const StudioCard = ({ studio }) => (
    <div className="studio-card">
        <div 
            className="studio-image-container" 
            style={{ backgroundImage: `url(${studio.image})` }}
        >
            <div className="studio-image-overlay"></div>
        </div>
        <div className="studio-info">
            <h3 className="studio-name">{studio.name}</h3>
            <p className="studio-description">{studio.description}</p>
        </div>
    </div>
);

const StudiosSection = () => (
    <AnimatedSection id="studios" className="studios-section">
        <h2 className="section-title">Our Studios</h2>
        <div className="studios-grid">
            {studios.map((studio, index) => (
                <StudioCard key={index} studio={studio} />
            ))}
        </div>
        <style jsx>{`
            .studios-section {
                padding: 6rem 2rem;
            }
            .studios-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2.5rem;
                max-width: 1400px;
                margin: 0 auto;
            }
            .studio-card {
                background: var(--glass-bg);
                border-radius: 15px;
                overflow: hidden;
                border: 1px solid var(--glass-border);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                position: relative;
            }
            .studio-card:hover {
                transform: translateY(-12px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(var(--accent-color-rgb), 0.6);
            }
            .studio-image-container {
                position: relative;
                height: 250px;
                background-size: cover;
                background-position: center;
                transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Faster transition */
            }
            .studio-card:hover .studio-image-container {
                transform: scale(1.08);
            }
            .studio-image-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
                transition: background 0.4s ease;
            }
            .studio-info {
                padding: 1.5rem 2rem 2rem;
            }
            .studio-name {
                font-size: 1.75rem;
                font-weight: 700;
                margin-bottom: 0.75rem;
                color: var(--text-color);
            }
            .studio-description {
                color: var(--text-color-secondary);
                line-height: 1.6;
            }
            @media (max-width: 768px) {
                .studios-grid {
                    grid-template-columns: 1fr;
                }
                .studios-section {
                    padding: 4rem 1rem;
                }
            }
        `}</style>
    </AnimatedSection>
);

export default StudiosSection;

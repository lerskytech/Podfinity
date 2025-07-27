import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const { x, y } = mousePosition;
    const parallaxX = (x / (containerRef.current?.offsetWidth || 1) - 0.5) * -40;
    const parallaxY = (y / (containerRef.current?.offsetHeight || 1) - 0.5) * -40;

    return (
        <section id="hero" className="hero-section" ref={containerRef}>
            <div
                className="hero-background"
                style={{
                    transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                }}
            />
            <div 
                className="hero-glare"
                style={{
                    background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1), transparent 40%)`
                }}
            />
            <div className="hero-content">
                <h1 className="hero-title">Where Boca Raton's Voices Are Forged</h1>
                <p className="hero-subtitle">The Premier Podcast Studio for Veterans, Innovators, and Community Leaders</p>
                <a href="#contact" className="cta-button">Launch Your Legacy</a>
            </div>

            <style jsx>{`
                .hero-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    height: 100vh;
                    position: relative;
                    overflow: hidden;
                    color: var(--text-color);
                }
                .hero-background {
                    position: absolute;
                    top: -5%;
                    left: -5%;
                    width: 110%;
                    height: 110%;
                    background-image: url('/Flag4K.png');
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    z-index: 1;
                }
                .hero-glare {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2;
                    pointer-events: none; /* Allows clicks to pass through */
                }
                .hero-content {
                    position: relative;
                    z-index: 3;
                    padding: 2rem;
                    background: rgba(10, 10, 10, 0.5);
                    backdrop-filter: blur(5px);
                    border-radius: 15px;
                    border: 1px solid var(--glass-border);
                    max-width: 90%;
                }
                @media (max-width: 768px) {
                    .hero-section {
                        height: auto; /* Let content define height */
                        padding: 10rem 1.5rem; /* Add vertical and horizontal space */
                        box-sizing: border-box;
                    }
                    .hero-content {
                        margin: 0 auto; /* Explicitly center the content block */
                    }
                    .hero-title {
                        font-size: 2.4rem; /* Scaled for mobile */
                    }
                    .hero-subtitle {
                        font-size: 1.1rem; /* Scaled for mobile */
                        margin: 1.5rem 0 2rem;
                    }
                    .cta-button {
                        font-size: 1rem; /* Scaled for mobile */
                        padding: 14px 28px;
                    }
                }
                .hero-title {
                    font-family: var(--font-display);
                    font-size: 4.5rem;
                    font-weight: 700;
                    color: #fff;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6);
                    margin-bottom: 1rem;
                    animation: fadeInDown 1s ease-out, glow 2.5s ease-in-out infinite alternate;
                    letter-spacing: 1px;
                }
                @keyframes glow {
                    from {
                        text-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6);
                    }
                    to {
                        text-shadow: 0 0 25px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8);
                    }
                }
                .hero-subtitle {
                    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
                    margin: 0 auto 2.5rem;
                    max-width: 800px;
                    color: var(--text-color-secondary);
                }
                .cta-button {
                    display: inline-block;
                    padding: 1rem 2.5rem;
                    background: var(--accent-color);
                    color: #fff;
                    border: none;
                    border-radius: 50px;
                    font-family: var(--font-display);
                    font-size: 1.2rem;
                    font-weight: 700;
                    text-decoration: none;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 20px rgba(var(--accent-color-rgb), 0.5), inset 0 0 5px rgba(255,255,255,0.3);
                }
                .cta-button:hover {
                    transform: translateY(-5px) scale(1.05);
                    box-shadow: 0 0 35px rgba(var(--accent-color-rgb), 0.8), inset 0 0 10px rgba(255,255,255,0.5);
                }
            `}</style>
        </section>
    );
};

export default HeroSection;



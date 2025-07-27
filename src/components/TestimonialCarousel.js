import React, { useState, useEffect, useRef } from 'react';
import AnimatedSection from './AnimatedSection';

const testimonials = [
    { quote: "Podfinity transformed our message. The quality is unmatched, and the team's expertise is evident in every episode. Truly a world-class operation.", author: "CEO, Veteran's Outreach Project" },
    { quote: "As a local business owner, I needed a professional edge. Podfinity delivered. Their studio and staff are top-tier. Highly recommend.", author: "Founder, Boca Business Spotlight" },
    { quote: "The best podcasting experience in Florida. From the equipment to the environment, everything at Podfinity is designed for excellence.", author: "Host, The Florida Insider" },
];

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length),
            5000 // Change slides every 5 seconds
        );
        return () => resetTimeout();
    }, [currentIndex]);

    return (
        <AnimatedSection id="testimonials" className="testimonial-section">
            <h2 className="section-title">From The Community</h2>
            <div className="carousel-container">
                <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {testimonials.map((testimonial, index) => (
                        <div className="testimonial-slide" key={index}>
                            <div className="testimonial-card">
                                <span className="quote-icon" dangerouslySetInnerHTML={{ __html: '&ldquo;' }} />
                                <p className="quote">{testimonial.quote}</p>
                                <p className="author">- {testimonial.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .testimonial-section { /* background is transparent now to show page bg */ }
                .carousel-container { max-width: 800px; margin: 0 auto; overflow: hidden; }
                .carousel-inner { display: flex; transition: transform 0.5s ease-in-out; }
                .testimonial-slide { flex: 0 0 100%; padding: 1rem; }
                
                .testimonial-card {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    border-radius: 15px;
                    padding: 3rem;
                    position: relative;
                    text-align: center;
                    overflow: hidden;
                }

                .quote-icon {
                    position: absolute;
                    top: 5px;
                    left: 15px;
                    font-size: 8rem;
                    font-family: 'Georgia', serif;
                    color: rgba(var(--accent-color-rgb), 0.08);
                    line-height: 1;
                    z-index: 1;
                    user-select: none;
                }

                .quote { 
                    font-size: 1.3rem; 
                    font-style: italic; 
                    margin-bottom: 1.5rem; 
                    line-height: 1.6; 
                    color: var(--text-color); 
                    position: relative;
                    z-index: 2;
                }
                .author { 
                    font-weight: 700; 
                    color: var(--accent-color); 
                    position: relative;
                    z-index: 2;
                }

                @media (max-width: 768px) { 
                    .testimonial-card { padding: 2rem; }
                    .quote { font-size: 1.1rem; } 
                    .quote-icon { font-size: 6rem; top: 0; left: 10px; }
                }
            `}</style>
        </AnimatedSection>
    );
};

export default TestimonialCarousel;

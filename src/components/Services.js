import React from 'react';
import AnimatedSection from './AnimatedSection';

const services = [
    { icon: '🎙️', title: 'High-Fidelity Recording', description: 'Capture crystal-clear audio in our acoustically treated studios with state-of-the-art microphones and mixing boards.' },
    { icon: '🎬', title: 'Video Podcasting', description: 'Produce professional 4K video podcasts with our multi-camera setups, dynamic lighting, and green screen capabilities.' },
    { icon: '✂️', title: 'Post-Production', description: 'Our expert audio engineers will edit, mix, and master your content, ensuring a polished, broadcast-quality final product.' },
    { icon: '🚀', title: 'Distribution & Marketing', description: 'We help you launch your podcast on all major platforms and provide strategies to grow your audience.' },
];

const ServicesSection = () => (
    <AnimatedSection id="services" className="services-section">
        <h2 className="section-title">Full-Spectrum Support</h2>
        <div className="services-grid">
            {services.map(service => (
                <div key={service.title} className="card">
                    <div className="service-icon">{service.icon}</div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                </div>
            ))}
        </div>
        <style jsx>{`
            .services-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; max-width: 1200px; margin: 0 auto; }
            @media (min-width: 768px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
            .card { background: var(--glass-bg); border: 1px solid var(--glass-border); padding: 2rem; border-radius: 15px; text-align: center; transition: all 0.3s; }
            .card:hover { transform: translateY(-10px); box-shadow: 0 0 20px rgba(var(--accent-color-rgb), 0.5); }
            .service-icon { font-size: 3rem; margin-bottom: 1rem; }
            .card h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
            .card p { color: var(--text-color-secondary); line-height: 1.6; }
        `}</style>
    </AnimatedSection>
);

export default ServicesSection;

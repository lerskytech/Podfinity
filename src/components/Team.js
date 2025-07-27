import React from 'react';
import AnimatedSection from './AnimatedSection';

const placeholderSvg = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3e%3c/path%3e%3ccircle cx='12' cy='7' r='4'%3e%3c/circle%3e%3c/svg%3e";

const teamMembers = [
    { name: "Marty", role: "CEO", image: placeholderSvg },
    { name: "Pete", role: "Founder & Owner", image: placeholderSvg },
    { name: "Christian", role: "Media Manager", image: placeholderSvg },
    { name: "Marty Martin", role: "Podcast Host", image: placeholderSvg },
];

const TeamSection = () => (
    <AnimatedSection id="team" className="team-section">
        <h2 className="section-title">The Leadership</h2>
        <div className="team-grid">
            {teamMembers.map((member, index) => (
                <div key={index} className="team-member-card">
                    <img src={member.image} alt={member.name} className="team-member-img"/>
                    <div className="team-member-info">
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </div>
                </div>
            ))}
        </div>
        <style jsx>{`
            .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
            .team-member-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 15px; padding: 2rem; text-align: center; transition: all 0.3s; }
            .team-member-card:hover { transform: translateY(-10px); box-shadow: 0 0 20px rgba(var(--accent-color-rgb), 0.5); }
            .team-member-img { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; border: 4px solid var(--accent-color); }
            .team-member-info h3 { font-size: 1.5rem; }
            .team-member-info p { color: var(--text-color-secondary); }
        `}</style>
    </AnimatedSection>
);

export default TeamSection;

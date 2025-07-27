import React from 'react';
import AnimatedSection from './AnimatedSection';

const StatsSection = () => (
    <AnimatedSection id="stats" className="stats-section">
        <div className="stat-item"><h3>100+</h3><p>Veterans Supported</p></div>
        <div className="stat-item"><h3>50K+</h3><p>Community Reach</p></div>
        <div className="stat-item"><h3>Top 1%</h3><p>Audio Quality</p></div>
        <style jsx>{`
            .stats-section { display: flex; justify-content: space-around; align-items: center; background: var(--primary-color); padding: 3rem 2rem; }
            .stat-item { text-align: center; }
            .stat-item h3 { font-size: 3rem; color: var(--accent-color); }
            .stat-item p { font-size: 1.1rem; color: var(--text-color-secondary); }
            @media (max-width: 768px) { .stats-section { flex-direction: column; gap: 2rem; } }
        `}</style>
    </AnimatedSection>
);

export default StatsSection;

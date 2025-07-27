import React from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children, id, className = '' }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    return <section ref={ref} id={id} className={`animated-section ${className} ${inView ? 'is-visible' : ''}`}>{children}</section>;
};

export default AnimatedSection;

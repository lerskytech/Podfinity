import React from 'react';

// Component Imports
import Header from './components/Header';
import HeroSection from './components/Hero';
import StatsSection from './components/Stats';
import AboutSection from './components/About';
import StudiosSection from './components/Studios';
import TestimonialCarousel from './components/TestimonialCarousel';
import Podcasts from './components/Podcasts';
import ServicesSection from './components/Services';
import TeamSection from './components/Team';
import ContactSection from './components/Contact';
import Footer from './components/Footer';

// --- GLOBAL STYLES --- //
const GlobalStyles = () => (
    <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@400;700&display=swap');

        :root {
            --background-color: #0a0a0a; 
            --primary-color: #1a1a1a;
            --secondary-color: #2a2a2a;
            --accent-color: #0052cc;
            --accent-color-rgb: 0, 82, 204;
            --text-color: #f0f0f0;
            --text-color-secondary: #a0a0a0;
            --glass-background: rgba(20, 20, 30, 0.95);
            --glass-border: rgba(42, 42, 42, 0.7);
            --font-main: 'Roboto', sans-serif;
            --font-display: 'Orbitron', sans-serif;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            scroll-behavior: smooth;
            scroll-padding-top: 80px; /* Match header height */
        }

        body {
            font-family: var(--font-main);
            background-color: var(--background-color);
            color: var(--text-color);
            overflow-x: hidden; 
            /* Use 'fixed' for desktop parallax, but it will be overridden for mobile */
            background-attachment: fixed; 
        }
        
        

        h1, h2, h3, h4 {
            font-family: var(--font-display);
            font-weight: 700;
            color: var(--text-color);
            text-shadow: 0 0 5px rgba(var(--accent-color-rgb), 0.5);
        }

        .section-title {
            font-size: 3.5rem;
            text-align: center;
            margin-bottom: 4rem;
            font-weight: 900;
            color: var(--accent-color);
            text-transform: uppercase;
        }
        
        .animated-section {
            padding: 6rem 2rem;
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .animated-section.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* --- MOBILE-SPECIFIC FIXES --- */
        @media (max-width: 768px) {
            /* THE DEFINITIVE SCROLL-LOCK FIX */
            body {
                background-attachment: scroll !important; 
            }
            .section-title { font-size: 2.5rem; }
            .animated-section { padding: 4rem 1rem; }
        }
    `}</style>
);


// --- MAIN APP ASSEMBLY --- //
const App = () => {
    return (
        <>
            <GlobalStyles />
            <Header />
            <main>
                <section id="home"><HeroSection /></section>
                <section><StatsSection /></section>
                <section id="about"><AboutSection /></section>
                <section id="studios"><StudiosSection /></section>
                <section><TestimonialCarousel /></section>
                <section id="podcasts"><Podcasts /></section>
                <section id="services"><ServicesSection /></section>
                <section id="team"><TeamSection /></section>
                <section id="contact"><ContactSection /></section>
            </main>
            <Footer />
        </>
    );
};

export default App;

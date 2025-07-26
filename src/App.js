import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

// --- MOCK DATA ---

const placeholderSvg = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3e%3c/path%3e%3ccircle cx='12' cy='7' r='4'%3e%3c/circle%3e%3c/svg%3e";

const teamMembers = [
    { name: "Marty", role: "CEO", image: placeholderSvg },
    { name: "Pete", role: "Founder & Owner", image: placeholderSvg },
    { name: "Skyler", role: "Podcast Producer", image: placeholderSvg },
    { name: "Christian", role: "Media Manager", image: placeholderSvg },
    { name: "Marty", role: "Podcast Host", image: placeholderSvg },
];

const services = [
    { icon: '🎙️', title: 'High-Fidelity Recording', description: 'Capture crystal-clear audio in our acoustically treated studios with state-of-the-art microphones and mixing boards.' },
    { icon: '🎬', title: 'Video Podcasting', description: 'Produce professional 4K video podcasts with our multi-camera setups, dynamic lighting, and green screen capabilities.' },
    { icon: '✂️', title: 'Post-Production', description: 'Our expert audio engineers will edit, mix, and master your content, ensuring a polished, broadcast-quality final product.' },
    { icon: '🚀', title: 'Distribution & Marketing', description: 'We help you launch your podcast on all major platforms and provide strategies to grow your audience.' },
];

const testimonials = [
    { quote: "Podfinity transformed our message. The quality is unmatched, and the team's expertise is evident in every episode. Truly a world-class operation.", author: "CEO, Veteran's Outreach Project" },
    { quote: "As a local business owner, I needed a professional edge. Podfinity delivered. Their studio and staff are top-tier. Highly recommend.", author: "Founder, Boca Business Spotlight" },
    { quote: "The best podcasting experience in Florida. From the equipment to the environment, everything at Podfinity is designed for excellence.", author: "Host, The Florida Insider" },
];

// --- STYLED COMPONENTS & HELPERS ---

const GlobalStyles = () => (
    <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@400;700&display=swap');

        :root {
            --background-color: #0D1B2A;
            --primary-color: #1B263B;
            --secondary-color: #415A77;
            --accent-color: #778DA9;
            --accent-color-rgb: 119, 141, 169;
            --text-color: #E0E1DD;
            --text-color-secondary: #B0B3B8;
            --glass-bg: rgba(27, 38, 59, 0.5);
            --glass-border: rgba(65, 90, 119, 0.5);
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
            scroll-padding-top: 92px; /* Offset for fixed header */
        }

        body {
            font-family: var(--font-main);
            background: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            position: relative;
        }

        body::before {
            content: '';
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: radial-gradient(ellipse at center, rgba(13, 27, 42, 0) 0%, var(--background-color) 80%);
            z-index: -1;
        }

        main {
            overflow-x: hidden;
        }

        h1, h2, h3, h4 {
            font-family: var(--font-display);
            font-weight: 700;
            color: var(--text-color);
        }

        .section-title {
            font-size: 3rem;
            text-align: center;
            margin-bottom: 3rem;
            font-weight: 900;
            color: var(--accent-color);
        }
        
        .animated-section {
            padding: 5rem 2rem;
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            background: transparent;
        }

        .animated-section.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* --- Responsive Design --- */
        @media (max-width: 1024px) {
            .section-title {
                font-size: 2.8rem;
            }
            .studios-grid, .services-grid, .team-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .contact-container {
                grid-template-columns: 1fr;
                gap: 2rem;
                padding: 2rem;
            }
            .about-container {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            .footer-content {
                flex-direction: column;
                text-align: center;
                gap: 2rem;
            }
        }

        @media (max-width: 768px) {
            html {
                scroll-padding-top: 80px; /* Match mobile header */
            }

            .section-title {
                font-size: 2.2rem;
                margin-bottom: 2rem;
            }

            .animated-section {
                padding: 3rem 1rem;
            }

            .hero-content {
                padding: 1rem;
            }

            .hero-title {
                font-size: 2rem;
            }

            .hero-subtitle {
                font-size: 0.9rem;
                width: 90%;
            }

            .stat-item h3 {
                font-size: 2rem;
            }

            .stat-item p {
                font-size: 0.9rem;
            }

            .about-text h3 {
                font-size: 1.5rem;
            }

            .about-text p {
                font-size: 0.95rem;
            }

            .card {
                padding: 1.5rem;
            }

            .card h3 {
                font-size: 1.3rem;
            }

            .card p {
                font-size: 0.9rem;
            }

            .team-member-card {
                padding: 1rem;
            }

            .contact-form-container {
                padding: 1.5rem;
            }

            .contact-info h3 {
                font-size: 1.5rem;
            }

            .footer-content {
                padding: 0 1rem;
            }

            .header {
                padding: 0.5rem 1rem;
            }
            .logo {
                height: 50px;
            }
            h1 {
                font-size: 1.5rem;
            }
            .hero-title {
                font-size: 1.8rem; /* Reduced size */
                line-height: 1.2;
            }
            .hero-subtitle {
                font-size: 1rem;
                padding: 0.8rem 1.2rem;
            }
            .stats-section {
                flex-direction: column;
                padding: 2rem 1rem;
                gap: 2rem;
            }
            .about-container {
                flex-direction: column;
            }
            .about-image-container {
                margin: 0 auto 2rem auto; /* Center and add bottom margin */
                max-width: 90%; /* Give some padding */
            }
            .studios-grid, .services-grid, .team-grid {
                grid-template-columns: 1fr;
            }
            .team-member-card {
                flex-direction: column;
                text-align: center;
            }
            .team-member-info {
                align-items: center;
            }
            .contact-info {
                padding-left: 0;
                border-left: none;
                margin-top: 2rem;
                text-align: center;
            }
        }
    `}</style>
);

const AnimatedSection = ({ children, id, className = '' }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section ref={ref} id={id} className={`animated-section ${className} ${inView ? 'is-visible' : ''}`}>
            {children}
        </section>
    );
};

// --- CORE COMPONENTS ---

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="logo-container">
                <a href="#home" className="logo-link"><img src="/NewIcon.png" alt="Podfinity Logo" className="logo" /></a>
                <a href="#home" className="title-link"><h1>PODFINITY</h1></a>
            </div>
            <nav className="desktop-nav">
                <a href="#home">HOME</a>
                <a href="#about">ABOUT</a>
                <a href="#studios">STUDIOS</a>
                <a href="#services">SERVICES</a>
                <a href="#team">TEAM</a>
                <a href="#contact">CONTACT</a>
            </nav>
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className={`hamburger ${isMenuOpen ? 'is-active' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`}>
                <a href="#home" onClick={() => setIsMenuOpen(false)}>HOME</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)}>ABOUT</a>
                <a href="#studios" onClick={() => setIsMenuOpen(false)}>STUDIOS</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)}>SERVICES</a>
                <a href="#team" onClick={() => setIsMenuOpen(false)}>TEAM</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
            </div>
            <style jsx>{`
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    background: rgba(13, 27, 42, 0.8);
                    backdrop-filter: blur(10px);
                    z-index: 1000;
                    border-bottom: 1px solid var(--glass-border);
                }
                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .logo-link { display: inline-block; line-height: 0; }
                .logo { 
                    height: 60px; 
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .logo:hover {
                    transform: scale(1.15);
                }
                h1 { font-size: 1.8rem; margin: 0; }
                .title-link {
                    color: var(--text-color);
                    text-decoration: none;
                    position: relative;
                    padding-bottom: 5px; /* space for underline */
                    transition: color 0.3s ease;
                }
                .title-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: var(--accent-color);
                    transition: width 0.3s ease;
                }
                .title-link:hover {
                    color: var(--accent-color);
                }
                .title-link:hover::after {
                    width: 100%;
                }
                nav { display: flex; gap: 1.5rem; }
                nav a {
                    color: var(--text-color);
                    text-decoration: none;
                    font-family: var(--font-display);
                    transition: color 0.3s;
                }
                nav a:hover { color: var(--accent-color); }
                .desktop-nav {
                    display: flex; /* Show by default */
                }
                .mobile-menu-btn {
                    display: none; /* Hide by default */
                }
                .mobile-nav {
                    display: none; /* Hide by default */
                }
                @media (max-width: 1024px) { /* Adjusted breakpoint for better tablet handling */
                    .desktop-nav {
                        display: none;
                    }
                    .mobile-menu-btn {
                        display: block;
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        background: none;
                        border: none;
                        padding: 0;
                        cursor: pointer;
                    }
                    .mobile-nav {
                        display: block;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100vh;
                        background: var(--background-color);
                        padding: 2rem;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }
                    .mobile-nav.is-open {
                        transform: translateX(0);
                    }
                    .mobile-nav a {
                        display: block;
                        margin-bottom: 1rem;
                        font-size: 1.5rem;
                        color: var(--text-color);
                        text-decoration: none;
                    }
                    .mobile-nav a:hover {
                        color: var(--accent-color);
                    }
                    .hamburger {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    .hamburger span {
                        width: 30px;
                        height: 3px;
                        background: var(--text-color);
                        transition: transform 0.3s ease;
                    }
                    .hamburger.is-active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    .hamburger.is-active span:nth-child(2) {
                        opacity: 0;
                    }
                    .hamburger.is-active span:nth-child(3) {
                        transform: rotate(-45deg) translate(5px, -5px);
                    }
                }
            `}</style>
        </header>
    );
};

const HeroSection = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            // On mobile, just set a static background and do nothing else.
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth;
                canvas.height = 700;
                ctx.fillStyle = 'var(--background-color)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = 700;
        let points;
        let mouse = { x: width / 2, y: height / 2, active: false };

        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.radius = 5 + Math.random() * 5;
                this.density = Math.random() * 10 + 20;
                this.color = `rgba(119, 141, 169, ${Math.random() * 0.5 + 0.2})`;
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                let forceX = dx / dist;
                let forceY = dy / dist;
                let maxDist = 200;
                let force = (maxDist - dist) / maxDist;

                if (force < 0 || !mouse.active) force = 0;

                let dirX = (forceX * force * this.density);
                let dirY = (forceY * force * this.density);

                this.x = this.baseX - dirX;
                this.y = this.baseY - dirY;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        function init() {
            points = [];
            let gap = 40;
            for (let x = 0; x < width; x += gap) {
                for (let y = 0; y < height; y += gap) {
                    points.push(new Point(x + Math.random() * gap, y + Math.random() * gap));
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < points.length; i++) {
                points[i].update();
                points[i].draw();
            }
            connect();
            requestAnimationFrame(animate);
        }

        function connect() {
            for (let i = 0; i < points.length; i++) {
                for (let j = i; j < points.length; j++) {
                    let dx = points[i].x - points[j].x;
                    let dy = points[i].y - points[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 60) {
                        ctx.strokeStyle = `rgba(119, 141, 169, ${1 - dist / 60})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };
        
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = 700;
            init();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);

        init();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section id="home" className="hero-section">
            <canvas ref={canvasRef} className="hero-canvas"></canvas>
            <div className="hero-content">
                <h2 className="hero-title">Where Your Voice Finds Its Power</h2>
                <p className="hero-subtitle">State-of-the-Art Podcast Studios in Boca Raton for Veterans, First Responders, and Visionaries</p>
            </div>
            <style jsx>{`
                .hero-section {
                    height: 700px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                .hero-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }
                .hero-content {
                    position: relative;
                    z-index: 2;
                    padding: 2rem;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    backdrop-filter: blur(5px);
                    border-radius: 10px;
                }
                .hero-title { font-size: 4rem; margin-bottom: 1rem; }
                .hero-subtitle { font-size: 1.5rem; color: var(--text-color-secondary); }
            `}</style>
        </section>
    );
};

const StatsSection = () => (
    <div className="stats-section">
        <div className="stat-item">
            <h3>1,200+</h3>
            <p>Episodes Produced</p>
        </div>
        <div className="stat-item">
            <h3>50+</h3>
            <p>Active Shows</p>
        </div>
        <div className="stat-item">
            <h3>Community</h3>
            <p>Veteran Owned & Operated</p>
        </div>
        <style jsx>{`
            .stats-section {
                display: flex;
                justify-content: space-around;
                background: var(--primary-color);
                padding: 2rem;
                border-top: 1px solid var(--glass-border);
                border-bottom: 1px solid var(--glass-border);
            }
            .stat-item { text-align: center; }
            .stat-item h3 { font-size: 2.5rem; color: var(--accent-color); }
        `}</style>
    </div>
);

const AboutSection = () => (
    <AnimatedSection id="about" className="about-section">
        <h2 className="section-title">Veteran Owned, Community Focused</h2>
        <div className="about-content">
            <div className="about-image-container">
                <img src="/NewVetpic.jpg" alt="Podfinity studio interior" className="about-image" />
            </div>
            <div className="about-text-container">
                <h3>Our Mission</h3>
                <p>Podfinity is more than just a studio; it's a community hub founded on the principles of service, integrity, and storytelling. As a veteran-owned business, we are deeply committed to providing a platform for fellow veterans, first responders, and local leaders to share their voices and experiences.</p>
                <h3>Our Story</h3>
                <p>Born from a passion for clear, impactful communication, Podfinity was established in Boca Raton to serve the unique needs of our community. We believe everyone has a story worth telling, and we provide the state-of-the-art tools and supportive environment to tell it right.</p>
            </div>
        </div>
        <style jsx>{`
            .about-content {
                position: relative;
                max-width: 1100px;
                margin: 4rem auto 0;
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: center;
                gap: 2rem;
            }
            .about-image-container {
                grid-column: 1 / 2;
                grid-row: 1 / 2;
                z-index: 1;
                max-width: 80%; /* Adjust this value as needed */
                justify-self: center; /* Center the image container in the grid cell */
            }
            .about-image {
                width: 100%;
                border-radius: 10px;
                box-shadow: -10px 10px 30px rgba(0,0,0,0.4);
                border: 2px solid var(--glass-border);
            }
            .about-text-container {
                grid-column: 2 / 3;
                grid-row: 1 / 2;
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                backdrop-filter: blur(8px);
                padding: 3rem;
                padding-left: 6rem;
                border-radius: 10px;
                margin-left: -8rem;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            @media (max-width: 900px) {
                .about-content { grid-template-columns: 1fr; }
                .about-image-container, .about-text-container {
                    grid-column: 1 / 2;
                    margin-left: 0;
                    padding: 2rem;
                }
                .about-image-container { margin-bottom: -4rem; }
                .about-text-container { padding-top: 5rem; }
            }
        `}</style>
    </AnimatedSection>
);

const studios = [
    { name: "The Command Center", image: "/20250724_2141_Podcast%20Studio%20Ambiance_simple_compose_01k0zkrpcvekr8j420kvze66kp.png", description: "Our flagship 4-person studio with 4K video, advanced lighting, and live-switching capabilities." },
    { name: "The Fireside Chat", image: "/20250724_2136_Cozy%20Fireside%20Chat_simple_compose_01k0zkfyzxfp7bq2qavhmca12z.png", description: "An intimate 2-person setup perfect for in-depth interviews and one-on-one conversations." },
    { name: "The Sunset Suite", image: "/20250724_2100_Podcasting%20at%20Sunset_remix_01k0zhe2d7eh28w9t3zmcrkk86.png", description: "A versatile solo studio for voice-overs, audiobooks, and single-host podcasts with a view." },
];

const StudioCard = ({ studio }) => (
    <div className="studio-card">
        <img src={studio.image} alt={studio.name} className="studio-image" />
        <div className="studio-info">
            <h3>{studio.name}</h3>
            <p>{studio.description}</p>
        </div>
    </div>
);

const StudiosSection = () => (
    <AnimatedSection id="studios" className="studios-section">
        <h2 className="section-title">Our Studios</h2>
        <div className="studios-grid">
            {studios.map(studio => (
                <StudioCard key={studio.name} studio={studio} />
            ))}
        </div>
        <style jsx>{`
            .studios-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
            .studio-card { background: var(--glass-bg); border: 1px solid var(--glass-border); backdrop-filter: blur(8px); border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: transform 0.3s ease, box-shadow 0.3s ease; position: relative; }
            .studio-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 10px; border: 2px solid transparent; background: linear-gradient(120deg, var(--accent-color), transparent, var(--accent-color)) border-box; -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0); -webkit-mask-composite: destination-out; mask-composite: exclude; z-index: 1; opacity: 0.3; transition: opacity 0.3s ease; pointer-events: none; }
            .studio-card:hover::before { opacity: 1; }
            .studio-card:hover { transform: translateY(-10px); box-shadow: 0 15px 35px rgba(var(--accent-color-rgb), 0.2); }
            .studio-image { width: 100%; height: 250px; object-fit: cover; display: block; }
            .studio-info { padding: 1.5rem; }
            .studio-info h3 { font-size: 1.6rem; color: var(--accent-color); margin-bottom: 0.5rem; }
        `}</style>
    </AnimatedSection>
);

const ServicesSection = () => (
    <AnimatedSection id="services" className="services-section">
        <h2 className="section-title">What We Offer</h2>
        <div className="services-list">
            {services.map((service, index) => (
                <div key={index} className="service-item">
                    <div className="service-icon-container">
                        <span className="service-icon">{service.icon}</span>
                    </div>
                    <div className="service-text">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                </div>
            ))}
        </div>
        <style jsx>{`
            .services-list { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 4rem; }
            .service-item { display: flex; align-items: center; gap: 3rem; }
            .service-item:nth-child(even) { flex-direction: row-reverse; }
            .service-icon-container { flex-shrink: 0; width: 150px; height: 150px; background: var(--glass-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid var(--glass-border); box-shadow: 0 0 25px rgba(var(--accent-color-rgb), 0.2); }
            .service-icon { font-size: 4rem; }
            .service-text { background: var(--glass-bg); border: 1px solid var(--glass-border); backdrop-filter: blur(8px); padding: 2rem; border-radius: 10px; flex-grow: 1; }
            .service-text h3 { font-size: 1.8rem; color: var(--accent-color); }
            @media (max-width: 768px) {
                .service-item, .service-item:nth-child(even) { flex-direction: column; text-align: center; }
            }
        `}</style>
    </AnimatedSection>
);

const TeamMemberCard = ({ member }) => (
    <div className="team-member-card">
        <div className="team-member-image-container">
            <img src={member.image} alt={`Portrait of ${member.name}`} className="team-member-image" />
        </div>
        <div className="team-member-info">
            <h3>{member.name}</h3>
            <p>{member.role}</p>
        </div>
    </div>
);

const TeamSection = () => (
    <AnimatedSection id="team" className="team-section">
        <h2 className="section-title">Our Team</h2>
        <div className="team-grid">
            {teamMembers.map(member => (
                <TeamMemberCard key={`${member.name}-${member.role}`} member={member} />
            ))}
        </div>
        <style jsx>{`
            .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 5rem 2rem; max-width: 1200px; margin: 0 auto; padding-top: 80px; }
            .team-member-card { background: var(--glass-bg); border: 1px solid var(--glass-border); backdrop-filter: blur(8px); border-radius: 10px; padding: 1.5rem; padding-top: 70px; text-align: center; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: transform 0.3s ease, box-shadow 0.3s ease; z-index: 1; }
            .team-member-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 10px; border: 2px solid transparent; background: linear-gradient(120deg, var(--accent-color), transparent, var(--accent-color)) border-box; -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0); -webkit-mask-composite: destination-out; mask-composite: exclude; z-index: -1; opacity: 0.3; transition: opacity 0.3s ease; }
            .team-member-card:hover::before { opacity: 1; }
            .team-member-card:hover { transform: translateY(-10px); box-shadow: 0 15px 35px rgba(0,0,0,0.3); }
            .team-member-image-container { position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid var(--background-color); box-shadow: 0 5px 15px rgba(0,0,0,0.3); z-index: 2; }
            .team-member-image { width: 100%; height: 100%; object-fit: cover; }
            .team-member-info h3 { margin: 0.5rem 0 0.25rem; font-size: 1.6rem; }
            .team-member-info p { color: var(--accent-color); font-weight: bold; font-size: 1rem; }
        `}</style>
    </AnimatedSection>
);

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    const prevTestimonial = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);

    return (
        <AnimatedSection id="testimonials" className="testimonials-section">
            <h2 className="section-title">What Our Clients Say</h2>
            <div className="testimonial-container">
                <div className="testimonial-card">
                    <span className="quote-icon">“</span>
                    <p className="testimonial-quote">{testimonials[currentIndex].quote}</p>
                    <p className="testimonial-author">- {testimonials[currentIndex].author}</p>
                </div>
                <div className="carousel-nav">
                    <button onClick={prevTestimonial} className="carousel-btn">&#x2190;</button>
                    <button onClick={nextTestimonial} className="carousel-btn">&#x2192;</button>
                </div>
            </div>
            <style jsx>{`
                .testimonial-container { max-width: 800px; margin: 0 auto; position: relative; }
                .testimonial-card { background: var(--glass-bg); border: 1px solid var(--glass-border); backdrop-filter: blur(10px); padding: 3rem; border-radius: 15px; position: relative; overflow: hidden; min-height: 300px; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
                .quote-icon { position: absolute; top: -20px; left: 10px; font-size: 12rem; color: rgba(var(--accent-color-rgb), 0.1); line-height: 1; z-index: -1; }
                .testimonial-quote { font-size: 1.5rem; font-style: italic; margin-bottom: 1.5rem; }
                .testimonial-author { font-weight: bold; color: var(--accent-color); align-self: flex-end; }
                .carousel-nav { margin-top: 2rem; }
                .carousel-btn { background: var(--glass-bg); border: 1px solid var(--glass-border); color: var(--text-color); width: 50px; height: 50px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; margin: 0 0.5rem; transition: all 0.3s ease; }
                .carousel-btn:hover { background: var(--accent-color); color: var(--background-color); transform: scale(1.1); }
            `}</style>
        </AnimatedSection>
    );
};

const ContactSection = () => (
    <AnimatedSection id="contact" className="contact-section">
        <h2 className="section-title">Start Your Journey</h2>
        <div className="contact-container">
            <div className="contact-form-container">
                <form className="contact-form">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="6" required></textarea>
                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
            </div>
            <div className="contact-info">
                <h3>Book a Tour or Consultation</h3>
                <p>Ready to see the studios? Have a project in mind? Reach out and let's create something powerful together.</p>
                <p><strong>Email:</strong> contact@podfinity.com</p>
                <p><strong>Phone:</strong> (561) 555-1234</p>
            </div>
        </div>
        <style jsx>{`
            .contact-section {
                background-image: linear-gradient(rgba(13, 27, 42, 0.9), rgba(13, 27, 42, 0.9)), url('/20250724_2105_Serene%20Warriors%27%20Retreat_simple_compose_01k0zhpf2venpt8hbvzsgvdrkw.png');
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
            }
            .contact-container { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; gap: 3rem; background: var(--glass-bg); border: 1px solid var(--glass-border); backdrop-filter: blur(10px); padding: 3rem; border-radius: 15px; }
            .contact-form input, .contact-form textarea { box-sizing: border-box; width: 100%; padding: 1rem; margin-bottom: 1rem; background: var(--primary-color); border: 1px solid var(--secondary-color); border-radius: 5px; color: var(--text-color); font-family: var(--font-main); }
            .contact-form input::placeholder, .contact-form textarea::placeholder { color: var(--text-color-secondary); }
            .contact-form textarea {
                resize: vertical;
                min-height: 120px; /* Approx 6 rows */
                max-height: 300px;
            }
            .submit-btn { width: 100%; padding: 1rem; background: var(--accent-color); color: var(--background-color); border: none; border-radius: 5px; font-family: var(--font-display); font-size: 1.2rem; cursor: pointer; transition: background-color 0.3s; }
            .submit-btn:hover { background: var(--text-color); }
            .contact-info { padding-left: 2rem; border-left: 2px solid var(--accent-color); }
            .contact-info h3 { font-size: 2rem; color: var(--accent-color); margin-bottom: 1rem; }
            .contact-info p { margin-bottom: 1rem; }
            @media (max-width: 900px) {
                .contact-container { grid-template-columns: 1fr; }
                .contact-info { padding-left: 0; border-left: none; margin-top: 2rem; }
            }
        `}</style>
    </AnimatedSection>
);

const Footer = () => (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-brand">
                <div className="logo-container">
                    <img src="/NewIcon.png" alt="Podfinity Logo" className="footer-logo" />
                    <h3>PODFINITY</h3>
                </div>
                <p>Amplify Your Voice.</p>
            </div>
            <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#studios">Studios</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div className="footer-contact">
                <h4>Contact Us</h4>
                <p>Email: contact@podfinity.com</p>
                <p>Phone: (561) 555-1234</p>
            </div>
            <div className="footer-social">
                <h4>Follow Us</h4>
                {/* Add social links here */}
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Podfinity. All Rights Reserved. | Boca Raton, FL</p>
        </div>
        <style jsx>{`
            .footer { background: var(--background-color); color: var(--text-color-secondary); padding: 4rem 2rem 2rem; border-top: 1px solid var(--glass-border); }
            .footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; margin-bottom: 2rem; }
            .footer-brand .logo-container { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
            .footer-logo { width: 40px; height: 40px; }
            .footer-brand h3 { font-size: 1.5rem; color: var(--text-color); margin: 0; }
            .footer-brand p { font-style: italic; }
            .footer h4 { font-size: 1.2rem; color: var(--accent-color); margin-bottom: 1rem; }
            .footer ul { list-style: none; padding: 0; }
            .footer ul li a { color: var(--text-color-secondary); text-decoration: none; transition: color 0.3s ease; display: block; margin-bottom: 0.5rem; }
            .footer ul li a:hover { color: var(--accent-color); }
            .footer-bottom { text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--glass-border); }
        `}</style>
    </footer>
);


const App = () => {
    useEffect(() => {
        let ticking = false;
        let lastScrollY = 0;

        const handleScroll = () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.innerWidth > 768) {
                        document.body.style.backgroundPositionY = `-${lastScrollY * 0.5}px`;
                    } else {
                        document.body.style.backgroundPositionY = '0';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        // Initial check and setup listeners
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <>
            <GlobalStyles />
            <Header />
            <main style={{ maxWidth: '1600px', margin: '0 auto' }}>
                <HeroSection />
                <StatsSection />
                <AboutSection />
                <StudiosSection />
                <ServicesSection />
                <TeamSection />
                <TestimonialsSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
};

export default App;

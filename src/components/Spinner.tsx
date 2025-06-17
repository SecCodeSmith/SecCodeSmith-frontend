import { useEffect } from 'react';
import logo from '../assets/images/favicon.webp'
import { randomCodeLineData } from '../data/randomCodeLineData';
import styles from '@styles/Spinner.module.scss';

export const Spinner : React.FC = () => {

    const randomCodeLines = randomCodeLineData;

    useEffect(() => {
        const binnaryBg = document.getElementById('binary-bg');

        if (!binnaryBg) return;
        const linesCount = 20;

        binnaryBg.innerHTML = '';

        for (let i = 0; i < linesCount; i++) {

            const line = document.createElement('div');
            line.className = styles.binaryLine;
            line.style.left = `${Math.random() * 100}%`;
            line.style.animationDuration = `${Math.random() * 10 + 15}s`;

            let lineNumber = Math.floor(Math.random() * randomCodeLines.length);
            let binaryString = randomCodeLines[lineNumber];

            line.textContent = binaryString;
            binnaryBg.appendChild(line);
        }

        const particlesContainer = document.getElementById('particles');
        const particlesCount = 100;

        function createParticle() {
            if (!particlesContainer) return;
            const particle = document.createElement('div');
            particle.className = styles.particle;

            // Random position around the center
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 50 + 50;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const posX = centerX + Math.cos(angle) * radius;
            const posY = centerY + Math.sin(angle) * radius;

            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;

            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random drift
            const xDrift = (Math.random() - 0.5) * 60;
            particle.style.setProperty('--x', `${xDrift}px`);

            // Random animation duration
            const duration = Math.random() * 3 + 2;
            particle.style.animationDuration = `${duration}s`;

            particlesContainer.appendChild(particle);

            // Remove particle after animation completes
            setTimeout(() => {
                particle.remove();
                createParticle();
            }, duration * 1000);
        }

        // Initialize particles
        for (let i = 0; i < particlesCount; i++) {
            setTimeout(createParticle, i * 100);
        }

        // Status messages rotation
        const messages = [
            'Heating the forge',
            'Stoking the flames',
            'Preparing the anvil',
            'Gathering tools',
            'Tempering the code',
            'Forging connections',
            'Sharpening algorithms',
            'Almost ready'
        ];

        let messageIndex = 0;
        const statusElement = document.getElementById('status');
        const cursor = '<span class="blinking-cursor"></span>';

        setInterval(() => {
            if (!statusElement) return;
            messageIndex = (messageIndex + 1) % messages.length;
            statusElement.style.opacity = '0';

            setTimeout(() => {
                statusElement.innerHTML = messages[messageIndex] + cursor;
                statusElement.style.opacity = '1';
            }, 300);
        }, 2500);

    }, []);


    return (
        <div className={styles.bodySpinner}>
            <div className={styles.binnaryBg} id="binary-bg"></div>
            <div className={styles.particle} id="particles"></div>

            <div className={styles.loaderContainer}>
                <div className={styles.forgeLoader}>
                    <div className={styles.fireGlow}></div>
                    <div className={styles.anvilContainer}>
                        <i className={`fas fa-fire ${styles.forgeIcon}`}></i>
                        <div className={styles.sparks}>
                            <div className={styles.spark}></div>
                            <div className={styles.spark}></div>
                            <div className={styles.spark}></div>
                            <div className={styles.spark}></div>
                        </div>
                    </div>
                </div>

                <div className={styles.logoWrapper}>
                    <div className={styles.logoIcon}>
                        <img src={logo} alt="SecCodeSmith" />
                    </div>
                    <h1 className={styles.logoText}>SecCodeSmith</h1>
                </div>

                <p className={styles.subtitle}>Forging Digital Solutions</p>

                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}></div>
                </div>

                <div className={styles.statusMessage} id="status">
                    Heating the forge<span className="blinking-cursor"></span>
                </div>
            </div>
        </div>
    );
}

export default Spinner;
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from '@styles/Home.module.scss';

export const Home = () => {
  // Create binary background and particles effects
  useEffect(() => {
    // Create binary background
    const createBinaryBg = () => {
      const binaryBg = document.getElementById('binary-bg');
      if (!binaryBg) return;

      const chars = '01';
      const linesCount = 20;

      // Clear existing lines
      binaryBg.innerHTML = '';

      for (let i = 0; i < linesCount; i++) {
        const line = document.createElement('div');
        line.className = styles.binaryLine;
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDuration = `${Math.random() * 10 + 15}s`;

        let binaryString = '';
        for (let j = 0; j < 100; j++) {
          binaryString += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        line.textContent = binaryString;
        binaryBg.appendChild(line);
      }
    };

    // Create particles effect (ember/spark effect)
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;

      // Clear existing particles
      particlesContainer.innerHTML = '';

      const particlesCount = 50;

      for (let i = 0; i < particlesCount; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.className = styles.particle;

          // Random position at the bottom of the hero section
          const posX = Math.random() * window.innerWidth;
          const posY = window.innerHeight - 100 + (Math.random() * 50);

          particle.style.left = `${posX}px`;
          particle.style.top = `${posY}px`;

          // Random size
          const size = Math.random() * 3 + 1;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;

          // Random drift
          const xDrift = (Math.random() - 0.5) * 100;
          particle.style.setProperty('--x', `${xDrift}px`);

          // Random animation duration
          const duration = Math.random() * 3 + 2;
          particle.style.animationDuration = `${duration}s`;

          particlesContainer.appendChild(particle);

          // Remove particle after animation completes
          setTimeout(() => {
            particle.remove();
          }, duration * 1000);
        }, i * 100);
      }
    };

    createBinaryBg();
    createParticles();

    // Create new particles periodically
    const particleInterval = setInterval(() => {
      const particlesContainer = document.getElementById('particles');
      if (particlesContainer && particlesContainer.childElementCount < 30) {
        createParticles();
      }
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} id="home">
        <div id="binary-bg" className={styles.binaryBg}></div>
        <div className={`container text-center ${styles.heroContainer}`}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h1 className={`${styles.titleMain}`}>SecCodeSmith</h1>
              <div className={`${styles.blinkingCursor}`}></div>
              <p className={`subtitle mt-3 ${styles.subtitle}`}>Forging Digital Solutions in the Fires of Innovation</p>
              <Link to="/projects" className={`btn btn-primary mt-4 btn-primary ${styles.btnPrimary}`}>
                <i className="fas fa-fire-alt me-2"></i> View My Forge
              </Link>
            </div>
          </div>
        </div>
        <div id="particles" className={`particles ${styles.particles}`}></div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`skills-section ${styles.skillsSection}`}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6 text-center">
              <h2 className={`section-title ${styles.sectionTitle}`}>Technical Arsenal</h2>
            </div>
          </div>
          <div className="row g-4">
            {/* Languages Card */}
            <div className="col-md-6 col-lg-4">
              <div className={`card h-100 ${styles.card}`}>
                <div className={`card-header ${styles.cardHeader}`}>
                  <i className={`fas fa-code category-icon ${styles.categoryIcon}`}></i>
                        <h3 className={`${styles.categoryTitle}`}>Languages</h3>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li className={`skill-item ${styles.skillItem}`}>
                      <span className={`skill-icon ${styles.skillIcon}`}><i className="devicon-cplusplus-plain "></i></span>
                      <span className={`skill-name ${styles.skillName}`}>C/C++</span>
                    </li>
                    <li className={`skill-item ${styles.skillItem}`}>
                      <span className={`skill-icon ${styles.skillIcon}`}><i className="devicon-python-plain"></i></span>
                      <span className={`skill-name ${styles.skillName}`}>Python</span>
                    </li>
                    <li className={`skill-item ${styles.skillItem}`}>
                      <span className={`skill-icon ${styles.skillIcon}`}><i className="devicon-csharp-plain"></i></span>
                      <span className={`skill-name ${styles.skillName}`}>.NET</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Embedded Systems Card */}
            <div className="col-md-6 col-lg-4">
              <div className={`card h-100 ${styles.card}`}>
                <div className={`card-header ${styles.cardHeader}`}>
                  <i className={`fas fa-microchip ${styles.categoryIcon}`}></i>
                  <h3 className="category-title">Embedded Systems</h3>
                </div>
                <div className={`${styles.cardBody}`}>
                  <ul className="list-unstyled">
                    <li className="skill-item">
                      <span className="skill-icon"><i className="fas fa-microchip"></i></span>
                      <span className="skill-name">STM32 (I2C, SPI, UART)</span>
                    </li>
                    <li className="skill-item">
                      <span className="skill-icon"><i className="fas fa-wifi"></i></span>
                      <span className="skill-name">ESP32</span>
                    </li>
                    <li className="skill-item">
                      <span className="skill-icon"><i className="fas fa-memory"></i></span>
                      <span className="skill-name">Pico-SDK</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data & ML Card */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <i className={`fas fa-brain ${styles.categoryIcon}`}></i>
                  <h3 className="category-title">Data & ML</h3>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li className="skill-item">
                      <span className="skill-icon"><i className="devicon-pandas-plain"></i></span>
                      <span className="skill-name">Pandas</span>
                    </li>
                    <li className="skill-item">
                      <span className="skill-icon"><i className="devicon-scikitlearn-plain"></i></span>
                      <span className="skill-name">Scikit-learn</span>
                    </li>
                    <li className="skill-item">
                      <span className="skill-icon"><i className="fas fa-image"></i></span>
                      <span className="skill-name">Scikit-image</span>
                    </li>
                    <li className="skill-item">
                      <span className="skill-icon"><i className="devicon-pytorch-original"></i></span>
                      <span className="skill-name">PyTorch</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
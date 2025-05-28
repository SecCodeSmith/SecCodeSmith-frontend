import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from '@styles/Home.module.scss';
import SkillCard from '../components/SkillCard'
import { Spinner } from '../components/Spinner';
import { fetchSkillCardData } from '../data/skillCardData';
import { randomCodeLineData } from '../data/randomCodeLineData';
import type { SkillCardProps } from '../untils/SkillCardProps';

export const Home = () => {
  const [skills, setSkills] = useState<SkillCardProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSkillCardData();
      setSkills(data);
    };
    fetchData();
  }, []);


  const randomCodeLines = randomCodeLineData;
  useEffect(() => {
    const createBinaryBg = () => {
      const binaryBg = document.getElementById('binary-bg');
      if (!binaryBg) return;
      const linesCount = 20;

      binaryBg.innerHTML = '';

      for (let i = 0; i < linesCount; i++) {

        const line = document.createElement('div');
        line.className = styles.binaryLine;
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDuration = `${Math.random() * 10 + 15}s`;

        let lineNumber = Math.floor(Math.random() * randomCodeLines.length);
        let binaryString = randomCodeLines[lineNumber];

        line.textContent = binaryString;
        binaryBg.appendChild(line);
      }
    };

    const createParticles = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;

      particlesContainer.innerHTML = '';

      const particlesCount = 50;

      for (let i = 0; i < particlesCount; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.className = styles.particle;

          const posX = Math.random() * window.innerWidth;
          const posY = window.innerHeight - 100 + (Math.random() * 50);

          particle.style.left = `${posX}px`;
          particle.style.top = `${posY}px`;

          const size = Math.random() * 3 + 1;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;

          const xDrift = (Math.random() - 0.5) * 100;
          particle.style.setProperty('--x', `${xDrift}px`);

          const duration = Math.random() * 3 + 2;
          particle.style.animationDuration = `${duration}s`;

          particlesContainer.appendChild(particle);

          setTimeout(() => {
            particle.remove();
          }, duration * 1000);
        }, i * 100);
      }
    };

    createBinaryBg();
    createParticles();

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

  if (!skills) {
    return <Spinner />;
  }

  return (
    <>
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

      <section id="skills" className={`skills-section ${styles.skillsSection}`}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6 text-center">
              <h2 className={`section-title ${styles.sectionTitle}`}>Technical Arsenal</h2>
            </div>
          </div>
          <div className="row g-4">
            {skills && skills.map((skill) => (
                <SkillCard
                  categoryIcon={skill.categoryIcon}
                  categoryTitle={skill.categoryTitle}
                  skills={skill.skills}
                />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
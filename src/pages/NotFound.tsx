import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  useEffect(() => {
    // Create ember particles effect
    const createEmberParticles = () => {
      const particlesContainer = document.getElementById('ember-particles');
      if (!particlesContainer) return;
      
      // Clear existing particles
      particlesContainer.innerHTML = '';
      
      const emberCount = 50;
      
      for (let i = 0; i < emberCount; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember-particle';
        
        // Random position
        const startPosX = Math.random() * window.innerWidth;
        
        // Random x-axis drift
        const xDrift = (Math.random() - 0.5) * 200;
        ember.style.setProperty('--x', `${xDrift}px`);
        
        ember.style.left = `${startPosX}px`;
        ember.style.bottom = '0';
        
        // Random size
        const size = Math.random() * 3 + 1;
        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        
        // Random animation duration
        const duration = Math.random() * 7 + 3;
        ember.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        const delay = Math.random() * 5;
        ember.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(ember);
        
        // Remove and recreate ember after animation
        setTimeout(() => {
          ember.remove();
          createEmberParticles();
        }, (duration + delay) * 1000);
      }
    };
    
    createEmberParticles();
    
    // Cleanup
    return () => {
      const particlesContainer = document.getElementById('ember-particles');
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <div className="binary-bg">
      <div className="binary-line" style={{ top: '20%', left: '10%' }}>01000101 01110010 01110010 01101111 01110010</div>
      <div className="binary-line" style={{ bottom: '30%', right: '15%' }}>01001110 01101111 01110100 01000110 01101111 01110101 01101110 01100100</div>
      <div className="binary-line" style={{ top: '50%', left: '80%' }}>01000110 01100001 01101001 01101100 01100101 01100100</div>
      <div className="binary-line" style={{ bottom: '10%', left: '40%' }}>01000011 01101111 01100100 01100101 01000100 01100001 01101101 01100001 01100111 01100101 01100100</div>
    
      <div className="ember-particles" id="ember-particles"></div>
      
      <div className="container text-center error-container">
        <div className="broken-sword">
          <i className="fas fa-khanda"></i>
        </div>
        
        <div className="error-code-container">
          <h1 className="error-code">404</h1>
        </div>
        
        <h2 className="error-title">The Artifact Was Not Found</h2>
        
        <p className="error-text">The digital creation you seek has either been consumed by the void, moved to a different realm, or was never forged in the first place. Check your path and try again, or return to the main forge.</p>
        
        <Link to="/" className="home-button">
          <i className="fas fa-home"></i> Return to the Forge
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
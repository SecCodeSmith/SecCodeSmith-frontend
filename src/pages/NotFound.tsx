import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

const BINARY_STRINGS = [
  '01000101 01110010 01110010 01101111 01110010 01101111',
  '01001110 01101111 01110100 01000110 01101111 01110101 01101110 01100100',
  '01000110 01100001 01101001 01101100 01100101 01100100',
  '01000011 01101111 01100100 01100101 01000010 01110010 01100101 01100001 01101011',
];

const EMBER_COUNT = 40;
const EMBER_STAGGER_MS = 120;

export const NotFound = () => {
  const emberContainerRef = useRef<HTMLDivElement | null>(null);
  const initialTimeouts = useRef<number[]>([]);

  const binaryPositions = useMemo(
    () => [
      { top: '20%', left: '10%' },
      { bottom: '30%', right: '15%' },
      { top: '50%', left: '80%' },
      { bottom: '10%', left: '40%' },
    ],
    []
  );

  useEffect(() => {
    const particlesContainer = emberContainerRef.current;

    if (!particlesContainer) {
      return;
    }

    let disposed = false;

    const createEmber = () => {
      if (!particlesContainer || disposed) {
        return;
      }

      const ember = document.createElement('div');
      ember.className = 'ember-particle';

      const startPosX = Math.random() * window.innerWidth;
      const xDrift = (Math.random() - 0.5) * 200;
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 4 + 3;
      const delay = Math.random() * 2;
      const intensity = Math.random() * 0.5 + 0.3;

      ember.style.left = `${startPosX}px`;
      ember.style.width = `${size}px`;
      ember.style.height = `${size}px`;
      ember.style.animationDuration = `${duration}s`;
      ember.style.animationDelay = `${delay}s`;
      ember.style.setProperty('--ember-drift', `${xDrift}px`);
      ember.style.setProperty('--ember-alpha', `${intensity}`);

      const handleAnimationEnd = () => {
        ember.removeEventListener('animationend', handleAnimationEnd);
        ember.remove();

        if (!disposed) {
          requestAnimationFrame(createEmber);
        }
      };

      ember.addEventListener('animationend', handleAnimationEnd);
      particlesContainer.appendChild(ember);
    };

    for (let i = 0; i < EMBER_COUNT; i++) {
      const timeoutId = window.setTimeout(() => {
        if (!disposed) {
          createEmber();
        }
      }, i * EMBER_STAGGER_MS);

      initialTimeouts.current.push(timeoutId);
    }

    return () => {
      disposed = true;
      initialTimeouts.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      initialTimeouts.current = [];
      particlesContainer.innerHTML = '';
    };
  }, []);

  return (
    <section aria-labelledby="not-found-title" className="not-found-view">
      <div aria-hidden className="binary-bg">
        {BINARY_STRINGS.map((binary, index) => (
          <div
            aria-hidden
            className="binary-line"
            key={binary}
            style={binaryPositions[index]}
          >
            {binary}
          </div>
        ))}
      </div>

      <div aria-hidden className="ember-particles" ref={emberContainerRef} />

      <div className="container text-center error-container">
        <div className="broken-sword">
          <i className="fas fa-khanda" />
        </div>

        <div className="error-code-container">
          <h1 className="error-code">404</h1>
        </div>

        <h2 className="error-title" id="not-found-title">
          The Artifact Was Not Found
        </h2>

        <p className="error-text">
          The digital creation you seek has either been consumed by the void, moved to a different realm, or was never forged in
          the first place. Check your path and try again, or return to the main forge.
        </p>

        <Link className="home-button" to="/">
          <i className="fas fa-home" /> Return to the Forge
        </Link>
      </div>
    </section>
  );
};

export default NotFound;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { playPaperRustle } from '../utils/sound';

import { reasons } from '../data/reasons';

export default function Reasons({ onNext, onPrev }) {
  const [flipped, setFlipped] = useState(Array(6).fill(false));

  const toggleFlip = (index) => {
    playPaperRustle();
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <div className="flex-col flex-center" style={{ gap: '1.6rem', width: '100%' }}>
      <div className="section-eyebrow">why you?</div>
      <div className="section-title">Reasons I love you</div>
      
      <div className="cards">
        {reasons.map((reason, i) => (
          <motion.div 
            key={i} 
            className={`flip-card ${flipped[i] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(i)}
            whileHover={{ scale: 1.05, y: -5, rotateZ: i % 2 === 0 ? 1 : -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="flip-inner">
              <div className="flip-front">
                <img 
                  src={reason.image} 
                  alt="Reason" 
                  loading="lazy"
                  decoding="async"
                  style={{ 
                    width: '100%', 
                    height: '110px', 
                    objectFit: 'contain', 
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    borderRadius: '6px', 
                    marginBottom: '0.5rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }} 
                />
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <div className="label">tap to reveal</div>
              </div>
              <div className="flip-back flex-center">
                <p>{reason.text}</p>
              </div>
              <div className="glare-container">
                <div className="glare"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="cake-hint">tap each card to flip it</div>

      <div className="flex-center" style={{ gap: '1rem', marginTop: '3rem' }}>
        <button 
          className="next-btn" 
          onClick={onPrev} 
          style={{ background: 'transparent', border: '1px solid var(--magenta)', color: 'var(--magenta)' }}
        >
          &uarr; back
        </button>
        <button className="next-btn" onClick={onNext}>
          next &darr;
        </button>
      </div>
    </div>
  );
}

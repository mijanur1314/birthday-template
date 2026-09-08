import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { letters } from '../data/openWhen';

export default function OpenWhen({ onNext, onPrev }) {
  const [openedId, setOpenedId] = useState(null);

  return (
    <div className="open-when-container">
      <h2 className="section-title text-center" style={{ marginBottom: '2rem', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Letters for you</h2>
      
      <div className="envelopes-grid">
        {letters.map((letter) => (
          <motion.div 
            key={letter.id}
            className="mini-envelope"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenedId(letter.id)}
          >
            <div className="mini-flap" />
            <div className="mini-pocket" />
            <div className="mini-envelope-content">
              <p className="script text-center" style={{ fontSize: '1.2rem', color: '#888' }}>{letter.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {openedId && (
          <motion.div
            className="polaroid-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenedId(null)}
          >
            {letters.filter(l => l.id === openedId).map(letter => (
              <motion.div
                key={letter.id}
                className="promises-container"
                style={{ width: '90vw', maxWidth: '500px', cursor: 'default' }}
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="script" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--magenta)' }}>{letter.title}</p>
                <p className="serif-italic" style={{ fontSize: '1.3rem', lineHeight: '1.6', color: '#444' }}>
                  "{letter.message}"
                </p>
                <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#888' }}>click anywhere to close</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-center" style={{ gap: '1rem', marginTop: '3rem', position: 'relative', zIndex: 10 }}>
        <button 
          className="next-btn" 
          onClick={onPrev} 
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.6)', color: '#fff', boxShadow: 'none' }}
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

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { polaroids } from '../data/polaroids';

export default function PolaroidWall({ onNext, onPrev }) {
  const containerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for page transition to finish before mounting heavy images to prevent stutter
    const t = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="polaroid-wall-container" ref={containerRef}>
      <h2 className="section-title text-center" style={{ marginBottom: '0.5rem', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Memories</h2>
      <p className="section-eyebrow text-center" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>(Drag the photos around!)</p>
      
      <div className="polaroids-area">
        {isReady && polaroids.map((p, idx) => (
          <motion.div
            key={p.id}
            layoutId={`polaroid-${p.id}`}
            drag={!selectedId}
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1, zIndex: 100, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            initial={{ opacity: 0, scale: 0.5, rotate: p.rotate + (idx % 2 === 0 ? -20 : 20) }}
            animate={{ 
              opacity: selectedId === p.id ? 0 : 1, // Hide original when expanded
              scale: 1, 
              rotate: p.rotate, 
              x: p.x, 
              y: p.y,
              zIndex: idx 
            }}
            transition={{ duration: 0.6, delay: idx * 0.15, type: "spring" }}
            className="interactive-polaroid"
            onClick={() => {
              if (!selectedId) setSelectedId(p.id);
            }}
          >
            <div className="interactive-polaroid-inner">
              <img src={p.image} alt={p.caption} draggable="false" />
              <p className="script">{p.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="polaroid-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            {polaroids.filter(p => p.id === selectedId).map(p => (
              <motion.div
                key={p.id}
                layoutId={`polaroid-${p.id}`}
                className="interactive-polaroid expanded"
                initial={{ rotate: p.rotate }}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
              >
                <div className="interactive-polaroid-inner expanded-inner">
                  <img src={p.image} alt={p.caption} draggable="false" />
                  <p className="script" style={{ fontSize: '1.5rem', marginTop: '10px' }}>{p.caption}</p>
                  <p className="serif-italic" style={{ marginTop: '15px', color: '#666', fontSize: '1rem', lineHeight: '1.5' }}>
                    "{p.longCaption}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-center" style={{ gap: '1rem', marginTop: 'auto', position: 'relative', zIndex: 110 }}>
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

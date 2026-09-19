import { useState } from 'react';
import { motion } from 'framer-motion';
import Stardust from './Stardust';
import { useAppData } from '../context/AppDataContext';

export default function Splash({ onComplete }) {
  const [isZooming, setIsZooming] = useState(false);
  const { data } = useAppData();

  const handleStart = () => {
    if (isZooming) return;
    setIsZooming(true);
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <motion.div 
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none", transition: { duration: 1.2, ease: "easeInOut" } }}
      onClick={handleStart}
      style={{ cursor: 'pointer' }}
    >
      <Stardust />
      <div className="splash-cinematic-glow"></div>
      <div className={`splash-content ${isZooming ? 'hide-text' : ''}`}>
        <div className={`heart-glow ${isZooming ? 'zoom-in' : ''}`}>❤️</div>
        <h1 className="splash-text">For {data?.partnerName || 'You'}...</h1>
        {!isZooming && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            style={{ marginTop: '2rem', fontSize: '1.2rem', fontFamily: 'serif', letterSpacing: '2px', color: '#ffffff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
          >
            Tap anywhere to open
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

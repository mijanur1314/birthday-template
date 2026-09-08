import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppData } from '../context/AppDataContext';
import { playPaperRustle } from '../utils/sound';

export default function Envelope({ onOpen }) {
  const [opened, setOpened] = useState(false);
  const { data } = useAppData();

  const handleClick = () => {
    if (opened) return;
    playPaperRustle();
    setOpened(true);
    onOpen();
  };

  return (
    <div className="envelope-wrap" onClick={handleClick}>
      <div className="flex-col flex-center" style={{ gap: '0.5rem' }}>
        <div className="hero-title">A little something for</div>
        <div className="hero-sub script">{data?.partnerName || 'You'}</div>
      </div>
      
      <div className="cinematic-glow"></div>
      <motion.div 
        className={`envelope ${opened ? 'open' : ''}`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="env-body paper-texture">
          <div className="env-shade-left"></div>
          <div className="env-shade-right"></div>
          <div className="env-label">{data?.partnerName || 'Your Partner'} ♡</div>
        </div>
        <div className="letter-paper paper-texture">
          <p>Happy Birthday, My Love 😗</p>
        </div>
        <div className="env-pocket"></div>
        <div className="env-flap paper-texture"></div>
        <div className="seal">N</div>
      </div>
      
      {!opened && <div className="tap-hint">tap the envelope to open it</div>}
    </div>
  );
}

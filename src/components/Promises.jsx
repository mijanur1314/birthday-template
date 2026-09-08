import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { promisesList } from '../data/promises';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Promises({ onNext, onPrev }) {
  return (
    <div className="promises-container glass-panel">
      <div className="section-eyebrow">A Look Ahead</div>
      <h2 className="section-title">Promises for Our Future</h2>
      
      <motion.div 
        className="promises-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {promisesList.map((promise, index) => (
          <motion.div key={index} className="promise-item" variants={itemVariants}>
            <Sparkles size={20} className="promise-icon" strokeWidth={1.5} />
            <p className="serif-italic">{promise.text}</p>
          </motion.div>
        ))}
      </motion.div>

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

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { playPaperRustle } from '../utils/sound';

import { storyPages } from '../data/storyPages';

export default function StoryBook({ onNext, onPrev }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    playPaperRustle();
    if (index < storyPages.length - 1) {
      setIndex(index + 1);
    } else {
      onNext();
    }
  };

  const prev = () => {
    playPaperRustle();
    if (index > 0) {
      setIndex(index - 1);
    } else if (onPrev) {
      onPrev();
    }
  };

  return (
    <div className="flex-col flex-center" style={{ gap: '1rem', width: '100%' }}>
      <div className="section-eyebrow">a few moments</div>
      <div className="section-title">Our story so far</div>
      
      <div className="story-book">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 15, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="story-page"
            style={{ transformOrigin: 'left center' }}
          >
            <div className="page-no">page {index + 1} of {storyPages.length}</div>
            
            <div className="polaroid-frame">
              <img 
                src={storyPages[index].image} 
                alt="Our story" 
                className="polaroid-img"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="page-icon">{storyPages[index].icon}</div>
            <div className="story-date" style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic', marginBottom: '-0.5rem' }}>{storyPages[index].date}</div>
            <div className="page-title">{storyPages[index].title}</div>
            <p>{storyPages[index].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="story-nav">
        <button className="story-arrow" onClick={prev}>
          <ArrowLeft size={20} />
        </button>
        <div className="story-dots">
          {storyPages.map((_, i) => (
            <div key={i} className={`story-dot ${i === index ? 'active' : ''}`} />
          ))}
        </div>
        <button className="story-arrow" onClick={next}>
          {index === storyPages.length - 1 ? <Check size={20} /> : <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
}

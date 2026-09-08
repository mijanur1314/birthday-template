import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { config } from '../data/config';

export default function Countdown({ onComplete }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(config.targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null;
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hasEntered, setHasEntered] = useState(false);
  const tickAudioRef = useRef(null);

  useEffect(() => {
    tickAudioRef.current = new Audio('/tick.mp3');
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (!newTimeLeft) {
        clearInterval(timer);
        if (tickAudioRef.current) {
          tickAudioRef.current.pause();
        }
        if (onComplete) onComplete();
      } else {
        setTimeLeft(newTimeLeft);
        if (hasEntered && tickAudioRef.current) {
          tickAudioRef.current.currentTime = 0;
          tickAudioRef.current.play().catch(e => console.log("Tick audio missing", e));
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      if (tickAudioRef.current) {
        tickAudioRef.current.pause();
      }
    };
  }, [onComplete, hasEntered]);

  if (!timeLeft) return null;

  if (!hasEntered) {
    return (
      <motion.div 
        className="countdown-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="countdown-content glass-panel">
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>A Surprise Awaits...</h2>
          <button 
            className="next-btn"
            onClick={() => {
              setHasEntered(true);
              if (tickAudioRef.current) {
                tickAudioRef.current.play().catch(e => console.log("Tick audio missing", e));
              }
            }}
          >
            Unlock
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="countdown-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="countdown-content glass-panel">
        <div className="section-eyebrow">Just a little longer...</div>
        <h2 className="section-title">Your Surprise Unlocks In</h2>
        
        <div className="countdown-timer">
          {timeLeft.days > 0 && (
            <div className="time-box">
              <span className="time-value">{timeLeft.days}</span>
              <span className="time-label">Days</span>
            </div>
          )}
          <div className="time-box">
            <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="time-label">Hours</span>
          </div>
          <div className="time-box">
            <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="time-label">Mins</span>
          </div>
          <div className="time-box">
            <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="time-label">Secs</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


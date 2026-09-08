import { useState } from 'react';
import { motion } from 'framer-motion';

const symbols = ['🩷', '💗', '♡'];

export default function FloatingHearts() {
  const [hearts] = useState(() => Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    left: Math.random() * 100,
    drift: Math.random() * 80 - 40,
    duration: 10 + Math.random() * 10,
    delay: Math.random() * 10,
    size: 1 + Math.random() * 1.2
  })));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {hearts.map(h => (
        <motion.div
          key={h.id}
          initial={{ y: '100vh', x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '-115vh',
            x: h.drift,
            opacity: [0, 0.6, 0.5, 0],
            rotate: 25
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            left: `${h.left}vw`,
            bottom: '-10%',
            color: 'var(--hot-pink)',
            fontSize: `${h.size}rem`
          }}
        >
          {h.symbol}
        </motion.div>
      ))}
    </div>
  );
}

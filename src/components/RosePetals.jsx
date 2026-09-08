import { motion } from 'framer-motion';
import { useState } from 'react';

// A single realistic rose petal SVG
const PetalSVG = ({ size = 24, color = "#ff2a5f", opacity = 0.8 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    style={{ opacity, filter: 'drop-shadow(0px 4px 6px rgba(194, 24, 91, 0.4))' }}
  >
    <path 
      d="M50 100 C 20 80, 0 50, 10 20 C 20 5, 40 10, 50 30 C 60 10, 80 5, 90 20 C 100 50, 80 80, 50 100" 
      fill={color} 
    />
    {/* Inner shadow/gradient effect for realism */}
    <path 
      d="M50 90 C 25 75, 10 50, 15 25 C 25 15, 40 20, 50 40 C 60 20, 75 15, 85 25 C 90 50, 75 75, 50 90" 
      fill="rgba(0,0,0,0.1)" 
    />
  </svg>
);

const RosePetals = () => {
  const [petals] = useState(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 15 + 15; // 15px to 30px
      const left = Math.random() * 100; // 0% to 100%
      const animationDuration = Math.random() * 10 + 10; // 10s to 20s
      const delay = Math.random() * -20; // negative delay so they appear immediately
      const sway = Math.random() * 100 - 50; // -50 to 50
      
      // Elegant romantic colors
      const colors = ['#ff2a5f', '#e9518f', '#ff4d79', '#c2185b'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return { id: i, size, left, animationDuration, delay, color, sway };
    });
  });

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {petals.map(petal => (
        <motion.div
          key={petal.id}
          initial={{ y: '-10vh', opacity: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 1, 1, 0],
            rotateZ: [0, 360],
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
            x: [0, petal.sway, 0] // Gentle sway
          }}
          transition={{
            y: {
              duration: petal.animationDuration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay
            },
            opacity: {
              duration: petal.animationDuration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay
            },
            rotateZ: {
              duration: petal.animationDuration * 0.6,
              repeat: Infinity,
              ease: "linear"
            },
            rotateX: {
              duration: petal.animationDuration * 0.8,
              repeat: Infinity,
              ease: "linear"
            },
            rotateY: {
              duration: petal.animationDuration * 0.7,
              repeat: Infinity,
              ease: "linear"
            },
            x: {
              duration: petal.animationDuration * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror"
            }
          }}
          style={{
            position: 'absolute',
            left: `${petal.left}%`,
          }}
        >
          <PetalSVG size={petal.size} color={petal.color} />
        </motion.div>
      ))}
    </div>
  );
};

export default RosePetals;

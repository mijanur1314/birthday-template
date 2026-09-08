import { useEffect, useState } from 'react';

export default function Stardust() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let particleId = 0;

    const handlePointerMove = (e) => {
      if (Math.random() > 0.3) return;
      
      let x, y;
      if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      
      if (x === undefined || y === undefined) return;

      const newParticle = {
        id: particleId++,
        x,
        y,
        size: Math.random() * 6 + 4,
        hue: Math.floor(Math.random() * 40) - 20,
      };

      setParticles(prev => [...prev, newParticle]);

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 2000);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="stardust"
          style={{
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            filter: `hue-rotate(${p.hue}deg)`
          }}
        />
      ))}
    </div>
  );
}

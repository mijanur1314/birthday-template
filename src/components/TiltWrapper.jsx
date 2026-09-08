import { useState, useRef, useEffect } from 'react';

export default function TiltWrapper({ children, maxTilt = 15 }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the element
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Convert to a percentage and scale by maxTilt
      const tiltX = (y / (rect.height / 2)) * -maxTilt;
      const tiltY = (x / (rect.width / 2)) * maxTilt;
      
      setTilt({
        x: Math.max(Math.min(tiltX, maxTilt), -maxTilt),
        y: Math.max(Math.min(tiltY, maxTilt), -maxTilt)
      });
    };

    const handleDeviceOrientation = (e) => {
      if (!e.beta || !e.gamma) return;
      // beta is front/back tilt (around x axis), gamma is left/right tilt (around y axis)
      let tiltX = e.beta - 45; // Assume holding phone at 45 degree angle
      let tiltY = e.gamma;
      
      // Scale down and limit
      tiltX = Math.max(Math.min(tiltX * 0.5, maxTilt), -maxTilt);
      tiltY = Math.max(Math.min(tiltY * 0.5, maxTilt), -maxTilt);
      
      setTilt({ x: -tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    const el = wrapperRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    }
    
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [maxTilt]);

  return (
    <div 
      ref={wrapperRef}
      style={{
        perspective: '1500px',
        display: 'inline-block',
        width: '100%'
      }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {children}
      </div>
    </div>
  );
}

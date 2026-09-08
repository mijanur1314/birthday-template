import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function VideoNote({ onNext, onPrev, onPlayVideo }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRef = useRef(null);
  
  // NOTE: The user should replace '/message.mp4' with their actual video file in the public folder.
  
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateProgress = () => {
      const current = media.currentTime;
      const duration = media.duration || 1;
      setProgress((current / duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    media.addEventListener('timeupdate', updateProgress);
    media.addEventListener('ended', handleEnded);

    return () => {
      media.removeEventListener('timeupdate', updateProgress);
      media.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        if (onPlayVideo) onPlayVideo(); // Auto-pause BGM
        const playPromise = mediaRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Video file not found yet. Add message.mp4 to public folder.", error);
            simulatePlaying();
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const simulatePlaying = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsPlaying(false);
        setProgress(0);
      }
    }, 100);
    return () => clearInterval(interval);
  };

  return (
    <div className="video-note-container glass-panel">
      <div className="section-eyebrow">Look at me</div>
      <h2 className="section-title">A Message For You</h2>
      
      <div className="video-player-wrapper">
        <motion.div 
          className="visualizer-glow"
          animate={{ 
            scale: isPlaying ? [1, 1.05, 1] : 1,
            opacity: isPlaying ? [0.4, 0.6, 0.4] : 0.2
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        
        <div className="video-container">
          <video 
            ref={mediaRef} 
            src="/message.mp4" 
            className="message-video"
            playsInline
            preload="metadata"
            onClick={togglePlay}
          />
          
          <div className={`video-overlay-controls ${isPlaying ? 'fade-out' : ''}`} onClick={togglePlay}>
            <button className="play-btn video-play-btn">
              <Play size={40} color="#fff" style={{ marginLeft: '4px' }} />
            </button>
          </div>
        </div>
        
        <div className="video-progress-bar-bg">
          <div className="video-progress-bar-fill" style={{ width: `${progress}%` }}>
            <div className="video-progress-bar-thumb" />
          </div>
        </div>
      </div>

      <div className="flex-center" style={{ gap: '1rem', marginTop: '3rem' }}>
        <button 
          className="next-btn" 
          onClick={onPrev} 
          style={{ background: 'transparent', border: '1px solid var(--magenta)', color: 'var(--magenta)', boxShadow: 'none' }}
        >
          &uarr; back
        </button>
        <button className="next-btn" onClick={onNext}>
          make a wish &darr;
        </button>
      </div>
    </div>
  );
}

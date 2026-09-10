import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';
import RosePetals from './components/RosePetals';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import StoryBook from './components/StoryBook';
import Reasons from './components/Reasons';
import Promises from './components/Promises';
import OpenWhen from './components/OpenWhen';
import PolaroidWall from './components/PolaroidWall';
import VideoNote from './components/VideoNote';
import Cake from './components/Cake';
import Closing from './components/Closing';

import TiltWrapper from './components/TiltWrapper';
import Splash from './components/Splash';
import Stardust from './components/Stardust';
import Countdown from './components/Countdown';
import Quiz from './components/Quiz';
import SetupMode from './components/SetupMode';
import { useAppData } from './context/AppDataContext';
import { playChime } from './utils/sound';

const imagesToPreload = [
  "/placeholder.svg"
];

export default function App() {
  const { data, isSetupComplete, editData, isCreator, resetData } = useAppData();

  useEffect(() => {
    if (window.location.search.includes("reset=true")) {
      resetData();
      window.history.replaceState({}, "", "/");
    }
  }, []);
  
  const config = data?.config;
  const pageOrder = data?.pageOrder || [];

  const [showCountdown, setShowCountdown] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    if (isSetupComplete && config) {
      if (window.location.search.includes('dev=true')) {
        setShowCountdown(false);
        setShowQuiz(false);
        return;
      }
      setShowCountdown(config.enableTimer && (+new Date(config.targetDate) - +new Date()) > 0);
      setShowQuiz(config.enableQuiz);
    }
  }, [isSetupComplete, config]);
  const [showSplash, setShowSplash] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [cakeBlown, setCakeBlown] = useState(false);
  const [litCandles, setLitCandles] = useState(Array(data?.cakeAge?.length || 2).fill(true));
  
  const [currentStep, setCurrentStep] = useState('envelope');
  const cakeAudioRef = useRef(null);
  const bgmAudioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    cakeAudioRef.current = new Audio('/birthday_tune.mp3');
    cakeAudioRef.current.volume = 0.8;
    
    bgmAudioRef.current = new Audio('/bgm.mp3');
    bgmAudioRef.current.loop = true;
    bgmAudioRef.current.volume = 0.4;
  }, []);

  useEffect(() => {
    if (!isSetupComplete && bgmAudioRef.current) {
      bgmAudioRef.current.pause();
      bgmAudioRef.current.currentTime = 0;
      setIsMusicPlaying(false);
    }
  }, [isSetupComplete]);

  const toggleMusic = () => {
    if (!bgmAudioRef.current) return;
    if (!bgmAudioRef.current.paused) {
      bgmAudioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      bgmAudioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(e => console.log("Add bgm.mp3 to public folder for music!", e));
    }
  };

  const pauseMusic = useCallback(() => {
    if (bgmAudioRef.current && !bgmAudioRef.current.paused) {
      bgmAudioRef.current.pause();
      setIsMusicPlaying(false);
    }
  }, []);

  useEffect(() => {
    // Auto pause BGM when entering Cake page
    if (currentStep === 'cake') {
      pauseMusic();
    }
  }, [currentStep, pauseMusic]);

  const startApp = () => {
    setShowSplash(false);
    if (bgmAudioRef.current) {
      bgmAudioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(e => console.log("Add bgm.mp3 to public folder for music!", e));
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back 🥺";
      } else {
        document.title = `Happy Birthday, ${data?.partnerName || ''} 💖`;
      }
    };
    
    document.title = `Happy Birthday, ${data?.partnerName || ''} 💖`;
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Initialize browser history for the back button
    window.history.replaceState({ step: pageOrder[0] || 'envelope' }, '');

    const handlePopState = (event) => {
      if (event.state && event.state.step) {
        setCurrentStep(event.state.step);
      } else {
        setCurrentStep(pageOrder[0] || 'envelope');
      }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const stepIndex = pageOrder.indexOf(currentStep);

  const goToNextStep = () => {
    if (stepIndex < pageOrder.length - 1) {
      const next = pageOrder[stepIndex + 1];
      setCurrentStep(next);
      window.history.pushState({ step: next }, '');
    }
  };

  const goToPrevStep = () => {
    if (stepIndex > 0) {
      const prev = pageOrder[stepIndex - 1];
      setCurrentStep(prev);
      window.history.pushState({ step: prev }, '');
    }
  };

  const handleEnvelopeOpen = () => {
    setTimeout(() => {
      goToNextStep();
    }, 2400);
  };

  const restartApp = () => {
    setCurrentStep(pageOrder[0] || 'envelope');
    setCakeBlown(false);
    setLitCandles(Array(data?.cakeAge?.length || 2).fill(true));
    if (cakeAudioRef.current) {
      cakeAudioRef.current.pause();
      cakeAudioRef.current.currentTime = 0;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!data) return null;

  if (!isSetupComplete) {
    return <SetupMode />;
  }

  return (
    <>
      {/* Invisible DOM preloader for heavy uncompressed images */}
      <div style={{ opacity: 0, position: 'absolute', pointerEvents: 'none', width: 1, height: 1, overflow: 'hidden', zIndex: -9999 }}>
        {imagesToPreload.map(src => (
          <img key={src} src={src} alt="preload" decoding="sync" />
        ))}
      </div>

      {/* Secret reset trigger corner - ONLY FOR CREATOR */}
      {isCreator && (
        <div 
          onClick={editData}
          style={{ position: 'fixed', bottom: 0, right: 0, width: '50px', height: '50px', zIndex: 99999 }}
        />
      )}

      {/* Background effects constantly running */}
      <RosePetals />

      <AnimatePresence>
        {showCountdown && (
          <Countdown key="countdown" onComplete={() => setShowCountdown(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showCountdown && showQuiz && (
          <Quiz key="quiz" onComplete={() => setShowQuiz(false)} />
        )}
      </AnimatePresence>

      {!showCountdown && !showQuiz && (
        <>
          {!showSplash && (
            <button 
              onClick={toggleMusic} 
              className="music-toggle-btn"
              title="Toggle Background Music"
            >
              {isMusicPlaying ? <Music size={20} color="#fff" /> : <VolumeX size={20} color="rgba(255,255,255,0.6)" />}
            </button>
          )}
          <Stardust />
      <div 
        className="secret-star" 
        onContextMenu={(e) => {
          e.preventDefault();
          playChime();
          setShowEasterEgg(true);
        }}
        onClick={() => {
          playChime();
          setShowEasterEgg(true);
        }}
      >
        ✨
      </div>

      <AnimatePresence>
        {showSplash && <Splash key="splash" onComplete={startApp} />}
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="page-progress">
        {pageOrder.map((step, idx) => (
          <div
            key={step}
            className={`pdot ${idx === stepIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      <main className="fixed-inset">
        <AnimatePresence mode="wait" onExitComplete={() => {
          const mainScroll = document.querySelector('.fixed-inset');
          if (mainScroll) mainScroll.scrollTo(0, 0);
        }}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="view-container"
          >
            {currentStep === 'envelope' && <TiltWrapper><Envelope onOpen={handleEnvelopeOpen} /></TiltWrapper>}
            {currentStep === 'letter' && <TiltWrapper maxTilt={10}><Letter onNext={goToNextStep} /></TiltWrapper>}
            {currentStep === 'story' && <TiltWrapper maxTilt={8}><StoryBook onNext={goToNextStep} onPrev={goToPrevStep} /></TiltWrapper>}
            {currentStep === 'reasons' && <TiltWrapper maxTilt={6}><Reasons onNext={goToNextStep} onPrev={goToPrevStep} /></TiltWrapper>}
            {currentStep === 'promises' && <TiltWrapper maxTilt={5}><Promises onNext={goToNextStep} onPrev={goToPrevStep} /></TiltWrapper>}
            {currentStep === 'openwhen' && <OpenWhen onNext={goToNextStep} onPrev={goToPrevStep} />}
            {currentStep === 'polaroids' && <PolaroidWall onNext={goToNextStep} onPrev={goToPrevStep} />}
            {currentStep === 'videonote' && <TiltWrapper maxTilt={4}><VideoNote onNext={goToNextStep} onPrev={goToPrevStep} onPlayVideo={pauseMusic} /></TiltWrapper>}
            {currentStep === 'cake' && <Cake onNext={goToNextStep} onPrev={goToPrevStep} cakeAudioRef={cakeAudioRef} cakeBlown={cakeBlown} onCakeBlown={() => setCakeBlown(true)} litCandles={litCandles} setLitCandles={setLitCandles} />}
            {currentStep === 'closing' && <Closing onPrev={goToPrevStep} onRestart={restartApp} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showEasterEgg && (
          <motion.div 
            className="easter-egg-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="easter-egg-content glass-panel premium-shadow">
              <h2 className="script text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>P.S.</h2>
              <p className="serif-normal" style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                You found the secret star! I just wanted to hide this here to remind you that even when you aren't looking, I am thinking of you. I love you more than words could ever say. 
              </p>
              <button className="next-btn" onClick={() => setShowEasterEgg(false)}>close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </>
      )}
    </>
  );
}

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { playPaperRustle } from "../utils/sound";

const ElegantBalloon = ({ size = 120, delay = 0, style }) => {
  return (
    <motion.div 
      style={{ 
        ...style, 
        position: 'absolute', 
        width: size, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        filter: 'drop-shadow(15px 35px 20px rgba(89, 43, 56, 0.4))'
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 4 + delay, ease: "easeInOut" }}
    >
      <svg width={size} height={size * 6.5} viewBox="-60 -60 120 780" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id={`white-balloon-${size}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f9f6f7" />
            <stop offset="80%" stopColor="#e3d5d9" />
            <stop offset="100%" stopColor="#cbb3b9" />
          </radialGradient>
        </defs>
        {/* Balloon Body */}
        <path d="M0,60 C45,60 55,20 55,-10 C55,-45 30,-60 0,-60 C-30,-60 -55,-45 -55,-10 C-55,20 -45,60 0,60 Z" fill={`url(#white-balloon-${size})`} />
        {/* Tie */}
        <path d="M-6,60 L6,60 L9,66 L-9,66 Z" fill="#d1babf" />
        
        {/* Pink Bow */}
        <g transform="translate(0, 65)">
           <path d="M 0 0 C -18 -18 -40 5 0 0" fill="#eb9db0" />
           <path d="M 0 0 C 18 -18 40 5 0 0" fill="#eb9db0" />
           <path d="M 0 0 Q -5 25 -12 40 Q -2 20 0 0" fill="#d87b92" />
           <path d="M 0 0 Q 5 25 12 40 Q 2 20 0 0" fill="#d87b92" />
           <circle cx="0" cy="0" r="4" fill="#c66d7d" />
        </g>

        {/* Curly Ribbon */}
        <path d="M0,70 Q 15,95 0,120 T 0,170 T 0,220 T 0,270 T 0,320 T 0,370 T 0,420 T 0,470 T 0,520 T 0,570 T 0,620 T 0,670 T 0,720 T 0,770" fill="none" stroke="#e2a1b1" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

const StandaloneBow = ({ style }) => (
  <div style={{ ...style, position: 'absolute', filter: 'drop-shadow(10px 15px 10px rgba(89, 43, 56, 0.3))' }}>
    <svg width="60" height="70" viewBox="-30 -10 60 70">
       <path d="M 0 0 C -15 -15 -35 5 0 0" fill="#eb9db0" />
       <path d="M 0 0 C 15 -15 35 5 0 0" fill="#eb9db0" />
       <path d="M 0 0 Q -5 25 -10 40 Q -2 20 0 0" fill="#d87b92" />
       <path d="M 0 0 Q 5 25 10 40 Q 2 20 0 0" fill="#d87b92" />
       <circle cx="0" cy="0" r="3" fill="#c66d7d" />
       {/* Small curly ribbon under bow */}
       <path d="M0,5 Q 8,20 0,35 T 0,65" fill="none" stroke="#e2a1b1" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

const ElegantBackdrop = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1.5 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {isMobile ? (
        <>
          {/* Mobile Layout: Smaller balloons, tucked into the far edges to avoid overlapping the cake */}
          <ElegantBalloon size={85} delay={0} style={{ top: '5%', left: '-15px' }} />
          <ElegantBalloon size={75} delay={1.2} style={{ top: '25%', left: '-25px' }} />
          
          <ElegantBalloon size={85} delay={0.2} style={{ top: '5%', right: '-15px' }} />
          <ElegantBalloon size={75} delay={1.5} style={{ top: '25%', right: '-25px' }} />

          <StandaloneBow style={{ top: '15%', left: '-5px', transform: 'scale(0.8)' }} />
          <StandaloneBow style={{ top: '15%', right: '-5px', transform: 'scale(0.8)' }} />
        </>
      ) : (
        <>
          {/* Desktop Layout */}
          {/* Left Side Balloons */}
          <ElegantBalloon size={120} delay={0} style={{ top: '6%', left: '5%' }} />
          <ElegantBalloon size={105} delay={0.5} style={{ top: '18%', left: '16%' }} />
          <ElegantBalloon size={115} delay={1.2} style={{ top: '32%', left: '6%' }} />
          
          {/* Right Side Balloons */}
          <ElegantBalloon size={120} delay={0.2} style={{ top: '6%', right: '5%' }} />
          <ElegantBalloon size={105} delay={0.7} style={{ top: '18%', right: '16%' }} />
          <ElegantBalloon size={115} delay={1.5} style={{ top: '32%', right: '6%' }} />

          {/* Left Side Bows */}
          <StandaloneBow style={{ top: '15%', left: '2%' }} />
          <StandaloneBow style={{ top: '28%', left: '22%' }} />
          <StandaloneBow style={{ top: '45%', left: '12%' }} />

          {/* Right Side Bows */}
          <StandaloneBow style={{ top: '15%', right: '2%' }} />
          <StandaloneBow style={{ top: '28%', right: '22%' }} />
          <StandaloneBow style={{ top: '45%', right: '12%' }} />
        </>
      )}
    </motion.div>
  );
};

export default function Cake({
  onNext,
  onPrev,
  cakeAudioRef,
  cakeBlown,
  onCakeBlown,
  litCandles,
  setLitCandles,
}) {
  const [allOut, setAllOut] = useState(cakeBlown);
  const [showNext, setShowNext] = useState(cakeBlown);
  const [openedGifts, setOpenedGifts] = useState({});
  const litCandlesRef = useRef(litCandles);
  const blowOutRef = useRef(null);

  const handleOpenGift = (index) => {
    if (!openedGifts[index]) {
      playPaperRustle();
      setOpenedGifts((prev) => ({ ...prev, [index]: true }));
    }
  };

  const giftItems = [
    {
      id: 0,
      closed: "🎁",
      open: "🧸",
      style: { left: "-25px", bottom: "30px" },
      delay: 0.5,
      size: "3.5rem",
      rotate: -15,
    },
    {
      id: 1,
      closed: "🎁",
      open: "🍫",
      style: { right: "-20px", bottom: "25px" },
      delay: 0.8,
      size: "3.8rem",
      rotate: 15,
    },
    {
      id: 2,
      closed: "🎁",
      open: "🌹",
      style: { right: "40px", bottom: "-10px" },
      delay: 1.1,
      size: "3.2rem",
      rotate: 25,
    },
    {
      id: 3,
      closed: "🎁",
      open: "💍",
      style: { left: "45px", bottom: "-5px" },
      delay: 1.4,
      size: "3rem",
      rotate: -20,
    },
  ];

  useEffect(() => {
    litCandlesRef.current = litCandles;
  }, [litCandles]);

  useEffect(() => {
    let audioContext;
    let analyser;
    let microphone;
    let animationFrame;
    let mediaStream;

    const initMic = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(mediaStream);

        analyser.fftSize = 256;
        microphone.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let blowProgress = 0;

        const checkVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          // Wind noise from blowing is mostly concentrated in the lower frequencies
          const binsToCheck = 30;
          for (let i = 0; i < binsToCheck; i++) {
            sum += dataArray[i];
          }
          const average = sum / binsToCheck;

          if (average > 100) {
            // Detection threshold for low-frequency blowing
            blowProgress += 1;
            if (
              blowProgress > 15 &&
              litCandlesRef.current[1] &&
              blowOutRef.current
            )
              blowOutRef.current(1);
            if (
              blowProgress > 30 &&
              litCandlesRef.current[0] &&
              blowOutRef.current
            )
              blowOutRef.current(0);
          } else {
            blowProgress = Math.max(0, blowProgress - 2);
          }

          animationFrame = requestAnimationFrame(checkVolume);
        };
        checkVolume();
      } catch (err) {
        console.log("Microphone access denied or not available", err);
      }
    };

    if (!allOut) {
      initMic();
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (audioContext && audioContext.state !== "closed") {
        audioContext.close();
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [allOut]);

  const blowOut = (index) => {
    if (!litCandles[index]) return;

    // Play music when the first candle is blown out
    if (litCandles.every((c) => c) && cakeAudioRef && cakeAudioRef.current) {
      cakeAudioRef.current
        .play()
        .catch((e) => console.log("Audio autoplay prevented:", e));
    }

    const newCandles = [...litCandles];
    newCandles[index] = false;
    setLitCandles(newCandles);
  };

  useEffect(() => {
    blowOutRef.current = blowOut;
  });

  useEffect(() => {
    if (litCandles.every((c) => !c) && !allOut) {
      // eslint-disable-next-line react/set-state-in-effect
      setAllOut(true);
      if (onCakeBlown) onCakeBlown();

      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#E9518F", "#C2185B", "#D8A544", "#FFD9E8", "#ffffff"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#E9518F", "#C2185B", "#D8A544", "#FFD9E8", "#ffffff"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Play birthday tune if we have the ref
      if (cakeAudioRef && cakeAudioRef.current) {
        cakeAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }

      setTimeout(() => setShowNext(true), 1500);
    }
  }, [litCandles, allOut, onCakeBlown, cakeAudioRef]);

  return (
    <div
      className="flex-col flex-center"
      style={{ gap: "1.6rem", position: "relative" }}
    >
      {/* Room Decoration Backdrop */}
      <ElegantBackdrop />

      <div className="section-eyebrow">make a wish</div>
      <div className="section-title">Blow out the candles</div>

      <div className="cake-wrap" style={{ position: "relative" }}>
        <div className="cinematic-glow" style={{ top: "40%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(233,81,143,0.3) 0%, rgba(233,81,143,0) 70%)" }}></div>
        <div className="cake-stand">
        <svg
          id="cakeSvg"
          width="300"
          height="280"
          viewBox="-20 -20 300 280"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter
              id="drop-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="5"
                stdDeviation="4"
                floodOpacity="0.35"
              />
            </filter>

            <filter
              id="stand-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="12"
                stdDeviation="8"
                floodOpacity="0.25"
              />
            </filter>

            <radialGradient id="plateGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#f4f4f4" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#d8d8d8" stopOpacity="1" />
            </radialGradient>

            <linearGradient id="tier1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b71b53" />
              <stop offset="15%" stopColor="#e94383" />
              <stop offset="85%" stopColor="#e94383" />
              <stop offset="100%" stopColor="#8d103c" />
            </linearGradient>

            <linearGradient
              id="tier1TopGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff7aae" />
              <stop offset="100%" stopColor="#db3170" />
            </linearGradient>

            <linearGradient id="tier2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0d5d9" />
              <stop offset="15%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d2c1c7" />
            </linearGradient>

            <linearGradient
              id="tier2TopGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f3dae3" />
            </linearGradient>

            <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8d8d3" />
              <stop offset="30%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d1bab3" />
            </linearGradient>

            <linearGradient id="pinkGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF85B3" />
              <stop offset="25%" stopColor="#E9518F" />
              <stop offset="50%" stopColor="#C2185B" />
              <stop offset="75%" stopColor="#E9518F" />
              <stop offset="100%" stopColor="#FF85B3" />
            </linearGradient>

            <filter id="pinkShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="2" stdDeviation="1.5" floodColor="#5A0A28" floodOpacity="0.7" />
            </filter>
          </defs>

          {/* Cake Stand Base */}
          <path
            d="M 110 215 L 110 235 A 20 10 0 0 0 150 235 L 150 215 Z"
            fill="#b0b0b0"
            filter="url(#stand-shadow)"
          />
          <ellipse cx="130" cy="235" rx="35" ry="12" fill="#c5c5c5" />

          {/* Plate */}
          <ellipse
            cx="130"
            cy="210"
            rx="125"
            ry="25"
            fill="#999"
            filter="url(#stand-shadow)"
          />
          <ellipse cx="130" cy="205" rx="125" ry="25" fill="url(#plateGrad)" />

          {/* Shadow of Cake on Plate */}
          <ellipse cx="130" cy="195" rx="98" ry="20" fill="rgba(0,0,0,0.18)" />

          {/* Bottom Tier (Pink) */}
          <path
            d="M 40 130 L 40 190 A 90 20 0 0 0 220 190 L 220 130 Z"
            fill="url(#tier1Grad)"
          />
          <ellipse
            cx="130"
            cy="130"
            rx="90"
            ry="20"
            fill="url(#tier1TopGrad)"
          />

          {/* Bottom Tier Base Piping */}
          <path
            d="M 40 190 A 90 20 0 0 0 220 190"
            fill="none"
            stroke="#fff"
            strokeWidth="14"
            strokeDasharray="2 18"
            strokeLinecap="round"
            opacity="0.9"
            filter="url(#drop-shadow)"
          />

          {/* Shadow of Top Tier on Bottom Tier */}
          <ellipse cx="130" cy="130" rx="72" ry="16" fill="rgba(0,0,0,0.2)" />

          {/* Top Tier (White) */}
          <path
            d="M 65 80 L 65 130 A 65 15 0 0 0 195 130 L 195 80 Z"
            fill="url(#tier2Grad)"
          />
          <ellipse cx="130" cy="80" rx="65" ry="15" fill="url(#tier2TopGrad)" />

          {/* Top Tier Base Piping */}
          <path
            d="M 65 130 A 65 15 0 0 0 195 130"
            fill="none"
            stroke="#e94383"
            strokeWidth="10"
            strokeDasharray="2 15"
            strokeLinecap="round"
            opacity="0.9"
            filter="url(#drop-shadow)"
          />

          {/* Strawberry Dripping Icing */}
          <path
            d="M 65 80 
                   C 65 92, 72 92, 75 80
                   C 75 105, 90 105, 95 82
                   C 100 115, 115 115, 120 83
                   C 120 110, 135 110, 140 82
                   C 145 118, 165 118, 170 81
                   C 175 95, 195 95, 195 80
                   Z"
            fill="url(#tier1Grad)"
            filter="url(#drop-shadow)"
          />

          <ellipse cx="130" cy="80" rx="65" ry="15" fill="url(#tier1Grad)" />

          {/* Sprinkles */}
          <g id="sprinkles">
            <rect
              x="95"
              y="75"
              width="7"
              height="2.5"
              rx="1"
              fill="#fff"
              transform="rotate(30 95 75)"
            />
            <rect
              x="120"
              y="71"
              width="7"
              height="2.5"
              rx="1"
              fill="#FFD700"
              transform="rotate(-45 120 71)"
            />
            <rect
              x="145"
              y="78"
              width="7"
              height="2.5"
              rx="1"
              fill="#00E5FF"
              transform="rotate(60 145 78)"
            />
            <rect
              x="110"
              y="85"
              width="7"
              height="2.5"
              rx="1"
              fill="#fff"
              transform="rotate(-15 110 85)"
            />
            <rect
              x="160"
              y="73"
              width="7"
              height="2.5"
              rx="1"
              fill="#FFD700"
              transform="rotate(80 160 73)"
            />
            <rect
              x="85"
              y="82"
              width="7"
              height="2.5"
              rx="1"
              fill="#00E5FF"
              transform="rotate(10 85 82)"
            />
            <rect
              x="130"
              y="86"
              width="7"
              height="2.5"
              rx="1"
              fill="#fff"
              transform="rotate(-70 130 86)"
            />
          </g>

          {/* Candles */}
          <g id="candles">
            {[105, 140].map((x, i) => {
              const baseY = 78;
              const topY = baseY - 24; // White stick goes up to topY
              const number = i === 0 ? "2" : "3";
              return (
                <g key={i} className="candle">
                  {/* Shadow */}
                  <ellipse
                    cx={x + 7}
                    cy={baseY}
                    rx="8"
                    ry="3"
                    fill="rgba(0,0,0,0.2)"
                  />

                  {/* White Stick */}
                  <rect
                    x={x + 5}
                    y={topY}
                    width="4"
                    height="24"
                    fill="#fff"
                    rx="2"
                    filter="url(#drop-shadow)"
                  />

                  {/* Metallic Pink 3D Number */}
                  <text
                    x={x + 7}
                    y={topY + 6}
                    fill="url(#pinkGrad)"
                    stroke="#C2185B"
                    strokeWidth="1.5"
                    fontSize="42"
                    fontWeight="900"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    filter="url(#pinkShadow)"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {number}
                  </text>

                  {/* Wick */}
                  <path
                    d={`M ${x + 7} ${topY - 34} Q ${x + 9} ${topY - 38} ${x + 7} ${topY - 42}`}
                    stroke="#333"
                    strokeWidth="1.5"
                    fill="none"
                  />

                  {/* Flame Group */}
                  <g
                    onClick={() => blowOut(i)}
                    style={{
                      opacity: litCandles[i] ? 1 : 0,
                      transform: litCandles[i] ? "scale(1)" : "scale(0)",
                      transformOrigin: `${x + 7}px ${topY - 34}px`,
                      transition:
                        "opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                    }}
                  >
                    <g
                      className={litCandles[i] ? "flame-anim" : ""}
                      style={{ transformOrigin: `${x + 7}px ${topY - 34}px` }}
                    >
                      {/* Outer Glow */}
                      <ellipse
                        cx={x + 7}
                        cy={topY - 48}
                        rx="12"
                        ry="18"
                        fill="#FF6B00"
                        filter="url(#glow)"
                        opacity="0.6"
                      />
                      {/* Inner Flame */}
                      <ellipse
                        cx={x + 7}
                        cy={topY - 48}
                        rx="6"
                        ry="12"
                        fill="#FF9D00"
                      />
                      <ellipse
                        cx={x + 7}
                        cy={topY - 46}
                        rx="4"
                        ry="8"
                        fill="#FFD700"
                      />
                      <ellipse
                        cx={x + 7}
                        cy={topY - 44}
                        rx="2"
                        ry="4"
                        fill="#FFFFFF"
                      />
                    </g>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>

        <AnimatePresence>
          {allOut &&
            giftItems.map((gift) => (
              <motion.div
                key={gift.id}
                initial={{ scale: 0, y: 50, rotate: gift.rotate }}
                animate={{ scale: 1, y: 0, rotate: gift.rotate }}
                transition={{ type: "spring", bounce: 0.6, delay: gift.delay }}
                onClick={() => handleOpenGift(gift.id)}
                style={{
                  position: "absolute",
                  ...gift.style,
                  fontSize: gift.size,
                  filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.25))",
                  cursor: "pointer",
                  zIndex: 20,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={openedGifts[gift.id] ? "open" : "closed"}
                    initial={{ scale: 0, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: 30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ display: "inline-block" }}
                  >
                    {openedGifts[gift.id] ? gift.open : gift.closed}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      </div>

      {!allOut && (
        <div className="cake-hint" id="cakeHint">
          blow into your microphone or tap the flames
        </div>
      )}

      <div id="wish-msg" className={allOut ? "show" : ""}>
        Happy Birthday, My Princess Nur — may your every wish come true 🩷
      </div>

      <div className="flex-center" style={{ gap: "1rem", marginTop: "1.4rem" }}>
        <button
          className="next-btn"
          onClick={onPrev}
          style={{
            background: "transparent",
            border: "1px solid var(--magenta)",
            color: "var(--magenta)",
          }}
        >
          &uarr; back
        </button>
        <button
          className="next-btn"
          onClick={onNext}
          style={{
            opacity: showNext ? 1 : 0,
            pointerEvents: showNext ? "auto" : "none",
            transition: "opacity 0.6s ease",
          }}
        >
          continue &rarr;
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function Closing({ onPrev, onRestart }) {
  const [showButton, setShowButton] = useState(false);
  const [interactionStep, setInteractionStep] = useState("initial");
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const [stars] = useState(() => [...Array(50)].map((_, i) => (
    <div
      key={i}
      className="star"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animationDelay: `${Math.random() * 4}s`,
        zIndex: 1,
      }}
    />
  )));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNoHover = (e) => {
    if (e) e.preventDefault();
    const maxX = 130;
    const maxY = 100;
    const newX = Math.random() * maxX * 2 - maxX;
    const newY = Math.random() * maxY * 2 - maxY;
    setNoPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setInteractionStep("yes");
    // fire confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#E9518F", "#C2185B", "#D8A544", "#FFD9E8", "#ffffff"],
    });
  };

  return (
    <div
      className="flex-col flex-center"
      style={{ gap: "1.2rem", minHeight: "60vh", position: "relative" }}
    >
      {/* Preload the large background image so it fades in smoothly later */}
      <img src="/placeholder.svg" style={{ display: "none" }} alt="" />

      <AnimatePresence>
        {interactionStep === "yes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="night-sky"
            transition={{ duration: 1 }}
          >
            {/* Faded Background Image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url(/placeholder.svg)",
                backgroundSize: isMobile ? "contain" : "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.45,
                zIndex: 0,
              }}
            />

            {stars}
          </motion.div>
        )}
      </AnimatePresence>

      {interactionStep === "initial" && (
        <>
          <div className="closing-title">Happy Birthday, Nur</div>
          <p className="closing-sub serif-italic">
            September 8th belongs to you. I hope today is as lovely and as loved
            as you make everyone around you feel.
          </p>
          <div className="footer-note" style={{ marginBottom: "2rem" }}>
            made with Love, just for You
          </div>

          <div className="flex-center" style={{ gap: "1rem" }}>
            <button
              className="next-btn"
              onClick={onPrev}
              style={{
                background: "transparent",
                border: "1px solid var(--magenta)",
                color: "var(--magenta)",
              }}
            >
              &uarr; back to cake
            </button>
            <button
              className="next-btn"
              onClick={() => setInteractionStep("question")}
              style={{
                opacity: showButton ? 1 : 0,
                pointerEvents: showButton ? "auto" : "none",
                transition: "opacity 0.6s ease",
              }}
            >
              I have a question
            </button>
          </div>
        </>
      )}

      {interactionStep === "question" && (
        <>
          <div
            className="closing-title"
            style={{ fontSize: "2.4rem", marginBottom: "1.5rem" }}
          >
            Do you love me?
          </div>

          <div
            className="flex-center"
            style={{ position: "relative", width: "280px", height: "100px" }}
          >
            <button
              className="next-btn"
              onClick={handleYesClick}
              style={{
                width: "100px",
                zIndex: 10,
                position: "absolute",
                left: "10px",
              }}
            >
              Yes
            </button>

            <button
              className="next-btn"
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              style={{
                width: "100px",
                position: "absolute",
                right: "10px",
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                zIndex: 5,
              }}
            >
              No
            </button>
          </div>
        </>
      )}

      {interactionStep === "yes" && (
        <>
          <div
            className="closing-title"
            style={{
              fontSize: "3.2rem",
              marginBottom: "0.5rem",
              color: "#fff",
              WebkitTextFillColor: "#fff",
              textShadow: "0 0 20px rgba(255,255,255,0.5)",
            }}
          >
            I knew it! ❤️
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="bangla-note"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              maxWidth: "500px",
              margin: "2rem 1rem",
              position: "relative",
              zIndex: 10
            }}
          >
            <p style={{ fontFamily: "serif", fontSize: "1.2rem", lineHeight: "1.8", color: "#333", marginBottom: "1rem" }}>
              আল্লাহ যেন তোমার জীবনটা সবসময় শান্তি, সুখ আর ভালোবাসায় ভরে রাখেন।<br/>
              তোমার সব ভালো স্বপ্ন যেন একদিন সত্যি হয়।<br/>
              তুমি যেন সবসময় হাসিখুশি থাকো, সুস্থ থাকো, আর আমার জীবনে এভাবেই থেকো।
            </p>
            <p style={{ fontFamily: "serif", fontSize: "1.2rem", lineHeight: "1.8", color: "#333", marginBottom: "1rem" }}>
              আমি আল্লাহর কাছে সবসময় তোমাকে চাই,<br/>
              আমার দুনিয়া আর আখিরাতের সঙ্গী হিসেবে।
            </p>
            <p style={{ fontFamily: "serif", fontSize: "1.3rem", fontWeight: "bold", color: "var(--magenta)", marginTop: "1.5rem" }}>
              শুভ জন্মদিন, আমার নুর 👸🏻💝💚<br/>
              আমি তোমাকে অনেক অনেক ভালোবাসি গো সোনা 😚🫂
            </p>
          </motion.div>

          <button
            className="next-btn"
            onClick={onRestart}
            style={{ boxShadow: "0 0 20px rgba(194, 24, 91, 0.8)" }}
          >
            Start Again
          </button>
        </>
      )}
    </div>
  );
}

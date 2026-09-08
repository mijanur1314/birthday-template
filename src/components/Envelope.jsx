import { useState } from 'react';
import { playPaperRustle } from '../utils/sound';

export default function Envelope({ onOpen }) {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    if (opened) return;
    playPaperRustle();
    setOpened(true);
    onOpen();
  };

  return (
    <div className="envelope-wrap" onClick={handleClick}>
      <div className="flex-col flex-center" style={{ gap: '0.5rem' }}>
        <div className="hero-title">A little something for</div>
        <div className="hero-sub script">Nur</div>
      </div>
      
      <div className="cinematic-glow"></div>
      <div className={`envelope ${opened ? 'open' : ''}`}>
        <div className="env-body paper-texture">
          <div className="env-shade-left"></div>
          <div className="env-shade-right"></div>
          <div className="env-label">Nourin Islam ♡</div>
        </div>
        <div className="letter-paper paper-texture">
          <p>Happy Birthday, My Kuchu Puchu 😗</p>
        </div>
        <div className="env-pocket"></div>
        <div className="env-flap paper-texture"></div>
        <div className="seal">N</div>
      </div>
      
      {!opened && <div className="tap-hint">tap the envelope to open it</div>}
    </div>
  );
}

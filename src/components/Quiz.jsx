import { useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../data/config';
import '../styles/quiz.css';

export default function Quiz({ onComplete }) {
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Normalize both strings to ignore spaces, symbols, and case
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (normalize(inputValue) === normalize(config.quizSecretAnswer)) {
      setHasError(false);
      onComplete();
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 500); // Remove animation class after shake
    }
  };

  return (
    <motion.div 
      className="quiz-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className={`quiz-content glass-panel ${hasError ? 'shake-error' : ''}`}>
        <h2 className="section-title">One Final Step...</h2>
        <p className="quiz-question">{config.quizQuestion}</p>
        
        <form onSubmit={handleSubmit} className="quiz-form">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your answer here..."
            className={`quiz-input ${hasError ? 'input-error' : ''}`}
            autoFocus
          />
          <button type="submit" className="next-btn">Unlock</button>
        </form>
        {hasError && <div className="error-text">Hmm, that doesn't seem right. Try again!</div>}
      </div>
    </motion.div>
  );
}

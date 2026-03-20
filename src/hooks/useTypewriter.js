import { useState, useEffect, useCallback } from 'react';

export function useTypewriter(texts, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      setDisplayText(currentText.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);

      if (charIndex + 1 === currentText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
        return pauseTime;
      }
      return typingSpeed + Math.random() * 40;
    } else {
      setDisplayText(currentText.substring(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);

      if (charIndex - 1 === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        return typingSpeed;
      }
      return deletingSpeed;
    }
  }, [texts, textIndex, charIndex, isDeleting, typingSpeed, deletingSpeed, pauseTime]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      tick();
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return displayText;
}

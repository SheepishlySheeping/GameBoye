import { useState, useRef } from 'react';

const ScreenChange = ( setGameState, setVisualEffect) => {
  const timeoutRef = useRef(null);


  const changeScreen = (style, duration, target) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
   

    timeoutRef.current = setTimeout(() => {
      setGameState(target)
    }, duration);

    setVisualEffect({ variant: style, duration: duration + 500 })
  };
  

  const changeCleanup = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return { changeScreen, changeCleanup };
};

export default ScreenChange;
import { useRef } from 'react';

const ScreenBlock = (clickBlocked, setClickBlocked) => {
  const timeoutRef = useRef(null);

  const blockScreen = (duration) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setClickBlocked(true);
    
    timeoutRef.current = setTimeout(() => {
      setClickBlocked(false);
    }, duration);
  };

  const blockCleanup = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return { blockScreen, blockCleanup };
};

export default ScreenBlock;
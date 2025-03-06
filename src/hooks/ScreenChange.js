import { useRef } from 'react';

const ScreenChange = (setGameState, setVisualEffect) => {
  const timeoutRef = useRef(null);

  const changeScreen = (style, target) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setGameState(target)
    }, 2000);

    setVisualEffect({ variant: style, duration: 2500 })
  };

  const changeCleanup = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return { changeScreen, changeCleanup };
};

export default ScreenChange;
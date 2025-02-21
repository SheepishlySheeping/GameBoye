import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './assets/styles/App.css';
import AnimatedBackground from "./components/AnimatedBackground";
import VisualEffects from './components/VisualEffects';
import ScreenMenu from './components/ScreenMenu';
import ScreenBootUp from './components/ScreenBootUp'
import ScreenTicTacToe from './components/ScreenTicTacToe'
import Popup from "./components/Popup";
import settingsPNG from './assets/imgs/settingsPNG.png'
import infoPNG from './assets/imgs/infoPNG.png'
import tictactoePNG from './assets/imgs/tictactoePNG.png'
import tetrisPNG from './assets/imgs/tetrisPNG.png'

const SwitchAnimate = {
  off: {
    x: "0%",
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  on: {
    x: "25%",
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

const App = () => {

  const [switchState, setSwitchState] = useState({ on: false, disabled: false });
  const [clickBlocked, setClickBlocked] = useState(false);
  const [gameState, setGameState] = useState("gameOff");
  const [gameTotalScore, setGameTotalScore] = useState(0);
  const [gamePrevScore, setGamePrevScore] = useState(0);
  const [visualEffect, setVisualEffect] = useState({ variant: "Off", duration: 0 });
  const [popupState, setPopupState] = useState({ variant: "Off", content: "", duration: 0 });
  const [slides, setSlides] = useState([
    { id: 1, title: "Settings", icon: settingsPNG, reqScore: 0, unlocked: true },
    { id: 2, title: "Info", icon: infoPNG, reqScore: 0, unlocked: true },
    { id: 3, title: "Tic Tac Toe", icon: tictactoePNG, reqScore: 0, unlocked: true },
    { id: 4, title: "Tetris", icon: tetrisPNG, reqScore: 1500, unlocked: false },
    { id: 5, title: "Spike Throw", icon: tetrisPNG, reqScore: 2000, unlocked: false },
    { id: 6, title: "Temp", icon: tetrisPNG, reqScore: 2500, unlocked: false },
    { id: 7, title: "Opp", icon: tetrisPNG, reqScore: 2500, unlocked: false }
  ]);

  const timeout = useRef(null);

  const handleSwitch = () => {

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setSwitchState(prevState => ({ on: !prevState.on, disabled: true }));
    setGameState(gameState === "gameOff" ? "gameBootUp" : "gameOff");

    timeout.current = setTimeout(() => {
      setSwitchState(prevState => ({ on: prevState.on, disabled: false }));
    }, 1000);

    if (gameState !== "Off") {
      setPopupState({ variant: "Off", content: "", duration: 0 });
      setVisualEffect({ variant: "Off", duration: 0 });
    }
  };


  return (
    <div className="App">
      <div className="BarTop">
        <div className="IOSwitch">
          <AnimatePresence mode="wait">
            <motion.button
              disabled={switchState.disabled}
              className={ `IOSwitchBar ${switchState.disabled ? "switchBlocker" : ""}`}
              onClick={handleSwitch}
              variants={SwitchAnimate}
              animate={switchState.on === false ? "off" : "on"}
              exit="off"
            >
              <p>O</p>
              <div></div>
              <p>I</p>
            </motion.button>
          </AnimatePresence>
        </div>
      </div>

      <div className="Box" style={{ backgroundColor: gameState === "gameBootUp" ? "rgba(15, 15, 15)" : "rgba(100, 100, 255)" }}>
        <div className="clickBlocker" style={{ pointerEvents: clickBlocked === true ? "all" : "none", backgroundColor: gameState === "gameOff" ? "rgba(0, 0, 0)" : "rgba(0, 0, 0, 0)" }}> </div>
        <AnimatePresence mode="wait">
          {visualEffect.variant !== "Off" && <VisualEffects variant={visualEffect.variant} duration={visualEffect.duration} setVisualEffect={setVisualEffect} />}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {popupState.variant !== "Off" && <Popup variant={popupState.variant} content={popupState.content} duration={popupState.duration} setPopupState={setPopupState} />}
        </AnimatePresence>
        {gameState !== "gameBootUp" && gameState!== "gameOff" && <AnimatedBackground  gameState={gameState} />}
        {gameState === "gameBootUp" && <ScreenBootUp setVisualEffect={setVisualEffect} setGameState={setGameState} />}
        {gameState === "gameMenu" && <ScreenMenu slides={slides} setSlides={setSlides} setGameState={setGameState} setVisualEffect={setVisualEffect} setClickBlocked={setClickBlocked} setPopupState={setPopupState} gameTotalScore={gameTotalScore} setGameTotalScore={setGameTotalScore} gamePrevScore={gamePrevScore} setGamePrevScore={setGamePrevScore} />}
        {gameState === "gameTicTacToe" && <ScreenTicTacToe setGameState={setGameState}/>}
        
      </div>

      <p className="Bar">
        GAMEBOYE
      </p>
    </div>
  );
}

export default App;

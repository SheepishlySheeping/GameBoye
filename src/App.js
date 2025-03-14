import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './assets/styles/App.css';
import AnimatedBackground from "./components/AnimatedBackground";
import VisualEffects from './components/VisualEffects';
import ScreenMenu from './components/ScreenMenu';
import ScreenBootUp from './components/ScreenBootUp'
import ScreenTicTacToe from './components/ScreenTicTacToe'
import Popup from "./components/Popup";
import ScreenBlock from "./hooks/ScreenBlock";
import ScreenChange from "./hooks/ScreenChange";
import settingsPNG from './assets/imgs/settingsPNG.png'
import infoPNG from './assets/imgs/infoPNG.png'
import tictactoePNG from './assets/imgs/tictactoePNG.png'
import tetrisPNG from './assets/imgs/tetrisPNG.png'

const App = () => {

  const [horizontalScreen, setHorizontalScreen] = useState(window.innerHeight < window.innerWidth);
  const [switchState, setSwitchState] = useState({ on: false, disabled: false });
  const [clickBlocked, setClickBlocked] = useState(false);
  const [gameState, setGameState] = useState("gameMenu");
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

  useEffect(() => {
  window.addEventListener("resize", () => {
    if (window.innerHeight > window.innerWidth) {
      setHorizontalScreen(true);
    } else {
      setHorizontalScreen(false);
    }})
  }, [])

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
      changeCleanup();
    }
  }

  const { blockScreen } = ScreenBlock(clickBlocked, setClickBlocked)
  const { changeScreen, changeCleanup } = ScreenChange(setGameState, setVisualEffect)

  return (
    <div className="App">
      <div className="App_bar Flex_center" style={{ width: "100%", height: "7.5%", justifyContent: "unset"}}>
        <div className="IO_switch">
          <AnimatePresence mode="wait">
            <motion.button
              disabled={switchState.disabled}
              className={`Flex_center ${switchState.disabled ? "IO_switch_blocker" : ""}`}
              onClick={handleSwitch}
              animate={switchState.on === false ? {x: 0} : {x: "26%"}}
              transition={{duration: 0.2, ease: "easeInOut" }}
            >
              <p>O</p>
              <div></div>
              <p>I</p>
            </motion.button>
          </AnimatePresence>
        </div>
      </div>

      <div className="App_box" style={{ backgroundColor: gameState === "gameBootUp" ? "rgba(15, 15, 15)" : "rgba(100, 100, 255)" }}>
        <div className="App_clickblocker" style={{ pointerEvents: clickBlocked === true ? "all" : "none", opacity: gameState === "gameOff" ? "100%" : 0 }}></div>
        <AnimatePresence mode="wait">
          {visualEffect.variant !== "Off" && <VisualEffects variant={visualEffect.variant} duration={visualEffect.duration} setVisualEffect={setVisualEffect} />}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {popupState.variant !== "Off" && <Popup variant={popupState.variant} content={popupState.content} duration={popupState.duration} setPopupState={setPopupState} />}
        </AnimatePresence>
        {gameState !== "gameBootUp" && gameState !== "gameOff" && <AnimatedBackground gameState={gameState} />}
        {gameState === "gameBootUp" && <ScreenBootUp changeScreen={changeScreen} />}
        {gameState === "gameMenu" && <ScreenMenu slides={slides} setSlides={setSlides} setVisualEffect={setVisualEffect} setPopupState={setPopupState} gameTotalScore={gameTotalScore} setGameTotalScore={setGameTotalScore} gamePrevScore={gamePrevScore} setGamePrevScore={setGamePrevScore} blockScreen={blockScreen} changeScreen={changeScreen} horizontalScreen={horizontalScreen} />}
        {gameState === "gameTicTacToe" && <ScreenTicTacToe setGameState={setGameState} blockScreen={blockScreen} changeScreen={changeScreen} />}
      </div>

      <p className="App_bar_title App_bar Flex_center">
        GAMEBOYE
      </p>
    </div>
  );
}

export default App;

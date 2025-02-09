import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './assets/styles/App.css';
import VisualEffects from './components/VisualEffects';
import ScreenMenu from './components/ScreenMenu';
import ScreenBootUp from './components/ScreenBootUp'

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

function App() {

  const [gameState, setGameState] = useState("gameOff");
  const [visualEffect, setVisualEffect] = useState({ state: "Off", duration: "0" });

  return (
    <div className="App">
      <div className="BarTop">
        <div className="IOSwitch">
          <AnimatePresence mode="wait">
            <motion.button
              className="IOSwitchBar"
              onClick={() => {
                setGameState(gameState === "gameOff" ? "gameBootUp" : "gameOff");
                setVisualEffect({ state: "HorizontalGlitch", duration: "0" })
              }}
              key={gameState}
              variants={SwitchAnimate}
              animate={gameState === "gameOff" ? "off" : "on"}
              exit="off"
            >
              <p>O</p>
              <div></div>
              <p>I</p>
            </motion.button>
          </AnimatePresence>
        </div>
      </div>

      <div className="Box" style={{backgroundColor: gameState === "gameOff" ? "black" : gameState === "gameBootUp" ? "rgba(15, 15, 15)" : "rgba(100, 100, 255)"}}>
        <AnimatePresence mode="wait">
          {visualEffect.state != "Off" && <VisualEffects variant={visualEffect.state} duration={visualEffect.duration} setVisualEffect={setVisualEffect} />}
        </AnimatePresence>
        {gameState === "gameBootUp" && <ScreenBootUp setVisualEffect={setVisualEffect} setGameState={setGameState} />}
        {gameState === "gameMenu" && <ScreenMenu setVisualEffect={setVisualEffect} />}
      </div>

      <div className="Bar">
        <p className="appName">GAMEBOYE</p>
      </div>
    </div>
  );
}

export default App;

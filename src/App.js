import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './assets/styles/App.css';
import ScreenMenu from './components/ScreenMenu';
import ScreenEffect from './components/ScreenEffects'

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
  const [screenEffect, setScreenEffect] = useState({ state: "Off", duration: "0" });

  return (
    <div className="App">
      <div className="BarTop">
        <div className="IOSwitch">
          <AnimatePresence mode="wait">
            <motion.button
              className="IOSwitchBar"
              onClick={() => {
                setGameState(gameState === "gameOff" ? "gameMenu" : "gameOff");
                setScreenEffect({ state: "Off", duration: "0" })
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

      <div className="Box">
        <div className="screenOff" style={{ display: gameState === "gameOff" ? "block" : "none"}}></div>
        <AnimatePresence mode="">
          {screenEffect.state != "Off" && (
            <ScreenEffect variant={screenEffect.state} duration={screenEffect.duration} manageEffects={setScreenEffect} />)}
        </AnimatePresence>
        {gameState === "gameMenu" && <ScreenMenu manageEffects={setScreenEffect} />}

      </div>

      <div className="Bar">
        <p className="appName">GAMEBOYE</p>
      </div>
    </div>
  );
}

export default App;

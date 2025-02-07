import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './assets/styles/App.css';
import ScreenMenu from './components/ScreenMenu';
import ScreenEffect from './components/ScreenEffects'

function App() {

  // Constructors
  const [gameState, setGameState] = useState("gameOff");
  const [screenEffect, setScreenEffect] = useState({ state: "Off", duration: "0" });

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

  // Display
  return (
    <div className="App">
      <div className="BarTop">
        <div className="IOSwitch">
          <AnimatePresence mode="wait">
            <motion.button
              className="IOSwitchBar"
              onClick={() => setGameState(gameState === "gameOff" ? "gameMenu" : "gameOff")}
              key={gameState}
              variants={SwitchAnimate}
              initial="false"
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



      <div className={`Box ${gameState === "gameOff" ? "screenOff" : ""}`}>
        <ScreenEffect variant={screenEffect.state} duration={screenEffect.duration} manageEffects={setScreenEffect}></ScreenEffect>
        {gameState === "gameMenu" && <ScreenMenu manageEffects={setScreenEffect} />}
      </div>

      <div className="Bar">
        <p className="appName">GAMEBOYE</p>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './assets/styles/App.css';
import ScreenMenu from './components/ScreenMenu';

function App() {

  // Constructors
  const [gameState, setGameState] = useState("gameOff");

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
        {gameState === "gameMenu" && <ScreenMenu />}
      </div>

      <div className="Bar">
        <p className="appName">GAMEBOYE</p>
      </div>
    </div>
  );
}

export default App;

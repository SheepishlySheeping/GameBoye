import React, { useState, useEffect } from "react";
import '../assets/styles/App.css';
import { AnimatePresence, motion } from 'framer-motion';
import xPNG from '../assets/imgs/xPNG.png';
import oPNG from '../assets/imgs/oPNG.png';

const name = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];

const ScreenTicTacToe = ({ setGameState, blockScreen, changeScreen }) => {
    const [boardSize, setBoardSize] = useState(null);
    const [difficulty, setDifficulty] = useState(null);

    const handleClick = (mode) => {
        blockScreen(1000);
        if (mode == null) {
            setBoardSize(mode);
            setDifficulty(mode);
        }
        else {
            if (boardSize == null) setBoardSize(mode);
            else setDifficulty(mode);
        }
    }

    return (
        <>
            <button onClick={() => changeScreen("Loading2", 2000, "gameMenu")} className="buttonHover" style={{backgroundColor: "rgba(0, 255, 255)", position: "absolute", width: "5vw", height: "3vw", top: "5vw", right: "5vw", zIndex: "3" }}>X</button>
            <div className="menuTitleHolder sway" style={{ backgroundColor: "red", marginTop: "3%", width: "100%" }} >
                {name.map((a, index) => (
                    <motion.div
                        key={index}
                        style={{
                            fontSize: "5rem"
                        }}
                    >
                        {a}
                    </motion.div>
                ))}
            </div>
            <AnimatePresence mode="wait">
            <motion.div key={boardSize} initial={{ x: boardSize == null ? "-100vw" : "100vw" }} animate={{ x: 0 }} exit={{ x: boardSize == null ? "-100vw" : "100vw" }} transition={{ duration: 1, ease: 'easeInOut' }} className="" style={{ backgroundColor: "blue", width: "100%", height: "35%", marginTop: "15%", position: "relative", display: "flex", flexWrap: "wrap" }}>
                <button onClick={() => handleClick(boardSize == null ? "3x3" : "PVP")} style={{ width: "23.33%", height: "68%", margin: "1% 5%", backgroundColor: "orange" }}>
                    {boardSize == null ? "3x3" : "PVP"}
                </button>
                <button onClick={() => handleClick(boardSize == null ? "6x6" : "Normal")} style={{ width: "23.33%", height: "68%", margin: "1% 5%", backgroundColor: "purple" }}>
                    {boardSize == null ? "6x6" : "Normal"}
                </button>
                <button onClick={() => handleClick(boardSize == null ? "9x9" : "Hard")} style={{ width: "23.33%", height: "68%", margin: "1% 5%", backgroundColor: "orange" }}>
                    {boardSize == null ? "9x9" : "Hard"}
                </button>
                {boardSize !== null && <button onClick={() => handleClick(null)} style={{ height: "30%", width: "20%", backgroundColor: "peachpuff", opacity: "50%" }}>Back</button>}
            </motion.div>
            </AnimatePresence>
        </>
    )
}

export default ScreenTicTacToe;
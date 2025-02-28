import React, { useState, useEffect } from "react";
import '../assets/styles/App.css';
import { motion } from 'framer-motion';
import xPNG from '../assets/imgs/xPNG.png';
import oPNG from '../assets/imgs/oPNG.png';

const name = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];

const ScreenTicTacToe = ({ setGameState }) => {
    const [boardSize, setBoardSize] = useState(null);
    const [difficulty, setDifficulty] = useState(null);

    const handleClick = (mode) => {
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
            <button onClick={() => setGameState("gameMenu")} className="buttonHover" style={{ position: "absolute", width: "5vw", height: "3vw", top: "5vw", right: "5vw", zIndex: "3" }}>X</button>
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
            <motion.div animate={{x : boardSize == null ? [0, 100] : [-100, 0]}} transition={{ duration: 1.5, ease: 'easeInOut' }} className="sway" style={{ backgroundColor: "blue", width: "100%", height: "35%", marginTop: "15%", position: "relative", display: "flex", flexWrap: "wrap" }}>
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
        </>
    )
}

export default ScreenTicTacToe;
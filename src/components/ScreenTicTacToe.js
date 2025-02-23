import React, { useState, useEffect } from "react";
import '../assets/styles/App.css';
import { motion } from 'framer-motion';
import xPNG from '../assets/imgs/xPNG.png';
import oPNG from '../assets/imgs/oPNG.png';

const name = [xPNG, "i", "c", xPNG, "a", "c", xPNG, "o", "e"];

const screenTicTacToe = ({ setGameState }) => {
    return (
        <>
            <button onClick={() => setGameState("gameMenu")} className="buttonHover" style={{ position: "absolute", width: "5vw", height: "3vw", top: "5vw", right: "5vw", zIndex: "3" }}>X</button>
            <div className="menuTitleHolder sway" >
                {name.map((a, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{y: "20vw"}}
                                        animate={{y: 0}}
                                    >
                                        {typeof a === "string" ? a : <img src={a} alt="X" style={{ height: "1.5em" }} />}
                                    </motion.div>
                                ))}
            </div>
            <img src={xPNG} style={{ position: "absolute", bottom: 0, width: "20%", height: "20%"}} />
        </>
    )
}

export default screenTicTacToe;
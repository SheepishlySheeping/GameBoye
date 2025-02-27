import React, { useState, useEffect } from "react";
import '../assets/styles/App.css';
import { motion } from 'framer-motion';
import xPNG from '../assets/imgs/xPNG.png';
import oPNG from '../assets/imgs/oPNG.png';

const name = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];

const screenTicTacToe = ({ setGameState }) => {
    return (
        <>
            <button onClick={() => setGameState("gameMenu")} className="buttonHover" style={{ position: "absolute", width: "5vw", height: "3vw", top: "5vw", right: "5vw", zIndex: "3" }}>X</button>
            <div className="menuTitleHolder sway" style={{ backgroundColor: "red", marginTop: "3%", width: "100%"}} >
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
            <div style={{backgroundColor: "blue", width: "100%", height: "30%", marginTop: "15%", position: "relative"}}>
                <button>
                    one
                </button>
                <button>
                    two
                </button>
                <button>
                    three
                </button>
                <button>
                    four
                </button>
                <button>
                    five
                </button>
                <button>
                    six
                </button>
            </div>
        </>
    )
}

export default screenTicTacToe;
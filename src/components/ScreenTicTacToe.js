import React, { useState, useEffect } from "react";
import '../assets/styles/App.css';
import { motion } from 'framer-motion';

const screenTicTacToe = ({ setGameState }) => {
return (
    <>
    <div style={{ width: "100%", height: "30%", backgroundColor: "red" }}>
        <button onClick={() => setGameState("gameMenu")} className="ExitButton buttonHover">X</button>
        <p>tictactoe</p>
    </div>
    </>
)
}

export default screenTicTacToe;
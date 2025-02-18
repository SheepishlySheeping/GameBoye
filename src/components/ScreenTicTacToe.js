import React, { useState, useEffect } from "react";
import '../assets/styles/App.css';
import { motion } from 'framer-motion';


const screenTicTacToe = ({ setGameState }) => {
    return (
        <>
            <button onClick={() => setGameState("gameMenu")} className="ExitButton buttonHover">X</button>
            <p style={{ fontSize: "2rem", width: "100%", height: "30%", backgroundColor: "red", display: "flex", alignItems: "center", justifyContent: "center" }}>Tic Tac Toe</p>
        </>
    )
}

export default screenTicTacToe;
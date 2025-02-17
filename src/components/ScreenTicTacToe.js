import React, { useState, useEffect } from "react";
import '../assets/styles/App.css';
import { motion } from 'framer-motion';


const screenTicTacToe = ({ setGameState }) => {
    return (
        <>
        <button onClick={() => setGameState("gameMenu")} className="ExitButton buttonHover">X</button>
            <div style={{ width: "100%", height: "30%", backgroundColor: "red", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontSize: "2rem" }}>Tic Tac Toe</p>
            </div>
        </>
    )
}

export default screenTicTacToe;
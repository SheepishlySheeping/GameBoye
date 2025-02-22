import React, { useState, useEffect } from "react";
import '../assets/styles/App.css';
import { motion } from 'framer-motion';


const screenTicTacToe = ({ setGameState }) => {
    return (
        <>
            <button onClick={() => setGameState("gameMenu")} className="buttonHover" style={{ position: "absolute", width: "5vw", height: "3vw", top: "5vw", right: "5vw", zIndex: "3" }}>X</button>
            <p className="sway" style={{ fontSize: "2rem", width: "100%", height: "30%", backgroundColor: "", display: "flex", alignItems: "center", justifyContent: "center" }}>Tic Tac Toe</p>
        </>
    )
}

export default screenTicTacToe;
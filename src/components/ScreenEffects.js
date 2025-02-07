import React, { useEffect, useState } from "react";
import '../assets/styles/App.css';
import { animate, AnimatePresence, color, motion } from 'framer-motion';

const ScreenEffect = ({ variant, duration, manageEffects }) => {

    // Constructors
    const [positions, setPositions] = useState({ pos1: "0", pos2: "0", pos3: "0", pos4: "0", pos5: "0" })
    const [variables, setVariables] = useState({ var1: "0", var2: "0", var3: "0", var4: "0", var5: "0" })

    // Functions
    useEffect(() => {
        const interval = setInterval(() => {
            switch (variant) {
                case "HorizontalGlitch":
                    setPositions({
                        pos1: `${Math.random() * 100}%`,
                        pos2: `${Math.random() * 100}%`,
                        pos3: `${Math.random() * 100}%`,
                        pos4: `${Math.random() * 100}%`,
                        pos5: `${Math.random() * 100}%`,
                    });
                    setVariables({
                        var1: `${5 + Math.random() * 15}%`,
                        var2: `${5 + Math.random() * 15}%`,
                        var3: `${5 + Math.random() * 15}%`,
                        var4: `${5 + Math.random() * 15}%`,
                        var5: `${5 + Math.random() * 15}%`,
                    });
                    break;
                case "thing":
            }
        }, 50);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            manageEffects({ state: "Off", duration: "0" })
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [variant, duration])

    // Display
    return (
        <div style={{ width: "100%", height: "100%", position: "absolute", pointerEvents: "none", zIndex: "4", }}>
            <div style={{ display: variant === "HorizontalGlitch" ? "block" : "none" }}>
                <div style={{ backgroundColor: "black", width: "100%", height: variables.var1, opacity: "0.15", top: positions.pos1, position: "absolute" }}> </div>
                <div style={{ backgroundColor: "black", width: "100%", height: variables.var2, opacity: "0.15", top: positions.pos2, position: "absolute" }}> </div>
                <div style={{ backgroundColor: "black", width: "100%", height: variables.var3, opacity: "0.15", top: positions.pos3, position: "absolute" }}> </div>
                <div style={{ backgroundColor: "black", width: "100%", height: variables.var4, opacity: "0.15", top: positions.pos4, position: "absolute" }}> </div>
            </div>
            <div style={{ display: variant === "Loading" ? "block" : "none" }}>
                <div style={{ display: "grid", backgroundColor: "red", height: "100%", width: "100%", position: "absolute", gridTemplateRows: "repeat(5, 1fr)"}}>
                    <div style={{ background: "blue"}}> </div>
                    <div style={{ background: "yellow"}}> </div>
                    <div style={{ background: "blue"}}> </div>
                    <div style={{ background: "yellow"}}> </div>
                    <div style={{ background: "blue"}}> </div>
                    <div style={{ background: "yellow"}}> </div>
                    <div style={{ background: "blue"}}> </div>
                    <div style={{ background: "yellow"}}> </div>
                </div>
            </div>
        </div>
    )
}

export default ScreenEffect;
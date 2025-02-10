import React, { useEffect, useState } from "react";
import '../assets/styles/App.css';
import { animate, AnimatePresence, color, delay, motion } from 'framer-motion';

const fall = {
    top: {
        y: "-60vh",
    },
    fall: {
        y: "0%",
    }
}

const name = ["G", "A", "M", "E", "B", "O", "Y", "E"];

const ScreenBootUp = ({ setVisualEffect, setGameState }) => {

    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setVisualEffect({ variant: "Loading3", duration: "1500" })
        }, 5000);

        const timeout2 = setTimeout(() => setGameState("gameMenu"), 6400 )

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        }

    }, [])

    return (
        <>
            <div style={{ position: "absolute", width: "100%", height: "20%", top: "40%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {name.map((a, index) => (
                    <motion.div
                        key={index}
                        style={{
                            backgroundColor: "rgba(255, 255, 255)",
                            width: "8vw",
                            height: "8vw",
                            margin: "0 0.5vw",
                            fontSize: "7.5rem",
                            textAlign: "center",
                        }}
                        variants={fall}
                        initial="top"
                        animate="fall"
                        exit="hidden"
                        transition={{
                            delay: index === 0 ? 1.5 : 1.5 + (index) * 0.15,
                            duration: 1,
                            ease: "easeInOut"
                        }}
                    >{a}</motion.div>
                ))}
            </div>
        </>
    )
}
export default ScreenBootUp;
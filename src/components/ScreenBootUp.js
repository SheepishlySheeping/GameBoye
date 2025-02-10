import React, { useEffect, useState } from "react";
import '../assets/styles/App.css';
import { animate, AnimatePresence, color, delay, easeOut, motion } from 'framer-motion';

const fdsd = {
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
        const timeout = setTimeout(() => {
            setVisualEffect({ variant: "Loading3", duration: "1500" })
        }, 5000);

        const timeout2 = setTimeout(() => setGameState("gameMenu"), 6400 )

        return () => {clearTimeout(timeout);
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
                            width: "8%",
                            height: "80%",
                            margin: "0 1%",
                            fontSize: "7.5rem",
                            textAlign: "center",
                        }}
                        variants={fdsd}
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
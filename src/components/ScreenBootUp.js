import React, { useEffect, useState } from "react";
import '../assets/styles/App.css';
import { animate, AnimatePresence, color, delay, motion } from 'framer-motion';

const fdsd = {
    top: {
        y: "-50vh",
    },
    fall: {
        y: "0%",
    }
}

const name = ["G", "A", "M", "E", "B", "O", "Y", "E"];

const ScreenBootUp = ({ setVisualEffect, setGameState }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            setGameState("gameMenu");
        }, 5000);

        return () => clearTimeout(timeout);

    }, [])

    return (
        <>
            <div style={{ position: "absolute", top: "40%", width: "100%", height: "100%" }}>
                {name.map((a, index) => (
                    <motion.div
                        key={index}
                        style={{
                            backgroundColor: "rgba(255, 255, 255)",
                            width: "10%",
                            height: "20%",
                        }}
                        variants={fdsd}
                        initial="top"
                        animate="fall"
                        exit="hidden"
                        transition={{
                            delay: index * 0.3,
                            duration: 0.5,
                            ease: 'easeInOut',
                        }}
                    >{a}</motion.div>
                ))}
            </div>
        </>
    )
}
export default ScreenBootUp;
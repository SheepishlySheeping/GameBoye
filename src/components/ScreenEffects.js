import React, { useEffect, useState } from "react";
import '../assets/styles/App.css';
import { animate, AnimatePresence, color, delay, motion } from 'framer-motion';

const squares = [
    19, 17, 15, 13, 11, 9, 7, 5, 3, 1,
    20, 18, 16, 14, 12, 10, 8, 6, 4, 2,
    19, 17, 15, 13, 11, 9, 7, 5, 3, 1,
    20, 18, 16, 14, 12, 10, 8, 6, 4, 2,
    19, 17, 15, 13, 11, 9, 7, 5, 3, 1
];

const animateSquares = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.05,
            duration: 0.5,
            ease: 'easeInOut',
        },
    }),
    exit: (i) => ({
        opacity: 0,
        scale: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.5,
            ease: 'easeInOut',
        },
    })
}

const ScreenEffect = ({ variant, duration, manageEffects }) => {

    const [positions, setPositions] = useState({ pos1: "0", pos2: "0", pos3: "0", pos4: "0", pos5: "0" })
    const [variables, setVariables] = useState({ var1: "0", var2: "0", var3: "0", var4: "0", var5: "0" })

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
                case "Loading":
            }
        }, 50);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            manageEffects({ state: "Off", duration: "0" })
        }, variant === "Loading" ? duration + 0 : duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [variant, duration])

    // Display
    return (
        <div style={{ width: "100%", height: "100%", position: "absolute", pointerEvents: "none", zIndex: "4", }}>
            {variant === "HorizontalGlitch" && (
                <div>
                    {[positions.pos1, positions.pos2, positions.pos3, positions.pos4].map(
                        (pos, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: "black",
                                    width: "100%",
                                    height: variables[`var${index + 1}`],
                                    opacity: "0.15",
                                    top: pos,
                                    position: "absolute",
                                }}
                            ></div>
                        )
                    )}
                </div>
            )}
            {variant === "Loading" && (
                <div
                    style={{
                        pointerEvents: "all",
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        flexWrap: "wrap",
                    }}
                >
                    {squares.map((a, index) => (
                        <motion.div
                            key={index}
                            custom={a}
                            style={{
                                backgroundColor: "black",
                                width: "10%",
                                height: "20%",
                            }}
                            variants={animateSquares}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        ></motion.div>
                    ))}
                </div>
            )
            }
        </div>
    )
}

export default ScreenEffect;
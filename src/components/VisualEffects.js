import React, { useEffect, useState } from "react";
import '../assets/styles/App.css';
import { animate, delay, motion } from 'framer-motion';

const animateSquares = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
    }
}

const VisualEffects = ({ variant, duration, setVisualEffect }) => {

    const [variables, setVariables] = useState({
        vars1: ["0", "0", "0", "0", "0"],
        vars2: ["0", "0", "0", "0", "0"]
    });

    const squares = variant === "Loading1" ?
        [19, 17, 15, 13, 11, 9, 7, 5, 3, 1,
        20, 18, 16, 14, 12, 10, 8, 6, 4, 2,
        19, 17, 15, 13, 11, 9, 7, 5, 3, 1,
        20, 18, 16, 14, 12, 10, 8, 6, 4, 2,
        19, 17, 15, 13, 11, 9, 7, 5, 3, 1] :
        variant === "Loading2" ?
            [10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
            11, 10, 9, 8, 7, 6, 5, 4, 3, 2,
            12, 11, 10, 9, 8, 7, 6, 5, 4, 3,
            13, 12, 11, 10, 9, 8, 7, 6, 5, 4,
            14, 13, 12, 11, 10, 9, 8, 7, 6, 5] :
            variant === "Loading3" ?
                [7, 6, 5, 4, 3, 3, 4, 5, 6, 7,
                6, 5, 4, 3, 2, 2, 3, 4, 5, 6,
                5, 4, 3, 2, 1, 1, 2, 3, 4, 5,
                6, 5, 4, 3, 2, 2, 3, 4, 5, 6,
                7, 6, 5, 4, 3, 3, 4, 5, 6, 7] :
                [1]


    useEffect(() => {
        const interval = setInterval(() => {
            if (variant === "HorizontalGlitch") {
                setVariables({
                    vars1: Array.from({ length: 5 }, () => `${Math.random() * 100}%`),
                    vars2: Array.from({ length: 5 }, () => `${5 + Math.random() * 15}%`),
                })
            }
        }, 50);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            setVisualEffect({ variant: "Off", duration: 0 })
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [variant, duration])

    return (
        <div style={{ width: "100%", height: "100%", position: "absolute", pointerEvents: "none", zIndex: "4", }}>
            {variant === "HorizontalGlitch" && (
                <div>
                    {[variables.vars1[0], variables.vars1[1], variables.vars1[2], variables.vars1[3]].map(
                        (pos, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: "black",
                                    width: "100%",
                                    height: variables.vars2[index],
                                    opacity: "0.15",
                                    top: pos,
                                    position: "absolute",
                                }}
                            ></div>
                        )
                    )}
                </div>
            )}
            {variant.startsWith("Loading") && (
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
                            style={{
                                backgroundColor: "rgba(15, 15, 15)",
                                width: "10%",
                                height: "20%",
                            }}
                            variants={animateSquares}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{
                                delay: a * 0.1,
                                duration: 0.5,
                                ease: 'easeInOut',
                            }}
                        ></motion.div>
                    ))}
                </div>
            )
            }
        </div>
    )
}

export default VisualEffects;
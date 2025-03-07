import React, { useEffect, useState } from "react";
import '../assets/styles/App.css';
import { motion } from 'framer-motion';

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
    }, [])

    return (
        <div className="Vfx_overlay">
            {variant === "HorizontalGlitch" && (
                <div>
                    {[variables.vars1[0], variables.vars1[1], variables.vars1[2], variables.vars1[3]].map(
                        (pos, index) => (
                            <div
                                key={index}
                                className="Vfx_glitchbar"
                                style={{
                                    height: variables.vars2[index],
                                    top: pos,
                                }}
                            ></div>
                        )
                    )}
                </div>
            )}
            {variant.startsWith("Loading") && (
                <div className="Vfx_loading_grid">
                    {squares.map((a, index) => (
                        <motion.div
                            key={index}
                            className="Vfx_loading_squares"
                            initial={{opacity: 0, scale: 0}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0}}
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
import React, { useState, useEffect } from "react";
import '../assets/styles/App.css';
import { motion } from 'framer-motion';

const name = ["G", "A", "M", "E", "B", "O", "Y", "E"];

const ScreenBootUp = ({ setVisualEffect, setGameState }) => {
    const [animationStage, setAnimationStage] = useState(0);

    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setVisualEffect({ variant: "Loading3", duration: "1500" })
        }, 7000);

        const timeout2 = setTimeout(() => setGameState("gameMenu"), 8400 )

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        }

    }, []);

    return (
        <>
            <div className="bootupHolder">
                {name.map((a, index) => (
                    <motion.div
                        key={index}
                        className="bootupBoxes"
                        initial={{
                            opacity: 0,
                        }}
                        animate={ animationStage === 0 ? {
                            opacity: 1
                        } : 
                        {
                            opacity: 1,
                            y: ["0", "-5.5vw", "0"],
                        }}
                        transition={{
                            delay: animationStage === 0 ? 1.5 : 0.5 + (index) * 0.15,
                            duration:  animationStage === 0 ? 2 : 1,
                            ease: "easeInOut",
                        }}
                        onAnimationComplete={ animationStage === 0 ? () => setAnimationStage(1) : null}
                    >{a}</motion.div>
                ))}
            </div>
        </>
    )
}
export default ScreenBootUp;
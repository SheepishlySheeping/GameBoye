import React, { useState } from "react";
import '../assets/styles/App.css';
import { animate, AnimatePresence, color, motion } from 'framer-motion';

    const popupContainer = {
        hidden: {
            opacity: 0,
            scale: 0,
            transition: {
                duration: 0.5,
                ease: 'easeInOut',
            },
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeInOut',
            },
        }
    }

const PopupScreen = ({ variant, content }) => {
    return (
        <motion.div variants={popupContainer} initial="hidden" animate="visible" exit="hidden" className="Popup">
            <div className="PopupContent" style={{ width: variant === "large" ? "50%" : "30%", height: variant === "large" ? "70%" : "50%" }}>
                {content}
            </div>
        </motion.div>
    )
}

export default PopupScreen;
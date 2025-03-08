import React, { useEffect } from "react";
import '../assets/styles/App.css';
import { motion } from 'framer-motion';

const Popup = ({ variant, content, duration, setPopupState }) => {

    useEffect(() => {
        if (duration !== 0) {
            const timeout = setTimeout(() => {
                setPopupState({ variant: "Off", content: "", duration: 0 });
            }, duration);
            return () => {
                clearTimeout(timeout);
            }
        }

    }, [])

    return (
        <>
            {variant !== "Off" && (<div>
                <motion.div initial={{opacity: 0}} animate={{opacity: 0.7}} exit={{opacity: 0}} transition={{ duration: 0.5, ease: 'easeInOut'}} className="Popup_background"></motion.div>
                <motion.div initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}} transition={{ duration: 0.5, ease: 'easeInOut'}} className="Popup Flex_center">
                    <div className="Popup_content" style={{ width: variant === "Large" ? "70%" : "35%", height: variant === "Large" ? "70%" : "35%" }}>
                        {content}
                    </div>
                </motion.div>
            </div>)}
        </>
    )
}

export default Popup;
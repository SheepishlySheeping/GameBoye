import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const textVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

const AnimateText = ({ text }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        variants={textContainer}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={textVariant}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimateText;
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { tr } from "framer-motion/client";

const AnimateText = ({ text }) => {

  // Constructors 
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const textVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Display
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
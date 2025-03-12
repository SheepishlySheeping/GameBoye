import React, { useEffect, useRef, useState } from "react";
import '../assets/styles/App.css';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateString from './AnimateString'
import AnimateScore from './AnimateScore'
import cursorPNG from '../assets/imgs/cursorPNG.png'
import cursorclickPNG from '../assets/imgs/cursorclickPNG.png'
import lockPNG from '../assets/imgs/lockPNG.png'

const ScreenMenu = ({ slides, setSlides, setVisualEffect, setPopupState, gameTotalScore, setGameTotalScore, gamePrevScore, setGamePrevScore, blockScreen, changeScreen, horizontalScreen }) => {

    const [currentSlide, setCurrentSlide] = useState(1);
    const timeouts = useRef([]);

    const popupContents = [
        <>
            <button onClick={() => setPopupState({ variant: "Off", content: "", duration: 0 })} className="Exit_button buttonHover">X</button>
            <img className="Flex_center" src={cursorPNG} style={{ width: "50%", height: "30%", marginTop: "5%", objectFit: 'contain' }} alt="CursorPNG"></img>
            <img className="Flex_center" src={cursorclickPNG} style={{ width: "50%", height: "30%", marginTop: "5%", objectFit: 'contain' }} alt="CursorClickPNG"></img>
            <p style={{ width: "45%", height: "5%", textAlign: "center", fontSize: "2rem" }}>Normal</p>
            <p style={{ width: "55%", height: "5%", textAlign: "center", fontSize: "2rem" }}>Interactable</p>
            <p style={{ width: "100%", height: "10%", textAlign: "center", fontSize: "3rem" }}>Earn Points To Unlock Games!</p>
            <div style={{ width: "80%", height: "1.5%", backgroundColor: 'black', margin: '0 10%' }}></div>
            <p style={{ width: "90%", height: "44.5%", margin: '2.5% 5%', fontSize: "2rem" }}>Created by Sheep</p>
        </>,
        <>
            <button onClick={() => setPopupState({ variant: "Off", content: "", duration: 0 })} className="Exit_button buttonHover">X</button>
            <button style={{ width: "100%", height: "5%", marginTop: "5%" }} onClick={() => setVisualEffect({ variant: "HorizontalGlitch", duration: 3000 })}>Glitch me</button>
            <button style={{ width: "33%", height: "5%" }} onClick={() => setVisualEffect({ variant: "Loading1", duration: 3000 })}>Load 1</button>
            <button style={{ width: "33%", height: "5%" }} onClick={() => setVisualEffect({ variant: "Loading2", duration: 3000 })}>Load 2</button>
            <button style={{ width: "33%", height: "5%" }} onClick={() => setVisualEffect({ variant: "Loading3", duration: 3000 })}>Load 3</button>
            <button style={{ width: "33%", height: "5%" }} onClick={() => setGameTotalScore((prevScores) => (prevScores + 2000))}>Add 2000 Score</button>
        </>
    ]

    const buttonAnimation = (index) => ({
        scale: currentSlide === index ? 1 : (currentSlide === index + 1 || currentSlide === index - 1) ? 0.5 : 0,
        opacity: currentSlide === index ? 1 : (currentSlide === index + 1 || currentSlide === index - 1) ? 0.3 : 0
    });

    const changeSlide = (direction) => {
        if (direction === "prev") setCurrentSlide(currentSlide - 1);
        if (direction === "next") setCurrentSlide(currentSlide + 1);
        blockScreen(550)
    };

    const menuPopup = {
        1: () => setPopupState({ variant: "Large", content: popupContents[1], duration: 0 }),
        2: () => setPopupState({ variant: "Large", content: popupContents[0], duration: 0 }),
    };
    const menuClick = (id) => {
        if (id === 3) {
            changeScreen("Loading2", "gameTicTacToe")
        }
        else menuPopup[id]?.();
        blockScreen(550)
    }

    useEffect(() => {

        let tempSlides = [...slides];
        let toUnlock = [];

        for (let i = 3; i < tempSlides.length; i++) {
            if (!tempSlides[i].unlocked && gameTotalScore >= tempSlides[i].reqScore) {
                setPopupState({ variant: "Off", content: "", duration: 0 });
                toUnlock.push(i);
            }
        }

        toUnlock.forEach((value, index) => {
            const tempTimeout = setTimeout(() => {
                setCurrentSlide(value);
                tempSlides[value].unlocked = true;
                setSlides(tempSlides);
            }, index * 2000);
            timeouts.current.push(tempTimeout);
        });

        blockScreen(toUnlock.length * 2000)

        return () => {
            timeouts.current.forEach((timeout) => clearTimeout(timeout));
        }
    }, [gameTotalScore])

    return (
        <>
            <div style={{ zIndex: 1, width: "100%", height: "100%" }}>
                <div className="Menu_title_holder Flex_center sway"><AnimateString text={gameTotalScore < slides[currentSlide].reqScore ? ("Score " + slides[currentSlide].reqScore + " To Unlock") : (slides[currentSlide].title)} ></AnimateString></div>
                <div className="menuSlideChangerHolder">
                    <button className="menuSlideChanger buttonHover" onClick={() => changeSlide("prev")} style={{ display: currentSlide === 0 ? "none" : "block", left: "10.8%" }}></button>
                    <button className="menuSlideChanger buttonHover" onClick={() => changeSlide("next")} style={{ display: currentSlide === slides.length - 1 ? "none" : "block", right: "10.2%" }}></button>
                </div>
                <motion.div className="Menu_slide_holder" initial={{ x: horizontalScreen === true ? `-${currentSlide * 31}vmax` : `-${currentSlide * 15}vmax` }} animate={{ x: horizontalScreen === true ? `-${currentSlide * 31}vmax` : `-${currentSlide * 42}vmax` }} transition={{ duration: 0.5, ease: 'easeInOut' }} >
                    {slides.map(((slide, index) =>
                        <motion.button key={index} onClick={() => menuClick(slide.id)} disabled={!slide.unlocked} initial={false} animate={buttonAnimation(index)} transition={{ duration: 0.5, ease: 'easeInOut' }} className={`Menu_slide buttonHover`} style={{ background: `url(${slide.icon}), radial-gradient(circle, rgba(0, 255, 255) 30%, rgba(0, 190, 255))`, backgroundSize: "cover" }} >
                            <AnimatePresence mode="wait">{!slide.unlocked && <motion.div style={{ background: `url(${lockPNG}), radial-gradient(circle, rgba(150, 150, 150) 30%, rgba(100, 100, 100))`, backgroundSize: "cover" }}
                                animation={{ scale: 1, opacity: 1 }} exit={{ scale: 1.3, opacity: 0 }} transition={{ delay: "0.5", duration: "2" }}></motion.div>}</AnimatePresence>
                        </motion.button>
                    ))}
                </motion.div>
                <div className="Menu_score_holder Flex_center sway">
                    <AnimateScore scorePrev={gamePrevScore} score={gameTotalScore} setGamePrevScore={setGamePrevScore}></AnimateScore>
                </div>
            </div>
        </>
    );
}

export default ScreenMenu;
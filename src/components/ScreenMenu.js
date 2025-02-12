import React, { useEffect, useRef, useState } from "react";
import '../assets/styles/App.css';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateString from './AnimateString'
import AnimateScore from './AnimateScore'
import cursorPNG from '../assets/imgs/cursorPNG.png'
import cursorclickPNG from '../assets/imgs/cursorclickPNG.png'
import settingsPNG from '../assets/imgs/settingsPNG.png'
import infoPNG from '../assets/imgs/infoPNG.png'
import tictactoePNG from '../assets/imgs/tictactoePNG.png'
import tetrisPNG from '../assets/imgs/tetrisPNG.png'

const ScreenMenu = ({ setVisualEffect, setClickBlocked, setPopupState, gameTotalScore, setGameTotalScore, gamePrevScore, setGamePrevScore }) => {

    const [slides, setSlides] = useState([
        { id: 1, title: "Settings", icon: settingsPNG, reqScore: 0, unlocked: true },
        { id: 2, title: "Info", icon: infoPNG, reqScore: 0, unlocked: true },
        { id: 3, title: "Tic Tac Toe", icon: tictactoePNG, reqScore: 0, unlocked: true },
        { id: 4, title: "Tetris", icon: tetrisPNG, reqScore: 1500, unlocked: false },
        { id: 5, title: "Spike Throw", icon: tetrisPNG, reqScore: 2000, unlocked: false },
        { id: 6, title: "Temp", icon: tetrisPNG, reqScore: 2500, unlocked: false }
    ]);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [animationStage, setAnimationStage] = useState(0);
    const timeout1 = useRef(null);


    const popupContents = [
        <>
            <button onClick={() => setPopupState({ variant: "Off", content: "", duration: 0 })} className="ExitButton">X</button>
            <img src={cursorPNG} style={{ width: "50%", height: "30%", marginTop: "5%", display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'contain' }} alt="CursorPNG"></img>
            <img src={cursorclickPNG} style={{ width: "50%", height: "30%", marginTop: "5%", display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'contain' }} alt="CursorClickPNG"></img>
            <p style={{ width: "45%", height: "5%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Normal</p>
            <p style={{ width: "55%", height: "5%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Interactable</p>
            <p style={{ width: "100%", height: "10%", display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>Earn Points To Unlock Games!</p>
            <div style={{ width: "80%", height: "1.5%", backgroundColor: 'black', margin: '0 10%' }}></div>
            <p style={{ width: "90%", height: "44.5%", margin: '2.5% 5%' }}>Created by Sheep</p>
        </>,
        <>
            <button onClick={() => setPopupState({ variant: "Off", content: "", duration: 0 })} className="ExitButton">X</button>
            <button style={{ width: "100%", height: "5%", marginTop: "5%" }} onClick={() => setVisualEffect({ variant: "HorizontalGlitch", duration: 3000 })}>Glitch me</button>
            <button style={{ width: "33%", height: "5%" }} onClick={() => setVisualEffect({ variant: "Loading1", duration: 3000 })}>Load 1</button>
            <button style={{ width: "33%", height: "5%" }} onClick={() => setVisualEffect({ variant: "Loading2", duration: 3000 })}>Load 2</button>
            <button style={{ width: "33%", height: "5%" }} onClick={() => setVisualEffect({ variant: "Loading3", duration: 3000 })}>Load 3</button>
            <button style={{ width: "33%", height: "5%" }} onClick={() => setGameTotalScore((prevScores) => ( prevScores + 2000 ))}>Add 2000 Score</button>
        </>
    ]

    const buttonAnimation = (index) => ({
        scale: currentSlide === index ? 1 : (currentSlide === index + 1 || currentSlide === index - 1) ? 0.5 : 0,
        opacity: currentSlide === index ? 1 : (currentSlide === index + 1 || currentSlide === index - 1) ? 0.3 : 0
    });

    const changeSlide = (direction) => {
        if (direction === "prev") setCurrentSlide(currentSlide - 1);
        if (direction === "next") setCurrentSlide(currentSlide + 1);
        clickTimeout();
    };

    const clickTimeout = () => {
        if (timeout1.current) {
            clearTimeout(timeout1.current);
        }
        setClickBlocked(true);
        timeout1.current = setTimeout(() => {
            setClickBlocked(false);
        }, 550);
    };

    const menuPopup = {
        1: () => setPopupState({ variant: "Large", content: popupContents[1], duration: 0 }),
        2: () => setPopupState({ variant: "Large", content: popupContents[0], duration: 0 }),
    };
    const menuClick = (id) => {
        menuPopup[id]?.();
        clickTimeout();
    }

    useEffect(() => {
        let tempSlides = [...slides];
        setClickBlocked(false);
        let toUnlock = [];

        for (let i = 3; i < tempSlides.length; i++) {
            if ( gameTotalScore >= tempSlides[i].reqScore) {
                setPopupState({ variant: "Off", content: "", duration: 0 });
                toUnlock.push(i);
            }
        }
        console.log(gamePrevScore);
        console.log(gameTotalScore);
        toUnlock.forEach((index) => console.log(index));

    }, [gameTotalScore])

    return (
        <>
            <div className="animatedBackground" style={{ width: "100%", height: "100%" }}> </div>
            <div style={{ zIndex: 1, width: "100%", height: "100%" }}>
                <div className="menuTitleHolder"><AnimateString text={gameTotalScore < slides[currentSlide].reqScore ? ("Score " + slides[currentSlide].reqScore + " To Unlock") : (slides[currentSlide].title)} ></AnimateString></div>
                <div className="menuSlideChangerHolder">
                    <button className="menuSlideChanger" onClick={() => changeSlide("prev")} style={{ display: currentSlide === 0 ? "none" : "block", left: "10.8%" }}></button>
                    <button className="menuSlideChanger" onClick={() => changeSlide("next")} style={{ display: currentSlide === slides.length - 1 ? "none" : "block", right: "10.2%" }}></button>
                </div>
                <motion.div className="menuSlidesHolder" initial={{ x: `-${currentSlide * 31}vw` }} animate={{ x: `-${currentSlide * 31}vw` }} transition={{ duration: 0.5, ease: 'easeInOut' }} >
                    {slides.map(((slide, index) =>
                        <motion.button key={index} onClick={() => menuClick(slide.id)} initial={false} animate={buttonAnimation(index)} transition={{ duration: 0.5, ease: 'easeInOut' }} className="menuSlide" style={{ background: `url(${slide.icon}), radial-gradient(circle, rgba(0, 255, 255) 30%, rgb(0, 190, 255))`, backgroundSize: "cover" }} >
                            <AnimatePresence mode="wait">{!slide.unlocked && <motion.div style={{ width: "100%", height: "100%", backgroundColor: "red" }} animation={{ scale: "1" }} exit={{ scale: "0" }} transition={{ duration: "7" }}></motion.div>}</AnimatePresence>
                        </motion.button>
                    ))}
                </motion.div>
                <div style={{ width: "100%", height: "12.5%", position: "absolute", bottom: "0%", display: "flex", justifyContent: "center", fontSize: "3.5rem" }}>
                    <AnimateScore scorePrev={gamePrevScore} score={gameTotalScore} setGamePrevScore={setGamePrevScore}></AnimateScore>
                </div>
            </div>

        </>
    );
}

export default ScreenMenu;
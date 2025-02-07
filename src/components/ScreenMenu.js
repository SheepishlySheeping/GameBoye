import React, { use, useState } from "react";
import '../assets/styles/App.css';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateText from './AnimateText'
import PopupScreen from "./PopupScreen";
import cursorPNG from '../assets/imgs/cursorPNG.png'
import cursorclickPNG from '../assets/imgs/cursorclickPNG.png'
import settingsPNG from '../assets/imgs/settingsPNG.png'
import infoPNG from '../assets/imgs/infoPNG.png'
import tictactoePNG from '../assets/imgs/tictactoePNG.png'
import tetrisPNG from '../assets/imgs/tetrisPNG.png'

const ScreenMenu = ({ manageEffects }) => {

    // Constructors
    const slides = [
        { id: 1, title: "Settings", icon: settingsPNG },
        { id: 2, title: "Info", icon: infoPNG },
        { id: 3, title: "TicTacToe", icon: tictactoePNG },
        { id: 4, title: "Tetris", icon: tetrisPNG },
        { id: 5, title: "temp" },
        { id: 6, title: "temp" },
    ]
    const [currentSlide, setCurrentSlide] = useState(1);
    const [infoShow, setInfoShow] = useState(false);
    const [settingsShow, setSettingsShow] = useState(false);
    const [clickDisabledPrev, setClickDisabledPrev] = useState(false);
    const [clickDisabledNext, setClickDisabledNext] = useState(false);

    // Functions
    const changeSlide = (direction) => {
        let newSlide = currentSlide;
        if (direction === "prev") {
            if (currentSlide !== 0) newSlide -= 1;
        };
        if (direction === "next") {
            if (currentSlide !== slides.length - 1) newSlide += 1;
        };
        setCurrentSlide(newSlide);
        clickTimeout(newSlide);
    };

    const clickTimeout = (newSlide) => {
        setClickDisabledPrev(true);
        setClickDisabledNext(true);
        setTimeout(() => {
            if (newSlide === 0) setClickDisabledNext(false);
            else if (newSlide === slides.length - 1) setClickDisabledPrev(false);
            else {
                setClickDisabledPrev(false);
                setClickDisabledNext(false);
            }
        }, 550);
    };

    const menuPopup = {
        1: () => setSettingsShow(true),
        2: () => setInfoShow(true),
    };
    const menuClick = (id) => {
        menuPopup[id]?.();
    }

    // Display
    return (
        <>
            <div className="animatedBackground" style={{ width: "100%", height: "100%" }}> </div>
            <div style={{ zIndex: 1, width: "100%", height: "100%" }}>
                <AnimatePresence mode="wait">
                    {infoShow === true && <PopupScreen variant={"large"} content={
                        <>
                            <button onClick={() => setInfoShow(false)} className="ExitButton">X</button>
                            <p style={{ width: "100%", height: "15%", display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5em' }}>Controls</p>
                            <img src={cursorPNG} style={{ width: "50%", height: "30%", display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'contain' }}></img>
                            <img src={cursorclickPNG} style={{ width: "50%", height: "30%", display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'contain' }}></img>
                            <p style={{ width: "45%", height: "5%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Normal</p>
                            <p style={{ width: "55%", height: "5%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Interactable</p>
                            <div style={{ width: "80%", height: "1.5%", backgroundColor: 'black', margin: '0 10%' }}></div>
                            <p style={{ width: "90%", height: "44.5%", margin: '2% 5%' }}>Created by Sheep<br /><br />My very first project!!!<br />Very buggy, if you encounter any, just hit the topleft off on button :3</p>
                        </>
                    } />}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    {settingsShow === true && <PopupScreen variant={"large"} content={
                        <>
                            <button onClick={() => setSettingsShow(false)} className="ExitButton">X</button>
                            <button style={{ width: "20%", height: "20%", margin: "5% 5%"}} onClick={() => manageEffects({state: "HorizontalGlitch", duration: "3000"})}>Glitch me</button>
                            <button style={{ width: "20%", height: "20%", margin: "5% 5%"}} onClick={() => manageEffects({state: "Loading", duration: "5000"})}>Load me</button>
                        </>
                    } />}
                </AnimatePresence>
                <div id="menuTitleHolder"><AnimateText text={slides[currentSlide].title}></AnimateText></div>
                <div id="menuSlideChangerHolder">
                    <button className="menuSlideChanger" onClick={() => changeSlide("prev")} disabled={clickDisabledPrev}></button>
                    <div style={{ width: '49%' }}> </div>
                    <button className="menuSlideChanger" onClick={() => changeSlide("next")} disabled={clickDisabledNext}></button>
                </div>
                <motion.div id="menuSlidesHolder" initial={{ x: `-${currentSlide * 31}vw` }} animate={{ x: `-${currentSlide * 31}vw` }} transition={{ duration: 0.5, ease: 'easeInOut' }} >
                    <div id="menuSlides">{slides.map(((slide, index) =>
                        <motion.button key={index} onClick={() => menuClick(slide.id)} initial={false} animate={{ scale: currentSlide === index ? 1 : currentSlide === index + 1 ? 0.5 : currentSlide === index - 1 ? 0.5 : 0, opacity: currentSlide === index ? 1 : currentSlide === index + 1 ? 0.3 : currentSlide === index - 1 ? 0.3 : 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }} id="clickSlide" ><div style={{ backgroundImage: `url(${slide.icon})` }} ></div></motion.button>
                    ))}</div>
                </motion.div>
            </div>
        </>
    );
}

export default ScreenMenu;
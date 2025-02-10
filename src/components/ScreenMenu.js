import React, { useState, useEffect } from "react";
import '../assets/styles/App.css';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateText from './AnimateText'
import Popup from "./Popup";
import cursorPNG from '../assets/imgs/cursorPNG.png'
import cursorclickPNG from '../assets/imgs/cursorclickPNG.png'
import settingsPNG from '../assets/imgs/settingsPNG.png'
import infoPNG from '../assets/imgs/infoPNG.png'
import tictactoePNG from '../assets/imgs/tictactoePNG.png'
import tetrisPNG from '../assets/imgs/tetrisPNG.png'

const slides = [
    { id: 1, title: "Settings", icon: settingsPNG },
    { id: 2, title: "Info", icon: infoPNG },
    { id: 3, title: "TicTacToe", icon: tictactoePNG },
    { id: 4, title: "Tetris", icon: tetrisPNG },
    { id: 5, title: "temp" },
    { id: 6, title: "temp" },
]

const ScreenMenu = ({ setVisualEffect, setClickBlocked, setPopupState }) => {

    const [currentSlide, setCurrentSlide] = useState(1);

    const popupContents = [
    <>
        <button onClick={() => setPopupState({ variant: "Off", content: "", duration: 0 })} className="ExitButton">X</button>
        <p style={{ width: "100%", height: "15%", display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5em' }}>Controls</p>
        <img src={cursorPNG} style={{ width: "50%", height: "30%", display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'contain' }}></img>
        <img src={cursorclickPNG} style={{ width: "50%", height: "30%", display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'contain' }}></img>
        <p style={{ width: "45%", height: "5%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Normal</p>
        <p style={{ width: "55%", height: "5%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Interactable</p>
        <div style={{ width: "80%", height: "1.5%", backgroundColor: 'black', margin: '0 10%' }}></div>
        <p style={{ width: "90%", height: "44.5%", margin: '2% 5%' }}>Created by Sheep<br /><br />My very first project!!!<br />Very buggy, if you encounter any, just hit the topleft off on button :3</p>
    </>,
    <>
        <button onClick={() => setPopupState({ variant: "Off", content: "", duration: 0 })} className="ExitButton">X</button>
        <button style={{ width: "100%", height: "5%", marginTop: "5%" }} onClick={() => setVisualEffect({ variant: "HorizontalGlitch", duration: 3000 })}>Glitch me</button>
        <button style={{ width: "33%", height: "5%" }} onClick={() => setVisualEffect({ variant: "Loading1", duration: 3000 })}>Load 1</button>
        <button style={{ width: "33%", height: "5%" }} onClick={() => setVisualEffect({ variant: "Loading2", duration: 3000 })}>Load 2</button>
        <button style={{ width: "33%", height: "5%" }} onClick={() => setVisualEffect({ variant: "Loading3", duration: 3000 })}>Load 3</button>
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
        setClickBlocked(true);
        setTimeout(() => {
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

    return (
        <>
            <div className="animatedBackground" style={{ width: "100%", height: "100%" }}> </div>
            <div style={{ zIndex: 1, width: "100%", height: "100%" }}>
                <div id="menuTitleHolder"><AnimateText text={slides[currentSlide].title}></AnimateText></div>
                <div id="menuSlideChangerHolder">
                    <button className="menuSlideChanger" onClick={() => changeSlide("prev")} style={{ display: currentSlide === 0 ? "none" : "block", left: "10.8%" }}></button>
                    <button className="menuSlideChanger" onClick={() => changeSlide("next")} style={{ display: currentSlide === slides.length - 1 ? "none" : "block", right: "10.2%" }}></button>
                </div>
                <motion.div id="menuSlidesHolder" initial={{ x: `-${currentSlide * 31}vw` }} animate={{ x: `-${currentSlide * 31}vw` }} transition={{ duration: 0.5, ease: 'easeInOut' }} >
                    {slides.map(((slide, index) =>
                        <motion.button key={index} onClick={() => menuClick(slide.id)} initial={false} animate={buttonAnimation(index)} transition={{ duration: 0.5, ease: 'easeInOut' }} id="menuSlide" ><div style={{ backgroundImage: `url(${slide.icon})` }} ></div></motion.button>
                    ))}
                </motion.div>
            </div>
        </>
    );
}

export default ScreenMenu;
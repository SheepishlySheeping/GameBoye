import React, { useEffect, useState } from "react";

const AnimateScore = ({ scorePrev, score, setGamePrevScore }) => {

    const [animatedScore, setAnimatedScore] = useState(scorePrev);

    useEffect(() => {
        setGamePrevScore(score);
        if (score > animatedScore) {
            let frame;
            const animateScore = () => {
                setAnimatedScore((thisScore) => {
                    if (thisScore === score) {
                        cancelAnimationFrame(frame);
                        return thisScore;
                    }
                    return thisScore + 1;
                });
                frame = requestAnimationFrame(animateScore)
            }
            animateScore();
            return () => cancelAnimationFrame(frame);
        }
    }, [score]);

    return (
        <>
            <p style={{ marginRight: "1%" }}>Total Score:</p>
                <div>
                    {String(animatedScore).padStart(6, "0")}
                </div>
        </>
    );
};

export default AnimateScore;
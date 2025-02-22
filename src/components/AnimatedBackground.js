import '../assets/styles/App.css';
import xPNG from '../assets/imgs/xPNG.png';
import oPNG from '../assets/imgs/oPNG.png';

const array = Array.from({length: 20}, (_, rowIdx) => Array.from({length: 15}, (_, colIdx) => [rowIdx, colIdx]))

const AnimatedBackground = ({ gameState }) => {
    return (
    <div className="animatedBackground">
        {gameState === "gameTicTacToe" && array.map((row, rowIdx) => row.map((_, colIdx) =>
            <img key={`${rowIdx}-${colIdx}`} src={colIdx % 2 === 0 ? oPNG : xPNG} alt='' className='animatedBackgroundPattern' style={{ position: 'absolute', top: `${ 7 +((rowIdx % 20)  * 14 + 0.3)}vw`, left: (rowIdx % 2 === 0) ? `${((colIdx)  * 14 + 0.7)}vw` : `${ 7 + ((colIdx) * 14 + 0.7)}vw`}}></img>
        ))}
    </div>
)
}

export default AnimatedBackground;
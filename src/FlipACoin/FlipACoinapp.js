import React, { useState } from 'react';
import './FlipACoin.css';

const FlipACoin = () => {
    const [isFlipping, setIsFlipping] = useState(false);
    const [result, setResult] = useState('');

    const flipCoin = () => {
        setIsFlipping(true);
        setResult(''); // Reset the result while flipping

        setTimeout(() => {
            const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
            setResult(outcome);
            setIsFlipping(false);
        }, 3000); // Coin flip animation duration is 3 seconds
    };

    return (
        <div className="coin-container">
            <div className={`coin ${isFlipping ? 'flipping' : ''} ${result === 'Heads' ? 'show-back' : 'show-front'}`}>
                <div className="coin-face front">
                    <img src="/coinfront.png" alt="Tails (Coin Front)" />
                </div>
                <div className="coin-face back">
                    <img src="/coinback.png" alt="Heads (Coin Back)" />
                </div>
            </div>
            <button
                onClick={flipCoin}
                disabled={isFlipping}
                className="flip-button"
            >
                {isFlipping ? 'Flipping...' : 'Flip Coin'}
            </button>
            {result && <p>{`Result: ${result}`}</p>}
        </div>
    );
};

export default FlipACoin;

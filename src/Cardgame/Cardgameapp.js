import React, { useState, useEffect } from 'react';

// Sample card images (you can replace these with your own images)
const cardImages = [
    { src: '/redcard.webp', id: 1 },
    { src: '/bluecard.webp', id: 2 },
    { src: '/greencard.webp', id: 3 },
    { src: '/yellowcard.webp', id: 4 },
];

// Shuffle cards
const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, isFlipped: false, isMatched: false }));
    return shuffled;
};

const MemoryCardGame = () => {
    const [cards, setCards] = useState(shuffleCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCount, setMatchedCount] = useState(0);

    // Check for matches
    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;

            if (firstCard.id === secondCard.id) {
                setCards((prevCards) =>
                    prevCards.map((card) =>
                        card.id === firstCard.id ? { ...card, isMatched: true } : card
                    )
                );
                setMatchedCount((prev) => prev + 1);
            }

            // Reset flipped cards after a short delay
            setTimeout(() => {
                setCards((prevCards) =>
                    prevCards.map((card) => (card.isMatched ? card : { ...card, isFlipped: false }))
                );
                setFlippedCards([]);
            }, 1000);
        }
    }, [flippedCards]);

    const flipCard = (index) => {
        if (flippedCards.length < 2 && !cards[index].isFlipped && !cards[index].isMatched) {
            setCards((prevCards) =>
                prevCards.map((card, i) =>
                    i === index ? { ...card, isFlipped: true } : card
                )
            );
            setFlippedCards((prev) => [...prev, cards[index]]);
        }
    };

    // Reset function to restart the game
    const resetGame = () => {
        setCards(shuffleCards());
        setFlippedCards([]);
        setMatchedCount(0);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Memory Card Game</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns
                gap: '10px', // Space between cards
                justifyContent: 'center', // Center the cards horizontally
                alignItems: 'center', // Center the cards vertically
                maxWidth: '500px', // Optional: Set a max width for the grid
                margin: '0 auto', // Center the grid container
            }}>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => flipCard(index)}
                        style={{
                            width: '80px', // Adjusted width for portrait
                            height: '120px', // Adjusted height for portrait
                            backgroundColor: card.isFlipped || card.isMatched ? 'white' : '#ccc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            border: '1px solid #000',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {card.isFlipped || card.isMatched ? (
                            <img src={card.src} alt="card" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
                        ) : (
                            <span style={{ fontSize: '24px' }}>?</span>
                        )}
                    </div>
                ))}
            </div>
            {matchedCount === cardImages.length && (
                <h3 style={{ color: 'green' }}>Congratulations! You've matched all the cards!</h3>
            )}
            <button onClick={resetGame} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#ff5722', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Reset Game
            </button>
        </div>
    );
};

export default MemoryCardGame;

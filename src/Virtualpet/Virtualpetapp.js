import React, { useState } from 'react';

const VirtualPetApp = () => {
    const [petStatus, setPetStatus] = useState('');
    const [health, setHealth] = useState(100); // Initial health
    const [happiness, setHappiness] = useState(100); // Initial happiness

    const playSound = (action) => {
        try {
            const sound = new Audio(`/Sounds/${action}.mp3`); // Change path if using 'public' directory
            sound.play();
            setPetStatus(action); // Update pet status based on action
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    const handleFeed = () => {
        setHealth((prev) => Math.min(prev + 10, 100));
        setHappiness((prev) => Math.min(prev + 5, 100));
        playSound('feed');
    };

    const handlePlay = () => {
        setHappiness((prev) => Math.min(prev + 15, 100));
        setHealth((prev) => Math.max(prev - 5, 0));
        playSound('play');
    };

    const handleSleep = () => {
        setHealth((prev) => Math.min(prev + 20, 100));
        setHappiness((prev) => Math.max(prev - 10, 0));
        playSound('sleep');
    };

    // Function to get the image based on the pet status
    const getPetImage = () => {
        switch (petStatus) {
            case 'feed':
                return '/feed.jpg'; // Ensure images are in the 'public' directory
            case 'play':
                return '/play.jpg'; // Ensure images are in the 'public' directory
            case 'sleep':
                return '/sleep.jpg'; // Ensure images are in the 'public' directory
            default:
                return ''; // No image if no action has been taken
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ color: '#333' }}>Virtual Pet</h2>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={handleFeed} style={{ margin: '5px', padding: '10px 15px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Feed Pet</button>
                <button onClick={handlePlay} style={{ margin: '5px', padding: '10px 15px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Play with Pet</button>
                <button onClick={handleSleep} style={{ margin: '5px', padding: '10px 15px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Put Pet to Sleep</button>
            </div>
            <div>
                {petStatus && (
                    <div>
                        <img 
                            src={getPetImage()} 
                            alt={`Pet is ${petStatus}`} 
                            style={{ width: '200px', height: 'auto', marginTop: '10px', borderRadius: '10px' }} 
                        />
                    </div>
                )}
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3>Health: {health}</h3>
                <h3>Happiness: {happiness}</h3>
            </div>
            {/* Add more interactive elements here if needed */}
        </div>
    );
};

export default VirtualPetApp;

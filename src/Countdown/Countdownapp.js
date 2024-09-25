import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [targetDate, setTargetDate] = useState('');
    const [timeLeft, setTimeLeft] = useState({});
    const [isActive, setIsActive] = useState(false);

    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return timeLeft;
    };

    useEffect(() => {
        if (!isActive) return;

        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        if (
            timeLeft.days === 0 &&
            timeLeft.hours === 0 &&
            timeLeft.minutes === 0 &&
            timeLeft.seconds === 0
        ) {
            alert("Time's up!");
            setIsActive(false); // Stop countdown
        }

        return () => clearTimeout(timer);
    }, [timeLeft, isActive]);

    const startCountdown = () => {
        if (!targetDate) {
            alert('Please set a target date and time!');
            return;
        }

        setIsActive(true); // Start countdown
        setTimeLeft(calculateTimeLeft());
    };

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval} style={{ margin: '0 5px', fontSize: '2rem' }}>
                {timeLeft[interval]} {interval}{' '}
            </span>
        );
    });

    return (
        <div
            style={{
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#f7f7f7',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h2 style={{ color: '#333' }}>Countdown Timer</h2>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="datetime-local"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                    }}
                />
                <div>
                    <button
                        onClick={startCountdown}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Start Countdown
                    </button>
                </div>
            </div>

            <div
                style={{
                    fontSize: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                }}
            >
                {timerComponents.length ? timerComponents : <span>Set a date to start!</span>}
            </div>
        </div>
    );
};

export default CountdownTimer;

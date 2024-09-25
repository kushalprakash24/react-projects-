import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TriviaComponent = () => {
    const [triviaData, setTriviaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);

    const fetchTriviaData = async () => {
        const options = {
            method: 'GET',
            url: 'https://trivia-questions-api.p.rapidapi.com/triviaApi',
            headers: {
                'x-rapidapi-key': '06fc124a98msh7aa1dbf60cea01ap191725jsnabce158980ac',
                'x-rapidapi-host': 'trivia-questions-api.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setTriviaData(response.data.triviaQuestions);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch trivia questions');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTriviaData();
    }, []);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        setIsAnswered(true);
    };

    const handleNextQuestion = () => {
        setIsAnswered(false);
        setSelectedAnswer('');
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % triviaData.length);
    };

    // Function to get options for multiple choice questions
    const getOptions = (correctAnswer, incorrectAnswers) => {
        const options = [...incorrectAnswers, correctAnswer];
        return options.sort(() => Math.random() - 0.5); // Shuffle options
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Quiz App</h2>
            {loading && <p>Loading...</p>}
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            {triviaData.length > 0 && (
                <div>
                    <h3>{triviaData[currentQuestionIndex].question}</h3>
                    {triviaData[currentQuestionIndex].type === 'multiple' ? (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {getOptions(
                                triviaData[currentQuestionIndex].correct_answer,
                                triviaData[currentQuestionIndex].incorrect_answers
                            ).map((option, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleAnswerSelect(option)}
                                        style={{
                                            backgroundColor: selectedAnswer === option
                                                ? (option === triviaData[currentQuestionIndex].correct_answer ? 'green' : 'red')
                                                : '#007BFF',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            margin: '5px 0',
                                        }}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {['True', 'False'].map((option, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleAnswerSelect(option)}
                                        style={{
                                            backgroundColor: selectedAnswer === option
                                                ? (option === triviaData[currentQuestionIndex].correct_answer ? 'green' : 'red')
                                                : '#007BFF',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            margin: '5px 0',
                                        }}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {isAnswered && (
                        <div>
                            <p>
                                {selectedAnswer === triviaData[currentQuestionIndex].correct_answer
                                    ? 'Correct Answer!'
                                    : `Wrong Answer! The correct answer is: ${triviaData[currentQuestionIndex].correct_answer}`}
                            </p>
                            <button onClick={handleNextQuestion} style={{ marginTop: '10px', padding: '10px 15px' }}>
                                Next Question
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TriviaComponent;

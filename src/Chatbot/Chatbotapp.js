// src/ChatGPTComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTComponent = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState(null);

    const handleSendMessage = async () => {
        const options = {
            method: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/chatgpt',
            headers: {
                'x-rapidapi-key': '06fc124a98msh7aa1dbf60cea01ap191725jsnabce158980ac',
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json',
            },
            data: {
                messages: [
                    {
                        role: 'user',
                        content: userMessage,
                    },
                ],
                web_access: false,
            },
        };

        try {
            const response = await axios.request(options);
            const botMessage = response.data.result; // This should be the AI's response
            setChatHistory((prev) => [
                ...prev,
                { role: 'user', content: userMessage },
                { role: 'assistant', content: botMessage }, // Ensure this is correct
            ]);
            setUserMessage('');
        } catch (error) {
            setError('Error fetching data');
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Chat with GPT</h2>
            
            <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginBottom: '10px'
                }}
            />
            
            <button 
                onClick={handleSendMessage} 
                style={{ 
                    padding: '10px 15px', 
                    fontSize: '1rem', 
                    backgroundColor: '#007BFF', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                }}
            >
                Send
            </button>
            
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
                {chatHistory.map((message, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{message.role === 'user' ? 'You' : 'GPT'}:</strong> {message.content}
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default ChatGPTComponent;

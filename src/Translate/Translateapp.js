import React, { useState } from 'react';
import axios from 'axios';

const TranslationComponent = () => {
    const [textToTranslate, setTextToTranslate] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('es');
    const [translationResult, setTranslationResult] = useState('');
    const [error, setError] = useState(null);

    const handleTranslate = async () => {
        // Ensure the text input is not empty
        if (!textToTranslate) {
            setError('Please enter text to translate.');
            return;
        }

        const options = {
            method: 'POST',
            url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'x-rapidapi-key': '06fc124a98msh7aa1dbf60cea01ap191725jsnabce158980ac',
                'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                q: textToTranslate,
                source: sourceLanguage,
                target: targetLanguage
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            // Access the translation result from the response data
            const translatedText = response.data.data.translations.translatedText;
            setTranslationResult(translatedText); // Set the translated text
            setError(null);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message); // Display the error message
            } else {
                setError('Error fetching translation result');
            }
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Language Translation</h2>
            <textarea
                value={textToTranslate}
                onChange={(e) => setTextToTranslate(e.target.value)}
                placeholder="Enter text to translate"
                rows="4"
                cols="50"
                style={{ 
                    width: '100%', 
                    padding: '10px', 
                    fontSize: '1rem', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    marginBottom: '20px' 
                }}
            />
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Source Language:
                    <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)} 
                            style={{ 
                                padding: '10px', 
                                fontSize: '1rem', 
                                width: '100%', 
                                border: '1px solid #ccc', 
                                borderRadius: '4px', 
                                marginTop: '5px' 
                            }}>
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="pt">Portuguese</option>
                        <option value="zh">Chinese</option>
                        <option value="ja">Japanese</option>
                        <option value="hi">Hindi</option>
                        <option value="ar">Arabic</option>
                        {/* Add more language options as needed */}
                    </select>
                </label>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Target Language:
                    <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} 
                            style={{ 
                                padding: '10px', 
                                fontSize: '1rem', 
                                width: '100%', 
                                border: '1px solid #ccc', 
                                borderRadius: '4px', 
                                marginTop: '5px' 
                            }}>
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="pt">Portuguese</option>
                        <option value="zh">Chinese</option>
                        <option value="ja">Japanese</option>
                        <option value="hi">Hindi</option>
                        <option value="ar">Arabic</option>
                        {/* Add more language options as needed */}
                    </select>
                </label>
            </div>
            <button 
                onClick={handleTranslate} 
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
                Translate
            </button>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {translationResult && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>Translation Result:</h3>
                    <p style={{ fontSize: '1.2rem' }}>{translationResult}</p> {/* Display the translated text */}
                </div>
            )}
        </div>
    );
    
};

export default TranslationComponent;

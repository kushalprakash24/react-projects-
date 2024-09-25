// src/CurrencyConverter.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [amount, setAmount] = useState(1);
    const [conversionData, setConversionData] = useState(null);
    const [error, setError] = useState(null);

    const handleConversion = async () => {
        const options = {
            method: 'GET',
            url: 'https://currency-converter18.p.rapidapi.com/api/v1/convert',
            params: {
                from: fromCurrency,
                to: toCurrency,
                amount: amount.toString(),
            },
            headers: {
                'x-rapidapi-key': '06fc124a98msh7aa1dbf60cea01ap191725jsnabce158980ac',
                'x-rapidapi-host': 'currency-converter18.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setConversionData(response.data.result.convertedAmount);
        } catch (error) {
            setError('Error fetching data');
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Currency Converter</h2>
            
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    From:
                    <input
                        type="text"
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            fontSize: '1rem', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px' 
                        }}
                    />
                </label>
            </div>
    
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    To:
                    <input
                        type="text"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            fontSize: '1rem', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px' 
                        }}
                    />
                </label>
            </div>
    
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            fontSize: '1rem', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px' 
                        }}
                    />
                </label>
            </div>
    
            <button 
                onClick={handleConversion} 
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
                Convert
            </button>
    
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            
            <div style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '1.5rem' }}>Conversion Result</h3>
                {conversionData !== null ? (
                    <p>{amount} {fromCurrency} = {conversionData} {toCurrency}</p>
                ) : (
                    <p>Enter values and click convert.</p>
                )}
            </div>
        </div>
    );
    
};

export default CurrencyConverter;

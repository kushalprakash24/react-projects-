import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherSummary, setWeatherSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherSummary = async () => {
    if (!city) {
      alert('Please enter a city name');
      return;
    }

    setLoading(true);
    const options = {
      method: 'GET',
      url: `https://forecast9.p.rapidapi.com/rapidapi/forecast/${city}/summary/`,
      headers: {
        'x-rapidapi-key': '06fc124a98msh7aa1dbf60cea01ap191725jsnabce158980ac',
        'x-rapidapi-host': 'forecast9.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log((response.data.forecast.items[0].temperature.min+response.data.forecast.items[0].temperature.max)/2);
      setWeatherSummary((response.data.forecast.items[0].temperature.min+response.data.forecast.items[0].temperature.max)/2);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch weather summary');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Weather Summary</h2>
        <div style={{ marginBottom: '20px' }}>
            <input 
                type="text" 
                placeholder="Enter city name" 
                value={city}
                onChange={handleCityChange}
                style={{ 
                    padding: '10px', 
                    fontSize: '1rem', 
                    width: '70%', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    marginRight: '10px' 
                }}
            />
            <button 
                onClick={fetchWeatherSummary} 
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
                Get Weather Summary
            </button>
        </div>

        {loading && <p style={{ color: 'orange', fontSize: '1.2rem' }}>Loading...</p>}
        
        {weatherSummary && (
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <h2 style={{ fontSize: '1.5rem' }}>Weather in {city}</h2>
                <p style={{ fontSize: '1.2rem' }}>Average Temperature of today at {city} is: {JSON.stringify(weatherSummary, null, 2)} °C</p>
            </div>
        )}
    </div>
);

};

export default WeatherApp;

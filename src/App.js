// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import WeatherApp from './Weather/Weatherapp';
import TodoList from './todolist/Todolistapp';
import CurrencyConverter from './Currencyconverter/Currencyconverterapp';
import ChatGPTComponent from './Chatbot/Chatbotapp';
import GoogleTranslateComponent from './Translate/Translateapp';
import TriviaComponent from './Quiz/Quizapp';
import VirtualPet from './Virtualpet/Virtualpetapp';
import CountdownTimer from './Countdown/Countdownapp';
import FlipACoin from './FlipACoin/FlipACoinapp';
import MemoryCardGame from './Cardgame/Cardgameapp';


function App() {

  return (
    <div className="App">
      <hr/>
      <WeatherApp/>
      <hr/>
      <TodoList/>
      <hr/>
      <CurrencyConverter/>
      <hr/>
      <ChatGPTComponent/>
      <hr/>
      <GoogleTranslateComponent/>
      <hr/>
      <TriviaComponent/>
      <hr/>
      <VirtualPet/>
      <hr/>
      <CountdownTimer/>
      <hr/>
      <FlipACoin/>
      <hr/>
      <MemoryCardGame/>
      <br />
      <br/>
      <br/>
      <hr/>
    </div>
  );
}

export default App;

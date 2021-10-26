import './App.css';
import React from 'react';
import Header from './components/header';
import Game from './components/game';
import Menu from './components/menu';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Menu />
      <Header/>
      <Game/>
      <Footer />
    </div>
  );
}

export default App;

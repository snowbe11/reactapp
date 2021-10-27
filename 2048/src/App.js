import './App.css';
import React from 'react';
import Header from './components/header';
import Game from './components/game';
import Menu from './components/menu';
import Footer from './components/footer';

function App() {
  const style={
    display: 'table',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  return (
    <div className="App">
      <Menu />
      <div style={style}>
        <Header/>
        <Game/>
      </div>
      <Footer />
    </div>
  );
}

export default App;

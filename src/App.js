import React from 'react';
import './App.css';
import Header from './components/header/header';
import Main from './components/main/main';

function App() {
  return (
    <div className="App">
      <div className="Wrapper">
        <Header />
        <Main />
      </div>      
    </div>
  );
}

export default App;

import React from 'react';
import { Squares } from './components/Squares';
import { Dice } from './components/Dice';
import { GlobalProvider } from './context/GlobalState';
import { Board } from './components/Board';
import { Tokens } from './components/Tokens';
import { PlayerStatusDisplay } from './components/PlayerStatusDisplay';


function App() {

  return (
    <GlobalProvider>
      <Board>
        <Squares />
        <Dice />
        <Tokens />
      </Board>
      <PlayerStatusDisplay />
    </GlobalProvider>
  );
}

export default App;

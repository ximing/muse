import { useEffect, useState } from 'react';
import './App.css';
import { Muse } from '@typoer/muse';

function App() {
  useEffect(() => {
    new Muse('stage');
  }, []);
  return (
    <div className="app">
      <div id="stage"></div>
    </div>
  );
}

export default App;

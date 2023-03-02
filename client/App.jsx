import React, { useState } from 'react';
import ToBuildCards from './components/ToBuildCards.jsx';
import KitCards from './components/KitCards.jsx';
// import './App.css';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <ToBuildCards />
      <button className="add-button" onClick={togglePopup}>
        <span>+</span>
      </button>
      {showPopup && (
        <div className="popup">
          <KitCards />
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default App;
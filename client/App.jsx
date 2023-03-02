import React, { useState } from 'react';
import ToBuildCards from './components/ToBuildCards.jsx';
import KitCards from './components/KitCards.jsx';
import './styling/App.css';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      {showPopup && (
        <div className="popup">
          <KitCards />
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
      <div className="cards-container">
        <ToBuildCards />
        {!showPopup && (
          <button className="add-button" onClick={togglePopup}>
            +
          </button>
        )}
      </div>
    </div>
  );
}
export default App;
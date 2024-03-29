import React, { useState } from 'react';
import ToBuildCards from './components/ToBuildCards.jsx';
import KitCards from './components/KitCards.jsx';
import HaroReminder from './components/HaroReminder.jsx';
import './styling/App.css';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    

    <div>
      <div className='header-wrapper'>
        <div className='header'>
          <h1>Haro Helper</h1>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <KitCards />
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
      {!showPopup && (
        <div className="cards-container">
          <ToBuildCards />
          <button className="add-button" onClick={togglePopup}>
            +
          </button>
        </div>
      )}
      <HaroReminder />
    </div>
  );
      }
export default App;
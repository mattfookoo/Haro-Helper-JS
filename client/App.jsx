import React, { useState } from 'react';
import KitCards from './components/KitCards.jsx';
import ToBuildCards from './components/ToBuildCards.jsx';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      {!showPopup && (
        <button onClick={togglePopup}>Add a Kit You Plan to Build</button>
      )}
      {showPopup && (
        <div className="popup">
          <KitCards />
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
      <ToBuildCards />
    </div>
  );
};

export default App;
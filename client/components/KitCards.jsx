import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/KitCards.css';

const KitCards = () => {
  const [kits, setKits] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        let url = 'http://localhost:3000/kits';
        if (selectedGrade !== 'all') {
          url += `/grade/${selectedGrade}`;
        }
        const response = await axios.get(url);
        setKits(response.data);
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchKits();


    return () => {
      setLoaded(false);
    };
  }, [selectedGrade]);

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const handleCardClick = async (kit) => {
    console.log(kit);
    try {
      const response = await axios.post('http://localhost:3000/builds/tobuild', kit);
      console.log(response.data);
      window.location.reload(); // Refresh the website after the API call is made
    } catch (err) {
      console.error(err);
    }
  };
  
  const gradeOptions = ['all', 'PG', 'MG', 'RG', 'HG', 'EG', 'SD'];
  const sortedKits = kits.sort((a, b) => a.kit.localeCompare(b.kit));

  return (
    <div>
      <h2>Choose a Kit to Add!</h2>
      <div>
        <label htmlFor="gradeSelect">Select grade:</label>{' '}
        <select id="gradeSelect" value={selectedGrade} onChange={handleGradeChange}>
          {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      <div className="kit-cards">
        {sortedKits.map((kit) => (
          <div
            key={kit._id}
            className={`kit-card ${loaded ? 'loaded' : ''}`}
            onClick={() => handleCardClick(kit)}
          >
            <h3>{kit.kit}</h3>
            <div className="kit-card-content">
              <p>Price: ${kit.price}</p>
              <p>Grade: {kit.grade}</p>
              <p>Ver.ka: {kit.verka ? 'Yes' : 'No'}</p>
              <p>Series: {kit.series}</p>
              <p>Description: {kit.description}</p>
              <p>Notes: {kit.notes}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitCards;
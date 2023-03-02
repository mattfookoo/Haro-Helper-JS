import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './KitCards.css';

const ToBuildCards = () => {
  const [kits, setKits] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        let url = 'http://localhost:3000/builds';
        if (selectedGrade !== 'all') {
          url += `/grade/${selectedGrade}`;
        }
        const response = await axios.get(url);
        console.log('response:', response); // Debugging line
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

  console.log('kits:', kits); // Debugging line

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const gradeOptions = ['all', 'PG', 'MG', 'RG', 'HG', 'EG', 'SD'];

  return (
    <div>
      <h1>Backlog</h1>
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
      <div className="tobuild-cards">
        {kits.map((kit) => (
          <div
            key={kit._id}
            className={`tobuild-card ${loaded ? 'loaded' : ''}`}
            onClick={() => handleCardClick(kit)}
          >
            <h2>{kit.kit}</h2>
            <div className="tobuild-card-content">
              <p>Price: ${kit.price}</p>
              <p>Grade: {kit.grade}</p>
              <p>Ver.ka: {kit.verka ? 'Yes' : 'No'}</p>
              <p>Series: {kit.series}</p>
              <p>Completed: {kit.completed ? 'Yes' : 'No'}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToBuildCards;
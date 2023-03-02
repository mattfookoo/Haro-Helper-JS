import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/KitCards.css';

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
        setKits(response.data);
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchKits();
  }, [selectedGrade]);

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const handleCompletedChange = async (kitId) => {
    try {
      const kitToUpdate = kits.find((kit) => kit._id === kitId);
      const updatedKit = await axios.patch(`http://localhost:3000/builds/${kitId}`, {
        completed: !kitToUpdate.completed,
      });
      setKits((prevKits) =>
        prevKits.map((kit) => (kit._id === kitId ? updatedKit.data : kit))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (kitId) => {
    try {
      await axios.delete(`http://localhost:3000/builds/${kitId}`);
      setKits((prevKits) => prevKits.filter((kit) => kit._id !== kitId));
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const gradeOptions = ['All', 'PG', 'MG', 'RG', 'HG', 'EG', 'SD'];

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
      <div className="kit-cards">
        {kits.map((kit) => (
          <div key={kit._id} className={`kit-card ${loaded ? 'loaded' : ''}`}>
            <h2>{kit.kit}</h2>
            <div className="kit-card-content">
              <label>
                Completed:{' '}
                <input
                  type="checkbox"
                  checked={kit.completed}
                  onChange={() => handleCompletedChange(kit._id)}
                />
              </label>
              <p>Price: ${kit.price}</p>
              <p>Grade: {kit.grade}</p>
              <p>Ver.ka: {kit.verka ? 'Yes' : 'No'}</p>
              <p>Series: {kit.series}</p>
              <button onClick={() => handleDelete(kit._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToBuildCards;
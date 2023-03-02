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

  const gradeOptions = ['all', 'PG', 'MG', 'RG', 'HG', 'EG', 'SD'];
  const sortedKits = kits.sort((a, b) => a.kit.localeCompare(b.kit));

  return (
    <div>
      <h2>Backlog</h2>
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
          <div key={kit._id} className={`kit-card ${loaded ? 'loaded' : ''}`}>
            <h3>{kit.kit}</h3>
            <div className="kit-card-content">
              <label>
                Completed:{' '}
                <input
                  type="checkbox"
                  checked={kit.completed}
                  onChange={() => handleCompletedChange(kit._id)}
                />
              </label>
              <button onClick={() => handleDelete(kit._id)}>Delete</button>
              <p><b>Grade:</b> {kit.grade}</p>
              <p><b>Ver.ka:</b> {kit.verka ? 'Yes' : 'No'}</p>
              <p><b>Series:</b> {kit.series}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToBuildCards;
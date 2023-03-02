import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KitCards = () => {
  const [kits, setKits] = useState([]);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        const response = await axios.get('http://localhost:3000/kits');
        setKits(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchKits();
  }, []);

  return (
    <div>
      <h1>Kits</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {kits.map((kit) => (
          <div
            key={kit._id}
            style={{
              width: '300px',
              height: '400px',
              border: '1px solid black',
              margin: '10px',
              padding: '10px',
            }}
          >
            <h2>{kit.kit}</h2>
            <p>Grade: {kit.grade}</p>
            <p>Series: {kit.series}</p>
            <p>Price: {kit.price}</p>
            <p>Description: {kit.description}</p>
            <p>Notes: {kit.notes}</p>
            <p>Verka: {kit.verka ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitCards;
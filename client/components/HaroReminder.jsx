import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/KitCards.css';

const HaroReminder = () => {
  const [kits, setKits] = useState([]);
  const [oldKits, setOldKits] = useState([]);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        const response = await axios.get('http://localhost:3000/builds');
        setKits(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchKits();
  }, []);

  useEffect(() => {
    const now = new Date();
    const thirtyDaysAgo = now.setDate(now.getDate() - 30);
    const oldKits = kits.filter(kit => new Date(kit.createdAt) < thirtyDaysAgo);
    setOldKits(oldKits);
  }, [kits]);

  const calculateDays = (date) => {
    const now = new Date();
    const diff = Math.abs(now - new Date(date));
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div>
        <p>Danger! Danger! Backlog has old entries! The following kits are over 30 days old, Haro!</p>
      {oldKits.map((kit) => (
        <li key={kit._id}>{kit.kit} was added {calculateDays(kit.createdAt)} days ago!!!</li> 
      ))}
      <p>Please consider constructing your old kits before buying new ones, Haro!</p>
    </div>
  );
};

export default HaroReminder;
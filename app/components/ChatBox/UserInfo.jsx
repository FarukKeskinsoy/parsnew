"use client"
import React, { useState } from 'react';
import Select from 'react-select';

const cities = [
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  // Add more cities as needed
];

const UserInfo = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && city) {
      onSubmit({ name, city: city.label });
    }
  };

  return (
    <div className="user-info">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            City:
            <Select
              options={cities}
              value={city}
              onChange={setCity}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserInfo;

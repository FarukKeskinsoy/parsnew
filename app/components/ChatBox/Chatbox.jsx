"use client"
import React, { useState } from 'react';
import Select from 'react-select';
import './Chatbox.css';

const cities = [
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  // Add more cities as needed
];

const Chatbox = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState('');
  const [city, setCity] = useState(null);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    if (name && city) {
      setUserInfo({ name, city: city.label });
    }
  };

  return (
    <>
      <button className="sticky-button" onClick={toggleChatbox}>
        💬
      </button>
      {isChatboxOpen && !userInfo && (
        <div className="user-info">
          <form onSubmit={handleUserInfoSubmit}>
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
      )}
      {isChatboxOpen && userInfo && (
        <div className="chatbox">
          <div className="chatbox-header">
            Chat
            <button onClick={toggleChatbox} style={{ float: 'right', color: 'white', border: 'none', background: 'none' }}>✖</button>
          </div>
          <div className="chatbox-content">
            <p>Hello {userInfo.name} from {userInfo.city}! How can I help you?</p>
          </div>
          <div className="chatbox-footer">
            <input type="text" placeholder="Type a message..." />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;

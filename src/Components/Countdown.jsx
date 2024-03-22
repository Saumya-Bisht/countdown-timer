import React, { useState, useEffect } from 'react';
import './Countdown.css';

function Countdown() {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const handleInputChange = (event) => {
    setTargetDate(event.target.value);
  };

  const startCountdown = () => {
    const targetTime = new Date(targetDate).getTime();
    const currentTime = new Date().getTime();
    const timeRemaining = Math.max(targetTime - currentTime, 0);
    if (!targetDate) {
      alert('Please select a date.📅');
      return;
    }
    if (timeRemaining > 100 * 24 * 60 * 60 * 1000) {
      alert('Please select a target date within 100 days!😅');
      return;
    }

    setCountdown(timeRemaining);

    if (timeRemaining > 0) {
      const id = setInterval(() => {
        const updatedTime = Math.max(targetTime - new Date().getTime(), 0);
        setCountdown(updatedTime);
        if (updatedTime === 0) {clearInterval(id);
            alert('🎉The countdown is over! What is next on your adventure.🎉');}
      }, 1000);
      setTimerId(id);
    }
  };

  const stopCountdown = () => {
    clearInterval(timerId);
    setCountdown(0);
  };

  useEffect(() => {
    return () => {
      clearInterval(timerId);
    };
  }, [timerId]);

  return (
    <div className="Countdown">
      <h1>Countdown Timer ⌛</h1>
      <div>
        <label htmlFor="targetDate" style={{fontSize:"large"}}>Enter Target Date and Time:</label>
        <input
          type="datetime-local"
          id="targetDate"
          value={targetDate}
          onChange={handleInputChange}
          max={(new Date().getTime() + (99 * 24 * 60 * 60 * 1000))}
        />
      </div>
      <button onClick={startCountdown}>Start Countdown</button>
      <button onClick={stopCountdown}>Stop Countdown</button>
      <div className="countdown">
        <h2>Countdown Remaining:</h2>
        <p className='p'>
          {Math.floor(countdown / (1000 * 60 * 60 * 24))} days{' '}
          {('0' + Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2)} hours{' '}
          {('0' + Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60))).slice(-2)} minutes{' '}
          {('0' + Math.floor((countdown % (1000 * 60)) / 1000)).slice(-2)} seconds
        </p>
      </div>
    </div>
  );
}

export default Countdown;

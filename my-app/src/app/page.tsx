'use client'

import React, { useState, useEffect } from 'react';
import { differenceInMonths, addYears } from 'date-fns';

const LifeGrid = () => {
  const [birthday, setBirthday] = useState(null);
  const [monthsLived, setMonthsLived] = useState(0);
  const [totalMonths, setTotalMonths] = useState(1200); // 100 years * 12 months

  // Update calculations when birthday changes
  useEffect(() => {
    if (birthday) {
      const today = new Date();
      const months = differenceInMonths(today, birthday);
      if (months < 0) {
        alert("Your birthday can't be in the future!");
        setBirthday(null);
        return;
      }
      setMonthsLived(months);

      const hundredYearsLater = addYears(birthday, 100);
      const total = differenceInMonths(hundredYearsLater, birthday);
      setTotalMonths(total);
    }
  }, [birthday]);

  // Handle birthday input
  const handleBirthdayChange = (e) => {
    const date = new Date(e.target.value);
    if (!isNaN(date)) {
      setBirthday(date);
    }
  };

  // Generate grid: 1,200 cells
  const grid = [];
  for (let i = 1; i <= totalMonths; i++) {
    const isPast = i <= monthsLived;
    grid.push(
      <div
        key={i}
        className={isPast ? 'past-month' : 'future-month'}
        title={`Month ${i}`}
      />
    );
  }

  return (
    <div className="life-grid">
      <h1>Your Life in Months</h1>
      <label>
        Enter Your Birthday:
        <input type="date" onChange={handleBirthdayChange} />
      </label>
      {birthday && (
        <div>
          <p><strong>Months Lived:</strong> {monthsLived}</p>
          <p><strong>Months Remaining:</strong> {totalMonths - monthsLived}</p>
          {monthsLived > totalMonths && (
            <p>Congratulations on living beyond 100 years!</p>
          )}
          <div
            className="grid-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '5px',
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            {grid}
          </div>
        </div>
      )}
    </div>
  );
};

export default LifeGrid;
'use client'

import React, { useState, useEffect } from 'react';
import { differenceInMonths, differenceInDays, addYears } from 'date-fns';

// Move grid generation to a separate function outside the component
function generateGrid(totalMonths: number, monthsLived: number) {
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
  return grid;
}

function LifeGrid() {
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [monthsLived, setMonthsLived] = useState(0);
  const [daysLived, setDaysLived] = useState(0);
  const [totalMonths, setTotalMonths] = useState(1200); // 100 years * 12 months
  const [totalDays, setTotalDays] = useState(36500); // Initial 100 years in days

  // Update calculations when birthday changes
  useEffect(() => {
    if (birthday) {
      const today = new Date();
      const months = differenceInMonths(today, birthday);
      const days = differenceInDays(today, birthday);
      
      if (months < 0) {
        alert("Your birthday can't be in the future!");
        setBirthday(null);
        return;
      }
      
      setMonthsLived(months);
      setDaysLived(days);

      const hundredYearsLater = addYears(birthday, 100);
      const totalMonthsCalc = differenceInMonths(hundredYearsLater, birthday);
      const totalDaysCalc = differenceInDays(hundredYearsLater, birthday);
      
      setTotalMonths(totalMonthsCalc);
      setTotalDays(totalDaysCalc);
    }
  }, [birthday]);

  // Handle birthday input
  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setBirthday(date);
    }
  };

  const grid = generateGrid(totalMonths, monthsLived);

  return (
    <div className="life-grid">
      <h1>Your Life in Months</h1>
      <label>
        Enter Your Birthday:
        <input type="date" onChange={handleBirthdayChange} />
      </label>
      {birthday && (
        <div>
          <p><strong>Time Lived:</strong></p>
          <ul>
            <li>Months: {monthsLived.toLocaleString()}</li>
            <li>Days: {daysLived.toLocaleString()}</li>
          </ul>
          <p><strong>Time Remaining (to 100 years):</strong></p>
          <ul>
            <li>Months: {(totalMonths - monthsLived).toLocaleString()}</li>
            <li>Days: {(totalDays - daysLived).toLocaleString()}</li>
          </ul>
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
}

export default LifeGrid; 
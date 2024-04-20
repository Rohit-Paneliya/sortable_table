
import React, { useState } from 'react';

function CustomDatePicker ({ onHandleDateChange })  {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setSelectedDate(previousDay);
    onHandleDateChange(previousDay)
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
    onHandleDateChange(nextDay)
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <>
      <button style={{marginRight: "0.5rem"}} onClick={handlePreviousDay}>&lt;&lt;</button>
      <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} />
      <button style={{marginLeft: "0.5rem", marginRight: "1rem"}} onClick={handleNextDay}>&gt;&gt;</button>
    </>
  );
};

export default CustomDatePicker;
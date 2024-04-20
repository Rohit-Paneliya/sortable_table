
import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';

function CustomDatePicker({ onHandleDateChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setSelectedDate(previousDay);
    // onHandleDateChange(previousDay)
    handleDateChangeDebounced(previousDay)
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
    // onHandleDateChange(nextDay)
    handleDateChangeDebounced(nextDay)
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
    // onHandleDateChange(new Date(event.target.value))
    handleDateChangeDebounced(new Date(event.target.value))
  };

  const handleDateChangeDebounced = useCallback(
    debounce((date) => {
      console.log('Selected Date (debounced):', date);
      onHandleDateChange(date)
    }, 300)
    , []);

  return (
    <>
      <button style={{ marginRight: "0.5rem" }} onClick={handlePreviousDay}>&lt;&lt;</button>
      <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} />
      <button style={{ marginLeft: "0.5rem", marginRight: "1rem" }} onClick={handleNextDay}>&gt;&gt;</button>
    </>
  );
};

export default CustomDatePicker;
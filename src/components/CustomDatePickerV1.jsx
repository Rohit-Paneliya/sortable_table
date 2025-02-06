import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

// Sample role (this can be passed as a prop)
const ROLE = 'team_leader'; // Change to 'other_role' for normal calendar

// Define custom date styles based on the role
const CustomDatePickerV1 = ({ role }) => {
  const [startDate, setStartDate] = useState(null);

  // Set today's date as the default startDate when the component is first rendered
  useEffect(() => {
    setStartDate(new Date()); // Initialize to today's date
  }, []);

  // Custom function to determine date styling
  const customDayClassName = (date) => {
    const today = new Date();
    const publishedDates = ['2025-02-01', '2025-02-02']; // Example published dates
    const dateStr = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD

    // Logic for Team Leader role
    if (role === 'team_leader') {
      if (date > today) {
        return 'disabled'; // For future dates (disabled, grey)
      } else if (publishedDates.includes(dateStr)) {
        return 'published'; // Published dates (green)
      } else {
        return 'unpublished'; // All other past dates (yellow)
      }
    }

    // Logic for other roles
    if (role === 'other_role') {
      if (date > today) {
        return 'disabled'; // For future dates (disabled, grey)
      } else if (publishedDates.includes(dateStr)) {
        return 'published'; // Published dates (green)
      } else {
        return 'disabled'; // All other past dates (disabled, grey)
      }
    }

    return ''; // No custom styling for other cases
  };

  // Custom style overrides
  const CustomDatePickerWrapper = styled.div`
    .published {      
      color: black !important;      
    }
    .unpublished {
      color: darkgrey !important;
    }
    .disabled {    
      color: grey !important;
      pointer-events: none;
    }
    .react-datepicker__day--selected {
      background-color: darkblue !important; /* Custom color for selected date */
      color: white !important; /* Custom text color for selected date */
      border-radius: 50% !important;
    }      
  `;

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <button className={className} onClick={onClick} ref={ref}>
        {value}
      </button>
    ),
  );

  return (
    <CustomDatePickerWrapper>
      <DatePicker
        todayButton= "Today"
        selected={startDate}
        openToDate={startDate}
        dateFormat={'MM/dd/yyyy'}
        onChange={(date) => setStartDate(date)}
        calendarClassName="custom-calendar"
        dayClassName={(date) => customDayClassName(date)}
        maxDate={new Date()}        
        customInput={<ExampleCustomInput className="example-custom-input" />}
      />
    </CustomDatePickerWrapper>
  );
};

export default CustomDatePickerV1;

import { useEffect, useState } from 'react';
import './App.css';
import { tableHeadersData } from './components/Constants';
import { SortableTable } from './components/SortableTable';
import data from "./data.json";
import axios from 'axios';
import CustomDatePickerV1 from './components/CustomDatePickerV1';
import { SortableTableTemp } from './components/SortableTableTemp';

function App() {

  const [loadDate, setLoadDate] = useState(new Date())

  const [results, setResults] = useState({
    "loading": true,
    "error": false,
    "errorMessage": "",
    "data": null
  })
  
  const onDateChange  = (selectedDate) => {
      setLoadDate(selectedDate)
  }

  useEffect(() => {
    // console.log('API call ', loadDate.toISOString())
    setResults((prevState) => {
      return({
        ...prevState,
        loading: true,
        error: false,
      });
    });   
    loadData()
  },[loadDate])

  const loadData = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users?page=2")
      setResults((prevState) => {
        return({
          ...prevState,
          loading: false,
          error: false,
          data: response.data
        });
      });      
    } catch (err) {
      setResults((prevState) => {
        return({
          ...prevState,
          loading: false,
          error: true,
          errorMessage: err.toString()
        });
      });
    }
  }


  return (
    <div style={{marginLeft: "10rem"}}>
      <h1>Team Leader Calendar</h1>
      <CustomDatePickerV1 role="team_leader" /> {/* Role set to team_leader */}
      
      <h1>Other Role Calendar</h1>
      <CustomDatePickerV1 role="other_role" /> {/* Role set to other_role */}
    </div>
  );
}

export default App;

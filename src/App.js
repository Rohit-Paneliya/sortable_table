import { useEffect, useState } from 'react';
import './App.css';
import { tableHeadersData } from './components/Constants';
import { SortableTable } from './components/SortableTable';
import data from "./data.json";
import axios from 'axios';

function App() {

  const [results, setResults] = useState({
    "loading": true,
    "error": false,
    "errorMessage": "",
    "data": null
  }) 

  useEffect(() => {
    loadData()
  },[])

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
    <div className="App">
        {results.loading === true && <h1>Loading....</h1> }
        {results.error === true && <h1>Error: {results.errorMessage}</h1>}
        {results.loading === false && results.error === false &&  <SortableTable listOfData={data} tableHeaderData= {tableHeadersData}/>        }        
    </div>
  );
}

export default App;

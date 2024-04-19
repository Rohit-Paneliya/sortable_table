import './App.css';
import { tableHeadersData } from './components/Constants';
import { SortableTable } from './components/SortableTable';
import data from "./data_1.json";

function App() {
  return (
    <div className="App">
        <SortableTable listOfData={data} tableHeaderData= {tableHeadersData}/>
    </div>
  );
}

export default App;

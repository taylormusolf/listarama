import { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // Row Data: The data to be displayed.
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "ord", rowDrag: true, valueGetter: "node.rowIndex + 1"},
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ]);
  const [rowData, setRowData] = useState(()=> {
    const saved = localStorage.getItem("rowData");
    const initialValue = JSON.parse(saved);
    return initialValue || [
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ];
  });
  
  useEffect(() => {
    localStorage.setItem("rowData", JSON.stringify(rowData));
  }, [rowData]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    // setGridColumnApi(params.columnApi);
  };




  return (
    <>

      <h1>Create a List</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          create a list
        </button>
        <p>
         Create a list for every occasion!
        </p>
      </div>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          rowDragManaged
          rowDragMultiRow
          rowSelection='multiple'
          rowDragEntireRow
          onGridReady={onGridReady}
          onRowDragEnd={(e)=> {
            const rows = [];
            gridApi.forEachNodeAfterFilterAndSort((node, id) => rows.push({...node.data}));
            setRowData(rows);
            console.log(rows);
            e.api.refreshCells();
          }}
        />
      </div>
      <p className="read-the-docs">
        All rights reserved
      </p>
    </>
  )
}

export default App

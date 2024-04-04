import { useEffect, useState, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import './App.css'

function App() {
  // Row Data: The data to be displayed.
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [newListItem, setNewListItem] = useState({make: '', model: '', price: '', electric: false})
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "ord", rowDrag: true, valueGetter: "node.rowIndex + 1"},
    { field: "make", cellEditor: "agTextCellEditor",
      cellEditorParams: {
        maxLength: 20,
      } 
    },
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

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
    };
  }, []);
  
  useEffect(() => {
    localStorage.setItem("rowData", JSON.stringify(rowData));
  }, [rowData]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    // setGridColumnApi(params.columnApi);
  };

  const handleFormSubmit = (e) => {
    setRowData([...rowData, newListItem]);
    setNewListItem({make: '', model: '', price: '', electric: false})
  }
  
  return (
    <>

      <h1>Create a List</h1>
      <div className="card">
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
          defaultColDef={defaultColDef}
          onRowDragEnd={(e)=> {
            const rows = [];
            gridApi.forEachNodeAfterFilterAndSort((node, id) => rows.push({...node.data}));
            setRowData(rows);
            console.log(rows);
            e.api.refreshCells();
          }}
        />
      </div>
      <form onSubmit={handleFormSubmit}>
          <label> Make <input type="text" value={newListItem.make} onChange={e => setNewListItem({...newListItem, make: e.target.value})}/></label>
          <label> Model <input type="text" value={newListItem.model} onChange={e => setNewListItem({...newListItem, model: e.target.value})}/></label>
          <label> Price <input type="number" value={newListItem.price} onChange={e => setNewListItem({...newListItem, price: parseInt(e.target.value)})}/></label>
          <label> Electric <input type="checkbox"/></label>
          <button>Add New Item</button>
      </form>
      <p className="read-the-docs">
        All rights reserved
      </p>
    </>
  )
}

export default App

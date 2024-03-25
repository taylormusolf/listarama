import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
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
      <p className="read-the-docs">
        All rights reserved
      </p>
    </>
  )
}

export default App

import React from 'react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <div className="navbar">
         <Link to={"/"}>
        <div className="navbar-brand">Kalvium</div></Link>
      </div>
    </div>
  );
}

export default App;




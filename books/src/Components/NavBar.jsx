import React from 'react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <div className="navbar">
         <Link to={"/"}>
        <div className="navbar-brand">Kalvium</div></Link>
        <Link to={"/form"}>
        <button className="register-btn">Register</button></Link>
      </div>
    </div>
  );
}

export default App;




import './App.css'
import Books from './Components/Books'
import RegistrationForm from './Components/RegistrationForm'
import React from "react"
import {Route,Routes} from "react-router-dom"
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Books/>}/>
      <Route path='/form' element={<RegistrationForm/>}/>
    </Routes>
  )
}
export default App
import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Item from './Components/Item/Item'
import CreateItem from './Components/CreateItem/CreateItem'
import UpdateItem from './Components/UpdateItem/UpdateItem'
import Register from './AccessComponents/Register/RegisterUser'
import Login from './AccessComponents/Login/LoginUser'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <BrowserRouter>
         <Routes>
          <Route path="/home" element={<Item />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/update/:id" element={<UpdateItem />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
         </Routes>
      </BrowserRouter>
    </div>

    </>
  )
}

export default App

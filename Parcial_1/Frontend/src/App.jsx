import { useState } from 'react'
import './App.css'
import Funciones from './component/Functions.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Funciones/>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import vehicles from './data/vehicles'
import ShowHide from './components/ShowHide'

function App() {
  const [count, setCount] = useState(0)
  const VehicleList = vehicles.map(v => {
      return <Card title={v.name} description={v.description}/>

  })

  return (
    
      <div className='App'>
      <h1>Hola</h1>
      <div className='container'>
      {VehicleList}
      </div>
      <ShowHide/>
      </div>
  )
}

export default App

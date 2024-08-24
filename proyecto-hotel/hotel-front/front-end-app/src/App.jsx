import { useEffect, useState } from 'react'
import './App.css'
import CardRoom from './components/CardRoom.jsx';

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4700/v1/hotel');
        const result = await response.json();
        setRooms(result);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      { (rooms.length === 0) ? "Cargando": rooms.map((room)=>{
        if(room.Libre === "Si"){
          return <CardRoom tipo={room.tipo} numero={room.numero} libre={room.Libre} color='green'/>
        }else if(room.Libre==="No"){
          return <CardRoom tipo={room.tipo} numero={room.numero} libre={room.Libre} color='red'/>
        }
        
      })}
    </>
  )
}

export default App

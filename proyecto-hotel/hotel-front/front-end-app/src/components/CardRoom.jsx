import '../styles/CardRoom.css';

function CardRoom({tipo, numero, libre, color}){
    function validateLibre(e){
        const valueLibre = e.target.value;
        const numeroRoom = e.target.id;
        // console.log(e.target.parentNode.id)
        if(valueLibre === "Si"){
            fetch(`http://localhost:4700/v1/hotel/changeStateRoom/${numeroRoom}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({libre: "No"})
            })
                .then((response) => response.json())
                .then((data)=>console.log(data))

        }else if(valueLibre === "No"){
            fetch(`http://localhost:4700/v1/hotel/changeStateRoom/${numeroRoom}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({libre: "Si"})
            })
                .then((response) => response.json())
                .then((data)=>console.log(data))
        }
    }
    return (
        <div className="room" id={color}>
            <h4>Habitacion {tipo}</h4>
            <h5>Numero: {numero}</h5>
            <p>Libre: {libre}</p>
            <button className='btnRoom' id={numero} value={libre} onClick={validateLibre}>Pedir Habitacion</button>
        </div>
    )
}

export default CardRoom;
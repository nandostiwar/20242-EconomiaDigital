import React from "react";
import "./VehicleView.css";

function VehivleView({vehicle}){
    return(
        <div className="VehicleView">
            <h1>{vehicle.name}</h1>
            <h2>{vehicle.description}</h2>
            <img src={vehicle.image} alt={vehicle.name + " imágen"} />
        </div>
    )
}

export default VehivleView;
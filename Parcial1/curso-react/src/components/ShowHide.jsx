import React from "react"
import { useState } from "react"

function ShowHide(){
    const [show, setshow] = useState(true);

        const handleclick = (event) =>{
            setshow(!show);
        }

    return (
        <div>
           {show && <h2>HIDE ME!</h2> }
           <button onClick={handleclick}>{ show ? 
           "Hide text" : "Show text"}</button>
        </div>
    )
}

export default ShowHide
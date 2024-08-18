import React, { useState } from 'react'

function ShowHide() {

    const [show, setShow] = useState(true)
    const handleClick = (Event) => {
        setShow(!show);        
    }

  return (
    <div>
        <button onClick={handleClick}>{ show ? "Hide" : "Show" } Text </button>
        { show && <h2>hide me!</h2>}
    </div>
  )
}

export default ShowHide
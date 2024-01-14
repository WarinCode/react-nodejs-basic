import React, { useState } from 'react'

const Card = ({ val}) => {
    const [open, setOpen] = useState(false)

  return (
    <div>
        <h1>{val}</h1>
        <button onClick={() => setOpen(!open)}>click</button>
        {open && <p>hello</p>}
    </div>
  )
}

export default Card
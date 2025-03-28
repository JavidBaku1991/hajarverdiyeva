import React from 'react'

function TitleLine({title}) {
  return (
    <div>
    <hr className='contact-hr mt-1'/>
        <p className='contact-line' > <span className='span uppercase'>{title}</span>   </p>
       
    </div>
  )
}

export default TitleLine
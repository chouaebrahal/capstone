import React from 'react'

const Letter = ({letter,handleClick,isCorrect,endgame}) => {
  
  return (
     <button disabled={endgame} onClick={handleClick} className='letter' style={{backgroundColor: (isCorrect === null) ? "" : (isCorrect) ? "green" : "red"} } >{letter}</button>
  )
}

export default Letter
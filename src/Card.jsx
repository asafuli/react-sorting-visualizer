import React from 'react'


function Card({cardId, uuid, swap, card}) {
  
  return (
    <div className={`card ${swap}`} id={cardId}>
      {card[0]}
    </div>
  )
}

export default Card

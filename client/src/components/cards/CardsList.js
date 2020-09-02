import React from 'react';
import './cards.scss';

const CardsList = (props) => {

  const Card = (props) => {
    return <div className="card-item">
      {props.text}
    </div>
  }

  return (<div className="cards-list">
    {props.cards.map(lane => {
      return <Card text={lane.text} />
    })}
  </div>)
}

export default CardsList;
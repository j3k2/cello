import React from 'react';
import Lane from './Lane';

const LanesList = (props) => {
  return (<React.Fragment>
    {props.lanes.map((lane, idx) => {
      return <Lane
        title={lane.title}
        idx={idx}
        key={lane.id}
        id={lane.id}
        cards={lane.cards}
        editCard={props.editCard}
        editLane={props.editLane}
        deleteLane={props.deleteLane}
        deleteCard={props.deleteCard}
        addCard={props.addCard} />
    })}
  </React.Fragment>)
}

export default LanesList;
import React from 'react';
import CardCreator from '../cards/CardCreator'
import CardsList from '../cards/CardsList';
import './lanes.scss';

const LanesList = (props) => {

  const Lane = (props) => {
    return <div className="board-lane">
      <div className="lane-content">
        <div className="lane-header">
          {props.title}
        </div>
        <CardsList cards={props.cards} laneId={props.id} />
        <CardCreator laneId={props.id} addCard={props.addCard} />
      </div>
    </div>
  }

  return (<React.Fragment>
    {props.lanes.map(lane => {
      return <Lane
        title={lane.title}
        key={lane.id}
        id={lane.id}
        cards={lane.cards}
        addCard={props.addCard} />
    })}
  </React.Fragment>)
}

export default LanesList;
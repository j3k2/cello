import React from 'react';
import CardCreator from '../cards/CardCreator'
import CardsList from '../cards/CardsList';
import './lanes.scss';

const LanesList = (props) => {

  const Lane = (props) => {
    return <div className="board-lane">
      <div className="lane-content">
        <div>
          {props.title}
        </div>
        <CardsList cards={props.cards}/>
        <CardCreator laneId={props.id} addCard={props.addCard}/>
      </div>
    </div>
  }

  return (<React.Fragment>
    {props.lanes.map(lane => {
      return <Lane title={lane.title} id={lane.id} cards={lane.cards} addCard={props.addCard}/>
    })}
  </React.Fragment>)
}

export default LanesList;
import React from 'react';
import CardCreator from '../cards/CardCreator'
import CardsList from '../cards/CardsList';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import './lanes.scss';

const LanesList = (props) => {

  const Lane = (props) => {
    return <Draggable
        draggableId={`draggable.${props.id}`}
        index={props.idx}
      >
        {(provided, snapshot) => (
          <div className="board-lane"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="lane-content">
              <div className="lane-header">
                {props.title}
              </div>
              <CardsList cards={props.cards} laneId={props.id} />
              <CardCreator laneId={props.id} addCard={props.addCard} />
            </div>
          </div>

      )}
    </Draggable>
  }

return (<React.Fragment>
  {props.lanes.map((lane, idx) => {
    return <Lane
      title={lane.title}
      idx={idx}
      key={lane.id}
      id={lane.id}
      cards={lane.cards}
      addCard={props.addCard} />
  })}
</React.Fragment>)
}

export default LanesList;
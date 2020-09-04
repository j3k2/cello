import React from 'react';
import './cards.scss';
import { Draggable } from 'react-beautiful-dnd';

const Card = (props) => {
  return <Draggable
    key={props.id}
    draggableId={`draggable.${props.id}`}
    index={props.idx}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div className="card-item">
          {props.text}</div>
      </div>
    )}
  </Draggable>
}

export default Card;
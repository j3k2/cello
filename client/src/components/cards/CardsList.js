import React from 'react';
import './cards.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const CardsList = (props) => {

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

  const List = (props) => {
    return props.cards.map((card, idx) => {
      return <Card text={card.text}
        idx={idx}
        id={card.id}
        key={card.id}
      />
    });
  }

  return (
    <Droppable type="CARD" droppableId={`droppable.${props.laneId}`}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="cards-list">
          <List cards={props.cards} />
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>)
}

export default CardsList;
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DRAG_TYPE_CARD } from "../../constants";
import Card from "./Card";

const CardsGroup = (props) => {
  return (
    <Droppable type={DRAG_TYPE_CARD} droppableId={`droppable.${props.laneId}`}>
      {(provided, snapshot) => (
        <div
          className="cards-group"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {props.cards &&
            props.cards.map((card, idx) => {
              return (
                <Card
                  laneId={props.laneId}
                  title={card.title}
                  idx={idx}
                  id={card.id}
                  key={card.id}
                />
              );
            })}
          {provided.placeholder}
          <style jsx>
            {`
              .cards-group {
                display: flex;
                flex-direction: column;
                min-height: 1px;
                overflow-x: hidden;
                padding: 0px 8px;
              }
            `}
          </style>
        </div>
      )}
    </Droppable>
  );
};

export default CardsGroup;

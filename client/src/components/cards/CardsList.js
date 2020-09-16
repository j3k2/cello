import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const CardsList = (props) => {
  const List = (props) => {
    return props.cards.map((card, idx) => {
      return <Card text={card.text} idx={idx} id={card.id} key={card.id} />;
    });
  };
  return (
    <Droppable type="CARD" droppableId={`droppable.${props.laneId}`}>
      {(provided, snapshot) => (
        <div
          className="cards-list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {props.cards && <List cards={props.cards} />}
          {provided.placeholder}
          <style jsx>
            {`
              .cards-list {
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

export default CardsList;

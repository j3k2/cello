import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = (props) => {
  return (
    <Draggable
      key={props.id}
      draggableId={`draggable.${props.id}`}
      index={props.idx}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-item">
            {props.text}
            <style jsx>
              {`
                .card-item {
                  background: #fff;
                  margin-bottom: 8px;
                  min-height: 32px;
                  border-radius: 3px;
                  padding: 6px 8px;
                  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
                  max-width: 260px;
                  font-size: 14px;
                  line-height: 20px;
                }
              `}
            </style>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;

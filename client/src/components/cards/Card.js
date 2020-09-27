import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import css from "styled-jsx/css";

const Card = (props) => {
  function getLinkStyle() {
    return css.resolve`
      .card-item {
        background-color: #fff;
        margin-bottom: 8px;
        min-height: 32px;
        border-radius: 3px;
        padding: 6px 8px;
        box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
        max-width: 260px;
        cursor: pointer;
        &:hover {
          background-color: #f4f5f7;
        }
      }
    `;
  }

  const { className: linkClassName, styles: linkStyleElement } = getLinkStyle();

  return (
    <Draggable
      key={props.id}
      draggableId={`draggable.${props.id}`}
      index={props.idx}
    >
      {(provided) => (
        <Link
          className={`text card-item ${linkClassName}`}
          to={`/c/${props.id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>{props.title}</span>
          {linkStyleElement}
        </Link>
      )}
    </Draggable>
  );
};

export default Card;

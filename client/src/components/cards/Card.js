import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ReactModal from "react-modal";
import css from "styled-jsx/css";

import CardDetails from './CardDetails';

const Card = (props) => {
  ReactModal.setAppElement("#root");

  const [showModal, setShowModal] = React.useState(false);

  function getModalStyle() {
    return css.resolve`
      .ReactModal__Content {
        width: 640px;
        margin: 100px auto;
        border-radius: 3px;
      }
    `;
  }

  const {
    className: modalClassName,
    styles: modalStyleElement,
  } = getModalStyle();

  return (
    <React.Fragment>
      <ReactModal
        className={modalClassName}
        isOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
        shouldCloseOnOverlayClick={true}
      >
        <CardDetails
          id={props.id}
          laneId={props.laneId} 
          title={props.title}
          closeAction={() => {
            setShowModal(false);
          }}
          deleteCard={props.deleteCard}
          editCard={props.editCard}
        />
        {modalStyleElement}
      </ReactModal>
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
            <div
              className="card-item"
              onClick={() => {
                setShowModal(true);
              }}
            >
              {props.title}
              <style jsx>
                {`
                  .card-item {
                    background-color: #fff;
                    margin-bottom: 8px;
                    min-height: 32px;
                    border-radius: 3px;
                    padding: 6px 8px;
                    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
                    max-width: 260px;
                    cursor: pointer;
                    &:hover{
                      background-color:#f4f5f7;
                    }
                  }
                `}
              </style>
            </div>
          </div>
        )}
      </Draggable>
    </React.Fragment>
  );
};

export default Card;

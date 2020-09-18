import React from "react";
import CardCreator from "../cards/CardCreator";
import cardsService from "../../services/cards";
import CardsList from "../cards/CardsList";
import Editor from "../common/Editor";
import LaneWrapper from "./LaneWrapper";
import lanesService from "../../services/lanes";
import { Draggable } from "react-beautiful-dnd";

const Lane = (props) => {
  return (
    <Draggable draggableId={`draggable.${props.id}`} index={props.idx}>
      {(provided, snapshot) => (
        <LaneWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <div className="lane-content" {...provided.dragHandleProps}>
            <div className="lane-header">
              <Editor
                multiline
                content={props.title}
                updateContent={async (updatedTitle) => {
                  props.editLane(props.id, { title: updatedTitle });
                  const updatedFields = await lanesService.editLane(props.id, {
                    title: updatedTitle,
                  });
                  if (updatedFields) {
                    props.editLane(props.id, updatedFields);
                  }
                }}
              />
            </div>
            <CardsList cards={props.cards} laneId={props.id} />
            <CardCreator
              cards={props.cards}
              create={async (cardText) => {
                const card = await cardsService.createCard({
                  laneId: props.id,
                  text: cardText,
                });
                if (card) {
                  props.addCard(props.id, card);
                }
              }}
            />
          </div>
          <style jsx>
            {`
              .lane-content {
                border-radius: 3px;
                background: #ebecf0;
                color: rgb(23, 43, 77);
                max-height: 100%;
                display: flex;
                flex-direction: column;
              }

              .lane-header {
                min-height: 40px;
                font-weight: bold;
                font-size: 14px;
                padding: 8px 10px;
                cursor: pointer;
                min-width: 272px;
                max-width: 272px;
                flex: none;
              }
            `}
          </style>
        </LaneWrapper>
      )}
    </Draggable>
  );
};

export default Lane;

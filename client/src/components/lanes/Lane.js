import React from "react";
import cardsService from "../../services/cards";
import CardsList from "../cards/CardsList";
import InlineEditor from "../common/InlineEditor";
import Creator from "../common/Creator";
import LaneWrapper from "./LaneWrapper";
import lanesService from "../../services/lanes";
import { Draggable } from "react-beautiful-dnd";
import Deleter from "../common/Deleter";

const Lane = (props) => {
  return (
    <Draggable draggableId={`draggable.${props.id}`} index={props.idx}>
      {(provided, snapshot) => (
        <LaneWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <div className="lane-content" {...provided.dragHandleProps}>
            <div className="lane-header">
              <InlineEditor
                multiline
                lane
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
              <div className="deleter-wrapper">
                <Deleter delete={async ()=>{
                  const res = await lanesService.deleteLane(props.id);
                  if(res) {
                    props.deleteLane(props.id);
                  }
                }}
                
                dialogTitle="Delete List?" />
              </div>
            </div>
            <CardsList
              laneId={props.id}
              editCard={props.editCard}
              cards={props.cards}
              laneId={props.id}
              deleteCard={props.deleteCard}
            />
            <Creator
              create={async (cardTitle) => {
                const card = await cardsService.createCard({
                  laneId: props.id,
                  title: cardTitle,
                });
                if (card) {
                  props.addCard(props.id, card);
                }
              }}
              type="card"
              placeholder={"Enter a title for this card..."}
              buttonText={"Add Card"}
              toggleText={
                props.cards && props.cards.length
                  ? "Add another card"
                  : "Add a card"
              }
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
                padding: 6px 10px 4px 12px;
                cursor: pointer;
                min-width: 272px;
                max-width: 272px;
                flex: none;
                position: relative;
              }

              .deleter-wrapper{
                position: absolute;
                top: 4px;
                right: 4px;
              }
            `}
          </style>
        </LaneWrapper>
      )}
    </Draggable>
  );
};

export default Lane;

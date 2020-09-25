import React from "react";
import CardsList from "../cards/CardsList";
import InlineEditor from "../common/InlineEditor";
import LaneWrapper from "./LaneWrapper";
import CardCreator from "../cards/CardCreator";
import lanesService from "../../services/lanes";
import { Draggable } from "react-beautiful-dnd";
import Deleter from "../common/Deleter";
import { useBoardContext } from "../../contexts/Board";

const Lane = (props) => {
  const { editLane, deleteLane, board } = useBoardContext();

  return (
    <Draggable draggableId={`draggable.${props.id}`} index={props.idx}>
      {(provided, snapshot) => (
        <LaneWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <div className="lane-content" {...provided.dragHandleProps}>
            <div className="lane-header">
              <InlineEditor
                multiline
                content={props.title}
                updateContent={async (updatedTitle) => {
                  const oldLane = { ...board.lanes[props.idx] };
                  editLane(props.id, { title: updatedTitle });
                  const updatedFields = await lanesService.editLane(props.id, {
                    title: updatedTitle,
                  });
                  if (updatedFields) {
                    editLane(props.id, updatedFields);
                  } else {
                    editLane(props.id, oldLane);
                  }
                }}
              />
              <div className="deleter-wrapper">
                <Deleter
                  className="action"
                  delete={async () => {
                    const res = await lanesService.deleteLane(props.id);
                    if (res) {
                      deleteLane(props.id);
                    }
                  }}
                  message="Are you sure you want to delete this list and its cards? There is no undo."
                  dialogTitle="Delete List?"
                />
              </div>
            </div>
            <CardsList laneId={props.id} cards={props.cards} />
            <CardCreator
              laneId={props.id}
              numCards={props.cards && props.cards.length}
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

              .lane-header :global(.editor-content) {
                width: 224px;
              }

              .lane-header :global(.editor-form) {
                width: 228px;
              }

              .deleter-wrapper {
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

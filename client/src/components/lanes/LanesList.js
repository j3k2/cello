import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DRAG_TYPE_CARD, DRAG_TYPE_LANE } from "../../constants";
import Lane from "./Lane";
import LaneCreator from "../lanes/LaneCreator";
import { useBoardContext } from "../../contexts/Board";

const LanesList = (props) => {
  const { reorderLaneCards, moveCardToLane, moveLane } = useBoardContext();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === DRAG_TYPE_CARD) {
      const cardId = draggableId.split(".")[1];
      const prevIdx = source.index;
      const nextIdx = destination.index;
      if (
        destination.droppableId === source.droppableId &&
        destination.index !== source.index
      ) {
        const laneId = destination.droppableId.split(".")[1];
        reorderLaneCards(laneId, cardId, prevIdx, nextIdx);
      }
      if (destination.droppableId !== source.droppableId) {
        const prevLaneId = source.droppableId.split(".")[1];
        const nextLaneId = destination.droppableId.split(".")[1];
        moveCardToLane(cardId, prevLaneId, nextLaneId, prevIdx, nextIdx);
      }
    }
    if (type === DRAG_TYPE_LANE) {
      moveLane(draggableId.split(".")[1], source.index, destination.index);
    }
  };

  return (
    <div className="lanes-wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          type={DRAG_TYPE_LANE}
          droppableId="droppable.board"
          direction="horizontal"
        >
          {(provided) => (
            <div
              className="lanes-content"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.lanes.map((lane, idx) => {
                return (
                  <Lane
                    className="board-lane"
                    title={lane.title}
                    idx={idx}
                    key={lane.id}
                    id={lane.id}
                    cards={lane.cards}
                  />
                );
              })}
              {provided.placeholder}
              <div className="board-lane">
                <LaneCreator numLanes={props.lanes && props.lanes.length} />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <style jsx>
        {`
          .lanes-wrapper {
            position: relative;
            flex-grow: 1;
          }

          .lanes-content {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            overflow-y: hidden;
            padding-bottom: 8px;
          }

          .lanes-content :global(.board-lane) {
            margin: 0px 4px;
            min-width: 272px;
            max-width: 272px;
            overflow-wrap: break-word;
            display: flex;
            flex-direction: column;
            &:first-child {
              margin-left: 8px;
            }
            &:last-child {
              min-width: 280px;
              max-width: 280px;
              border-right: solid 8px transparent;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LanesList;

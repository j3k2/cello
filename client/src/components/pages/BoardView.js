import React from "react";
import { useParams, useHistory } from "react-router-dom";

import LanesList from "../lanes/LanesList";
import LaneCreator from "../lanes/LaneCreator";
import InlineEditor from "../common/InlineEditor";
import Deleter from "../common/Deleter";

import boardsService from "../../services/boards";

import { useBoardContext } from "../../contexts/Board";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Spinner from "react-spinkit";

const BoardView = () => {
  const params = useParams();
  const history = useHistory();
  const {
    board,
    boardLoading,
    updateBoardId,
    editBoard,
    reorderLaneCards,
    moveCardToLane,
    moveLane,
  } = useBoardContext();

  React.useEffect(() => {
    updateBoardId(params.id);
    return () => {
      updateBoardId();
    };
  }, [updateBoardId, params.id]);

  const onDragEnd = (result, provided) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === "CARD") {
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
    if (type === "LANE") {
      moveLane(draggableId.split(".")[1], source.index, destination.index);
    }
  };

  return (
    <div className="board-view-wrapper">
      {board && !boardLoading && (
        <React.Fragment>
          <div className="board-view-header">
            <div className="board-title">
              <InlineEditor
                hover
                content={board.title}
                updateContent={async (updatedTitle) => {
                  const oldBoard = { ...board };
                  editBoard({ title: updatedTitle });
                  try {
                    const updatedFields = await boardsService.editBoard(
                      params.id,
                      {
                        title: updatedTitle,
                      }
                    );
                    editBoard(updatedFields);
                  } catch {
                    editBoard(oldBoard);
                  }
                }}
              />
            </div>
            <Deleter
              delete={async () => {
                try {
                  await boardsService.deleteBoard(params.id);
                  history.push("/");
                } catch {}
              }}
              message="Are you sure you want to delete this board and its lists and cards? There is no undo."
              dialogTitle="Delete Board?"
              className="overlay"
            />
          </div>
          <div className="board-view-container">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                type="LANE"
                droppableId="droppable.board"
                direction="horizontal"
              >
                {(provided, snapshot) => (
                  <div
                    className="board-view-content"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <LanesList lanes={board.lanes} />
                    {provided.placeholder}
                    <LaneCreator numLanes={board.lanes && board.lanes.length} />
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </React.Fragment>
      )}

      {!board && !boardLoading && (
        <div className="page-message">
          <h1>Board not found.</h1>
        </div>
      )}
      {boardLoading && (
        <Spinner className="page-loading-spinner" name="circle" />
      )}
      <style jsx>
        {`
          .board-view-wrapper {
            height: 100%;
            display: flex;
            flex-direction: column;
            background: rgb(0, 121, 191);
            color: #fff;
          }

          .board-view-header {
            color: #fff;
            height: 48px;
            padding: 0px 8px;
            display: flex;
            padding-top: 8px;
          }

          .board-view-container {
            position: relative;
            flex-grow: 1;
          }

          .board-view-content {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            overflow-y: hidden;
            padding-bottom: 8px;
          }

          .board-title {
            font-size: 18px;
            font-weight: 700;
            white-space: nowrap;
            overflow: hidden;
          }

          .board-title :global(.editor-content) {
            border-radius: 3px;
            padding: 6px 12px;
            margin-right: 6px;
            &:hover {
              background-color: hsla(0, 0%, 100%, 0.32);
            }
          }
        `}
      </style>
    </div>
  );
};

export default BoardView;

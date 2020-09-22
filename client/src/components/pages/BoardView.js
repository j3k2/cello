import React from "react";
import { useParams, useHistory } from "react-router-dom";

import LanesList from "../lanes/LanesList";
import LaneCreator from "../lanes/LaneCreator";
import InlineEditor from "../common/InlineEditor";
import Deleter from "../common/Deleter";

import boardsService from "../../services/boards";
import cardsService from "../../services/cards";
import lanesService from "../../services/lanes";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Spinner from "react-spinkit";

const Board = () => {
  const params = useParams();
  const history = useHistory();

  const [board, setBoard] = React.useState(null);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBoard = async () => {
      const board = await boardsService.getBoard(params.id);
      if (board) {
        setBoard(board);
        document.title = `${board.title} | Cello`;
      }
      setLoading(false);
    };
    fetchBoard();
  }, [params.id]);

  const addLane = (lane) => {
    lane.cards = [];
    setBoard({ ...board, lanes: [...board.lanes, lane] });
  };

  const addCard = (laneId, card) => {
    const lanes = [...board.lanes];
    const lane = lanes.find((lane) => lane.id === laneId);
    lane.cards = [...lane.cards, card];
    setBoard({ ...board, lanes });
  };

  const reorderLaneCards = (laneId, cardId, prevIdx, nextIdx) => {
    const lanes = [...board.lanes];
    const lane = lanes.find((lane) => lane.id === laneId);
    const cards = [...lane.cards];
    const card = cards.find((card) => card.id === cardId);
    cards.splice(prevIdx, 1);
    cards.splice(nextIdx, 0, card);
    lane.cards = cards;

    setBoard({ ...board, lanes });
    cardsService.moveCard(cardId, {
      next: nextIdx,
      prev: prevIdx,
      laneId,
    });
  };

  const moveCardToLane = (cardId, prevLaneId, nextLaneId, prevIdx, nextIdx) => {
    const lanes = [...board.lanes];
    const prevLane = lanes.find((lane) => lane.id === prevLaneId);
    const prevCards = [...prevLane.cards];
    const nextLane = lanes.find((lane) => lane.id === nextLaneId);
    const nextCards = [...nextLane.cards];

    const card = prevCards.find((card) => card.id === cardId);
    prevCards.splice(prevIdx, 1);
    nextCards.splice(nextIdx, 0, card);
    prevLane.cards = prevCards;
    nextLane.cards = nextCards;

    setBoard({ ...board, lanes });
    cardsService.moveCard(cardId, {
      next: nextIdx,
      prev: prevIdx,
      prevLaneId,
      nextLaneId,
    });
  };

  const moveLane = (laneId, prevIdx, nextIdx) => {
    const lanes = [...board.lanes];
    const lane = lanes.find((lane) => lane.id === laneId);
    lanes.splice(prevIdx, 1);
    lanes.splice(nextIdx, 0, lane);

    setBoard({ ...board, lanes });
    lanesService.moveLane(laneId, {
      next: nextIdx,
      prev: prevIdx,
      boardId: params.id,
    });
  };

  const deleteCard = (id, laneId) => {
    const lanes = [...board.lanes];
    const lane = lanes.find((lane) => lane.id === laneId);
    const cards = [...lane.cards];
    const cardIdx = cards.findIndex((card) => card.id === id);
    cards.splice(cardIdx, 1);
    lane.cards = cards;

    setBoard({ ...board, lanes });
  };

  const editCard = (cardId, laneId, edits) => {
    const lanes = [...board.lanes];
    const lane = lanes.find((lane) => lane.id === laneId);
    const cards = [...lane.cards];
    let card = cards.find((card) => card.id === cardId);
    card = Object.assign(card, edits);
    lane.cards = cards;
    setBoard({ ...board, lanes });
  };

  const deleteLane = (id) => {
    const lanes = [...board.lanes];
    const laneIdx = lanes.findIndex((lane) => lane.id === id);
    lanes.splice(laneIdx, 1);

    setBoard({ ...board, lanes });
  };

  const editLane = (id, edits) => {
    const lanes = [...board.lanes];
    let lane = lanes.find((lane) => lane.id === id);
    lane = Object.assign(lane, edits);
    setBoard({ ...board, lanes });
  };

  const editBoard = (updates) => {
    const updatedBoard = Object.assign({}, board, updates);
    setBoard(updatedBoard);
    document.title = `${updatedBoard.title} | Cello`;
  };

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
      <div className="board-view-header">
        {board && !loading && (
          <div className="board-title">
            <InlineEditor
              hover
              content={board.title}
              updateContent={async (updatedTitle) => {
                editBoard({ title: updatedTitle });
                const updatedFields = await boardsService.editBoard(params.id, {
                  title: updatedTitle,
                });
                if (updatedFields) {
                  editBoard(updatedFields);
                }
              }}
            />
          </div>
        )}
        <Deleter 
        delete={async ()=>{
          const res = await boardsService.deleteBoard(params.id);
          if(res) {
            history.push('/');
          }
        }}
        dialogTitle="Delete Board?" overlay />
      </div>
      <div className="board-view-container">
        {board && !loading && (
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
                  <LanesList
                    lanes={board.lanes}
                    addCard={addCard}
                    editLane={editLane}
                    editCard={editCard}
                    deleteCard={deleteCard}
                    deleteLane={deleteLane}
                  />
                  {provided.placeholder}
                  <LaneCreator
                    lanes={board.lanes}
                    create={async (laneTitle) => {
                      const lane = await lanesService.createLane({
                        boardId: params.id,
                        title: laneTitle,
                      });
                      if (lane) {
                        addLane(lane);
                      }
                    }}
                  />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
        {!board && !loading && (
          <div className="page-message">Board not found</div>
        )}
        {loading && <Spinner className="page-loading-spinner" name="circle" />}
      </div>
      <style jsx>
        {`
          .board-view-wrapper {
            height: 100%;
            display: flex;
            flex-direction: column;
            background: rgb(0, 121, 191);
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

          .page-message {
            justify-content: center;
            display: flex;
            font-size: 26px;
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
            margin-right: 4px;
            padding-right: 4px;
          }
        `}
      </style>
    </div>
  );
};

export default Board;

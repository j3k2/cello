import React from "react";
import cardsService from "../services/cards";
import boardsService from "../services/boards";
import lanesService from "../services/lanes";

const BoardContext = React.createContext();

function BoardProvider(props) {
  const [board, setBoard] = React.useState();
  const [boardId, setBoardId] = React.useState();
  const [boardLoading, setBoardLoading] = React.useState(true);

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
      boardId,
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
    const cardIdx = cards.findIndex((card) => card.id === cardId);
    const card = { ...cards[cardIdx], ...edits };

    cards.splice(cardIdx, 1, card);
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
    const laneIdx = lanes.findIndex((lane) => lane.id === id);
    const lane = { ...lanes[laneIdx], ...edits };

    lanes.splice(laneIdx, 1, lane);

    setBoard({ ...board, lanes });
  };

  const editBoard = (updates) => {
    const updatedBoard = { ...board, ...updates };

    setBoard(updatedBoard);
    document.title = `${updatedBoard.title} | Cello`;
  };

  React.useEffect(() => {
    const fetchBoard = async () => {
      setBoardLoading(true);
      const board = await boardsService.getBoard(boardId);
      if (board) {
        setBoard(board);
        document.title = `${board.title} | Cello`;
      }
      setBoardLoading(false);
    };
    if (boardId) {
      fetchBoard(boardId);
    }
  }, [boardId]);

  function updateBoardId(id) {
    setBoardId(id);
  }

  return (
    <BoardContext.Provider
      value={{
        board,
        boardLoading,
        updateBoardId,
        addCard,
        addLane,
        editBoard,
        editCard,
        editLane,
        reorderLaneCards,
        moveCardToLane,
        moveLane,
        deleteCard,
        deleteLane,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
}

const useBoardContext = () => React.useContext(BoardContext);

export default BoardContext;

export { BoardProvider, useBoardContext };

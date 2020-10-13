import React from "react";
import cardsService from "../services/cards";
import boardsService from "../services/boards";
import listsService from "../services/lists";
import { useHistory } from "react-router-dom";

const BoardContext = React.createContext();

function BoardProvider(props) {
  const [board, setBoard] = React.useState();
  const [boardId, setBoardId] = React.useState();
  const [boardLoading, setBoardLoading] = React.useState(true);
  
  const history = useHistory();

  const addList = async (list) => {
    try {
      const res = await listsService.createList(list);

      res.cards = [];

      setBoard({ ...board, lists: [...board.lists, res] });
    } catch {}
  };

  const addCard = async (card) => {
    try {
      const res = await cardsService.createCard(card);
      const lists = [...board.lists];
      const list = lists.find((list) => list.id === card.listId);

      list.cards = [...list.cards, res];

      setBoard({ ...board, lists });
    } catch {}
  };

  const reorderListCards = async (listId, cardId, prevIdx, nextIdx) => {
    const lists = [...board.lists];
    const list = lists.find((list) => list.id === listId);
    const cards = [...list.cards];
    const card = cards.find((card) => card.id === cardId);

    cards.splice(prevIdx, 1);
    cards.splice(nextIdx, 0, card);
    list.cards = cards;

    setBoard({ ...board, lists });

    try {
      await cardsService.moveCard(cardId, {
        next: nextIdx,
        prev: prevIdx,
        listId,
      });
    } catch {}
  };

  const moveCardToList = async (
    cardId,
    prevListId,
    nextListId,
    prevIdx,
    nextIdx
  ) => {
    const lists = [...board.lists];
    const prevList = lists.find((list) => list.id === prevListId);
    const prevCards = [...prevList.cards];
    const nextList = lists.find((list) => list.id === nextListId);
    const nextCards = [...nextList.cards];
    const card = prevCards.find((card) => card.id === cardId);

    prevCards.splice(prevIdx, 1);
    nextCards.splice(nextIdx, 0, card);
    prevList.cards = prevCards;
    nextList.cards = nextCards;

    setBoard({ ...board, lists });

    try {
      await cardsService.moveCard(cardId, {
        next: nextIdx,
        prev: prevIdx,
        prevListId,
        nextListId,
      });
    } catch {}
  };

  const moveList = async (listId, prevIdx, nextIdx) => {
    const lists = [...board.lists];
    const list = lists.find((list) => list.id === listId);

    lists.splice(prevIdx, 1);
    lists.splice(nextIdx, 0, list);

    setBoard({ ...board, lists });

    try {
      await listsService.moveList(listId, {
        next: nextIdx,
        prev: prevIdx,
        boardId,
      });
    } catch {}
  };

  const deleteCard = async (cardId, listId) => {
    try {
      await cardsService.deleteCard(cardId);

      const lists = [...board.lists];
      const list = lists.find((list) => list.id === listId);
      const cards = [...list.cards];
      const cardIdx = cards.findIndex((card) => card.id === cardId);

      cards.splice(cardIdx, 1);
      list.cards = cards;

      setBoard({ ...board, lists });
    } catch {}
  };

  const editCard = (cardId, listId, edits) => {
    const lists = [...board.lists];
    const list = lists.find((list) => list.id === listId);
    const cards = [...list.cards];
    const cardIdx = cards.findIndex((card) => card.id === cardId);
    const card = { ...cards[cardIdx], ...edits };

    cards.splice(cardIdx, 1, card);
    list.cards = cards;

    setBoard({ ...board, lists });
  };

  const deleteList = async (id) => {
    try {
      await listsService.deleteList(id);
      const lists = [...board.lists];
      const listIdx = lists.findIndex((list) => list.id === id);

      lists.splice(listIdx, 1);

      setBoard({ ...board, lists });
    } catch {}
  };

  const editList = async (id, edits) => {
    const lists = [...board.lists];
    const listIdx = lists.findIndex((list) => list.id === id);
    const oldList = { ...lists[listIdx] };

    //initial state update:
    lists.splice(listIdx, 1, { ...lists[listIdx], ...edits });
    setBoard({ ...board, lists });
    try {
      const updatedFields = await listsService.editList(id, edits);
      //confirm state update:
      lists.splice(listIdx, 1, { ...lists[listIdx], ...updatedFields });
      setBoard({ ...board, lists });
    } catch {
      //rollback state update:
      lists.splice(listIdx, 1, oldList);
      setBoard({ ...board, lists });
    }
  };

  const editBoard = async (updates) => {
    const oldBoard = { ...board };
    //initial state update:
    const updatedBoard = {...board, ...updates};
    setBoard(updatedBoard);
    document.title = `${updatedBoard.title} | Cello`;
    try {
      const updatedFields = await boardsService.editBoard(boardId, updates);
       //confirm state update:
       const confirmedBoard = {...board, ...updatedFields};
      setBoard(confirmedBoard);
      document.title = `${confirmedBoard.title} | Cello`;
    } catch {
      //rollback state update:
      setBoard(oldBoard);
      document.title = `${oldBoard.title} | Cello`;
    }
  };

  const deleteBoard = async () => {
    try {
      await boardsService.deleteBoard(boardId);
      history.push("/");
    } catch {}
  }

  function usePrevious(value) {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  const prevBoardId = usePrevious(boardId);

  React.useEffect(() => {
    const fetchBoard = async () => {
      setBoardLoading(true);
      try {
        const board = await boardsService.getBoard(boardId);
        setBoard(board);
        document.title = `${board.title} | Cello`;
      } catch {}
      setBoardLoading(false);
    };
    if (boardId !== prevBoardId) {
      fetchBoard(boardId);
    }
  }, [boardId, prevBoardId]);

  return (
    <BoardContext.Provider
      value={{
        board,
        boardId,
        boardLoading,
        setBoardLoading,
        setBoardId,
        addCard,
        addList,
        editBoard,
        editCard,
        editList,
        reorderListCards,
        moveCardToList,
        moveList,        
        deleteBoard,
        deleteCard,
        deleteList,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
}

const useBoardContext = () => React.useContext(BoardContext);

export default BoardContext;

export { BoardProvider, useBoardContext };

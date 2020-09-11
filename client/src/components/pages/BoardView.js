import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import LanesList from '../lanes/LanesList';
import Creator from '../common/Creator/Creator'
import Editor from '../common/Editor/Editor';

import boardsService from '../../services/boards';
import cardsService from '../../services/cards';
import lanesService from '../../services/lanes';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Board = () => {
  const params = useParams();

  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    const fetchBoard = async () => {
      const board = await boardsService.getBoard(params.id);
      if (board) {
        setBoard(board);
        document.title = `${board.title} | Cello`;
      }
    }
    fetchBoard();
  }, [params.id]);

  const addLane = (lane) => {
    lane.cards = [];
    setBoard({ ...board, lanes: [...board.lanes, lane] });
  }

  const addCard = (laneId, card) => {
    const lanes = [...board.lanes];
    const lane = lanes.find(lane => lane.id === laneId);
    lane.cards = [...lane.cards, card];
    setBoard({ ...board, lanes });
  }

  const reorderLaneCards = (laneId, cardId, prevIdx, nextIdx) => {
    const lanes = [...board.lanes];
    const lane = lanes.find(lane => lane.id === laneId);
    const cards = [...lane.cards];
    const card = cards.find(card => card.id === cardId);
    cards.splice(prevIdx, 1);
    cards.splice(nextIdx, 0, card);
    lane.cards = cards;

    setBoard({ ...board, lanes });
    cardsService.moveCard(cardId, {
      next: nextIdx,
      prev: prevIdx,
      laneId
    });
  }

  const moveCardToLane = (cardId, prevLaneId, nextLaneId, prevIdx, nextIdx) => {
    const lanes = [...board.lanes];
    const prevLane = lanes.find(lane => lane.id === prevLaneId);
    const prevCards = [...prevLane.cards];
    const nextLane = lanes.find(lane => lane.id === nextLaneId);
    const nextCards = [...nextLane.cards];

    const card = prevCards.find(card => card.id === cardId);
    prevCards.splice(prevIdx, 1);
    nextCards.splice(nextIdx, 0, card);
    prevLane.cards = prevCards;
    nextLane.cards = nextCards;

    setBoard({ ...board, lanes });
    cardsService.moveCard(cardId, {
      next: nextIdx,
      prev: prevIdx,
      prevLaneId,
      nextLaneId
    });
  }

  const moveLane = (laneId, prevIdx, nextIdx) => {
    const lanes = [...board.lanes];
    const lane = lanes.find(lane => lane.id === laneId);
    lanes.splice(prevIdx, 1);
    lanes.splice(nextIdx, 0, lane);

    setBoard({ ...board, lanes });
    lanesService.moveLane(laneId, {
      next: nextIdx,
      prev: prevIdx,
      boardId: params.id
    });
  }

  const editLane = (id, edits) => {
    const lanes = [...board.lanes];
    let lane = lanes.find(lane => lane.id === id);
    lane = Object.assign(lane, edits);
    setBoard({ ...board, lanes });
  }

  const editBoard = (updates) => {
    const updatedBoard = Object.assign({}, board, updates);
    setBoard(updatedBoard);
    document.title = `${updatedBoard.title} | Cello`;
  }

  const onDragEnd = (result, provided) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === 'CARD') {
      const cardId = draggableId.split('.')[1];
      const prevIdx = source.index;
      const nextIdx = destination.index;
      if (destination.droppableId === source.droppableId && destination.index !== source.index) {
        const laneId = destination.droppableId.split('.')[1];
        reorderLaneCards(laneId, cardId, prevIdx, nextIdx);
      }
      if (destination.droppableId !== source.droppableId) {
        const prevLaneId = source.droppableId.split('.')[1];
        const nextLaneId = destination.droppableId.split('.')[1];
        moveCardToLane(cardId, prevLaneId, nextLaneId, prevIdx, nextIdx);
      }
    }
    if (type === 'LANE') {
      moveLane(draggableId.split('.')[1], source.index, destination.index)
    }
  }

  return (
    <div className="board-view-wrapper">
      <div className="board-view-header">
        {board && <div className="board-title">
          <Editor content={board.title} updateContent={async (updatedTitle) => {
            editBoard({ title: updatedTitle });
            const updatedFields = await boardsService.editBoard(params.id, { title: updatedTitle });
            if (updatedFields) {
              editBoard(updatedFields);
            }
          }} />
        </div>}
      </div>
      <div className="board-view-container">
        {board && <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            type="LANE" droppableId="droppable.board" direction="horizontal">
            {(provided, snapshot) => (
              <div className="board-view-content" ref={provided.innerRef} {...provided.droppableProps}>
                <LanesList lanes={board.lanes} addCard={addCard} editLane={editLane} />
                {provided.placeholder}
                <div className="board-lane lane-creator">
                  <Creator
                    create={async (laneTitle) => {
                      const lane = await lanesService.createLane({ boardId: params.id, title: laneTitle });
                      if (lane) {
                        addLane(lane);
                      }
                    }}
                    placeholder={'Enter list title'}
                    buttonText={'Add list'}
                    toggleText={board.lanes.length ? 'Add another list' : 'Add a list'} />
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>}
        {!board && <div>Board not found</div>}
      </div>
    </div>)
}

export default Board;
import React from 'react';
import { useParams } from 'react-router-dom';

import LanesList from '../lanes/LanesList';
import LaneCreator from '../lanes/LaneCreator.js';
import board from '../../services/boards';
import { DragDropContext } from 'react-beautiful-dnd';
const Board = () => {
  const params = useParams();

  const [lanes, setLanes] = React.useState([]);

  const [title, setTitle] = React.useState('');

  const fetchBoard = async () => {
    board.getBoard(params.id).then((res) => {
      console.log(res);
      setTitle(res.title);
      setLanes(res.lanes);
    });
  }

  React.useEffect(() => {
    fetchBoard();
  }, [])

  const addLane = (lane) => {
    lane.cards = [];
    setLanes([...lanes, lane])
  }

  const addCard = (laneId, card) => {
    const lanesCopy = [...lanes];
    const lane = lanesCopy.find(lane => lane.id === laneId);
    lane.cards = [...lane.cards, card];

    setLanes(lanesCopy);
  }

  const reorderLaneCards = (laneId, cardId, prevIdx, nextIdx) => {
    const lanesCopy = [...lanes];
    const lane = lanesCopy.find(lane => lane.id === laneId);
    const cards = [...lane.cards]; // needed to prevent mutation
    const card = cards.find(card=> card.id === cardId);
    cards.splice(prevIdx, 1);
    cards.splice(nextIdx, 0, card);
    lane.cards = cards;

    setLanes(lanesCopy);

    //TO DO: update card rank on server
  }

  const moveCardToLane = (cardId, prevLaneId, nextLaneId, prevIdx, nextIdx) => {
    const lanesCopy = [...lanes];
    const prevLane = lanesCopy.find(lane => lane.id === prevLaneId);
    const prevCards = [...prevLane.cards];
    const nextLane = lanesCopy.find(lane => lane.id === nextLaneId);
    const nextCards = [...nextLane.cards];

    const card = prevCards.find(card=> card.id === cardId);
    prevCards.splice(prevIdx, 1);
    nextCards.splice(nextIdx, 0, card);
    prevLane.cards = prevCards;
    nextLane.cards = nextCards;

    setLanes(lanesCopy);

    //TO DO: update card rank and laneId on server
  }

  return (
    <div className="board-view-wrapper">
      <div className="board-view-header">
        <h1>{title}
        </h1>
      </div>
      <div className="board-view-content">
        <DragDropContext onDragEnd={(result, provided)=>{
          const {destination, source, draggableId} = result;
          if(!destination) {
            return;
          }
          const cardId = draggableId.split('.')[1];
          const prevIdx = source.index;
          const nextIdx = destination.index;
          if(destination.droppableId === source.droppableId && destination.index !== source.index) {
            const laneId = destination.droppableId.split('.')[1];
            reorderLaneCards(laneId, cardId, prevIdx, nextIdx);
          }
          if(destination.droppableId !== source.droppableId) {
            const prevLaneId = source.droppableId.split('.')[1];
            const nextLaneId = destination.droppableId.split('.')[1];
            moveCardToLane(cardId, prevLaneId, nextLaneId, prevIdx, nextIdx);
          }
        }}>
          <LanesList lanes={lanes} addCard={addCard} />
          <LaneCreator id={params.id} addLane={addLane} />
        </DragDropContext>
      </div>
    </div>)
}

export default Board;
import React from 'react';
import { useParams } from 'react-router-dom';

import LanesList from '../lanes/LanesList';
import LaneCreator from '../lanes/LaneCreator.js';
import board from '../../services/boards';

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
		const lane = lanesCopy.find(lane=>lane.id === laneId);
		console.log('###1', lane)
		lane.cards = [...lane.cards, card];
		console.log('###2', lane.cards)
		console.log('###3', lanesCopy)

		setLanes(lanesCopy);
	}

	return (
	<div className="board-view-wrapper">
    <div className="board-view-header">
      <h1>{title}
        </h1>
    </div>
		<div className="board-view-content">
			<LanesList lanes={lanes} addCard={addCard}/>
			<LaneCreator id={params.id} addLane={addLane}/>
		</div>
		</div>)
}

export default Board;
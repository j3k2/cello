import React from 'react';
import { useParams } from 'react-router-dom';

import LaneCreator from '../lanes/LaneCreator.js';
import board from '../../services/boards';

const Board = () => {
	const params = useParams();

	const [lanes, setLanes] = React.useState([]);

	const fetchBoard = async () => {
		board.getBoard(params.id).then((res) => {
			console.log(res);
			setLanes(res.lanes);
		});
	}

	React.useEffect(() => {
		fetchBoard();
	}, [])

	return (<div>
		{JSON.stringify(lanes)}
		<LaneCreator id={params.id}/>
	</div>)
}

export default Board;
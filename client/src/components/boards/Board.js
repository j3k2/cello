import React from 'react';
import { useParams } from 'react-router-dom';

const Board = () => {
	const params = useParams();

	return (<div>
		{params.id}
	</div>)
}

export default Board;
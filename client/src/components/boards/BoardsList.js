import React from 'react';
import boardsService from '../../services/boards';
import BoardCreator from './BoardCreator';
import { useHistory } from 'react-router-dom';

import './boards.scss';

const BoardsList = () => {
	const [boards, setBoards] = React.useState([]);

	const fetchBoards = async () => {
		const boards = await boardsService.getBoards();
			if(boards) {
				setBoards(boards);
			}
	}

	React.useEffect(() => {
		document.title = "Boards | Cello";
		fetchBoards();
	}, [])

	function BoardItem(props) {
		const history = useHistory();
		return (<div className="board-item" onClick={() => {
			history.push(`/board/${props.id}`)
		}}>
			<span>{props.title}</span>
		</div>)
	}

	return (
		<React.Fragment>
			<div className="board-list-title">
				Your boards
		</div>
			<div className="board-list">
				{boards.map(board => {
					return <BoardItem key={board.id} id={board.id} title={board.title} />
				})}
				<BoardCreator updateList={(createdBoard) => {
					setBoards([...boards, createdBoard])
				}} />
			</div>
		</React.Fragment>
	)
}

export default BoardsList; 
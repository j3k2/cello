import React from 'react';
import board from '../../services/boards';
import BoardCreator from './BoardCreator';
import {useHistory} from 'react-router-dom';

import './boards.scss';


const BoardsList = () => {
	const [boards, setBoards] = React.useState([]);

	const fetchBoards = async () => {
		board.getBoards().then((res) => {
			console.log(res);
			setBoards(res)
		})
	}

	React.useEffect(() => {
		fetchBoards();
	}, [])

	function BoardItem(props) {
		const history = useHistory();
		return (<div className="board-item" onClick={()=>{
			history.push(`/board/${props.id}`)
		}}>
		{props.title}
	</div>)
	}

	return (
		<React.Fragment>
		<div className="board-list-title">
		Your boards
		</div>
		<div className="board-list">
			{boards.map(board => {
				return <BoardItem key={board.id} id={board.id} title={board.title}/>
			})}
			<BoardCreator updateList={(createdBoard) => {
				setBoards([...boards, createdBoard])
			}} />
		</div>
		</React.Fragment>
	)
}

export default BoardsList; 
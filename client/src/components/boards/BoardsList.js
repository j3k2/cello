import React from 'react';
import board from '../../services/boards';
import BoardCreator from './BoardCreator';
import './boards.css';


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

	return (
		<React.Fragment>
			{boards.map(board => {
				return (<div key={board.id} className="board-item">
					{board.title}
				</div>)
			})}
			<BoardCreator updateList={(createdBoard) => {
				setBoards([...boards, createdBoard])
			}} />
		</React.Fragment>
	)
}

export default BoardsList; 
import React from 'react';
import boards from '../../services/boards';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';
import './boards.css';


const BoardCreator = (props) => {
	ReactModal.setAppElement('#root');

	const history = useHistory();

	const [showModal, setShowModal] = React.useState(false);

	const BoardForm = () => {
		async function createBoard(e) {
			e.preventDefault();
			setShowModal(false);
			const createdBoard = await boards.createBoard({ title: boardTitle });
			// console.log(createdBoard);
			// props.updateList(createdBoard);
			// or just redirect to board page instead of updating list
			history.push(`/board/${createdBoard.id}`);
		}
		const [boardTitle, setBoardTitle] = React.useState('')
		return (<form onSubmit={createBoard}>
			<input
				value={boardTitle}
				autoFocus={true}
				onChange={(e) => {
					setBoardTitle(e.target.value);
				}}
				placeholder="Add board title"
			/>
			<button type='submit'>Create Board</button>
		</form>)
	}

	return (
		<React.Fragment>
			<ReactModal
				className='board-modal'
				isOpen={showModal}
				onRequestClose={() => {
					setShowModal(false);
				}}
				shouldCloseOnOverlayClick={true}
			>
				<BoardForm />
			</ReactModal>
			<button onClick={() => {
				setShowModal(true);
			}}>
				Create board
	  </button>
		</React.Fragment>
	)
}

export default BoardCreator; 
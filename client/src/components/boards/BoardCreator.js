import React from 'react';
import boards from '../../services/boards';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';
import './boards.scss';
import Creator from '../common/Creator/Creator';

const BoardCreator = (props) => {
	ReactModal.setAppElement('#root');

	const history = useHistory();

	const [showModal, setShowModal] = React.useState(false);

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
				<Creator
					create={async (boardTitle) => {
						const createdBoard = await boards.createBoard({ title: boardTitle });
						history.push(`/board/${createdBoard.id}`);
					}}
					closeAction={() => {
						setShowModal(false);
					}}
					placeholder={'Add Board Title'}
					buttonText={'Create Board'} />
			</ReactModal>
			<div className="board-item board-item--create" onClick={() => {
				setShowModal(true);
			}}>
				<span>Create new board</span>
			</div>
		</React.Fragment>
	)
}

export default BoardCreator; 
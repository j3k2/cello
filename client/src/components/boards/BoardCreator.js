import React from "react";
import boardsService from "../../services/boards";
import ReactModal from "react-modal";
import { useHistory } from "react-router-dom";
import Creator from "../common/Creator";
import BoardItem from "./BoardItem";
import css from "styled-jsx/css";

const BoardCreator = (props) => {
  ReactModal.setAppElement("#root");

  const history = useHistory();

  const [showModal, setShowModal] = React.useState(false);

  function getModalStyle() {
    return css.resolve`
      .ReactModal__Content {
        width: 296px;
        height: 75px;
        margin: 100px auto;
        border-radius: 3px;
      }
    `;
  }

  const {
    className: modalClassName,
    styles: modalStyleElement,
  } = getModalStyle();

  return (
    <React.Fragment>
      <ReactModal
        className={modalClassName}
        isOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
        shouldCloseOnOverlayClick
      >
        <Creator
          create={async (boardTitle) => {
            const createdBoard = await boardsService.createBoard({
              title: boardTitle,
            });
            if (createdBoard) {
              history.push(`/board/${createdBoard.id}`);
            }
          }}
          closeAction={() => {
            setShowModal(false);
          }}
          type="board"
          placeholder={"Add Board Title"}
          buttonText={"Create Board"}
        />
        {modalStyleElement}
      </ReactModal>
      <BoardItem
        handleClick={() => {
          setShowModal(true);
        }}
        creator
        text="Create new board"
      />
    </React.Fragment>
  );
};

export default BoardCreator;

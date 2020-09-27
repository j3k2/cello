import React from "react";
import ReactModal from "react-modal";
import Creator from "../common/Creator";
import boardsService from "../../services/boards";
import { useHistory } from "react-router-dom";
import css from "styled-jsx/css";

const BoardCreator = (props) => {
  ReactModal.setAppElement("#root");

  const history = useHistory();

  const [showModal, setShowModal] = React.useState(false);

  function getModalStyle() {
    return css.resolve`
      .ReactModal__Content {
        width: 296px;
        margin: 100px auto;
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
            try {
              const createdBoard = await boardsService.createBoard({
                title: boardTitle,
              });
              history.push(`/b/${createdBoard.id}`);
            } catch {}
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
      <div
        className={props.className}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default BoardCreator;

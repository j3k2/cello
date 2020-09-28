import React from "react";
import ReactModal from "react-modal";
import CardDetails from "./CardDetails";
import { useCardContext } from "../../contexts/Card";
import { useBoardContext } from "../../contexts/Board";
import { useHistory } from "react-router-dom";
import css from "styled-jsx/css";

export default function CardView() {
  ReactModal.setAppElement("#root");

  const history = useHistory();

  const [showModal, setShowModal] = React.useState(false);

  const { card, setCardId, cardLoading } = useCardContext();
  const { boardId } = useBoardContext();

  function getModalStyle() {
    return css.resolve`
      .ReactModal__Content {
        width: 640px;
        margin: 100px auto;
      }
    `;
  }

  const {
    className: modalClassName,
    styles: modalStyleElement,
  } = getModalStyle();

  const closeModal = () => {
    setShowModal(false);
    setCardId();
    history.push(`/b/${boardId}`);
  };

  React.useEffect(() => {
    if (card) {
      setShowModal(true);
    }
  }, [card]);

  return (
    <React.Fragment>
      {!card && !boardId && !cardLoading && (
        <div className="page-message">
          <h1>Card not found.</h1>
        </div>
      )}
      {card && !cardLoading && (
        <ReactModal
          className={modalClassName}
          isOpen={showModal}
          onRequestClose={() => {
            closeModal();
          }}
          shouldCloseOnOverlayClick
        >
          <CardDetails
            closeAction={() => {
              closeModal();
            }}
          />
          {modalStyleElement}
        </ReactModal>
      )}
    </React.Fragment>
  );
}

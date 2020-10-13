import React from "react";
import InlineEditor from "../common/InlineEditor";
import TextEditor from "../common/TextEditor";
import Deleter from "../common/Deleter";

import { useBoardContext } from "../../contexts/Board";
import { useCardContext } from "../../contexts/Card";
import { MdClose } from "react-icons/md";

function CardDetails({ closeAction }) {
  const { deleteCard } = useBoardContext();

  const { editCard, card } = useCardContext();

  return (
    <React.Fragment>
      {card && (
        <div className="card-details">
          <span className="close-action" onClick={closeAction}>
            <MdClose size={20} />
          </span>
          <div className="card-details-header">
            <InlineEditor
              multiline
              content={card.title}
              updateContent={async (updatedTitle) => {
                editCard(card.id, card.listId, {
                  title: updatedTitle,
                });
              }}
            />
            <Deleter
              className="action"
              delete={() => {
                deleteCard(card.id, card.listId);
                closeAction();
              }}
              message="Are you sure you want to delete this card? There is no undo."
              dialogTitle="Delete Card?"
            />
          </div>
          <h3>Description</h3>
          <TextEditor
            update={(description) => {
              editCard(card.id, card.listId, {
                description,
              });
            }}
            placeholder="Add a more detailed description..."
            text={card.description || ""}
          />
          <style jsx>
            {`
              .card-details {
                background-color: #f4f5f7;
                border-radius: 3px;
                padding: 12px;
                position: relative;
              }
              .card-details-header {
                font-size: 20px;
                font-weight: 600;
                line-height: 24px;
                display: flex;
                width: 600px;
                :global(.editor-content) {
                  word-break: break-word;
                }
              }
              .close-action {
                position: absolute;
                right: 8px;
                top: 8px;
              }
            `}
          </style>
        </div>
      )}
    </React.Fragment>
  );
}

export default CardDetails;

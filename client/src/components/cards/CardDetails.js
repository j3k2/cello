import React from "react";
import InlineEditor from "../common/InlineEditor";
import TextEditor from "../common/TextEditor";
import Deleter from "../common/Deleter";

import cardsService from "../../services/cards";
import { useBoardContext } from "../../contexts/Board";
import { useCardContext } from "../../contexts/Card";
import { MdClose } from "react-icons/md";

function CardDetails({ closeAction }) {
  const {
    editCard: editListCard,
    deleteCard: deleteListCard,
  } = useBoardContext();

  const { editCard: editModalCard, card } = useCardContext();

  const updateCardObjects = (id, listId, updates) => {
    editListCard(id, listId, updates);
    editModalCard(updates);
  };

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
                const oldCard = { ...card };
                updateCardObjects(card.id, card.listId, {
                  title: updatedTitle,
                });
                try {
                  const updatedFields = await cardsService.editCard(card.id, {
                    title: updatedTitle,
                  });
                  updateCardObjects(card.id, card.listId, updatedFields);
                } catch {
                  updateCardObjects(card.id, card.listId, oldCard);
                }
              }}
            />
            <Deleter
              className="action"
              delete={async () => {
                try {
                  await cardsService.deleteCard(card.id);
                  closeAction();
                  deleteListCard(card.id, card.listId);
                } catch {}
              }}
              message="Are you sure you want to delete this card? There is no undo."
              dialogTitle="Delete Card?"
            />
          </div>
          <h3>Description</h3>
          <TextEditor
            update={async (description) => {
              try {
                const updates = await cardsService.editCard(card.id, {
                  description,
                });
                editModalCard(updates);
              } catch {}
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

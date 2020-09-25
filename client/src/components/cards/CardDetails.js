import React from "react";
import InlineEditor from "../common/InlineEditor";
import TextEditor from "../common/TextEditor";
import cardsService from "../../services/cards";
import Deleter from "../common/Deleter";
import { MdClose } from "react-icons/md";
import { useBoardContext } from "../../contexts/Board";

function CardDetails({ closeAction, id, laneId, title }) {
  const [card, setCard] = React.useState();

  React.useEffect(() => {
    async function fetchCard() {
      try {
        const res = await cardsService.getCard(id);
        setCard(res);
      } catch {}
    }
    fetchCard();
  }, [id]);

  const { editCard, deleteCard } = useBoardContext();

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
              content={title}
              updateContent={async (updatedTitle) => {
                const oldCard = { ...card };
                editCard(id, laneId, { title: updatedTitle });
                try {
                  const updatedFields = await cardsService.editCard(id, {
                    title: updatedTitle,
                  });
                  editCard(id, laneId, updatedFields);
                } catch {
                  editCard(id, laneId, oldCard);
                }
              }}
            />
            <Deleter
              className="action"
              delete={async () => {
                try {
                  await cardsService.deleteCard(id);
                  closeAction();
                  deleteCard(id, laneId);
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
                const updatedCard = await cardsService.editCard(id, {
                  description,
                });
                setCard(updatedCard);
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

import React from "react";
import InlineEditor from "../common/InlineEditor";
import TextEditor from "../common/TextEditor";
import cardsService from "../../services/cards";
import Deleter from "../common/Deleter";

function CardDetails({ deleteCard, closeAction, id, editCard, laneId, title }) {
  const [card, setCard] = React.useState();

  React.useEffect(() => {
    async function fetchCard() {
      const res = await cardsService.getCard(id);
      setCard(res);
    }
    fetchCard();
  }, [id]);

  return (
    <React.Fragment>
      {card && (
        <div className="card-details">
          <div className="card-details-header">
            <InlineEditor
              multiline
              content={title}
              updateContent={async (updatedTitle) => {
                editCard(id, laneId, { title: updatedTitle });
                const updatedCard = await cardsService.editCard(id, {
                  title: updatedTitle,
                });
                if(updatedCard) {
                  editCard(id, laneId, updatedCard);
                }
              }}
            />
            <Deleter delete={async ()=>{
              const res = await cardsService.deleteCard(id);
              if(res) {
                closeAction();
                deleteCard(id, laneId);
              }
            }} 
            dialogTitle="Delete Card?" />
          </div>
          <h3>Description</h3>
          <TextEditor
            update={async (description) => {
              const updatedCard = await cardsService.editCard(id, {
                description,
              });
              setCard(updatedCard);
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
              }
              .card-details-header {
                font-size: 20px;
                font-weight: 600;
                line-height: 24px;
                display: flex;
              }
            `}
          </style>
        </div>
      )}
    </React.Fragment>
  );
}

export default CardDetails;

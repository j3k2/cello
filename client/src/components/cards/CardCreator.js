import React from "react";
import Creator from "../common/Creator";
import cardsService from "../../services/cards";
import { useBoardContext } from "../../contexts/Board";

export default function CardCreator(props) {
  const { addCard } = useBoardContext();

  return (
    <div className="card-creator">
      <Creator
        hasButton
        buttonClassName="action"
        create={async (cardTitle) => {
          const card = await cardsService.createCard({
            laneId: props.laneId,
            title: cardTitle,
          });
          if (card) {
            addCard(props.laneId, card);
          }
        }}
        toggleText={props.numCards ? "Add another card" : "Add a card"}
        placeholder={"Enter a title for this card..."}
        buttonText={"Add Card"}
      />
      <style jsx>
        {`
          .card-creator :global(.creator-form) {
            padding: 0px 8px;
            margin-top: 8px;
          }
          .card-creator :global(.creator-button) {
            height: 28px;
            color: #5e6c84;
            margin: 2px 8px 8px 8px;
            padding: 4px 6px;
            &:hover {
              color: #172b4d;
            }
          }
        `}
      </style>
    </div>
  );
}

import React from "react";
import Creator from '../common/Creator';

function CardCreator(props) {
  return (
    <div className="card-creator-wrapper">
      <Creator
        create={props.create}
        type="card"
        placeholder={"Enter a title for this card..."}
        buttonText={"Add Card"}
        toggleText={
          props.cards && props.cards.length ? "Add another card" : "Add a card"
        }
      />
      <style jsx>
        {`
          .card-creator-wrapper {
            padding: 5px;
          }
        `}
      </style>
    </div>
  );
}

export default CardCreator;

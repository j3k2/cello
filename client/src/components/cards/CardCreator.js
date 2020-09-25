import React from "react";
import Creator from "../common/Creator";
import { MdAdd } from "react-icons/md";
import cardsService from "../../services/cards";
import { useBoardContext } from "../../contexts/Board";
import css from "styled-jsx/css";

export default function CardCreator(props) {
  const { addCard } = useBoardContext();

  function getCreatorFormStyle() {
    return css.resolve`
      .creator-form {
        padding: 0px 8px;
        margin-top: 8px;
      }
    `;
  }

  const {
    className: formClassName,
    styles: formStyleElement,
  } = getCreatorFormStyle();

  function CreatorButton(buttonProps) {
    return (
      <button {...buttonProps} className="creator-toggle action">
        <div className="toggle-icon">
          <MdAdd size={20} />
        </div>
        <div className="toggle-text">
          {props.numCards ? "Add another card" : "Add a card"}
        </div>
        <style jsx>
          {`
            .creator-toggle {
              height: 28px;
              width: 100%;
              color: #5e6c84;
              margin: 2px 8px 8px 8px;
              padding: 4px 6px;
              display: flex;
              .toggle-icon {
                margin: 0 2px;
              }
              .toggle-text {
                margin: 2px 0;
                font-size: 14px;
              }
            }
          `}
        </style>
      </button>
    );
  }
  return (
    <React.Fragment>
      <Creator
        buttonComponent={CreatorButton}
        formClassName={formClassName}
        create={async (cardTitle) => {
          const card = await cardsService.createCard({
            laneId: props.laneId,
            title: cardTitle,
          });
          if (card) {
            addCard(props.laneId, card);
          }
        }}
        type="card"
        placeholder={"Enter a title for this card..."}
        buttonText={"Add Card"}
      />
      {formStyleElement}
    </React.Fragment>
  );
}

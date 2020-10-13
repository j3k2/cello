import React from "react";
import Creator from "../common/Creator";
import { useBoardContext } from "../../contexts/Board";

function ListCreator(props) {
  const { addList, boardId } = useBoardContext();

  return (
    <div className="list-creator">
      <Creator
        hasButton
        buttonClassName="overlay"
        create={(listTitle) => {
          addList({
            boardId,
            title: listTitle,
          });
        }}
        toggleText={props.numLists ? "Add another list" : "Add a list"}
        placeholder={"Enter list title..."}
        buttonText={"Add List"}
      />
      <style jsx>
        {`
          .list-creator :global(.creator-button) {
            height: 40px;
            padding: 10px 10px;
          }
        `}
      </style>
    </div>
  );
}

export default ListCreator;

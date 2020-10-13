import React from "react";
import { Draggable } from "react-beautiful-dnd";
import CardsGroup from "../cards/CardsGroup";
import InlineEditor from "../common/InlineEditor";
import CardCreator from "../cards/CardCreator";
import Deleter from "../common/Deleter";
import { useBoardContext } from "../../contexts/Board";

const List = (props) => {
  const { editList, deleteList } = useBoardContext();

  return (
    <Draggable draggableId={`draggable.${props.id}`} index={props.idx}>
      {(provided, snapshot) => (
        <div
          className={props.className}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="list-content" {...provided.dragHandleProps}>
            <div className="list-header">
              <InlineEditor
                multiline
                content={props.title}
                updateContent={(updatedTitle) => {
                  editList(props.id, { title: updatedTitle });
                }}
              />
              <div className="deleter-wrapper">
                <Deleter
                  className="action"
                  delete={() => {
                    deleteList(props.id);
                  }}
                  message="Are you sure you want to delete this list and its cards? There is no undo."
                  dialogTitle="Delete List?"
                />
              </div>
            </div>
            <CardsGroup listId={props.id} cards={props.cards} />
            <CardCreator
              listId={props.id}
              numCards={props.cards && props.cards.length}
            />
          </div>
          <style jsx>
            {`
              .list-content {
                border-radius: 3px;
                background: #ebecf0;
                color: rgb(23, 43, 77);
                max-height: 100%;
                display: flex;
                flex-direction: column;
              }

              .list-header {
                min-height: 40px;
                font-weight: bold;
                padding: 6px 10px 6px 12px;
                cursor: pointer;
                min-width: 272px;
                max-width: 272px;
                flex: none;
                position: relative;
                :global(.editor-content) {
                  width: 224px;
                }
                :global(.editor-form) {
                  width: 228px;
                }
              }

              .deleter-wrapper {
                position: absolute;
                top: 4px;
                right: 4px;
              }
            `}
          </style>
        </div>
      )}
    </Draggable>
  );
};

export default List;

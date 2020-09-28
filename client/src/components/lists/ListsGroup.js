import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DRAG_TYPE_CARD, DRAG_TYPE_LIST } from "../../constants";
import List from "./List";
import ListCreator from "./ListCreator";
import { useBoardContext } from "../../contexts/Board";

const ListsGroup = (props) => {
  const { reorderListCards, moveCardToList, moveList } = useBoardContext();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === DRAG_TYPE_CARD) {
      const cardId = draggableId.split(".")[1];
      const prevIdx = source.index;
      const nextIdx = destination.index;
      if (
        destination.droppableId === source.droppableId &&
        destination.index !== source.index
      ) {
        const listId = destination.droppableId.split(".")[1];
        reorderListCards(listId, cardId, prevIdx, nextIdx);
      }
      if (destination.droppableId !== source.droppableId) {
        const prevListId = source.droppableId.split(".")[1];
        const nextListId = destination.droppableId.split(".")[1];
        moveCardToList(cardId, prevListId, nextListId, prevIdx, nextIdx);
      }
    }
    if (type === DRAG_TYPE_LIST) {
      moveList(draggableId.split(".")[1], source.index, destination.index);
    }
  };

  return (
    <div className="lists-wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          type={DRAG_TYPE_LIST}
          droppableId="droppable.board"
          direction="horizontal"
        >
          {(provided) => (
            <div
              className="lists-content"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.lists.map((list, idx) => {
                return (
                  <List
                    className="board-list"
                    title={list.title}
                    idx={idx}
                    key={list.id}
                    id={list.id}
                    cards={list.cards}
                  />
                );
              })}
              {provided.placeholder}
              <div className="board-list">
                <ListCreator numLists={props.lists && props.lists.length} />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <style jsx>
        {`
          .lists-wrapper {
            position: relative;
            flex-grow: 1;
          }

          .lists-content {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            overflow-y: hidden;
            padding-bottom: 8px;
            :global(.board-list) {
              margin: 0px 4px;
              min-width: 272px;
              max-width: 272px;
              overflow-wrap: break-word;
              display: flex;
              flex-direction: column;
              &:first-child {
                margin-left: 8px;
              }
              &:last-child {
                min-width: 280px;
                max-width: 280px;
                border-right: solid 8px transparent;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default ListsGroup;

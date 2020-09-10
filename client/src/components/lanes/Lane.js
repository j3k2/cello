import React from 'react';
import Creator from '../common/Creator/Creator';
import cardsService from '../../services/cards';
import CardsList from '../cards/CardsList';
import Editor from '../common/Editor/Editor';
import lanesService from '../../services/lanes';
import { Draggable } from 'react-beautiful-dnd';
import './lanes.scss';

const Lane = (props) => {
  return <Draggable
    draggableId={`draggable.${props.id}`}
    index={props.idx}
  >
    {(provided, snapshot) => (
      <div className="board-lane"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <div className="lane-content"
          {...provided.dragHandleProps}>
          <div className="lane-header">
            <Editor content={props.title} updateContent={async (updatedTitle) => {
              props.editLane(props.id, { title: updatedTitle });
              const updatedFields = await lanesService.editLane(props.id, { title: updatedTitle });
              if (updatedFields) {
                props.editLane(props.id, updatedFields);
              }
            }} />
          </div>
          <CardsList cards={props.cards} laneId={props.id} />
          <Creator
            create={async (cardText) => {
              const card = await cardsService.createCard({ laneId: props.id, text: cardText });
              if (card) {
                props.addCard(props.id, card);
              }
            }}
            placeholder={'Enter a title for this card...'}
            buttonText={'Add card'}
            toggleText={props.cards && props.cards.length ? 'Add another card' : 'Add a card'} />
        </div>
      </div>

    )}
  </Draggable>
}

export default Lane;
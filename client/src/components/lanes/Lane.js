import React from 'react';
import Creator from '../common/Creator/Creator';
import cards from '../../services/cards';
import CardsList from '../cards/CardsList';
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
        {...provided.dragHandleProps}
      >
        <div className="lane-content">
          <div className="lane-header">
            {props.title}
          </div>
          <CardsList cards={props.cards} laneId={props.id} />
          <Creator
            create={async (cardText) => {
              const card = await cards.createCard({ laneId: props.id, text: cardText });
              props.addCard(props.id, card);
            }}
            placeholder={'Enter a title for this card...'}
            buttonText={'Add card'}
            toggleText={'Add a card'} />
        </div>
      </div>

    )}
  </Draggable>
}

export default Lane;
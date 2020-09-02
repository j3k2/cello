import React from 'react';
import cards from '../../services/cards';

import './cards.scss';

const CardCreator = (props) => {

  const [showForm, setShowForm] = React.useState(false);

  const [cardText, setCardText] = React.useState('');

  const createCard = async (e) => {
    e.preventDefault();
    const card = await cards.createCard({laneId: props.laneId, text: cardText});
    props.addCard(props.laneId, card);
  }

  return (
    <React.Fragment>
      {showForm &&
      <form className="card-creator-form" onSubmit={createCard}>
          <input value={cardText} onChange={(e)=>{
            setCardText(e.target.value)
          }}/>
          <button>
            Add Card
          </button>
          <button onClick={() => {
            setShowForm(false);
          }}>
            X
          </button>
      </form>}

      {!showForm &&
        <div onClick={() => {
          setShowForm(true);
        }}>
          Add a card
      </div>
      }
    </React.Fragment>
  )
}

export default CardCreator;
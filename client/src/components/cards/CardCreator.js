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
    <div className="card-creator-section">
      {showForm &&
      <form className="card-creator-form" onSubmit={createCard}>
          <input 
          placeholder="Enter a title for this card..."
          value={cardText} 
          onChange={(e)=>{
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
        <div 
        className="card-creator-toggle"
        onClick={() => {
          setShowForm(true);
        }}>
          Add a card
      </div>
      }
    </div>
  )
}

export default CardCreator;
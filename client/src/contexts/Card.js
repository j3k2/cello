import React from "react";
import cardsService from "../services/cards";
import { useBoardContext } from "../contexts/Board";

const CardContext = React.createContext();

function CardProvider(props) {
  const [card, setCard] = React.useState();
  const [cardId, setCardId] = React.useState();
  const [cardLoading, setCardLoading] = React.useState(true);

  const { boardId, setBoardId, setBoardLoading} = useBoardContext();

  React.useEffect(() => {
    const fetchCard = async () => {
      setCardLoading(true);
      try {
        const card = await cardsService.getCard(cardId);
        setCard(card);
        if (!boardId) {
          setBoardId(card.boardId);
        }
      } catch {
        setBoardLoading(false);
      }
      setCardLoading(false);
    };
    if (cardId) {
      fetchCard();
    } else {
      setCard();
    }
  }, [cardId, boardId, setBoardId, setBoardLoading]);

  const editCard = (updates) => {
    const updatedCard = { ...card, ...updates };

    setCard(updatedCard);
  };

  return (
    <CardContext.Provider
      value={{
        card,
        cardId,
        editCard,
        cardLoading,
        setCardId,
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
}

const useCardContext = () => React.useContext(CardContext);

export default CardContext;

export { CardProvider, useCardContext };

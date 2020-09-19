import React from "react";
import boardsService from "../../services/boards";
import BoardCreator from "./BoardCreator";
import BoardItem from "./BoardItem";
import { useHistory } from "react-router-dom";

const BoardsList = () => {
  const history = useHistory();

  const [boards, setBoards] = React.useState([]);

  const fetchBoards = async () => {
    const boards = await boardsService.getBoards();
    if (boards) {
      setBoards(boards);
    }
  };

  React.useEffect(() => {
    document.title = "Boards | Cello";
    fetchBoards();
  }, []);

  return (
    <React.Fragment>
      <div className="board-list-title">Your boards</div>
      <div className="board-list">
        {boards.map((board) => {
          return (
            <BoardItem
              key={board.id}
              handleClick={() => {
                history.push(`/board/${board.id}`);
							}}
							text={board.title}
            />
          );
        })}
        <BoardCreator
          updateList={(createdBoard) => {
            setBoards([...boards, createdBoard]);
          }}
        />
      </div>
      <style jsx>
        {`
          .board-list {
            display: flex;
            flex-wrap: wrap;
          }

          .board-list-title {
            align-self: flex-start;
            margin-left: 5px;
            font-size: 16px;
            font-weight: 700;
            padding: 10px;
          }
        `}
      </style>
    </React.Fragment>
  );
};

export default BoardsList;
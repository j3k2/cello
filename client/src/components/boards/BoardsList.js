import React from "react";
import boardsService from "../../services/boards";
import BoardCreator from "./BoardCreator";
import BoardItem from "./BoardItem";
import { useHistory } from "react-router-dom";
import Spinner from "react-spinkit";

const BoardsList = () => {
  const history = useHistory();

  const [boards, setBoards] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const boards = await boardsService.getBoards();
      setBoards(boards);
    } catch {}
    setLoading(false);
  };

  React.useEffect(() => {
    document.title = "Boards | Cello";
    fetchBoards();
  }, []);

  return (
    <React.Fragment>
      {!loading && (
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
        </React.Fragment>
      )}
      {loading && <Spinner className="page-loading-spinner" name="circle" />}
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

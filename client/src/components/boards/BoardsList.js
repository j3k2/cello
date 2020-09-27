import React from "react";
import boardsService from "../../services/boards";
import BoardCreator from "./BoardCreator";
import { Link } from "react-router-dom";
import Spinner from "react-spinkit";

const BoardsList = () => {
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
                <Link
                  className="board-item text"
                  key={board.id}
                  to={`/b/${board.id}`}
                >
                  <span>{board.title}</span>
                </Link>
              );
            })}
            <BoardCreator
              className="board-item creator"
              updateList={(createdBoard) => {
                setBoards([...boards, createdBoard]);
              }}
            >
              <span>Create new board</span>
            </BoardCreator>
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

          .board-list :global(.board-item) {
            border-radius: 3px;
            padding: 8px;
            height: 96px;
            margin: 10px;
            width: 12%;
            min-width: 130px;
            cursor: pointer;
            background-color: rgb(0, 121, 191);
            span {
              overflow: hidden;
              text-overflow: ellipsis;
              display: block;
              white-space: nowrap;
              font-weight: bold;
              font-size: 16px;
              color: #fff;
            }
            &:hover {
              filter: brightness(0.9);
            }
          }

          .board-list :global(.board-item.creator) {
            background: rgba(9, 30, 66, 0.04);
            top: 25%;
            display: flex;
            text-align: center;
            font-weight: normal;
            span {
              align-self: center;
              margin: 0 auto;
              font-size: 14px;
              font-weight: normal;
              color: #172b4d;
            }
            &:hover {
              background-color: rgba(9, 30, 66, 0.08);
            }
          }
        `}
      </style>
    </React.Fragment>
  );
};

export default BoardsList;

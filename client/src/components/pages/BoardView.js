import React from "react";
import { BOARD_PATH, CARD_PATH } from "../../constants";

import LanesList from "../lanes/LanesList";
import InlineEditor from "../common/InlineEditor";
import Deleter from "../common/Deleter";
import CardView from "../cards/CardView";

import boardsService from "../../services/boards";

import { useBoardContext } from "../../contexts/Board";
import { useCardContext } from "../../contexts/Card";
import { useParams, useHistory, useLocation } from "react-router-dom";
import Spinner from "react-spinkit";

const BoardView = () => {
  const params = useParams();
  const location = useLocation();
  const pathType = location.pathname.split("/")[1];
  const history = useHistory();

  const {
    board,
    boardLoading,
    boardId,
    setBoardId,
    editBoard,
  } = useBoardContext();

  const { setCardId } = useCardContext();

  React.useEffect(() => {
    if (pathType === BOARD_PATH) {
      setBoardId(params.id);
    }
    if (pathType === CARD_PATH) {
      setCardId(params.id);
    }
  }, [setBoardId, setCardId, pathType, params.id]);

  return (
    <React.Fragment>
      <div className="board-view-wrapper">
        {pathType === CARD_PATH && <CardView />}
        {board && !boardLoading && (
          <React.Fragment>
            <div className="board-view-header">
              <div className="board-title">
                <InlineEditor
                  hover
                  content={board.title}
                  updateContent={async (updatedTitle) => {
                    const oldBoard = { ...board };
                    editBoard({ title: updatedTitle });
                    try {
                      const updatedFields = await boardsService.editBoard(
                        boardId,
                        {
                          title: updatedTitle,
                        }
                      );
                      editBoard(updatedFields);
                    } catch {
                      editBoard(oldBoard);
                    }
                  }}
                />
              </div>
              <Deleter
                delete={async () => {
                  try {
                    await boardsService.deleteBoard(boardId);
                    history.push("/");
                  } catch {}
                }}
                message="Are you sure you want to delete this board and its lists and cards? There is no undo."
                dialogTitle="Delete Board?"
                className="overlay"
              />
            </div>
            <LanesList lanes={board.lanes}/>
          </React.Fragment>
        )}

        {pathType === BOARD_PATH && !board && !boardLoading && (
          <div className="page-message">
            <h1>Board not found.</h1>
          </div>
        )}
        {boardLoading && (
          <Spinner className="page-loading-spinner" name="circle" />
        )}
        <style jsx>
          {`
            .board-view-wrapper {
              height: 100%;
              display: flex;
              flex-direction: column;
              background: rgb(0, 121, 191);
              color: #fff;
            }

            .board-view-header {
              color: #fff;
              height: 48px;
              padding: 0px 8px;
              display: flex;
              padding-top: 8px;
            }

            .board-title {
              font-size: 18px;
              font-weight: 700;
              white-space: nowrap;
              overflow: hidden;
            }

            .board-title :global(.editor-content) {
              border-radius: 3px;
              padding: 6px 12px;
              margin-right: 6px;
              &:hover {
                background-color: hsla(0, 0%, 100%, 0.32);
              }
            }
          `}
        </style>
      </div>
    </React.Fragment>
  );
};

export default BoardView;

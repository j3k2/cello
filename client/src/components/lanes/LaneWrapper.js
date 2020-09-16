import React from "react";

function LaneWrapper({children}) {
  return <div className="board-lane">
    {children}
    <style jsx>
      {`
        .board-lane {
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
      `}
    </style>
  </div>;
}

export default LaneWrapper;
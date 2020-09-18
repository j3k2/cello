import React from "react";

function BoardItem(props) {
  return (
    <div
      className={`board-item ${props.creator ? "creator" : ""}`}
      onClick={props.handleClick}
    >
      <style jsx>
        {`
          .board-item {
            border-radius: 3px;
            padding: 8px;
            height: 96px;
            margin: 10px;
            width: 12%;
            cursor: pointer;
            background-color: rgb(0, 121, 191);
            color: #fff;
            font-weight: bold;
            span {
              overflow: hidden;
              text-overflow: ellipsis;
              display: block;
              white-space: nowrap;
            }
            &:hover {
              filter: brightness(0.9);
            }
          }
          .board-item.creator {
            background: rgba(9, 30, 66, 0.04);
            color: #172b4d;
            top: 25%;
            display: flex;
            text-align: center;
            font-weight: normal;
            span {
              align-self: center;
              margin: 0 auto;
              font-size: 14px;
            }
            &:hover {
              background-color: rgba(9, 30, 66, 0.08);
            }
          }
        `}
      </style>
      <span>{props.text}</span>
    </div>
  );
}

export default BoardItem;

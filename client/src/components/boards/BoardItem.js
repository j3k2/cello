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
          .board-item.creator {
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
      <span>{props.text}</span>
    </div>
  );
}

export default BoardItem;

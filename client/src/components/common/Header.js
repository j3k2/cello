import React from "react";

export default function Header(props) {
  return (
    <header className="app-header">
      <div className="left">{props.left && props.left()}</div>
      <div className="center">{props.center && props.center()}</div>
      <div className="right">{props.right && props.right()}</div>
      <style jsx global>
        {`
          header.app-header {
            height: 40px;
            background: #026aa7;
            color: #fff;
            flex: 0 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 4px;
            > * {
              white-space: nowrap;
            }
            a, button {
              font-weight: 700;
            }
            .center {
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            .left {
              > * {
                margin-left: 8px;
              }
            }
            .right {
              text-align: right;
              > * {
                margin-right: 8px;
              }
            }
          }
        `}
      </style>
    </header>
  );
}

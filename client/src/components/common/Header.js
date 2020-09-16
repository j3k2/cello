import React from "react";

export default function Header(props) {
  return (
    <header className="header">
      {props.children}
      <style jsx>
        {`
          .header {
            height: 40px;
            background: #026aa7;
            color: white;
            flex: 0 0 auto;
            display: flex;
            justify-content: space-between;
            padding-top: 6px;
          }
        `}
      </style>
    </header>
  );
}

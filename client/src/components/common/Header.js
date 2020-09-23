import React from "react";

export default function Header(props) {
  return (
    <header className="app-header">
      <div className="left">{props.left && props.left()}</div>
      <div className="center">{props.center && props.center()}</div>
      <div className="right">{props.right && props.right()}</div>
    </header>
  );
}

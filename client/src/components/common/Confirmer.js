import React from "react";
import ReactModal from "react-modal";
import css from "styled-jsx/css";
import { MdClose } from "react-icons/md";

function Dialog(props) {
  ReactModal.setAppElement("#root");
  function getModalStyle() {
    return css.resolve`
      .ReactModal__Content {
        width: 304px;
        margin: 100px auto;
      }
    `;
  }

  const {
    className: modalClassName,
    styles: modalStyleElement,
  } = getModalStyle();

  return (
    <div>
      <ReactModal
        className={modalClassName}
        isOpen={props.showDialog}
        onRequestClose={() => {
          props.hideDialog();
        }}
        shouldCloseOnOverlayClick
      >
        <div className="dialog">
          <span className="close-action" onClick={props.hideDialog}>
            <MdClose size={16}/>
          </span>
          <div className="title">{props.title}</div>
          <p className="message">{props.message}</p>
          <button
            onClick={() => {
              props.hideDialog();
              props.confirm();
            }}
            className="warning"
          >
            {props.buttonText}
          </button>
        </div>
        {modalStyleElement}
      </ReactModal>
      <style jsx>
        {`
          .dialog {
            color: #172b4d;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            cursor: default;
            background-color: #fff;
            border-radius: 3px;
            padding: 12px;
            z-index: 999;
            position: relative;
            box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
              0 0 0 1px rgba(9, 30, 66, 0.08);
          }
          .dialog .title {
            height: 40px;
            color: #5e6c84;
            position: relative;
            margin-bottom: 8px;
            text-align: center;
            border-bottom: 1px solid rgba(9, 30, 66, 0.13);
          }
          .dialog button {
            width: 100%;
          }
          .close-action {
            position: absolute;
            right: 12px;
            top: 16px;
          }
        `}
      </style>
    </div>
  );
}

export default Dialog;

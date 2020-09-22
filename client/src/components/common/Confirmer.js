import React from "react";

function Dialog(props) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        props.hideDialog();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref}>
      {props.showDialog && (
        <div className="dialog">
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
      )}
      <style jsx>
        {`
          .dialog {
            color: #172b4d;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            cursor: default;
            background-color: #fff;
            color: black;
            position: absolute;
            border-radius: 3px;
            width: 304px;
            padding: 12px;
            z-index: 999;
            box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
              0 0 0 1px rgba(9, 30, 66, 0.08);
          }
          .dialog .title {
            height: 40px;
            position: relative;
            margin-bottom: 8px;
            text-align: center;
            border-bottom: 1px solid rgba(9, 30, 66, 0.13);
          }
          .dialog button {
            width: 100%;
          }
        `}
      </style>
    </div>
  );
}

export default Dialog;

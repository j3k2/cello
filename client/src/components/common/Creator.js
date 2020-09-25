import React from "react";
import { MdClose } from "react-icons/md";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";

const Creator = ({
  create,
  placeholder,
  buttonText,
  closeAction,
  buttonComponent,
  formClassName,
}) => {
  const [showForm, setShowForm] = React.useState(false);

  const [content, setContent] = React.useState("");

  const ref = useOnOutsideClick(() => {
    setShowForm(false);
  });

  const inputRef = React.useRef();

  const createEntity = async () => {
    if (content.length) {
      create(content);
      setContent("");
      inputRef.current.focus();
    }
  };

  return (
    <div ref={ref} className={`creator-section`}>
      {(showForm || !buttonComponent) && (
        <form
          className={`creator-form ${formClassName ? formClassName : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            createEntity();
          }}
        >
          <input
            ref={inputRef}
            autoFocus
            placeholder={placeholder}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div className="creator-form-actions">
            <button>{buttonText}</button>
            <span
              className="close-action"
              onClick={() => {
                closeAction ? closeAction() : setShowForm(false);
              }}
            >
              <MdClose size={24} />
            </span>
          </div>
        </form>
      )}

      {!showForm &&
        buttonComponent &&
        buttonComponent({
          onClick: () => {
            setShowForm(true);
          },
        })}
      <style jsx>
        {`
          .creator-section {
            display: flex;
          }

          .creator-form {
            display: flex;
            flex-direction: column;
            background: #ebecf0;
            border-radius: 3px;
            padding: 4px;
            height: 80px;
            width: 100%;
          }

          .creator-form input {
            height: 36px;
          }

          .creator-form-actions {
            display: flex;
            margin-top: 4px;
          }

          .creator-form-actions button {
            margin-right: 8px;
          }

          .creator-form-actions .close-action {
            padding-top: 4px;
          }
        `}
      </style>
    </div>
  );
};

export default Creator;

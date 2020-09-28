import React from "react";
import { MdClose } from "react-icons/md";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";
import { MdAdd } from "react-icons/md";

const Creator = ({
  create,
  placeholder,
  buttonText,
  closeAction,
  formClassName,
  buttonClassName,
  toggleText,
  hasButton,
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
    <div ref={ref} className="creator-wrapper">
      {(showForm || !hasButton) && (
        <form
          className={`creator-form ${formClassName}`}
          onSubmit={(e) => {
            e.preventDefault();
            createEntity();
          }}
        >
          <input
            ref={inputRef}
            maxLength={255}
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

      {!showForm && hasButton && (
        <button
          className={`creator-button ${buttonClassName}`}
          onClick={() => {
            setShowForm(true);
          }}
        >
          <div className="toggle-icon">
            <MdAdd size={20} />
          </div>
          <div className="toggle-text">{toggleText}</div>
        </button>
      )}
      <style jsx>
        {`
          .creator-wrapper {
            display: flex;
          }

          .creator-button {
            width: 100%;
            display: flex;
            .toggle-icon {
              margin: 0 2px;
            }
            .toggle-text {
              margin: 2px 0;
              font-size: 14px;
            }
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
            button {
              margin-right: 8px;
            }
            .close-action {
              padding-top: 4px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Creator;

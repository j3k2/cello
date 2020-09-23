import React from "react";
import { MdClose, MdAdd } from "react-icons/md";

const Creator = ({
  type,
  create,
  placeholder,
  buttonText,
  toggleText,
  closeAction,
}) => {
  const [showForm, setShowForm] = React.useState(false);

  const [content, setContent] = React.useState("");

  const wrapperRef = React.useRef(null);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowForm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, content]);

  const createEntity = async () => {
    if (content.length) {
      create(content);
      setContent("");
      inputRef.current.focus();
    }
  };

  return (
    <div className={`creator-section ${type}`}>
      {(showForm || !toggleText) && (
        <form
          ref={wrapperRef}
          className={`creator-form ${type}`}
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
            <span className="close-action"
              onClick={() => {
                closeAction ? closeAction() : setShowForm(false);
              }}
            >
              <MdClose size={24} />
            </span>
          </div>
        </form>
      )}

      {!showForm && toggleText && (
        <div
          className={`creator-toggle ${type}`}
          onClick={() => {
            setShowForm(true);
          }}
        >
          <div className="toggle-icon">
            <MdAdd size={20} />
          </div>
          <div className="toggle-text">{toggleText}</div>
        </div>
      )}
      <style jsx>
        {`
          .creator-toggle {
            cursor: pointer;
            border-radius: 3px;
            display: flex;
            .toggle-icon {
              margin: 0 2px;
            }
          }

          .creator-form {
            display: flex;
            flex-direction: column;
            background: #ebecf0;
            border-radius: 3px;
            padding: 4px;
            height: 80px;
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

          .creator-toggle.lane {
            height: 40px;
            color: #fff;
            background-color: hsla(0, 0%, 100%, 0.24);
            padding: 10px 8px;
            &:hover {
              background-color: hsla(0, 0%, 100%, 0.32);
            }
          }
          
          .creator-toggle.card {
            height: 28px;
            background: transparent;
            color: #5e6c84;
            margin: 2px 8px 8px 8px;
            padding: 4px 6px;
            &:hover {
              background-color: rgba(9, 30, 66, 0.08);
              color: #172b4d;
            }
          }
          .creator-form.card{
            padding: 0px 8px;
            margin-top: 8px;
          }
        `}
      </style>
    </div>
  );
};

export default Creator;

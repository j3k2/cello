import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import AutosizeInput from "react-input-autosize";
import css from "styled-jsx/css";

const Editor = (props) => {
  const [editing, setEditing] = React.useState(false);

  const [content, setContent] = React.useState("");

  const ref = React.useRef(null);

  const updateContent = () => {
    if (content.length && content !== props.content) {
      props.updateContent(content);
    }
    setEditing(false);
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        updateContent();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, content, updateContent]);

  React.useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  function getTextareaStyle() {
    return css.resolve`
      textarea {
        border: solid 2px #0079bf;
        border-radius: 3px;
        resize: none;
        outline: none;
        font: inherit;
        width: 100%;
        vertical-align: top;
        margin: 0;
        padding: 2px;
      }
    `;
  }
  function getInputStyle() {
    return css.resolve`
      input {
        border: solid 2px #0079bf;
        border-radius: 3px;
        outline: none;
        font: inherit;
        position: relative;
        width: 100%;
        position: relative;
        top: -2px;
        left: -2px;
        padding: 2px;
      }
    `;
  }

  const {
    className: textareaClassName,
    styles: textareaStylesElement,
  } = getTextareaStyle();

  const {
    className: inputClassName,
    styles: inputStylesElement,
  } = getInputStyle();

  return (
    <div className={`editor ${props.multiline ? "multiline" : ""}`} ref={ref}>
      {editing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateContent();
          }}
        >
          {!props.multiline && (
            <AutosizeInput
              autoFocus
              value={content}
              inputClassName={inputClassName}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          )}

          {props.multiline && (
            <TextareaAutosize
              className={textareaClassName}
              spellCheck={false}
              maxLength={512}
              autoFocus
              value={content}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  e.preventDefault();
                  updateContent();
                }
              }}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          )}
          {textareaStylesElement}
          {inputStylesElement}
        </form>
      )}

      {!editing && (
        <div
          className={`editor-content ${props.multiline ? "multiline" : ""}`}
          onClick={(e) => {
            setEditing(true);
          }}
        >
          <span>{props.content}</span>
        </div>
      )}
      <style jsx>
        {`
          .editor {
            width: min-content;
          }
          .editor.multiline {
            width: auto;
          }
          .editor-content {
            cursor: pointer;
            padding: 2px; /* related to input padding */
          }
          .editor-content.multiline {
            padding: 4px; /* related to textarea padding */
          }
        `}
      </style>
    </div>
  );
};

export default Editor;

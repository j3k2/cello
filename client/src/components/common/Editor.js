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
        padding: 2px 6px;
        position: relative;
        top: 0px;
        left: -4px;
      }
    `;
  }
  function getInputStyle() {
    return css.resolve`
      input {
        position: relative;
        top: -2px;
        left: -2px;
        padding: 6px 12px;
      }
    `;
  }

  const {
    className: textareaClassName,
    styles: textareaStyleElement,
  } = getTextareaStyle();

  const {
    className: inputClassName,
    styles: inputStyleElement,
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
          {textareaStyleElement}
          {inputStyleElement}
        </form>
      )}

      {!editing && (
        <div
          className={`editor-content ${props.hover ? "hover" : ""} ${props.multiline ? "multiline" : ""}`}
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
            padding: 2px; 
          }
          .editor-content.hover{
            border-radius: 3px;
            padding: 6px 12px;
            &:hover{
              background-color: hsla(0,0%,100%,.32);
            }
          }
          .editor-content.multiline {
            padding: 4px;
          }
        `}
      </style>
    </div>
  );
};

export default Editor;

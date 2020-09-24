import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import AutosizeInput from "react-input-autosize";
import css from "styled-jsx/css";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";

const InlineEditor = (props) => {
  const [editing, setEditing] = React.useState(false);

  const [content, setContent] = React.useState(props.content);

  const updateContent = () => {
    if (content.length && content !== props.content) {
      props.updateContent(content);
    }
    setEditing(false);
  };

  const ref = useOnOutsideClick(updateContent);

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
    <div
      className={`editor ${props.lane ? "lane" : ""} ${
        props.hover ? "hover" : ""
      } ${props.multiline ? "multiline" : ""}`}
      ref={ref}
    >
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
              maxLength={255}
              autoFocus
              value={content}
              placeholder={props.placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
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
          className="editor-content"
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
          .multiline.editor {
            width: 100%;
          }
          .editor-content {
            cursor: pointer;
            padding: 2px;
          }
          .hover .editor-content {
            border-radius: 3px;
            padding: 6px 12px;
            padding-right: 18px;
            &:hover {
              background-color: hsla(0, 0%, 100%, 0.32);
            }
          }
          .multiline .editor-content {
            padding: 4px;
          }
          .multiline form {
            width: auto;
          }
          .lane .editor-content {
            width: 224px;
          }
          .lane form {
            width: 228px;
          }
        `}
      </style>
    </div>
  );
};

export default InlineEditor;

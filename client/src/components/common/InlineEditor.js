import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import AutosizeInput from "react-input-autosize";
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

  return (
    <div className={`editor ${props.multiline ? "multiline" : ""}`} ref={ref}>
      {editing && (
        <form
          className="editor-form"
          onSubmit={(e) => {
            e.preventDefault();
            updateContent();
          }}
        >
          {!props.multiline && (
            <AutosizeInput
              autoFocus
              value={content}
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
          .editor-content {
            cursor: pointer;
            padding: 2px;
          }
          .multiline {
            width: 100%;
            .editor-content {
              padding: 4px;
            }
          }
          .editor :global(textarea) {
            padding: 2px 6px;
            position: relative;
            top: 0px;
            left: -4px;
          }
          .editor :global(input) {
            position: relative;
            top: -2px;
            left: -2px;
            padding: 6px 12px;
          }
        `}
      </style>
    </div>
  );
};

export default InlineEditor;

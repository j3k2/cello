import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";

function TextEditor(props) {
  const [editing, setEditing] = React.useState(false);

  const [text, setText] = React.useState(props.text);

  const updateText = () => {
    if (text.length && text !== props.text) {
      props.update(text);
    }
    setEditing(false);
  };

  const ref = useOnOutsideClick(updateText);

  return (
    <div className="text-editor" ref={ref}>
      {editing && (
        <TextareaAutosize
          minRows={4}
          value={text}
          placeholder={props.placeholder}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      )}
      {!editing && text.length > 0 && (
        <div
          className="editor-display"
          onClick={() => {
            setEditing(true);
          }}
        >
          {text}
        </div>
      )}
      {!editing && text.length < 1 && (
        <div
          className="editor-toggle"
          onClick={() => {
            setEditing(true);
          }}
        >
          {props.placeholder}
        </div>
      )}
      <style jsx>
        {`
          .text-editor :global(textarea) {
            padding: 8px 12px;
          }
          .editor-display,
          .editor-toggle {
            white-space: pre-line;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}

export default TextEditor;

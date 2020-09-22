import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import css from "styled-jsx/css";

function TextEditor(props) {
  const [editing, setEditing] = React.useState(false);

  const [text, setText] = React.useState(props.text);

  const ref = React.useRef(null);

  const updateText = () => {
    if (text.length && text !== props.text) {
      props.update(text);
    }
    setEditing(false);
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        updateText();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, updateText]);

  function getTextareaStyle() {
    return css.resolve`
      textarea {
        padding: 8px 12px;
      }
    `;
  }

  const {
    className: textareaClassName,
    styles: textareaStyleElement,
  } = getTextareaStyle();

  return (
    <div ref={ref}>
      {editing && (
        <TextareaAutosize
          minRows={4}
          className={textareaClassName}
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
      {textareaStyleElement}
      <style jsx>
        {`
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

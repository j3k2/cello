import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import css from "styled-jsx/css";

const Editor = (props) => {
  const [editing, setEditing] = React.useState(false);

  const [content, setContent] = React.useState("");

  const [formHeight, setFormHeight] = React.useState(null);

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
        /* border: none; */
        border-radius: 3px;
        resize: none;
        outline: none;
        font: inherit;
        position: relative;
        top: -2px;
        left: -2px;
        width: 250px;
        /* margin:0px; */
        /* padding: 0px; */
        /* overflow: hidden scroll; */
        /* overflow-wrap: break-word; */
      }
      /* input {
        border: solid 2px #0079bf;
        border-radius: 3px;
        outline: none;
        font: inherit;
        position: relative;
        width: 100%;
      } */
    `;
  }
  const { className, styles } = getTextareaStyle();

  return (
    <div className={`editor ${props.type}`} ref={ref}>
      {editing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateContent();
          }}
        >
          {props.type === "board" && (
            <input
              className={className}
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

          {props.type !== "board" && (
            <TextareaAutosize
              className={className}
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
              onHeightChange={(height) => {
                // console.log(height);
                setFormHeight(height);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          )}
          {styles}
        </form>
      )}

      {!editing && (
        <div
          className="editor-content"
          onClick={(e) => {
            setEditing(true);
            // console.log(e.target.offsetWidth);
          }}
        >
          <span>{props.content}</span>
        </div>
      )}
      <style jsx>
        {`
          .editor form {
            height: ${formHeight ? formHeight - 4 + "px" : "auto"};
          }
          .editor-content {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default Editor;

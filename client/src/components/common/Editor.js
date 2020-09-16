import React from "react";

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

  return (
    <div className={`editor ${props.type}`} ref={ref}>
      {editing && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateContent();
            }}
          >
            <input
              autoFocus
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </form>
        </div>
      )}

      {!editing && (
        <div
          className="editor-content"
          onClick={() => {
            setEditing(true);
          }}
        >
          {props.content}
        </div>
      )}
      <style jsx>
        {`
          .editor input {
            font: inherit;
            border: none;
            border-radius: 3px;
            padding: 0;
            width: 100%;
          }

          .editor-content {
            cursor: pointer;
          }

          .editor.board {
            input {
              max-width: min-content;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Editor;

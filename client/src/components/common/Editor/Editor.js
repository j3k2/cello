import React from 'react';

const Editor = (props) => {
  const [editing, setEditing] = React.useState(false);

  const [content, setContent] = React.useState('');

  const ref = React.useRef(null);

  const updateContent = () => {
    if (content.length && content !== props.content) {
      props.updateContent(content);
    }
    setEditing(false);
  }

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

  return (<div ref={ref}>
    {editing && <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        updateContent()
      }}>
        <input
          autoFocus
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }} />
      </form>
    </div>}

    {!editing && <div onClick={() => {
      setEditing(true);
    }}>
      {props.content}
    </div>}
  </div>)
}

export default Editor;
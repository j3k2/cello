import React from 'react';

const Editor = (props) => {
  const [editing, setEditing] = React.useState(false);

  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  const updateContent = (e) => {
    e.preventDefault();
    if (content.length && content !== props.content) {
      props.updateContent(content);
    }
    setEditing(false);
  }

  return (<div>
    {editing && <div>
      <form onSubmit={updateContent}>
        <input value={content} onChange={(e) => {
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
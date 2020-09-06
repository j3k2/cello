import React from 'react';
import './creator.css';

const Creator = ({ create, placeholder, buttonText, toggleText }) => {
  const [showForm, setShowForm] = React.useState(false);

  const [content, setContent] = React.useState('');

  const ref = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowForm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, content]);

  const createEntity = async () => {
    if (content.length) {
      create(content);
      setContent('');
    }
  }

  return (
    <div className="creator-section" ref={ref}>
      {showForm &&
        <form className="creator-form" onSubmit={(e) => {
          e.preventDefault();
          createEntity()
        }}>
          <input
            autoFocus
            placeholder={placeholder}
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
            }} />
          <button>
            {buttonText}
          </button>
          <button onClick={() => {
            setShowForm(false);
          }}>
            X
          </button>
        </form>}

      {!showForm &&
        <div
          className="creator-toggle"
          onClick={() => {
            setShowForm(true);
          }}>
          {toggleText}
        </div>
      }
    </div>
  )
}

export default Creator;
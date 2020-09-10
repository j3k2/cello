import React from 'react';
import { MdClose, MdAdd } from 'react-icons/md'

import './creator.scss';

const Creator = ({ create, placeholder, buttonText, toggleText, closeAction }) => {
  const [showForm, setShowForm] = React.useState(false);

  const [content, setContent] = React.useState('');

  const wrapperRef = React.useRef(null);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowForm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, content]);

  const createEntity = async () => {
    if (content.length) {
      create(content);
      setContent('');
      inputRef.current.focus();
    }
  }

  return (
    <div className="creator-section" ref={wrapperRef}>
      {(showForm || !toggleText) &&
        <form className="creator-form" onSubmit={(e) => {
          e.preventDefault();
          createEntity()
        }}>
          <input
            ref={inputRef}
            autoFocus
            placeholder={placeholder}
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
            }} />
          <div className="creator-form-actions">
            <button>
              {buttonText}
            </button>
            <a onClick={() => {
              closeAction ? closeAction() : setShowForm(false);
            }}>
              <MdClose size={24} />
            </a>
          </div>
        </form>}

      {!showForm && toggleText &&
        <div
          className="creator-toggle"
          onClick={() => {
            setShowForm(true);
          }}>
          <div className="toggle-icon">
            <MdAdd size={16} />
          </div>
          <div className="toggle-text">
            {toggleText}
          </div>
        </div>
      }
    </div>
  )
}

export default Creator;
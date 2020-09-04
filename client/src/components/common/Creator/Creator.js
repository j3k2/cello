import React from 'react';
import './creator.css';

const Creator = ({create, placeholder, buttonText, toggleText}) => {
  const [showForm, setShowForm] = React.useState(false);

  const [content, setContent] = React.useState('');

  const createEntity = async (e) => {
    e.preventDefault();
    if(content.length) {
      create(content);
      setContent('');
    }
  }

  return (
    <div className="creator-section">
      {showForm &&
      <form className="creator-form" onSubmit={createEntity}>
          <input 
          placeholder={placeholder}
          value={content} 
          onChange={(e)=>{
            setContent(e.target.value)
          }}/>
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
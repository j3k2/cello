import React from 'react';
import lane from '../../services/lanes';

const LaneCreator = (props) => {
  const [showForm, setShowForm] = React.useState(false);

  const CreateLaneForm = () => {
    const [laneTitle, setLaneTitle] = React.useState('');

    async function createLane (e) {
      e.preventDefault();
      const res = await lane.createLane({ boardId: props.id, title: laneTitle });
      console.log(res);
    }
    return (<form onSubmit={createLane}>
      <input
        value={laneTitle}
        autoFocus={true}
        onChange={(e) => {
          setLaneTitle(e.target.value);
        }}
        placeholder="Enter list title"
      />
      <button type='submit'>Add list</button>
      <button onClick={() => {
        setShowForm(false)
      }}>X</button>
    </form>)
  }

  return (
    <React.Fragment>

      {showForm && <CreateLaneForm />}

      {!showForm && <div onClick={() => {
        setShowForm(true)
      }}>
        Add another list
      </div>}
    </React.Fragment>
  )
}

export default LaneCreator;
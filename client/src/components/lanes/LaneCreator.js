import React from 'react';
import laneService from '../../services/lanes';

const LaneCreator = (props) => {
  const [showForm, setShowForm] = React.useState(false);

  const CreateLaneForm = () => {
    const [laneTitle, setLaneTitle] = React.useState('');

    async function createLane(e) {
      e.preventDefault();
      const lane = await laneService.createLane({ boardId: props.id, title: laneTitle });
      props.addLane(lane);
    }
    return (<form className="lane-creator-form" onSubmit={createLane}>
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
    <div className="board-lane lane-creator">
      <div className="lane-content">
        {showForm && <CreateLaneForm />}

        {!showForm && <div onClick={() => {
          setShowForm(true)
        }}>
          Add another list
      </div>}
      </div>
    </div>
  )
}

export default LaneCreator;
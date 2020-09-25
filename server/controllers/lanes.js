const laneQuery = require("../queries/lane");

async function createLane(req, res) {
  try {
    const created = await laneQuery.createLane({
      board_id: req.body.boardId,
      title: req.body.title,
    });
    res.json(created);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error creating lane");
  }
}

async function moveLane(req, res) {
  try {
    await laneQuery.moveLane(req.params.id, {
      prev: req.body.prev,
      next: req.body.next,
      board_id: req.body.boardId,
    });
    res.json();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error moving lane");
  }
}

async function editLane(req, res) {
  try {
    const lane = await laneQuery.editLane(req.params.id, req.body);
    res.json(lane);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error editing lane");
  }
}

async function deleteLane(req, res) {
  try {
    await laneQuery.deleteLane(req.params.id);
    res.json();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error deleting lane");
  }
}

module.exports = {
  createLane,
  moveLane,
  editLane,
  deleteLane,
};

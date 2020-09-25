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
    res.status(500).json("Server Error: " + err.message);
  }
}

async function moveLane(req, res) {
  try {
    const success = await laneQuery.moveLane(req.params.id, {
      prev: req.body.prev,
      next: req.body.next,
      board_id: req.body.boardId,
    });

    if (success) {
      res.status(200).json("OK");
    } else {
      res.status(500).json("Could not update list position");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error: " + err.message);
  }
}

async function editLane(req, res) {
  try {
    const lane = await laneQuery.editLane(req.params.id, req.body);
    res.json(lane);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error: " + err.message);
  }
}

async function deleteLane(req, res) {
  try {
    const success = await laneQuery.deleteLane(req.params.id);
    if (success) {
      res.status(200).json("OK");
    } else {
      res.status(500).json("Could not delete list");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error: " + err.message);
  }
}

module.exports = {
  createLane,
  moveLane,
  editLane,
  deleteLane,
};

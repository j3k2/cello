const listQuery = require("../queries/list");

async function createList(req, res) {
  try {
    const created = await listQuery.createList({
      board_id: req.body.boardId,
      title: req.body.title,
    });
    res.json(created);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error creating list");
  }
}

async function moveList(req, res) {
  try {
    await listQuery.moveList(req.params.id, {
      prev: req.body.prev,
      next: req.body.next,
      board_id: req.body.boardId,
    });
    res.json();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error moving list");
  }
}

async function editList(req, res) {
  try {
    const list = await listQuery.editList(req.params.id, req.body);
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error editing list");
  }
}

async function deleteList(req, res) {
  try {
    await listQuery.deleteList(req.params.id);
    res.json();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error deleting list");
  }
}

module.exports = {
  createList,
  moveList,
  editList,
  deleteList,
};

const cardQuery = require("../queries/card");

async function createCard(req, res) {
  try {
    const created = await cardQuery.createCard({
      list_id: req.body.listId,
      board_id: req.body.boardId,
      title: req.body.title,
    });
    res.json(created);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error creating card");
  }
}

async function getCard(req, res) {
  try {
    const card = await cardQuery.getCard(req.params);
    card.boardId = card.board_id;
    card.listId = card.list_id;
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error loading card");
  }
}

async function editCard(req, res) {
  try {
    const card = await cardQuery.editCard(req.params.id, req.body);
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error editing card");
  }
}

async function moveCard(req, res) {
  try {
    if (req.body.nextListId) {
      await cardQuery.moveCardBetweenLists(req.params.id, req.body);
      res.json();
    } else {
      await cardQuery.moveCardWithinList(req.params.id, {
        prev: req.body.prev,
        next: req.body.next,
        list_id: req.body.listId,
      });
      res.json();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error moving card");
  }
}

async function deleteCard(req, res) {
  try {
    await cardQuery.deleteCard(req.params.id);
    res.json();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error deleting card");
  }
}

module.exports = {
  createCard,
  moveCard,
  getCard,
  editCard,
  deleteCard,
};

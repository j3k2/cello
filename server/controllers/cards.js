const cardQuery = require("../queries/card");

async function createCard(req, res) {
  try {
    const created = await cardQuery.createCard({
      lane_id: req.body.laneId,
      title: req.body.title,
    });
    res.json(created);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error: " + err.message);
  }
}

async function getCard(req, res) {
  try {
    const card = await cardQuery.getCard(req.params);

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error: " + err.message);
  }
}

async function editCard(req, res) {
  try {
    const card = await cardQuery.editCard(req.params.id, req.body);
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error: " + err.message);
  }
}

async function moveCard(req, res) {
  try {
    if (req.body.nextLaneId) {
      const success = await cardQuery.moveCardBetweenLanes(
        req.params.id,
        req.body
      );

      if (success) {
        res.status(200).json("OK");
      } else {
        res.status(500).json("Could not update card position");
      }
    } else {
      const success = await cardQuery.moveCardWithinLane(req.params.id, {
        prev: req.body.prev,
        next: req.body.next,
        lane_id: req.body.laneId,
      });

      if (success) {
        res.status(200).json("OK");
      } else {
        res.status(500).json("Could not update card position");
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error: " + err.message);
  }
}

async function deleteCard(req, res) {
  try {
		const success = await cardQuery.deleteCard(req.params.id);
    if (success) {
      res.status(200).json("OK");
    } else {
      res.status(500).json("Could not delete card");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error: " + err.message);
  }
}

module.exports = {
  createCard,
  moveCard,
  getCard,
  editCard,
  deleteCard,
};

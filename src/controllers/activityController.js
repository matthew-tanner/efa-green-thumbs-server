const router = require("express").Router();
const validateToken = require("../utils/validateToken");
const { ActivityModel } = require("../models");

router.get("/all/:tripid", validateToken, async (req, res) => {
  const { id } = req.user;
  const tripId = req.params.tripid;

  try {
    const getActivities = await ActivityModel.findAll({
      where: {
        tripId: tripId,
        userId: id,
      },
    });
    res.status(200).json(getActivities);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:id", validateToken);

router.put("/:id", validateToken, async (req, res) => {});

router.post("/create/:tripid", validateToken, async (req, res) => {
  const { id } = req.user;
  const tripId = req.params.tripid;
  const { name, description, cost, notes } = req.body;
  const activityEntry = {
    name,
    description,
    cost,
    notes,
    userId: id,
    tripId: tripId,
  };
  try {
    const newActivity = await ActivityModel.create(activityEntry);
    res.status(200).json(newActivity);
  } catch (err) {
    res.status(500).json({ error: err });
  }
  ActivityModel.create(activityEntry);
});

router.delete("/:id", validateToken, async (req, res) => {
  const { id } = req.user;
  const activityId = req.params.id;

  try {
    const query = {
      where: {
        id: activityId,
        userId: id,
      },
    };
    ActivityModel.destroy(query);
    res.status(200).json({ message: "Activity removed." });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;

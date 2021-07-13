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

router.get("/:id", validateToken, async (req, res) => {
  const activityId = req.params.id;
  console.log(activityId)

  try {
    const getActivity = await ActivityModel.findOne({
      where: {
        id: activityId,
      },
    });

    if (getActivity) {
      res.status(200).json({
        data: getActivity,
      });
    } else {
      res.status(400).json({
        message: "bad request",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});


router.put("/:id", validateToken, async (req, res) => {
  const activityId = req.params.id
  const { notes } = req.body

  const query = {
    where: {
      id: activityId
    },
    returning: true,
  }

  const data = { notes }

  try {
    const updateActivity = await ActivityModel.update(data, query);

    if (updateActivity[0] === 1) {
      res.status(200).json({
        data: updateActivity,
      });
    } else {
      res.status(400).json({
        message: "bad request",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
})


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

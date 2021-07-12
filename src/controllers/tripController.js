const router = require("express").Router();
const jwt = require("jsonwebtoken");
const validateToken = require("../utils/validateToken");
const { TripModel } = require("../models");

const { jwtSecret } = require("../config");

router.get("/all", validateToken, async (req, res) => {
  const { id } = req.user;

  try {
    const Trips = await Model.findAll({
      where: {
        userId: id,
      },
    });
    res.status(200).json(Trips);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:id", validateToken, async (req, res) => {
  const { id } = req.user;
  const tripId = req.params.id;

  try {
    const getTrip = await TripModel.findOne({
      where: {
        id: tripId,
        ownerId: id,
      },
    });

    if (getTrip) {
      res.status(200).json({
        data: getTrip,
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

router.post("/create", validateToken, async (req, res) => {
  const { id } = req.user;
  const { name } = req.body;

  try {
    const permaLink = jwt.sign({ name: name }, jwtSecret);
    const newTrip = await TripModel.create({
      name: name,
      public: false,
      permaLink: permaLink,
      userId: id,
    });
    res.status(200).json({
      data: newTrip,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

router.put("/:id", validateToken, async (req, res) => {
  const { id } = req.user;
  const tripId = req.params.id;
  const { name } = req.body;

  const query = {
    where: {
      id: tripId,
      userId: id,
    },
    returning: true,
  };

  const data = {
    name,
  };

  try {
    const updateTrip = await TripModel.update(data, query);

    if (updateTrip[0] === 1) {
      res.status(200).json({
        data: updateTrip,
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

router.delete("/:id", validateToken, async (req, res) => {
  const { id } = req.user;
  const tripId = req.params.id;

  try {
    TripModel.destroy({
      where: {
        id: tripId,
        userId: id,
      },
    });
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;

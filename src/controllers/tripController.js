const router = require("express").Router();
const { validateToken } = require("../utils");
const { TripModel } = require("../models");

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
  const { name, public } = req.body;

  try {
    const newTrip = TripModel.create({
      name: name,
      public: public,
      ownerId: id,
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
      ownerId: id,
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
        ownerId: id,
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

const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");
const { jwtSecret } = require("../config");

const validateToken = async (req, res, next) => {
  if (req.method == "OPTIONS") {
    next();
  }

  try {
    if (req.headers.authorization && req.headers.authorization.includes("Bearer")) {
      const { authorization } = req.headers;
      const payload = authorization
        ? jwt.verify(
            authorization.includes("Bearer") ? authorization.split(" ")[1] : authorization,
            jwtSecret
          )
        : undefined;

      if (payload) {
        let getUser = await UserModel.findOne({
          where: { id: payload.id },
        });
        if (getUser) {
          req.user = getUser;
          next();
        } else {
          res.status(400).send({ message: "Not authorized" });
        }
      } else {
        res.status(401).send({ messaage: "Invalid token" });
      }
    } else {
      res.status(403).send({ message: "forbidden" });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

module.exports = validateToken;

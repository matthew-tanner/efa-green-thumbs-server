const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const MaskData = require("maskdata");
const { UniqueConstraintError } = require("sequelize/lib/errors");

const { UserModel } = require("../models");
const { jwtSecret } = require("../config");

router.post("/signup", async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    const confirmToken = jwt.sign({ email: email }, jwtSecret);
    const pwdHash = bcrypt.hashSync(password, 12);

    const createUser = await UserModel.create({
      emailAddress: email,
      passwordHash: pwdHash,
      displayName: displayName,
      confirmed: false,
      confirmationCode: confirmToken,
    });

    res.status(200).json({
      email: createUser.emailAddress,
      displayName: createUser.displayName,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({
        message: "username or display name in use",
      });
    } else {
      return res.status(500).json({
        message: err,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const getUser = await UserModel.findOne({
      where: {
        emailAddress: email,
      },
    });

    if (getUser) {
      const comparePass = bcrypt.compare(password, getUser.passwordHash);

      if (comparePass) {
        const token = jwt.sign({ id: getUser.id }, jwtSecret, {
          expiresIn: "24h",
        });
        console.log(`login success for ${getUser.emailAddress}`);
        res.status(200).json({
          email: getUser.emailAddress,
          displayName: getUser.displayName,
          sessionToken: token,
        });
      }
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/confirm/:confirmationCode", async (req, res) => {
  const confirmationCode = req.params.confirmationCode;

  try {
    const getUser = UserModel.findOne({
      confirmationCode: confirmationCode,
    });

    if (getUser) {
      const updateUser = UserModel.update(
        {
          where: {
            confirmationCode: confirmationCode,
          },
          returning: true,
        },
        {
          status: 1,
        }
      );

      if (updateUser[0] === 1) {
        res.status(200).json({
          message: 1,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

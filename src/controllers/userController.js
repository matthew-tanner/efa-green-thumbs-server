const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const MaskData = require("maskdata");
const { UniqueConstraintError } = require("sequelize/lib/errors");

const { UserModel } = require("../models");
const { jwtSecret } = require("../config")

router.post("/signup", async (req, res) => {
  const { email, password, displayname } = req.body;
  console.log(email, password, displayname);

  try {
    const confirmToken = jwt.sign({email: email}, jwtSecret);
    const pwdHash = bcrypt.hashSync(password, 12);

    const createUser = await UserModel.create({
      emailAddress: email,
      passwordHash: pwdHash,
      displayName: displayname,
      status: 0,
      confirmationCode: confirmToken,
    });

    res.status(200).json({
      email: createUser.emailAddress,
      displayname: createUser.displayName,
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

router.get("/confirm/:confirmationCode", async (req, res) => {
  const confirmationCode = req.params.confirmationCode;

  try{
    const getUser = UserModel.findOne({
      confirmationCode: confirmationCode
    })

    if (getUser){
      const updateUser = UserModel.update({
        where:{
          confirmationCode: confirmationCode
        },
        returning: true,
      },
      {
        status: 1
      })
    }
  } catch(err){
    console.log(err)
  }

})

module.exports = router;

const express = require("express");
const cors = require("cors");
const { appPort } = require("./config/index");

const dbConnection = require("./db/index");

const app = new express();

app.use(cors());
app.use(express.json());
app.use("/", (req, res) => res.send("pong"));

dbConnection
  .authenticate()
  .then(() => dbConn.sync())
  .then(() => {
    app.listen(appPort, () => console.log(`listening on port ${appPort}`));
  })
  .catch((err) => {
    console.log(`${err}`);
  });

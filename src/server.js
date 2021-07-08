const express = require("express");
const cors = require("cors");
const { appPort, dbName } = require("./config/index");

const controllers = require("./controllers");

const dbConnection = require("./db/index");

const app = new express();

app.use(cors());
app.use(express.json());
app.use("/user", controllers.UserController);

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    console.log(`connected to database ${dbName}`);
    app.listen(appPort, () => console.log(`listening on port ${appPort}`));
  })
  .catch((err) => {
    console.log(`${err}`);
  });

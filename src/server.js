const express = require("express");

const app = new express();

app.use("/", (req, res) => {
  res.send("pong");
});

app.listen("3000", () => console.log("listening on port 3000"));

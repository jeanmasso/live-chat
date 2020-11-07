const express = require("express");
const io = require("socket.io");

const app = express();
const chat = io(app.listen(3000));

app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.redirect("index.html");
});

chat.on("connection", user => {
  console.log("New user connected");

  user.on("chat message", msg => {
    console.log("New chat message");

    chat.emit("chat message", msg);
  });
});

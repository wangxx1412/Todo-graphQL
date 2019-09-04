const app = require("./server/server");
const express = require("express");
const path = require("path");

app.use(express.static(path.join(__dirname + "/dist")));

//serve the bundle files to server
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening");
});

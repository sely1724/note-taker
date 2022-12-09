const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(express.static("public"));

//this is probably where we show HTML index.html page?

//app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/Develop/public/index.html"))
);

// app.get("/send", (req, res) =>
//   res.sendFile(path.join(__dirname, "public/sendFile.html"))
// );

// app.get("/routes", (req, res) =>
//   res.sendFile(path.join(__dirname, "public/routes.html"))
// );

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

//so at 3001, index.html appears.

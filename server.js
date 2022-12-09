const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

//if we want to generate unique user id? at any point found this in activity
//const uuid = require('./helpers/uuid');

app.use(express.static("public"));
//app.use(express.json());?? ? not sure if this is necesary

//this is probably where we show HTML index.html page?

//app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

//FIGURE OUT API/NOTES route.
// const notes = require("./route???");
// app.use("/api/notes", notes);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/Develop/public/index.html"))
);

//not sure if we're supposed to call it API/NOTES??
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"))
);

// app.get("/send", (req, res) =>
//   res.sendFile(path.join(__dirname, "public/sendFile.html"))
// );

// app.get("/routes", (req, res) =>
//   res.sendFile(path.join(__dirname, "public/routes.html"))
// );

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT} 🚀`));

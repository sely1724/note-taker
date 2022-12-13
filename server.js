// require external modules that exist in separate files
const express = require("express");
const path = require("path");
const fs = require("fs");
const api = require("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 3001;

//////////////////////
// Middleware Section
// tells express to look for items in public folder if trying to resolve a route.
app.use(express.static("public"));

// tells express that if url encoded content comes in, express should decode it and place in a JS object
app.use(express.urlencoded({ extended: true }));

// tells express to turn every request with a json body into a JS object
app.use(express.json());

// tells express app that EVERY route created in noterouter.js will have an api prefix.
app.use("/api", api);
//////////////////////

// sendFile sends file to browser
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
// * (glob command??) according to research.  Definitely a wildcard that matches any number of any characters including none.
// Required instead of / per homework instructions.  Placing below /notes is the only way I could get it to work.  Probably if placed it front it overrides since it's a wildcard.
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// event listener
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT} 🚀`));

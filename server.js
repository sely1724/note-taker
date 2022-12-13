const express = require("express");
const path = require("path");
const fs = require("fs");
//const middleware = require("./middleware/middleware.js");

const app = express();
//including the module in routes/noteroute.js
const api = require("./routes/noteRouter");
const PORT = process.env.PORT || 3001;

//////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE SECTION
// middleware.use(middleware);

// // tells express to look for items in public folder if trying to resolve a route.
app.use(express.static("public"));

// // tells express that if url encoded content comes in, express should decode it and place in a JS object
app.use(express.urlencoded({ extended: true }));

// // tells express that for every request that comes in, express needs to see if it has a body with json in it.
// // if it does, turn the json into a JS object
app.use(express.json());

// // tells express app that EVERY route created in the noterouter.js will have an api prefix.
// //could create an index.js under routes to combine all routes.  But since we just have notes, should be ok with adding /notes
app.use("/api/notes", api);

//////////////////////////////////////////////////////////////////////////////////////////////////

// sendFile sends file to browser
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
// * required instead of / per homework instructions.  Placing below /notes and changing from index.html and index.js was way I could figure it out.
// tried adding /* but it became default.  And when I bumped app.get notes.html to bottom, couldn't get past first page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT} 🚀`));

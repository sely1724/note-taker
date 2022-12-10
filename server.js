const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
//including the module in routes/noteroute.js
const api = require("./routes/noteroute");
const PORT = process.env.PORT || 3001;

//////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE SECTION

// tells express to look for items in public folder if trying to resolve a route.
app.use(express.static("public"));

// tells express that for every request that comes in, express needs to see if it has a body with json in it.
// if it does, turn the json into a JS object
app.use(express.json());

// tells express that if url encoded content comes in, express should decode it and place in a JS object
app.use(express.urlencoded({ extended: true }));

// tells express app that EVERY route created in the noterouter.js will have an api prefix.
//could create an index.js under routes to combine all routes.  But since we just have notes, should be ok with adding /notes
app.use("/api/notes", api);

//////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////
// This takes all the routes exported by the api module and prepends their path with "/api"
// /notes GET
// /notes POST
// /api/notes GET
// /api/notes POST
/////////////////////////////////////////////////

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT} 🚀`));

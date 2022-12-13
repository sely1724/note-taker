// Custom middleware that logs out the type and path of each request to the server
const express = require("express");
const app = express();
const api = require("../routes/index");

// tells express to look for items in public folder if trying to resolve a route.
app.use(express.static("public"));

// tells express that if url encoded content comes in, express should decode it and place in a JS object
app.use(express.urlencoded({ extended: true }));

// tells express that for every request that comes in, express needs to see if it has a body with json in it.
// if it does, turn the json into a JS object
app.use(express.json());

// tells express app that EVERY route created in the noterouter.js will have an api prefix.
//could create an index.js under routes to combine all routes.  But since we just have notes, should be ok with adding /notes
app.use("/api/notes", api);

module.exports = app;

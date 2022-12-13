const express = require("express");

// Import our modular routers for /tips and /feedback
const tipsRouter = require("./tips");
const feedbackRouter = require("./feedback");

const app = express();
const notesRouter = require("./noteRouter");
/////////////////////////////////////////////////////
// This takes all the routes exported by the tipsRouter module
// and prepends their paths with "/tips":
// /tips GET
// /tips POST
/////////////////////////////////////////////////////

app.use("/notes", notesRouter);

module.exports = app;

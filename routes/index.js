const express = require("express");

const app = express();
const notesRouter = require("./noteRouter");

app.use("/notes", notesRouter);

module.exports = app;

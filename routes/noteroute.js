const notesRouter = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

const db = require("../db/db.json");
// GET Route for retrieving all the notes
notesRouter.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI note
notesRouter.post("/", (req, res) => {
  console.info(`${req.method} request received to ADD notes`);
  console.log(req.body);
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };
    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    res.error("error adding note");
  }
});

// DELETE Route for note
notesRouter.delete("/", (req, res) => {
  console.info(`${req.method} request received to delete note`);
  console.log(req.body);
  //readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));

  // have to ensure it's singular note.  Pull it up somehow from db json
  // then have to delete.  account for potential errors.
});

module.exports = notesRouter;

//also why can we view TEST TITLE INFO, but not the rest of the notes???

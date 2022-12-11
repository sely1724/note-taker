const notesRouter = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const db = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving all the notes
notesRouter.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notesRouter.get("/:id", (req, res) => {
  console.log("moose!!!");
  for (let i = 0; i < db.length; i++) {
    if (db[i] == req.params.id) {
      return res.json(db[i]);
    }
  }
  res.status(404).send("No notes found.");
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

notesRouter.delete("/:id", (req, res) => {
  let id = req.params.id;
  const filterNotes = db.filter((noteToRemove) => noteToRemove.id !== id);
  writeToFile("./db/db.json", filterNotes);
});

module.exports = notesRouter;

//also why can we view TEST TITLE INFO, but not the rest of the notes???

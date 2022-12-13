const notesRouter = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const notes = require("../db/db.json");
// classmate recommended installing. found website to guide: https://www.geeksforgeeks.org/node-js-npm-uuid/
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving all the notes
notesRouter.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => {
    res.json(JSON.parse(data));
  });
});

// POST Route for a new UX/UI note
notesRouter.post("/", (req, res) => {
  console.info(`${req.method} request received to ADD notes`);
  const { title, text } = req.body;
  if (title && text) {
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
  let noteDeleteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((notes) => {
      let filterNotes = notes.filter(
        (notesToKeep) => notesToKeep.id !== noteDeleteId
      );
      writeToFile("./db/db.json", filterNotes);
      res.json("deleted!");
    });
});
module.exports = notesRouter;

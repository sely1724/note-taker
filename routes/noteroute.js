const notesRouter = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const db = require("../db/db.json");
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

// FROM CLASS ACTIVITY

// // GET route for returning all terms from a given category
// app.get('/api/terms/:category', (req, res) => {
//   const requestedCategory = req.params.category.toLowerCase();
//   const result = [];

//   for (let i = 0; i < termData.length; i++) {
//     const currentTermCategory = termData[i].category;
//     if (requestedCategory === currentTermCategory) {
//       result.push(termData[i]);
//     }
//   }
//   return res.json(result);
// });

notesRouter.delete("/:id", (req, res) => {
  let noteDeleteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((db) => {
      let filterNotes = db.filter(
        (notesToKeep) => notesToKeep.id !== noteDeleteId
      );
      writeToFile("./db/db.json", filterNotes);
      res.json(`deleted!`);
    });
});

//should override what's already there with just filtered notes
//
//   //should print what was just overwritten
//   readFromFile("./db/db.json").then((data) => res.json(data));
// });

module.exports = notesRouter;

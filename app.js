const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Note = require('./db/models/note.js').Note;

app.use(bodyParser.json());

app.get('/notes', (req, res) => {
  Note.find()
    .then((notes) => res.status(200).send(notes))
    .catch((err) => res.status(400).send(err));
});

app.post('/notes', (req, res) => {
  const body = req.body;
  const note = new Note({
    name: body.name,
    text: body.text
  });
  note.save(note)
    .then((note) => res.status(201).send(note))
    .catch((err) => res.status(400).send(err));
});

module.exports = app;

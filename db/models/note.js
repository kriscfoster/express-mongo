const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model('Note', NoteSchema)

module.exports = { Note };

const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    userName: String,
    title: String,
    tagLine: String,
    body: String,
    pin: Boolean,
});

const Note = mongoose.model("note", NoteSchema);

module.exports = { Note };
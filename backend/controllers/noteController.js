const Note = require("../models/Note");

// Create a new note
exports.createNote = async (req, res) => {
    try {
        const { title, content} = req.body ;
        const note =new Note({ title, content});
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all notes
exports.getNotes = async (req,res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (err) {
        req.status(500).json({ error : err.message});
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const {id } = req.params;
        await Note.findByIdAndDelete(id);
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
};
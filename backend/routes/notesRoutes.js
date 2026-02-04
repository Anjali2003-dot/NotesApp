const express = require("express");
const Note = require("../models/Note");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Create Note
router.post("/", authMiddleware , async (req ,res) => {
    try {
        const { title , content , color} = req.body;
        if (!title) return res.status(400).json({ error : "Title required"}) ;

        const note = new Note({
            userID: req.user.id ,
            title ,
            content,
            color
        });
        await note.save();
        res.status(201).json(note);
    } catch (err){
        console.error(err);
        res.status(500).json({ error : "Server error"});

    }
});

// Get All notes
router.get("/" , authMiddleware , async (req ,res) => {
    try {
        const notes = await Note.find({ userID : req.user.id}).sort({ updatedAt: -1});
        res.json(notes);
    } catch(err){
        console.error(err);
        res.status(500).json({error: "Server error"}) ;
    }
});

// Get Single note
router.get("/:id" , authMiddleware , async (req ,res ) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userID: req.user.id});
        if(!note) return res.status(404).json({ error: "Note not found" });
        res.json(note);
    } catch(err){
        console.error(err);
        res.status(500).json({ error : "Server error" });
    }
}) ;

// Update Note
router.put("/:id" , authMiddleware , async (req ,res) => {
    try {
        const updated = await Note.findOneAndUpdate(
            { _id : req.params.id , userID : req.user.id },
            { $set : req.body },
            { new : true }
        );
        if (!updated) return res.status(404).json({ error: " Note not found or not yours"});
        res.json(updated);
    } catch(err){
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
});

// Delete Note
router.delete("/:id" , authMiddleware , async (req ,res) => {
    try {
        const deleted = await Note.findOneAndDelete({_id : req.params.id ,  userID : req.user.id});
        if(!deleted) return res.status(404).json({error: "Note not found or not yours"});
        res.json({message : "Note deleted"});
    } catch(err){
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
});

module.exports = router;












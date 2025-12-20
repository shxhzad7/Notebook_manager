const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// ROUTE 1 : Add a new note
router.post(
    '/addnote',
    [
        body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
        body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            const note = new Note({
                title,
                description,
                tag: tag?.trim() ? tag : "General"
            });

            const savedNote = await note.save();
            res.json(savedNote);

        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }
);

// FETCH NOTES
router.get('/fetchallnotes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE: Delete a note
router.delete('/deletenote/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        await Note.findByIdAndDelete(req.params.id);

        res.json({ success: true });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE: Update a note
router.put('/updatenote/:id', async (req, res) => {
    const { title, description, tag } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and Description are required" });
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, description, tag },
            { new: true }
        );

        res.json(updatedNote);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;

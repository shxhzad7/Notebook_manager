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
                tag
            });

            const savedNote = await note.save();
            res.json(savedNote);

        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }
);



module.exports = router;

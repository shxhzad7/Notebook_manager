import React, { useState } from 'react';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const [notes, setNotes] = useState([]);

    const addNoteInternal = (note) => {
        const newNote = { ...note, _id: Date.now() };
        setNotes([...notes, newNote]);
    }

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note._id !== id));
    }

    const updateNote = (note) => {
        const newTitle = prompt("Enter new title", note.title);
        const newDescription = prompt("Enter new description", note.description);

        if (newTitle && newDescription) {
            setNotes(notes.map(n =>
                n._id === note._id
                    ? { ...n, title: newTitle, description: newDescription }
                    : n
            ));
        }
    }

    return (
        <div className="container">
            <AddNote addNoteInternal={addNoteInternal} />

            <div className="row">
                {notes.map(note => (
                    <NoteItem
                        key={note._id}
                        note={note}
                        deleteNote={deleteNote}
                        updateNote={updateNote}
                    />
                ))}
            </div>
        </div>
    );
}

export default Notes;

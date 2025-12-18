import React, { useState } from 'react';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const [notes, setNotes] = useState([]);

    // Add a new note
    const addNoteInternal = (note) => {
        const newNote = { ...note, _id: Date.now() };
        setNotes([...notes, newNote]);
    }
    return (
        <div className="container">
            {/* Add note form */}
            <AddNote addNoteInternal={addNoteInternal} />

            {/* Display notes */}
            <div className="row">
                {notes.map(note => (
                    <NoteItem 
                        key={note._id} 
                        note={note} 
                      
                    />
                ))}
            </div>
        </div>
    );
}

export default Notes;

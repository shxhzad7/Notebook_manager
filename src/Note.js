import React, { useEffect, useState } from 'react';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        const res = await fetch('http://localhost:5000/api/notes/fetchallnotes');
        const data = await res.json();
        setNotes(data);
    };

    useEffect(() => {
        fetchNotes();
    }, [notes]);

    return (
        <div className="container">
            <AddNote />

            <div className="row">
                {notes.map(note => (
                    <NoteItem key={note._id} note={note} />
                ))}
            </div>
        </div>
    );
};

export default Notes;

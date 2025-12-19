import React, { useEffect, useState } from 'react';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [alert, setAlert] = useState(null);

    const fetchNotes = async () => {
        const res = await fetch('http://localhost:5000/api/notes/fetchallnotes');
        const data = await res.json();
        setNotes(data);
    };

    const deleteNote = async (id) => {
        await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: 'DELETE'
        });

        // Remove from UI instantly (NO reload)
        setNotes(notes.filter(note => note._id !== id));
        setAlert("🗑️ Note deleted successfully");

        // Auto hide alert
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };


    useEffect(() => {
        fetchNotes();
    }, [notes]);

    return (
        <div className="container">
        {/* ALERT */}
            {alert && (
                <div className="alert alert-danger text-center mt-3" role="alert">
                    {alert}
                </div>
            )}
            <AddNote />

            <div className="row">
                {notes.map(note => (
                    <NoteItem key={note._id} note={note} 
                        deleteNote={deleteNote}
                    />
                ))}
            </div>
        </div>
    );
};

export default Notes;

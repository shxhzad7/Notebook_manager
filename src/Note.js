import React, { useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [alert, setAlert] = useState("");

    // Fetch all notes
    const fetchNotes = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/notes/fetchallnotes');
            const data = await res.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [notes]);

    // Delete note
    const deleteNote = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setNotes(notes.filter(note => note._id !== id));
                setAlert("Note deleted successfully!");
                setTimeout(() => setAlert(""), 2000);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    // Open edit modal
    const openEditModal = (note) => {
        setCurrentNote(note);
    };

    // Update note
   const updateNote = async () => {
    if (!currentNote.title || !currentNote.description) {
        setAlert("Title and Description cannot be blank!");
        setTimeout(() => setAlert(""), 2000); 
        return;
    }

    try {
        const res = await fetch(
            `http://localhost:5000/api/notes/updatenote/${currentNote._id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentNote)
            }
        );

        if (res.ok) {
            setNotes(notes.map(note => note._id === currentNote._id ? currentNote : note));
            setAlert("Note updated successfully!");
            setCurrentNote(null);
            setTimeout(() => setAlert(""), 2000);
        }
    } catch (error) {
        console.error("Error updating note:", error);
        setAlert("Failed to update note!");
        setTimeout(() => setAlert(""), 2000);
    }
};


    return (
        <div className="container">
            {alert && (
    <div 
        className="alert alert-success position-fixed top-0 start-50 translate-middle-x w-50 text-center"
        style={{ zIndex: 1050 }}
        role="alert"
    >
        {alert}
    </div>
)}


            <AddNote fetchNotes={fetchNotes} />

            <div className="row">
                {notes.map(note => (
                    <NoteItem
                        key={note._id}
                        note={note}
                        deleteNote={deleteNote}
                        openEditModal={openEditModal}
                    />
                ))}
            </div>

            {/* Edit Modal */}
{currentNote && (
    <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Note</h5>
                    <button className="btn-close" onClick={() => setCurrentNote(null)}></button>
                </div>

                <div className="modal-body"> 
                    <label className="form-label fw-bold">Title</label>
                    <input
                        className="form-control mb-2"
                        value={currentNote.title}
                        onChange={(e) =>
                            setCurrentNote({ ...currentNote, title: e.target.value })
                        }
                        placeholder="Title"
                    />
                    <label className="form-label fw-bold">Description</label>
                    <input
                        className="form-control mb-2"
                        value={currentNote.description}
                        onChange={(e) =>
                            setCurrentNote({ ...currentNote, description: e.target.value })
                        }
                        placeholder="Description"
                    />
                    <label className="form-label fw-bold">Tag</label>
                    <input
                        className="form-control"
                        value={currentNote.tag}
                        onChange={(e) =>
                            setCurrentNote({ ...currentNote, tag: e.target.value })
                        }
                        placeholder="Tag"
                    />
                </div>

                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setCurrentNote(null)}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={updateNote}
                        disabled={
                            !currentNote.title || currentNote.title.length < 3 ||
                            !currentNote.description || currentNote.description.length < 5
                        }
                    >
                        Update Note
                    </button>
                </div>
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default Notes;

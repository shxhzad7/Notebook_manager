import React, { useState } from 'react';

const AddNote = () => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [success, setSuccess] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/notes/addnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });

            if (response.ok) {
                setSuccess(true);
                setNote({ title: "", description: "", tag: "" });

                setTimeout(() => {
                    setSuccess(false);
                }, 2000);
            }

        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-3">

            {success && (
                <div className="alert alert-success" role="alert">
                    ✅ Note added successfully!
                </div>
            )}

            <h2 className="text-center my-5">Add a Note</h2>

            <form>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        className="form-control"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                        minLength={3}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        className="form-control"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input
                        className="form-control"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                    />
                </div>

                <button
                    disabled={note.title.length < 3 || note.description.length < 5}
                    className="btn btn-primary"
                    onClick={handleClick}
                >
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNote;

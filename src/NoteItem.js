import React from 'react';

const NoteItem = ({ note, deleteNote, openEditModal }) => {
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>

                    {note.tag && (
                        <span className="badge bg-secondary mb-2">{note.tag}</span>
                    )}

                    <div className="d-flex justify-content-between mt-3">
                        <button
                            className="btn btn-sm btn-warning"
                            onClick={() => openEditModal(note)}
                        >
                            <i className="far fa-edit me-1"></i>
                            Update
                        </button>

                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteNote(note._id)}
                        >
                            <i className="far fa-trash-alt me-1"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;

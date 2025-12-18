import React from 'react';

const NoteItem = (props) => {
    const { note, deleteNote, updateNote } = props;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i 
                            className="far fa-trash-alt mx-2" 
                            onClick={() => deleteNote(note._id)}
                            style={{ cursor: 'pointer' }}
                        ></i>
                        <i 
                            className="far fa-edit mx-2" 
                            onClick={() => updateNote(note)}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    {note.tag && <small className="text-muted">Tag: {note.tag}</small>}
                </div>
            </div>
        </div>
    )
}

export default NoteItem;

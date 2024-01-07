import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/noteContext.js'
import Noteiteam from './Noteitem.js'
import AddNote from './AddNote.js'

const Notes = (props) => {
    const { showAlert } = props
    const context = useContext(noteContext)
    const { getNotes, notes, editNote, deleteNote } = context
    const [res, setRes] = useState(false)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const [ans, setAns] = useState(false)

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        console.log("updateNote");
        setRes(true);
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        })
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setRes(false)
        showAlert("Successfully note updated", 'success')
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }


    const removeNote = (currentNote) => {
        console.log("removeNote");
        setAns(true);
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        })
    }

    const handleClickRemove = (e) => {
        e.preventDefault()
        deleteNote(note.id)
        setAns(false)
        showAlert("Successfully note deleted", 'success')
    }

    return (
        <>
            <AddNote showAlert={showAlert} />
            {res && (
                <div className="container my-3 shadow-none p-3 mb-5 bg-light rounded">
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Note</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setRes(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form className="container" onSubmit={handleClickUpdate}>
                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input type="text" className="form-control" id="title" name="etitle" value={note.etitle} onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <input type="text" className="form-control" id="description" name="edescription" value={note.edescription} onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Tag</label>
                                            <input type="text" className="form-control" id="tag" name="etag" value={note.etag} onChange={onchange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Update Note</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {ans && (
                <div className="container my-3 shadow-none p-3 mb-5 bg-light rounded">
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete Note</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setAns(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form className="container" onSubmit={handleClickRemove} >
                                        <div className="mb-3">
                                            <h5>Are you sure you want to delete your note</h5>
                                        </div>
                                        <div className="d-flex">
                                            <button type="submit" className="btn btn-primary mx-2">Delete</button>
                                            <button className="btn btn-primary" onClick={() => setAns(false)}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='row my-3 container'>
                <h2>Your Notes</h2>
                {Array.isArray(notes) && notes.map((note) => {
                    return <Noteiteam key={note._id} note={note} updateNote={updateNote} removeNote={removeNote} />;
                })}
            </div>
        </>
    );
}

export default Notes;

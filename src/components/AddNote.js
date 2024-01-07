import React, { useContext, useState } from 'react'
import NoteContext from '../context/noteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const clickhandle = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        document.getElementById("title").value = ""
        document.getElementById("description").value = ""
        document.getElementById("tag").value = ""
        props.showAlert("Adding note successfully", 'success')
    }

    return (
        <div className="container my-3">
            <h2>Add Note</h2>
            <form className="container">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={clickhandle}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
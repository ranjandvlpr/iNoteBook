import React from 'react'
import NoteContext from '../context/noteContext'

const Noteitem = (props) => {
    const { note, updateNote, removeNote } = props

    return (
        <div className="col-md-3">
            <div class="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 classNmae="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <h6>{note.tag}</h6>
                    <i onClick={() => { removeNote(note) }} className="fa-solid fa-trash mx-2"></i>
                    <i onClick={() => { updateNote(note) }} className="fa-solid fa-pen-to-square mx-2"></i>
                </div>
            </div>
        </div >
    )
}

export default Noteitem
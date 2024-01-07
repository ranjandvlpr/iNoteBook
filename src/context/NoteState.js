import { useState } from "react";
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([])
    const [authtoken, setAuthtoken] = useState("")

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "auth-token": authtoken
            },
            body: JSON.stringify({
                title, description, tag
            })
        })
        const note = await response.json()
        setNotes(notes.concat(note))
    }

    //Add a getnotes
    const getNotes = async (title, description, tag) => {
        //Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "auth-token": authtoken
            },
        })
        const json = await response.json()
        setNotes(json)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
                "auth-token": authtoken
            },
            body: JSON.stringify({ title, description, tag })
        })
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "auth-token": authtoken
            },
        });
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes, authtoken, setAuthtoken }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
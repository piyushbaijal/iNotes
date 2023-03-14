import NoteContext from "./noteContext";
import { useState } from "react";



const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial)

    // Add Note
    const addNote = async (title, description, tag) => {
        // calling api here

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        setnotes(notes.concat(await response.json()))
    }

    // Get all Note
    const getnotes = async () => {
        // calling api here
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        setnotes(await response.json())
    }

    // Delete note
    const deleteNote = async (id) => {
        // calling api here

        const response = await fetch(`${host}/api/notes/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            // body: JSON.stringify({ title, description, tag })
        });
        const newNote = notes.filter((note) => { return note._id !== id })
        setnotes(newNote)
    }

    // Edit note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });


        const json = await response.json();
        let newNote = JSON.parse(JSON.stringify(notes))


        // Logic to edit in client
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setnotes(newNote);
    }
    return (
        < NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getnotes }}>
            {props.children}
        </ NoteContext.Provider >)
}

export default NoteState;






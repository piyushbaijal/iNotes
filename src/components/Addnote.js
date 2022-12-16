import React, { useContext, useState } from 'react'
import noteContext from '../contect/notes/noteContext';


function Addnote(props) {
    const context = useContext(noteContext)
    // const { addNotes } = context

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const hanelClick = (e) => {
        e.preventDefault()
        context.addNote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });
        props.showAlert(" Note Added", "success ")
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <h1>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" minLength={5} required className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" minLength={5} required className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={hanelClick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote

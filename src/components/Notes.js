import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../contect/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getnotes, editNote } = context
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes()
        }
        else {
            navigate("/login")
        }
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handelClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert(" Updated Successfull ", "success ")
    }


    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>

            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" minLength={5} required aria-describedby="titleHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' minLength={5} required value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                                {/* <button type="submit" className="btn btn-primary" onClick={hanelClick}>Add Note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handelClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>






            <Addnote showAlert={props.showAlert} />
            <div className="row">
                <h1>Your Notes</h1><div className="container mx-2">
                    <b>  {notes.length === 0 && "Nothing to display"}</b>
                </div>
                {notes.map((note) => {
                    return <Noteitem showAlert={props.showAlert} note={note} key={note._id} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes
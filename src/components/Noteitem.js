import React, { useContext } from 'react'
import noteContext from '../contect/notes/noteContext';

function Noteitem(props) {
    const { note, updateNote, showAlert } = props;
    const context = useContext(noteContext)

    return (
        <div className='col-md-3'>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-regular fa-trash-can mx-1" onClick={() => {
                        context.deleteNote(note._id);
                        // console.log(note._id);
                        showAlert(" Note Deleted", "danger ")
                    }}></i>
                    <i className="fa-regular fa-pen-to-square mx-1" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem

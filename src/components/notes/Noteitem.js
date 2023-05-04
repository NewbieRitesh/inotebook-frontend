import React, { useContext } from 'react'
import noteContext from '../../context/notes/noteContext'

export const Noteitem = (props) => {

    const context = useContext(noteContext)
    const { deleteNote } = context
    const { notes, updateNote } = props

    return (
        <div className='col-md-6' style={{ overflowWrap: "anywhere" }}>
            <div className="border-bottom border-black p-1 my-1 d-flex flex-column justify-content-between">
                <div id="data">
                    <h5 className='overflow-hidden d-flex justify-content-between' style={{ margin: "auto" }}>{notes.title}
                        <div>
                            <i title='Edit Note' className="text-primary fa-solid p-1 mx-1 fa-pen-to-square" style={{ cursor: "pointer" }} onClick={() => { updateNote(notes) }} />
                            <i title='Delete Note' className="text-danger fa-sharp p-1 mx-1 fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => { deleteNote(notes._id) }} />
                        </div>
                    </h5>
                    <p className='overflow-hidden' style={{ fontSize: "15px", margin: "auto" }}>{notes.description}</p>
                    <span style={{ fontSize: "12px", margin: "auto" }}>{notes.tag}</span>
                </div>
            </div>
        </div>
    )
}
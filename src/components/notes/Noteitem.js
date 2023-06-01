import React, { useContext } from 'react'
import noteContext from '../../context/notes/noteContext'
import generalContext from '../../context/general/generalContext'

export const Noteitem = (props) => {

    const context = useContext(noteContext)
    const { process } = useContext(generalContext)
    const { deleteNote } = context
    const { notes, updateNote } = props

    return (
        <div className='col-md-6' style={{ overflowWrap: "anywhere" }}>
            <div className="border-bottom border-black p-1 my-1 d-flex flex-column justify-content-between">
                <div id="data">
                    <h5 className='overflow-hidden d-flex justify-content-between' style={{ margin: "auto" }}>{notes.title}
                        <div>
                            <button disabled={process === true} className='border-0 btn p-0 mx-1 btn-lg'><i title='Edit Note' className="text-primary p-1 bi bi-pencil-square" style={{ cursor: "pointer" }} onClick={() => { updateNote(notes) }} /></button>
                            <button disabled={process === true} className='border-0 btn p-0 mx-1 btn-lg'><i title='Delete Note' className="text-danger p-1 bi bi-trash3-fill" style={{ cursor: "pointer" }} onClick={() => { deleteNote(notes._id) }} /></button>
                        </div>
                    </h5>
                    <p className='overflow-hidden' style={{ fontSize: "15px", margin: "auto" }}>{notes.description}</p>
                    <span style={{ fontSize: "12px", margin: "auto" }}>{notes.tag}</span>
                </div>
            </div>
        </div>
    )
}
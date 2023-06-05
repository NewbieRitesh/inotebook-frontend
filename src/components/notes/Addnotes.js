import React, { useContext, useState } from 'react'
import noteContext from '../../context/notes/noteContext'
import generalContext from '../../context/general/generalContext'

const Addnotes = () => {
    const initialNoteState = { title: " ", description: " ", tags: " " };
    const [inputNote, setInputNote] = useState(initialNoteState)
    const [valiClass, setValiClass] = useState({ title: "d-none", description: "d-none" })

    const { addNote } = useContext(noteContext)
    const { process, setProcess } = useContext(generalContext)

    const handleChange = (event) => {
        setInputNote({ ...inputNote, [event.target.name]: event.target.value })
        setValiClass({ title: inputNote.title.length < 3 ? "d-block" : "d-none", description: inputNote.description.length < 3 ? "d-block" : "d-none" })
    }
    const handleAddClick = async (event) => {
        setProcess(true)
        event.preventDefault();
        const data = await addNote(inputNote.title, inputNote.description, inputNote.tags)
        if (data.success === true) setInputNote(initialNoteState)
        setProcess(false)
    }

    return (
        <>
            <h2 className='h2 mt-3'>Add Note</h2>
            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="title" className="d-flex form-label">Title <span className={`${valiClass.title} mx-2 text-danger`} style={{ fontSize: "13px" }}>Enter atleast 3 character in title</span></label>
                    <input type="text" value={inputNote.title} className="form-control" name="title" id="title" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <input type="text" value={inputNote.tags} className="form-control" name='tags' id="tags" onChange={handleChange} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="description" className="d-flex form-label">description <span className={`${valiClass.description} mx-2 text-danger`} style={{ fontSize: "13px" }}>Enter atleast 3 character in description</span></label>
                    <textarea value={inputNote.description} className="form-control" id="description" name='description' rows="3" onChange={handleChange}></textarea>
                </div>
                <div className="col-12 mb-3">
                    <button disabled={process === true || inputNote.title.length < 3 || inputNote.description.length < 3} type="submit" className="btn btn-primary" onClick={handleAddClick}>Add Note</button>
                </div>
            </form>
        </>
    )
}

export default Addnotes
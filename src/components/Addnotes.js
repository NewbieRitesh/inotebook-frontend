import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnotes = () => {
    const [note, setNote] = useState({ title: "", description: "", tags: "" })
    const [valiClass, setValiClass] = useState({ title: "d-none", description: "d-none" })

    const { addNote } = useContext(noteContext)

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
        setValiClass({ title: note.title.length < 3 ? "d-block" : "d-none", description: note.description.length < 3 ? "d-block" : "d-none" })
    }
    const handleAddClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tags)
    }

    return (
        <>
            <h2 className='h2 mt-3'>Add Note</h2>
            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="title" className="d-flex form-label">Title <span className={`${valiClass.title} mx-2 text-danger`} style={{ fontSize: "13px" }}>Enter atleast 3 character in title</span></label>
                    <input type="text" className="form-control" name="title" id="title" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <input type="text" className="form-control" name='tags' id="tags" placeholder="important, not important" onChange={handleChange} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="description" className="d-flex form-label">description <span className={`${valiClass.description} mx-2 text-danger`} style={{ fontSize: "13px" }}>Enter atleast 3 character in description</span></label>
                    <textarea className="form-control" id="description" name='description' rows="3" onChange={handleChange}></textarea>
                </div>
                <div className="col-12 mb-3">
                    <button disabled={note.title.length < 3 || note.description.length < 3} type="submit" className="btn btn-primary" onClick={handleAddClick}>Add Note</button>
                </div>
            </form>
        </>
    )
}

export default Addnotes
import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../../context/notes/noteContext'
import { Noteitem } from './Noteitem'
import { useNavigate } from 'react-router-dom'
const Notes = () => {
  const [valiClass, setValiClass] = useState({ title: "d-none", description: "d-none" })
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etags: "" })

  const context = useContext(noteContext)
  const { notes, getNotes, editNote } = context

  const edit = useRef(null)
  const close = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
      // eslint-disable-next-line
    }
    else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    edit.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, etags: currentNote.tag, edescription: currentNote.description })
  }

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value })
    setValiClass({ title: note.etitle.length < 3 ? "d-block" : "d-none", description: note.edescription.length < 3 ? "d-block" : "d-none" })
  }

  const handleUpdateClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etags)
    close.current.click()
  }

  return (
    <>
      {/* Button trigger modal */}
      <button type="button" ref={edit} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit Note
      </button>
      {/* modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="etitle" className="d-flex form-label">Title <span className={`${valiClass.title} mx-2 text-danger`} style={{ fontSize: "13px" }}>Enter atleast 3 character in title</span></label>
                  <input type="text" className="form-control" name="etitle" value={note.etitle} id="etitle" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="etags" className="form-label">Tags</label>
                  <input type="text" className="form-control" name='etags' id="etags" value={note.etags} placeholder='general, important' onChange={handleChange} />
                </div>
                <div className="col-md-12">
                  <label htmlFor="edescription" className="d-flex form-label">description <span className={`${valiClass.description} mx-2 text-danger`} style={{ fontSize: "13px" }}>Enter atleast 3 character in description</span></label>
                  <textarea className="form-control" id="edescription" name='edescription' value={note.edescription} rows="3" onChange={handleChange}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={close} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 3 || note.edescription.length < 3} type="button" className="btn btn-primary" onClick={handleUpdateClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <h2>Notes</h2>
      {notes.length === 0 ? "No notes available" : ""}
      <div className="row">
        {notes.map((notes) => {
          return <Noteitem key={notes._id} updateNote={updateNote} notes={notes} />
        })}
      </div>
    </>
  )
}

export default Notes
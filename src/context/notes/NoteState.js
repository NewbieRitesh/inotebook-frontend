import { useContext, useState } from "react";
import NoteContext from "./noteContext";
import alertContext from "../alert/alertContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([])
    const { showAlert } = useContext(alertContext)
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    // get all notes
    const getNotes = async () => {
        const response = await fetch(`${BASE_URL}api/notes/fetchnotes`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const data = await response.json()
        setNotes(data)
    }

    // add Note
    const addNote = async (title, description, tag) => {
        const note = {
            "title": title,
            "description": description,
            "tag": tag,
        }
        let headersList = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        }
        let bodyContent = JSON.stringify(note);
        let response = await fetch(`${BASE_URL}api/notes/addnote`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        setNotes(notes.concat(data.response))
        if (data.success === true) showAlert(data.success, "Note added Successfully")
        else showAlert(data.success, data.response)
    }

    // update note
    const editNote = async (id, title, description, tag) => {
        let headersList = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        }
        let bodyContent = JSON.stringify({
            "title": title,
            "description": description,
            "tag": tag
        });
        let response = await fetch(`${BASE_URL}api/notes/updatenote/${id}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json()
        if (data.success === true) {
            let newNotes = JSON.parse(JSON.stringify(notes))
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
        if (data.success === true) showAlert(data.success, "Note updated Successfully")
        else showAlert(data.success, data.response)
    }

    // delete note
    const deleteNote = async (id) => {
        let headersList = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        }
        let response = await fetch(`${BASE_URL}api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: headersList
        });
        let data = await response.json()
        if (data.success === true) {
            const newNotes = notes.filter((notes) => { return notes._id !== id })
            setNotes(newNotes)
        }
        if (data.success === true) showAlert(data.success, "Note deleted Successfully")
        else showAlert(data.success, data.response)
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
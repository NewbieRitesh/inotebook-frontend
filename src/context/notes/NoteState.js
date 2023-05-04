import { useContext, useState } from "react";
import NoteContext from "./noteContext";
import alertContext from "../alert/alertContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([])

    const useAlertContext = useContext(alertContext)
    const { showAlert } = useAlertContext
    const host = "http://localhost:1000"


    // get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        console.log(response);
        const json = await response.json()
        setNotes(json)
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
        let response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        setNotes(notes.concat(data))
        if (response.status===200) {
            showAlert("success", "Note added Successfully")
        } else {
            showAlert("error", "Some error occur")
        }
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

        let response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });
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
        if (response.status===200) {
            showAlert("success", "Note updated Successfully")
        } else {
            showAlert("error", "Some error occur")
        }
    }

    // delete note
    const deleteNote = async (id) => {
        const newNotes = notes.filter((notes) => { return notes._id !== id })
        setNotes(newNotes)
        let headersList = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        }

        let response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: headersList
        });
        if (response.status===200) {
            showAlert("success", "Note deleted Successfully")
        } else {
            showAlert("error", "Some error occur")
        }
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
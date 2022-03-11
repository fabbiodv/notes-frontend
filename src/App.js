import './App.css';
import React, { useEffect, useState } from 'react';
import { Note } from "./Note.js"
import { 
  create as createNote,
  getAll as getAllNotes
} from "./services/notes"



export default function App() {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  console.log("useEffect")
  setLoading(true)
  getAllNotes().then((notes) => {
    console.log("seteando las notas")
    setNotes(notes)
    setLoading(false) 
  })
}, [])


  const handleChange = (event) => {
    setNewNote(event.target.value)
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Crear nota")
    const noteToAddToState = {
      title: newNote,
      body: newNote, 
      userId: 1
    }

    createNote(noteToAddToState).then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote))
      })

    setNewNote("")
  }

  console.log("render")

  return (
    <div>
      <h1>Notes</h1>
      {loading ? 'Cargando..' : ""}
      <ol>
        {notes.map((note) => (
            <Note key={note.id} {...note}/>
        ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote}/>
        <button>Crear Nota</button>
      </form>
    </div>
  );
}


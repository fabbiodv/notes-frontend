import React, {useState} from 'react';
import Togglable from './Togglable';


export default function NoteForm({addNote, handleLogout}) {
  const [newNote, setNewNote] = useState("");

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    addNote(noteObject)
    setNewNote("")

  }

  return (
    <Togglable buttonLabel='New Note'>
    <h3>Create a new note</h3>

      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={newNote}
          placeholder="Write your note content"
          />
        <button type='submit'>save</button>
      </form>
      <div>
        <button onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </Togglable>
  )
}
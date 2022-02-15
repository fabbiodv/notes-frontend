import './App.css';
import { Note } from "./Note.js"
import React, { useState } from 'react';


export default function App(props) {

  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState();
  const [showAll, setShowAll] = useState(true);

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const handleSubmit = (e) =>{

    e.preventDefault();
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    setNotes((prevNotes) => prevNotes.concat(noteToAddToState))
    setNewNote("")
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  return (
    <div>
      <h1>Notes</h1>
        <button onClick={handleShowAll}>
          { showAll ? 'Show only important' : 'Show all'}
        </button>
      <ol>
        {notes
        .filter((note) => {
          if (showAll === true) return true;
          return note.important === true;  
        })
        .map((note) => (
          <Note key={note.id} {...note}/>
        ))}
      </ol>
      <form onSubmit= {handleSubmit}>
        <input type = 'text' onChange={handleChange} value={newNote}/>
        <button>Crear Nota</button>
      </form>
    </div>
  );
}


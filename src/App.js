import './App.css';
import React, { useEffect, useState } from 'react';
import { Note } from "./Note.js"
import noteService from './services/notes'
import loginService from './services/login'




export default function App() {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);



useEffect(() => {
  noteService
  .getAll()
  .then((initialNotes) => {
    setNotes(initialNotes)
  })
}, [])


  const handleChange = (event) => {
    setNewNote(event.target.value)
  }
  

  const addNote = (event) => {
    event.preventDefault();    
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(), 
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    noteService
    .create(noteObject)
    .then((returnedNote) => {
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault() //por defecto hace un post al action y lo evitamos
    try {
      const user = await loginService.login({
        username,
        password
      })
      
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>

      <form onSubmit={handleLogin}>

        <div>
          <input
              type='text'
              value={username}
              name='Username'
              placeholder='Username'
              onChange={({target})=>setUsername(target.value)}
          />
        </div>

        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({target})=>setPassword(target.value)}
          />
        </div>

        <button>
          Login
        </button>
      </form>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
            <Note
              key={i} 
              note={note}
              toggleImportanceOf={()=> toggleImportanceOf(note.id)}
              />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          onChange={handleNoteChange}
          value={newNote}
          />
        <button type='submit'>Crear Nota</button>
      </form>
    </div>
  );
}


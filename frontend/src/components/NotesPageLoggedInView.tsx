import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddEditNoteDialog from "./AddEditNoteDialog";
import { useState, useEffect } from "react";
import {Note as NoteModel} from '../models/notes';
import stylesUtils from "../styles/utils.module.css";
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import Note from "./Note";



const NotesPageLoggedInView = () => {

    const [notes, setNotes]= useState<NoteModel[]>([])
    const [notesLoading, setNotesLoading] = useState(true)
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)
    
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)


    useEffect(() => {
    
        async function getData(){
          try{
            setShowNotesLoadingError(false)
            setShowAddNoteDialog(false)
            setNotesLoading(true)
            // ova bese api povikot za certain url
            // const request = await fetch('/api/notes', {
            //   method: 'GET',
            // });
            // NotesApi veke ima svoi custom functions with created API calls.
            const response = await NotesApi.fetchNotes()
            // const response = await request.json();
            setNotes(response)
          }
          catch(error){
            alert(error)
            setShowAddNoteDialog(true)
            setShowNotesLoadingError(true)
          }
          finally{
            setNotesLoading(false)
          }
        }
         getData()
      
      }, [])
      
      async function deleteNote(note: NoteModel){
        try {
          await NotesApi.deleteNote(note._id);
          setNotes(notes.filter(existingNote => existingNote._id !== note._id));
        }
        catch(error){
          console.error(error)
          alert(error)
        }
      }
    
      const notesGrid = <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.map(note => (
        <Col key={note._id}>
        
        <Note note={note} 
        className={styles.note}
        onNoteClicked={setNoteToEdit}
        onDeleteNoteClicked={deleteNote}
        />
        </Col>
        ))}
        </Row>

  return (
    <>
        {/* <Button onClick={()=> setIncreaseNumber(increaseNumber + 1) }>{increaseNumber}</Button> */}
    <Button className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`} onClick={()=> setShowAddNoteDialog(true)} 
    >
   <FaPlus/>
      Add new Note</Button>

      {notesLoading && <Spinner animation="border" variant="primary"/>}
      {showNotesLoadingError && <p>Something went wrong. Please refresh the page</p>}
      {!notesLoading && !showNotesLoadingError && 
      <>
      {notes.length > 0 ? notesGrid  : <p>You don't have any notes yet</p>}
      </>
      }

      {
        showAddNoteDialog  && <AddEditNoteDialog onDismiss={() => setShowAddNoteDialog(false)} 
        onNoteSaved={(newNote)=> {
          setNotes([...notes, newNote])
          setShowAddNoteDialog(false)
        }}/>
      }
      {
        noteToEdit && <AddEditNoteDialog
        noteToEdit={noteToEdit}
        onDismiss={() => setNoteToEdit(null)}
        onNoteSaved={(updatedNote) => {
          setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
          setNoteToEdit(null)
        }}
        />
      }

    </>
  )
}

export default NotesPageLoggedInView

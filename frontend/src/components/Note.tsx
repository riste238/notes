import styles from '../styles/Note.module.css';
import stylesUtility from '../styles/utils.module.css';
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/notes";
import { formatDate } from '../utils/formatData';
import { MdDelete } from "react-icons/md";
// import * as NotesApi from '../components/Note';

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked: (note:NoteModel) => void,
    className?: string,
}
// znajs kako da gi svatime ovie properties od interfejs. Kako da ni stanat navika, deka vo ovaa funkcija treba da gu korsiteme???.. Imas object. Nareci go NoteProps toj object. I ovoj object ima edno pravilo, vika; ako sakas da gi koristes svojstvata od objectot vo bilo koja funkcija, kje moras da gi zemes kako parametri, a pritoa da napravis :Ime na objectot; so ova da i kazes na funkcijata od kade gi zemas tie parametri; I toa e toa;
const Note = ({ note, onNoteClicked, onDeleteNoteClicked, className }: NoteProps) => {

    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt)

    }
    else {
        createdUpdatedText = "Created " + formatDate(createdAt)
    }


    return (
        <Card className={`${styles.noteCard} ${className}`}
        onClick={() => onNoteClicked(note)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={stylesUtility.flexCenter}>
                    {title}
                    <MdDelete className='text-muted ms-auto'
                    onClick={(e) => {onDeleteNoteClicked(note)
                    e.stopPropagation()
                    }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Note;


// 4.54
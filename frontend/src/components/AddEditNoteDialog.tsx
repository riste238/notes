import { Form, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Note } from '../models/notes'
import { NoteInput } from '../network/notes_api';
import * as NoteApi from '../network/notes_api';
import TextInputField from './form/TextInputField';

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void
}
//ako sakame da koristeme samo odredeni svojstva od eden iterfejs, gi pisuvame vo destruktuiracki { krivi zagradi}... no moze i vaka:
// const AddNoteDialog = (props: AddNoteDialogProps) => { } -> i sega ako sakame da go koristeme onNoteSaved property , vikame: props.onNoteSaved ( dali e ova tocno, toa treba da se proveri.... Megjutoa mozebi props e za site properties zaedno...) 
  
// const AddNoteDialog = (props: AddNoteDialogProps) => { } - proveri dali kje raboti vaka: props.onNoteSaved...
const AddEditNoteDialog = ({noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) => {

const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteInput>(
   { defaultValues: {
        title: noteToEdit?.title || "",
        text: noteToEdit?.text || "",
    }}
);

// zosto go koristeme ovde kako parametear, instnaca od NoteInput interface? Bidjeiki soodvetno na properties vo dokumentite, imame text & title kako properties,, i sega ovde so ovaa instanca nie gi imame tie svojstva, t.e note == text & title;
async function onSubmit(input: NoteInput){
    try{
        let noteResponse: Note;
        if(noteToEdit){
            noteResponse = await NoteApi.updateNote(noteToEdit._id, input)
        }
        else {  
            // ovoj paramtear input se tie title * text properties
            noteResponse = await NoteApi.createNote(input);
        }
        onNoteSaved(noteResponse)
    }
    catch(error){
        console.error(error)
        alert(error);
    }
}

    return (
        <Modal show onHide={() => onDismiss()}>
            <Modal.Header closeButton>
                <Modal.Title>
                 {noteToEdit ? "Edit note " : "Add notes"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                    name='title'
                    label='Title'
                    type='text'
                    placeholder='Title'
                    register={register}
                    registerOptions={{required: 'Required'}}
                    error={errors.title}
                    />
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            // kreira object
                            isInvalid={!!errors.title}
                            {...register("title", {required: "Required"})}
                        />  

                        <Form.Control.Feedback type="invalid">
                                {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group> */}

                    <TextInputField
                    name="text"
                    label='Text'
                    as='textarea'
                    rows={5}
                    placeholder="Text"
                    register={register}
                    />

                    {/* <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register("text")}
                        />
                    </Form.Group> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button

                    type="submit"
                    form="addEditNoteForm"
                    disabled={isSubmitting}
                    >
                    Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEditNoteDialog

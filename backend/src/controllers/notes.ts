import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
    
    const authenticatedUserId = req.session.userId;

    
    try {
        assertIsDefined(authenticatedUserId)

        
        // throw createHttpError(401)
        // throw Error('You have not any notes!')
        const notes = await NoteModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(notes)

    }
    catch (error) {
        next(error)
    }
}

// get NOTE
export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

try{
    assertIsDefined(authenticatedUserId)

    if(!mongoose.isValidObjectId(noteId)){
        throw createHttpError(400, "Invalid note id")
    }

const getNote = await NoteModel.findById(noteId).exec()

if(!getNote){
    throw createHttpError(404, "Note not found!")
}

if(!getNote.userId.equals(authenticatedUserId)){
    throw createHttpError(401, "You cannot access this note")    
}

    res.status(200).json(getNote)
}
catch(error){
    next(error)
}
}

interface CreateNoteBody{ 
    title?: string,
    text?: string
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    // export const createNote: RequestHandler<CreateNoteBody> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    const authenticatedUserId = req.session.userId;

    try {

    assertIsDefined(authenticatedUserId)


        if(!title){
            throw createHttpError(400, "Note must have a title.")
        }
        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title, text })

        res.status(201).json(newNote)

    }
    catch (error) {
        next(error)
    }


}

//UPDATE
interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBody {
        title?: string,
        text?: string
}

// ovaa varijabla mora da gi sodrzi ovie properties od ovie 2 navedeni interfejsa;
export const updateNote:RequestHandler<UpdateNoteParams,UpdateNoteBody> = async(req,res,next) => {

    const noteId = req.params.noteId;
    const title = req.body.title;
    const text= req.body.text;

    const authenticatedUserId = req.session.userId;

    try{

    assertIsDefined(authenticatedUserId)


    if(!noteId) {
        throw createHttpError(404, 'Such ID is not exist!')
    }
    // find id into db;
    const findItem = await NoteModel.findById(noteId).exec()

    if(!findItem) {
        throw createHttpError(404, 'Such ID is not exist!')
        
    }


if(!findItem.userId.equals(authenticatedUserId)){
    throw createHttpError(401, "You cannot access this note")    
}

    // update the item with entred/typed values for properties
    findItem.title = title;
    findItem.text = text;

    const saveItem = await findItem.save()
    res.status(200).json(saveItem)
}

catch(error){
    next(error)
}

}


// delete note


export const deleteNote:RequestHandler = async(req,res,next)=>{
    const noteId = req.params.noteId;

    const authenticatedUserId = req.session.userId;

    try{
    assertIsDefined(authenticatedUserId)

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "invalid Note ID")
        return

        }

        // find note according denoted id;
        const findNote = await NoteModel.findById(noteId).exec()
        
        if(!findNote){
            throw createHttpError(404, "Note not found.s")
            
        }

if(!findNote.userId.equals(authenticatedUserId)){
    throw createHttpError(401, "You cannot access this note")    
}

        // delete note;
     await findNote.deleteOne()
        
        
        res.sendStatus(204).json({message: "Deleted found note"})
    }
    catch(error){
        next(error)
    }
}



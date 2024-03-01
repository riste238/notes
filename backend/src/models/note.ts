import { InferSchemaType, model, Schema } from "mongoose";

// InferSchemaType =Obtains document schema type from Schema instance.

const noteSchema  = new Schema({
    userId: {type: Schema.Types.ObjectId, required:true},
    title: {type: String, required: true},
    text: {type:String},
},
{
    timestamps: true
}
)
// I think, that is better way of keeping data;
// The Type named "Note", now possess all types of all properties written in the noteSchema;
type Note = InferSchemaType<typeof noteSchema>

// In this way, we inferred that this model will be created by this generic "Note" that it consists of Type's properties...
export default model<Note>("Note", noteSchema)
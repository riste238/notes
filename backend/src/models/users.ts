// import mongoose from "mongoose";
import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false }
})

// why we write a type? For safer keeping of customer data;
// User type, now possess all types of all properties written in the userSchema;

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
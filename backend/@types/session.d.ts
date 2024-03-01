import mongoose from "mongoose";

// import session from "express-session";

declare module "express-session" {
   export interface SessionData {
        userId: mongoose.Types.ObjectId;
    }
}
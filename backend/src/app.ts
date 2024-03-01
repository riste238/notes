import "dotenv/config"
import express, {NextFunction, Request, Response} from "express";
import notesRoutes from "./routes/notes"
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
import usersRoutes from "./routes/users";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
// import { requiresAuth } from "./middleware/auth";

const app = express();
app.use(morgan("dev"))
app.use(express.json())

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    rolling: true,
    store:MongoStore.create({
        mongoUrl: env.CONNECTION
        // 5:40
    })
}))

app.use('/api/users', usersRoutes);
app.use('/api/notes', notesRoutes);

app.use((req,res, next)=> {
    next(createHttpError(404,"Endpoint not found."))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = "An uknown error occured";
    let statusCode = 500;
    if(isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message
        
    }
    // ako error paramtar e instanca od Error klasata( t.e ako e od nego predizvikan),
    // if (error instanceof Error) errorMessage = error.message
    res.status(statusCode).json({ error: errorMessage })
})


export default app;


// 5.28
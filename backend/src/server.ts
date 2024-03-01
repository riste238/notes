// require('dotenv').config()
import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose"
// import cors from "cors"
const port = env.PORT;
// const port = process.env.PORT;

// app.use(express.json())

// app.use(cors())


mongoose.connect(env.CONNECTION!)
.then(() => {
    console.log("Mongoose connected");

    app.listen(port, () => {
        console.log("Server running on port:  " + port);
        
    })
    
})
.catch(console.error)

// async function connect(){
    
//     mongoose.set('strictQuery', true);
//     await mongoose.connect(env.CONNECTION)
//     .then(() => {
//      console.log('Db connected');
//      app.listen(port, () => {
//                  console.log("Server running on port:  " + port);
                
//              })
//     })
//     .catch((err) => {
//      console.log(err);
//     })
// }
// connect()

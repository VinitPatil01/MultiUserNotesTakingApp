import express from 'express';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { createDbConnection } from './src/DbConfig/DbConfig.js';
import StudentRouter from './src/routes/StudentRoutes.js'
import cors from 'cors';
import notesRouter from './src/routes/notesRoutes.js';
dotenv.config();
export const connection = createDbConnection();
const app = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.get("/", (request, response) => {
    response
        .status(StatusCodes.OK)
        .send({ message: "Welcome to Cdac Notes App" })
});

app.use("/student",StudentRouter)
app.use("/notes",notesRouter)

app.listen(port, (error) => {
    console.log("Server Started Successfully........")
    console.log("http://localhost:"+port)
});
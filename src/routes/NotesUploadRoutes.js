import express from 'express';
import multer from 'multer';
import { uploadNotes } from '../controllers/Notes/uploadNote';


const notesRouter = express.Router();



const Storage = multer.diskStorage({
    destination:'Pdf_Notes/',
    filename : ( request,file,callback) => callback (null,file.originalname)
});

const upload = multer({ Storage });

notesRouter.post('/upload', upload.single('note'), uploadNotes)

export default notesRouter;
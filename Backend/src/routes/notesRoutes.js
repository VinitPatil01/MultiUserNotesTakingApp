import express from  'express';
import { verifyToken } from "../middlewares/VerifyToken.js";
import { uploadNotes } from "../controllers/Notes/uploadNote.js";
import { upload } from '../controllers/Notes/NotesUploadMulterConfig.js';
import { getCategories } from '../controllers/Notes/getCategories.js';
import { filterByCategories } from '../controllers/Notes/filterByCategories.js';
import { getNotesById } from '../controllers/Notes/getNotesById.js';

const notesRouter = express.Router();

notesRouter.post('/upload',upload.single('note'),verifyToken,uploadNotes);
notesRouter.get('/getallcategories',getCategories);
notesRouter.post('/filterbycategories',verifyToken,filterByCategories)
notesRouter.get('/:note_id',getNotesById)
export default notesRouter;
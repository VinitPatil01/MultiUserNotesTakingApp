import express from 'express';
import { RegisterStudent } from '../controllers/Student/StudentRegistration.js';
import { LoginStudent } from '../controllers/Student/LoginStudent.js';
import { verifyToken } from '../middlewares/VerifyToken.js';
import { getDashboard } from '../controllers/Student/StudentDashboard.js';
import { getSelfNotes } from '../controllers/Notes/getSelfNotes.js';
import { getGroupNotes } from '../controllers/Notes/getGroupNotes.js';
import { StudentProfile } from '../controllers/Student/StudentProfile.js';


const StudentRouter = express.Router();

//StudentRouter.get('/',verifyToken,GetStudents);

StudentRouter.post('/',RegisterStudent);
StudentRouter.post('/Login',LoginStudent);
StudentRouter.get("/Dashboard/",verifyToken,getDashboard);
StudentRouter.get("/selfnotes/",verifyToken,getSelfNotes);
StudentRouter.get("/groupnotes/",verifyToken,getGroupNotes);
StudentRouter.get('/profile',verifyToken,StudentProfile)


export default StudentRouter;
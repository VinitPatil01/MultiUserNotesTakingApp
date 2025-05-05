import express from 'express';
import { RegisterStudent } from '../controllers/StudentRegistration.js';
import { LoginStudent } from '../controllers/LoginStudent.js';
import { verifyToken } from '../middlewares/VerifyToken.js';
import { getDashboard } from '../controllers/StudentDashboard.js';


const StudentRouter = express.Router();

//StudentRouter.get('/',verifyToken,GetStudents);

StudentRouter.post('/',RegisterStudent);
StudentRouter.post('/Login',LoginStudent);
StudentRouter.get("/Dashboard/",verifyToken,getDashboard);


export default StudentRouter;
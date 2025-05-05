import express from 'express';
import { RegisterStudent } from '../controllers/StudentRegistration.js';
import { LoginStudent } from '../controllers/LoginStudent.js';


const StudentRouter = express.Router();

//StudentRouter.get('/',verifyToken,GetStudents);

StudentRouter.post('/',RegisterStudent);
StudentRouter.post('/Login',LoginStudent);


export default StudentRouter;
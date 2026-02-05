import express from 'express';
import {  getAllStudents,createStudent,getStudentById,updateStudent,getStudentsInCours,} from '../controllers/studentController.js';


const router = express.Router();

router.get('/', getAllStudents);


router.post('/create', createStudent);

router.get('/cours', getStudentsInCours);

router.get('/:id', getStudentById);

router.put('/:id', updateStudent);
export default router;

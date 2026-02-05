import express from 'express';
import {getAllCours, createCours, getCoursById, updateCours} from '../controllers/coursController.js';


const router = express.Router();

router.get('/', getAllCours);

router.post('/', createCours);

router.get('/:id', getCoursById);

router.put('/:id', updateCours);

export default router;

import { Router } from 'express';
import { createStudents, deleteStudents, getStudents, studentsById, updateStudents } from '../controllers/studentController';
import { authUser } from '../middleware/authMiddleware';


const router = Router();

router.post('/addStudents', createStudents);
router.get('/all-students', getStudents);
router.get('/students', authUser, studentsById);
router.patch('/updateStudents', authUser, updateStudents);
router.delete('/deleteStudents', authUser, deleteStudents);

export default router;

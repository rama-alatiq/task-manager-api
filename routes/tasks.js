import { Router } from 'express';
const router = Router();
import { createTask, getAllTasks, getTaskById, deleteTaskById } from '../controllers/taskController.js';

import { protect } from '../middleware/authMiddleware.js';

//apply the protect middleware to all of the routes 
//firstly run protect to authenticate then run the function associated with the endpoint path
router.route('/').post(protect, createTask).get(protect, getAllTasks);
router.route('/:id').get(protect, getTaskById).delete(protect, deleteTaskById);

export default router;

import { Router } from 'express';
const router = Router();
import { createTask, getAllTasks, getTaskById } from '../controllers/taskController.js';

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);

export default router;

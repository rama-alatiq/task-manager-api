import { Router } from 'express';
const router = Router();
import { createTask, getAllTasks, getTaskById, deleteTaskById } from '../controllers/taskController.js';

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.delete('/:id',deleteTaskById);

export default router;

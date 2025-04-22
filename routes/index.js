import express from 'express';
import { redirectToAsana, handleAsanaCallback, createWebhook, getWebhook } from '../controllers/authController.js';
import { getTasksController, getProjectDetails } from '../controllers/taskController.js';

const router = express.Router();

router.get('/auth/asana', redirectToAsana);
router.get('/auth/callback', handleAsanaCallback);
router.post('/webhook', getWebhook);
router.get('/setup-webhook', createWebhook);
router.get('/tasks', getTasksController);
router.get('/project-details', getProjectDetails)

export default router;
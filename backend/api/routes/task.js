const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/task');

// Get all Task
router.get('/all', TaskController.getAllTask);

// Add a Task
router.post('/add', TaskController.createTask);

// Edit a Task
router.patch('/edit/:taskId', TaskController.editTask);

// Mark a task as done
router.patch('/status/:taskId', TaskController.editTask);

// Delete a task
router.delete('/delete/:taskId', TaskController.deleteTask);

module.exports = router;
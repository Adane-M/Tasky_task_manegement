const express = require('express');
const router = express.Router();

const {
    _getAllTasks,
    _getTaskById,
    _insertTask,
    _delTask,
    _updateTask,
    _updateTaskcomplete
} = require('../controlers/tasks.js');

router.get('/all/:userid', _getAllTasks);
router.post('/add', _insertTask);
router.get('/:userid/:id', _getTaskById);
router.delete('/:userid/:taskid', _delTask);
router.put('/update/:userid/:id', _updateTask);
router.put('/task/:userid/:taskid', _updateTaskcomplete);

module.exports = router
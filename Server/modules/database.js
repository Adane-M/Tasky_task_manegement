const taskdb = require('../connections/heroku_pg.js');

const getAllTasks = (userId) => {
    return taskdb('tasks')
        .select('task_id', 'task_name', 'complete')
        .where({ user_id: userId })
        .returning('*')
};

const getTaskById = (userid, id) => {
    return taskdb('tasks')
        .select('task_name', 'task_id', 'complete', 'user_id')
        .where({ task_id: id })
        .andWhere({ user_id: userid })
};

const insertTask = (userId, task) => {
    return taskdb('tasks')
        .insert({ task_name: task, user_id: userId })
        .returning('*')
};

const delTask = (userid, id) => {
    return taskdb('tasks')
        .where({ task_id: id })
        .andWhere({ user_id: userid })
        .del()
        .returning('*')
};

const updateTask = (userid, id, { task }) => {
    return taskdb('tasks')
        .update({ task_name: task })
        .where({ task_id: id })
        .andWhere({ user_id: userid })
        .returning('*')
};
const updateTaskcomplete = (userid, id, comp) => {
    return taskdb('tasks')
        .update({ complete: comp })
        .where({ task_id: id })
        .andWhere({ user_id: userid })
        .returning('*')

};



module.exports = {
    getAllTasks,
    getTaskById,
    insertTask,
    delTask,
    updateTask,
    updateTaskcomplete,
}